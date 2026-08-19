import React, { useState, useRef, useEffect } from 'react';
import { TERMINAL_COMMANDS } from '../data/portfolioData';
import { playSound } from '../utils/soundFX';

export default function InteractiveTerminal() {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState([
    { type: 'system', text: "BankimOS [Version 2.5.0-AI]\nType 'help' or click any command below to explore." }
  ]);
  const terminalEndRef = useRef(null);

  const availableCommands = ['help', 'projects', 'skills', 'certs', 'contact', 'about', 'clear'];

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const executeCommand = (rawCmd) => {
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    playSound('click');

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

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      executeCommand(inputVal);
    }
  };

  return (
    <section className="section-container" id="terminal">
      <div className="section-header">
        <div className="section-badge terminal-badge">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="4 17 10 11 4 5"></polyline>
            <line x1="12" y1="19" x2="20" y2="19"></line>
          </svg>
          <span>Developer Console</span>
        </div>
        <h2 className="section-title">Interactive Terminal CLI</h2>
        <p className="section-subtitle">
          Geek out with BankimOS — run commands or query projects and contact coordinates from the terminal.
        </p>
      </div>

      <div className="bento-card terminal-card">
        {/* Terminal Header Bar */}
        <div className="terminal-topbar">
          <div className="terminal-dots">
            <span className="dot red"></span>
            <span className="dot yellow"></span>
            <span className="dot green"></span>
          </div>
          <span className="terminal-title">bankim@portfolio: ~ (zsh)</span>
          <button
            className="terminal-clear-action"
            onClick={() => {
              playSound('click');
              setHistory([]);
            }}
            title="Clear Console"
          >
            Clear
          </button>
        </div>

        {/* Quick Command Pills */}
        <div className="terminal-quick-cmds">
          <span className="quick-label">Presets:</span>
          {availableCommands.map((cmd) => (
            <button
              key={cmd}
              className="quick-cmd-btn"
              onClick={() => executeCommand(cmd)}
              onMouseEnter={() => playSound('hover')}
            >
              {cmd}
            </button>
          ))}
        </div>

        {/* Terminal Output Area */}
        <div className="terminal-screen">
          {history.map((item, idx) => (
            <div key={idx} className={`terminal-line ${item.type}`}>
              <pre>{item.text}</pre>
            </div>
          ))}
          <div ref={terminalEndRef} />
        </div>

        {/* Terminal Input Row */}
        <div className="terminal-input-row">
          <span className="terminal-prompt">&gt;</span>
          <input
            type="text"
            className="terminal-input-field"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type 'help', 'projects', 'skills'..."
            autoComplete="off"
            spellCheck="false"
          />
          <button
            className="terminal-run-btn"
            onClick={() => executeCommand(inputVal)}
            aria-label="Run command"
          >
            Run
          </button>
        </div>
      </div>
    </section>
  );
}
