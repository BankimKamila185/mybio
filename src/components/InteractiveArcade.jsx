import React, { useState, useEffect, useRef, useCallback } from 'react';

// Tech Food Icons for Snake
const TECH_FOODS = [
  { icon: '⚛️', name: 'React', pts: 10 },
  { icon: '🐍', name: 'Python', pts: 15 },
  { icon: '⚡', name: 'FastAPI', pts: 20 },
  { icon: '🧠', name: 'AI/ML', pts: 25 },
  { icon: '🚀', name: 'CTO Mode', pts: 50 },
];

const CODE_SNIPPETS = [
  "const [agent, setAgent] = useState(new AIAssistant());",
  "def optimize_neural_net(layers, lr=0.001): return train(layers)",
  "export default async function handleRequest(req, res) { return res.json({ status: 200 }); }",
  "const ctoVision = { innovation: true, scale: '10x', focus: 'AI' };",
];

import { TERMINAL_COMMANDS } from '../data/portfolioData';

export default function InteractiveArcade({ playSound }) {
  const [activeTab, setActiveTab] = useState('snake'); // 'snake' | 'typer' | 'synapse' | 'terminal'

  return (
    <div className="arcade-wrapper">
      <div className="arcade-nav-tabs">
        <button
          className={`arcade-tab-btn ${activeTab === 'snake' ? 'active' : ''}`}
          onClick={() => { playSound?.(); setActiveTab('snake'); }}
        >
          <span className="tab-icon">🐍</span> Snake Game
        </button>
        <button
          className={`arcade-tab-btn ${activeTab === 'typer' ? 'active' : ''}`}
          onClick={() => { playSound?.(); setActiveTab('typer'); }}
        >
          <span className="tab-icon">⚡</span> Code Typer
        </button>
        <button
          className={`arcade-tab-btn ${activeTab === 'synapse' ? 'active' : ''}`}
          onClick={() => { playSound?.(); setActiveTab('synapse'); }}
        >
          <span className="tab-icon">🧠</span> Neural Canvas
        </button>
        <button
          className={`arcade-tab-btn ${activeTab === 'terminal' ? 'active' : ''}`}
          onClick={() => { playSound?.(); setActiveTab('terminal'); }}
        >
          <span className="tab-icon">💻</span> Terminal CLI
        </button>
      </div>

      <div className="arcade-body">
        {activeTab === 'snake' && <SnakeGame playSound={playSound} />}
        {activeTab === 'typer' && <CodeTyper playSound={playSound} />}
        {activeTab === 'synapse' && <NeuralCanvas />}
        {activeTab === 'terminal' && <ArcadeTerminal playSound={playSound} />}
      </div>
    </div>
  );
}

/* ========================================================
   1. CYBERPUNK SNAKE
   ======================================================== */
const GRID_SIZE = 16;
const INITIAL_SNAKE = [
  { x: 8, y: 8 },
  { x: 7, y: 8 },
  { x: 6, y: 8 },
];

function SnakeGame({ playSound }) {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [dir, setDir] = useState({ x: 1, y: 0 });
  const [food, setFood] = useState({ x: 12, y: 8, item: TECH_FOODS[0] });
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    return parseInt(localStorage.getItem('bk_snake_highscore') || '0', 10);
  });
  const [gameOver, setGameOver] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const dirRef = useRef(dir);
  dirRef.current = dir;

  const generateFood = useCallback((currentSnake) => {
    let newFoodPos;
    while (true) {
      const x = Math.floor(Math.random() * GRID_SIZE);
      const y = Math.floor(Math.random() * GRID_SIZE);
      const onSnake = currentSnake.some(seg => seg.x === x && seg.y === y);
      if (!onSnake) {
        const randomItem = TECH_FOODS[Math.floor(Math.random() * TECH_FOODS.length)];
        newFoodPos = { x, y, item: randomItem };
        break;
      }
    }
    return newFoodPos;
  }, []);

  const startGame = () => {
    playSound?.();
    setSnake(INITIAL_SNAKE);
    setDir({ x: 1, y: 0 });
    setFood(generateFood(INITIAL_SNAKE));
    setScore(0);
    setGameOver(false);
    setIsPlaying(true);
  };

  const handleKey = useCallback((e) => {
    if (!isPlaying) return;
    const current = dirRef.current;
    if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
      if (current.y === 0) setDir({ x: 0, y: -1 });
      e.preventDefault();
    } else if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') {
      if (current.y === 0) setDir({ x: 0, y: 1 });
      e.preventDefault();
    } else if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
      if (current.x === 0) setDir({ x: -1, y: 0 });
      e.preventDefault();
    } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
      if (current.x === 0) setDir({ x: 1, y: 0 });
      e.preventDefault();
    }
  }, [isPlaying]);

  useEffect(() => {
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [handleKey]);

  useEffect(() => {
    if (!isPlaying || gameOver) return;

    const interval = setInterval(() => {
      setSnake((prev) => {
        const head = {
          x: (prev[0].x + dirRef.current.x + GRID_SIZE) % GRID_SIZE,
          y: (prev[0].y + dirRef.current.y + GRID_SIZE) % GRID_SIZE,
        };

        // Self collision check
        if (prev.some(seg => seg.x === head.x && seg.y === head.y)) {
          setGameOver(true);
          setIsPlaying(false);
          playSound?.();
          return prev;
        }

        const newSnake = [head, ...prev];

        // Food eaten
        if (head.x === food.x && head.y === food.y) {
          playSound?.();
          const added = food.item.pts;
          setScore(s => {
            const next = s + added;
            if (next > highScore) {
              setHighScore(next);
              localStorage.setItem('bk_snake_highscore', String(next));
            }
            return next;
          });
          setFood(generateFood(newSnake));
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    }, 110);

    return () => clearInterval(interval);
  }, [isPlaying, gameOver, food, highScore, generateFood, playSound]);

  return (
    <div className="snake-container">
      <div className="game-stats-bar">
        <span className="stat-pill">Score: <strong>{score}</strong></span>
        <span className="stat-pill highlight">Best: <strong>{highScore}</strong></span>
        <span className="stat-pill target-pill">Eating: <strong>{food.item.icon} {food.item.name}</strong></span>
      </div>

      <div className="snake-board">
        {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, idx) => {
          const x = idx % GRID_SIZE;
          const y = Math.floor(idx / GRID_SIZE);
          const isHead = snake[0].x === x && snake[0].y === y;
          const isBody = snake.slice(1).some(s => s.x === x && s.y === y);
          const isFood = food.x === x && food.y === y;

          return (
            <div
              key={idx}
              className={`grid-cell ${isHead ? 'snake-head' : ''} ${isBody ? 'snake-body' : ''} ${isFood ? 'snake-food' : ''}`}
            >
              {isFood && <span className="food-icon">{food.item.icon}</span>}
              {isHead && <span className="head-eye" />}
            </div>
          );
        })}

        {!isPlaying && (
          <div className="game-overlay">
            {gameOver ? (
              <div className="overlay-content">
                <span className="game-over-title">GAME OVER</span>
                <p>You scored <strong>{score} pts</strong>!</p>
                <button className="play-btn" onClick={startGame}>Play Again ↺</button>
              </div>
            ) : (
              <div className="overlay-content">
                <span className="game-hero-icon">🕹️</span>
                <h3>Cyber Snake: Tech Eater</h3>
                <p>Use Arrow keys / WASD to collect tech stacks</p>
                <button className="play-btn" onClick={startGame}>Start Game ▶</button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Touch D-Pad for Mobile */}
      <div className="mobile-dpad">
        <button onClick={() => { if (dirRef.current.y === 0) setDir({ x: 0, y: -1 }); }}>▲</button>
        <div className="dpad-row">
          <button onClick={() => { if (dirRef.current.x === 0) setDir({ x: -1, y: 0 }); }}>◀</button>
          <button onClick={() => { if (dirRef.current.x === 0) setDir({ x: 1, y: 0 }); }}>▶</button>
        </div>
        <button onClick={() => { if (dirRef.current.y === 0) setDir({ x: 0, y: 1 }); }}>▼</button>
      </div>
    </div>
  );
}

/* ========================================================
   2. SPEED CODE TYPER CHALLENGE
   ======================================================== */
function CodeTyper({ playSound }) {
  const [snippetIdx, setSnippetIdx] = useState(0);
  const [inputVal, setInputVal] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [completed, setCompleted] = useState(false);
  const inputRef = useRef(null);

  const target = CODE_SNIPPETS[snippetIdx];

  const handleInput = (e) => {
    const val = e.target.value;
    if (!startTime) setStartTime(Date.now());
    setInputVal(val);

    // Accuracy
    let correctChars = 0;
    for (let i = 0; i < val.length; i++) {
      if (val[i] === target[i]) correctChars++;
    }
    const acc = val.length > 0 ? Math.round((correctChars / val.length) * 100) : 100;
    setAccuracy(acc);

    // WPM
    const timeElapsedMins = (Date.now() - (startTime || Date.now())) / 60000;
    if (timeElapsedMins > 0.01) {
      const words = val.length / 5;
      setWpm(Math.round(words / timeElapsedMins));
    }

    if (val === target) {
      setCompleted(true);
      playSound?.();
    }
  };

  const nextSnippet = () => {
    playSound?.();
    setSnippetIdx((prev) => (prev + 1) % CODE_SNIPPETS.length);
    setInputVal('');
    setStartTime(null);
    setWpm(0);
    setAccuracy(100);
    setCompleted(false);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  return (
    <div className="typer-container">
      <div className="game-stats-bar">
        <span className="stat-pill">Speed: <strong>{wpm} WPM</strong></span>
        <span className="stat-pill highlight">Accuracy: <strong>{accuracy}%</strong></span>
        <button className="stat-pill refresh-btn" onClick={nextSnippet}>Next Snippet ➔</button>
      </div>

      <div className="typer-display">
        {target.split('').map((char, i) => {
          let stateClass = '';
          if (i < inputVal.length) {
            stateClass = inputVal[i] === char ? 'char-correct' : 'char-wrong';
          } else if (i === inputVal.length) {
            stateClass = 'char-current';
          }
          return (
            <span key={i} className={`typer-char ${stateClass}`}>
              {char}
            </span>
          );
        })}
      </div>

      <input
        ref={inputRef}
        type="text"
        className="typer-input"
        placeholder="Start typing code here to test speed..."
        value={inputVal}
        onChange={handleInput}
        disabled={completed}
        autoFocus
      />

      {completed && (
        <div className="typer-success">
          <span>🚀 Challenge Complete! <strong>{wpm} WPM</strong> with <strong>{accuracy}%</strong> accuracy.</span>
          <button className="play-btn sm" onClick={nextSnippet}>Try Next Code Snippet</button>
        </div>
      )}
    </div>
  );
}

/* ========================================================
   3. NEURAL SYNAPSE CANVAS
   ======================================================== */
function NeuralCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    const width = (canvas.width = canvas.offsetWidth);
    const height = (canvas.height = canvas.offsetHeight);

    const particles = Array.from({ length: 38 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 1.2,
      vy: (Math.random() - 0.5) * 1.2,
      radius: 2 + Math.random() * 2.5,
      color: Math.random() > 0.5 ? '#00f260' : '#34d399',
    }));

    let mouse = { x: -1000, y: -1000 };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleClick = (e) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      // Burst spawn 6 new synapses
      for (let i = 0; i < 6; i++) {
        particles.push({
          x: clickX,
          y: clickY,
          vx: (Math.random() - 0.5) * 4,
          vy: (Math.random() - 0.5) * 4,
          radius: 2.5 + Math.random() * 2,
          color: '#fa6400',
        });
      }
      if (particles.length > 50) particles.splice(0, 6);
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('click', handleClick);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Connect lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 80) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0, 242, 96, ${0.4 * (1 - dist / 80)})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }

        // Connect to mouse
        const mdx = particles[i].x - mouse.x;
        const mdy = particles[i].y - mouse.y;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mdist < 100) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(250, 100, 0, ${0.6 * (1 - mdist / 100)})`;
          ctx.lineWidth = 1.2;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }

        // Update particle
        particles[i].x += particles[i].vx;
        particles[i].y += particles[i].vy;

        if (particles[i].x < 0 || particles[i].x > width) particles[i].vx *= -1;
        if (particles[i].y < 0 || particles[i].y > height) particles[i].vy *= -1;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particles[i].x, particles[i].y, particles[i].radius, 0, Math.PI * 2);
        ctx.fillStyle = particles[i].color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = particles[i].color;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <div className="synapse-container">
      <div className="synapse-instructions">
        <span>✨ Move cursor to connect neural synapses · <strong>Click to burst energy</strong></span>
      </div>
      <canvas ref={canvasRef} className="synapse-canvas" />
    </div>
  );
}

/* ========================================================
   4. BANKIM OS TERMINAL CLI
   ======================================================== */
function ArcadeTerminal({ playSound }) {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState([
    { type: 'system', text: "BankimOS [Version 2.5.0-AI]\nType 'help' or click any preset command to explore." }
  ]);
  const endRef = useRef(null);
  const availableCommands = ['help', 'projects', 'skills', 'certs', 'exp', 'contact', 'github', 'clear'];

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const executeCommand = (rawCmd) => {
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    playSound?.();

    if (cmd === 'clear') {
      setHistory([]);
      setInputVal('');
      return;
    }

    const output = TERMINAL_COMMANDS[cmd];

    if (output) {
      setHistory((prev) => [
        ...prev,
        { type: 'user', text: `$ ${rawCmd}` },
        { type: 'response', text: output }
      ]);
    } else {
      setHistory((prev) => [
        ...prev,
        { type: 'user', text: `$ ${rawCmd}` },
        { type: 'error', text: `Command '${rawCmd}' not found. Type 'help' to see valid commands.` }
      ]);
    }

    setInputVal('');
  };

  return (
    <div className="arcade-terminal-wrap">
      <div className="terminal-quick-row">
        <span className="quick-label">Presets:</span>
        {availableCommands.map((c) => (
          <button
            key={c}
            className="terminal-chip-btn"
            onClick={() => executeCommand(c)}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="arcade-terminal-screen">
        {history.map((item, idx) => (
          <div key={idx} className={`terminal-line ${item.type}`}>
            <pre>{item.text}</pre>
          </div>
        ))}
        <div ref={endRef} />
      </div>

      <div className="arcade-terminal-input-row">
        <span className="terminal-prompt">&gt;</span>
        <input
          type="text"
          className="arcade-terminal-input"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') executeCommand(inputVal); }}
          placeholder="Type 'help', 'projects', 'skills', 'certs'..."
          autoComplete="off"
          spellCheck="false"
        />
        <button
          className="arcade-terminal-enter-btn"
          onClick={() => executeCommand(inputVal)}
        >
          Run ↵
        </button>
      </div>
    </div>
  );
}

