import React, { useState, useEffect, useRef, useCallback } from 'react';
import './App.css';
import InteractiveArcade from './components/InteractiveArcade';
import LiveStatusWidget from './components/LiveStatusWidget';
import CommandPalette from './components/CommandPalette';
import ProjectModal from './components/ProjectModal';

// ========================
// DATA
// ========================
const CERTIFICATIONS = [
  { title: 'Postman API Fundamentals Student Expert', issuer: 'Postman', date: 'Jul 2024' },
  { title: 'GenAI 101 with Pieces', issuer: 'Pieces', date: 'Dec 2024' },
  { title: 'Google IT Support Professional', issuer: 'Google / Coursera', date: 'Mar 2023' },
  { title: 'Fundamentals of Digital Marketing', issuer: 'Google', date: 'Apr 2022' },
];

const TECH_STACK = [
  { name: 'React', className: 'react' },
  { name: 'TypeScript', className: 'ts' },
  { name: 'Node.js', className: 'node' },
  { name: 'Python', className: 'python' },
  { name: 'MongoDB', className: 'mongo' },
  { name: 'Express', className: 'express' },
  { name: 'FastAPI', className: 'fastapi' },
  { name: 'Tailwind', className: 'tailwind' },
  { name: 'Vite', className: 'vite' },
  { name: 'Figma', className: 'figma' },
  { name: 'Postman', className: 'postman' },
  { name: 'GitHub', className: 'github' },
];

const PROJECTS = [
  {
    title: 'Reactify',
    desc: 'Real-time anonymous polling with WebSockets & live charts.',
    longDesc: 'Engineered high-concurrency anonymous voting rooms with zero-latency WebSocket broadcasting, animated live tally charts, and clean responsive glassmorphism UI.',
    tags: ['React', 'Node.js', 'Socket.io', 'MongoDB', 'Vite'],
    link: 'https://reactify-pink.vercel.app',
    github: 'https://github.com/BankimKamila185/Reactify',
    live: true,
    category: 'Full-Stack Web'
  },
  {
    title: 'PayIt',
    desc: 'Automated billing, invoicing & payment tracking platform.',
    longDesc: 'Comprehensive invoicing engine powered by Python REST backend, supporting automated tax calculation, PDF invoice rendering, and historical ledger management.',
    tags: ['Python', 'FastAPI', 'React', 'Tailwind', 'PostgreSQL'],
    link: 'https://payit-mu.vercel.app',
    github: 'https://github.com/BankimKamila185/payit-',
    live: true,
    category: 'Fintech Tool'
  },
  {
    title: 'Pixora',
    desc: 'AI image studio — palette extraction & neural filters.',
    longDesc: 'Computer vision platform using K-Means clustering to extract dominant HEX/RGB palettes from user uploads, with real-time neural filter processing.',
    tags: ['Python', 'Computer Vision', 'React', 'Canvas API'],
    link: 'https://pixora-lake.vercel.app',
    github: 'https://github.com/BankimKamila185/pixora',
    live: true,
    category: 'AI / Image Processing'
  },
  {
    title: 'WastCraft',
    desc: 'Circular economy marketplace connecting recyclers & scrap sellers.',
    longDesc: 'Eco-commerce network designed to streamline recyclable scrap categorization, pricing estimation, and localized collection logistics.',
    tags: ['React', 'JavaScript', 'Tailwind', 'Vercel'],
    link: 'https://wastcraft.vercel.app',
    github: 'https://github.com/BankimKamila185/wastcraft',
    live: true,
    category: 'Marketplace'
  },
  {
    title: 'Brand Studio',
    desc: 'Fluid typography & design system showcase.',
    longDesc: 'High-performance interactive design showcase implementing dynamic fluid typography scales, CSS token architectures, and micro-animations.',
    tags: ['React', 'Vite', 'CSS Architecture', 'UI/UX'],
    link: 'https://brand-two-mocha.vercel.app',
    github: 'https://github.com/BankimKamila185/brand',
    live: true,
    category: 'Design System'
  },
];

const CURRENT_ROLES = [
  {
    role: 'Chief Technology Officer',
    company: 'The Outliers Studio',
    location: 'Mumbai · Hybrid',
    period: 'Jul 2026 — Present',
    desc: 'Leading technology vision, digital transformation, and product innovation across all tech products.',
    skills: ['Technology Management', 'IT Strategy', 'Product Development'],
  },
  {
    role: 'Chief Operating Officer',
    company: 'The Outliers Studio',
    location: 'Mumbai · Hybrid',
    period: 'Jul 2026 — Present',
    desc: 'Overseeing day-to-day operations, business strategy, and organizational growth.',
    skills: ['Team Leadership', 'Operations', 'Business Strategy'],
  },
];

// ========================
// TYPING HOOK
// ========================
function useTyping(text, speed = 55, delay = 600) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        if (i < text.length) {
          setDisplayed(text.slice(0, i + 1));
          i++;
        } else {
          setDone(true);
          clearInterval(interval);
        }
      }, speed);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timeout);
  }, [text, speed, delay]);

  return { displayed, done };
}

// ========================
// HOVER SOUND
// ========================
function playHoverSound() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.setValueAtTime(700, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1100, ctx.currentTime + 0.06);
    gain.gain.setValueAtTime(0.03, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
    osc.type = 'sine';
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.08);
    setTimeout(() => ctx.close(), 150);
  } catch { /* ignore */ }
}

// ========================
// PARTICLES
// ========================
const PARTICLE_DATA = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  left: `${(i * 4.2 + (i % 6) * 3) % 100}%`,
  size: `${1 + (i % 3) * 0.6}px`,
  duration: `${10 + (i % 7) * 3}s`,
  delay: `${(i * 0.5) % 8}s`,
  opacity: 0.1 + (i % 4) * 0.08,
}));

function Particles() {
  return (
    <div className="particles-container">
      {PARTICLE_DATA.map(p => (
        <div key={p.id} className="particle" style={{
          left: p.left, width: p.size, height: p.size,
          animationDuration: p.duration, animationDelay: p.delay, opacity: p.opacity,
        }} />
      ))}
    </div>
  );
}

// ========================
// MAIN APP
// ========================
function App() {
  const [theme, setTheme] = useState('dark');
  const [isCmdOpen, setIsCmdOpen] = useState(false);
  const [activeModalProject, setActiveModalProject] = useState(null);

  const cardsRef = useRef([]);
  const arcadeRef = useRef(null);
  const rolesRef = useRef(null);

  const headline = useTyping('Frontend Developer | UI/UX Designer.', 50, 600);
  const subHeadline = useTyping('AI & Multimedia Creation', 50, headline.done ? 200 : 9999999);

  const toggleTheme = useCallback(() => {
    setTheme(prev => {
      const next = prev === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      return next;
    });
  }, []);

  const handleMouseMove = useCallback((e) => {
    cardsRef.current.forEach(card => {
      if (!card) return;
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
      card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
    });
  }, []);

  const handleCardMouseMove = useCallback((e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const rotateX = ((e.clientY - rect.top - rect.height / 2) / (rect.height / 2)) * -5;
    const rotateY = ((e.clientX - rect.left - rect.width / 2) / (rect.width / 2)) * 5;
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.015)`;
  }, []);

  const handleCardMouseLeave = useCallback((e) => {
    e.currentTarget.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)';
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('active'); });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Global Keyboard Shortcuts (⌘K for Search, G for Arcade)
  useEffect(() => {
    const handleGlobalKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        playHoverSound();
        setIsCmdOpen(prev => !prev);
      } else if ((e.key === 'g' || e.key === 'G') && e.target.tagName !== 'INPUT') {
        arcadeRef.current?.scrollIntoView({ behavior: 'smooth' });
      }
    };
    window.addEventListener('keydown', handleGlobalKey);
    return () => window.removeEventListener('keydown', handleGlobalKey);
  }, []);

  const handleCmdNavigate = (destination) => {
    if (destination === 'arcade') arcadeRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (destination === 'role') rolesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const addCardRef = useCallback((el) => {
    if (el && !cardsRef.current.includes(el)) cardsRef.current.push(el);
  }, []);

  const cardProps = (extraClass = '') => ({
    ref: addCardRef,
    onMouseMove: handleCardMouseMove,
    onMouseLeave: handleCardMouseLeave,
    onMouseEnter: playHoverSound,
    className: `bento-card ${extraClass}`.trim(),
  });

  return (
    <div className="App" onMouseMove={handleMouseMove}>
      <Particles />

      {/* ⌘K Spotlight Command Palette */}
      <CommandPalette
        isOpen={isCmdOpen}
        onClose={() => setIsCmdOpen(false)}
        onNavigate={handleCmdNavigate}
        onToggleTheme={toggleTheme}
        playSound={playHoverSound}
      />

      {/* Project Case Study Deep-Dive Modal */}
      <ProjectModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
        playSound={playHoverSound}
      />

      {/* Floating Action Controls */}
      <div className="floating-top-bar">
        <button
          className="cmd-trigger-btn"
          onClick={() => { playHoverSound(); setIsCmdOpen(true); }}
          title="Search / Actions (Press ⌘K)"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <span>Search</span>
          <kbd className="cmd-kbd">⌘K</kbd>
        </button>

        <button
          className="arcade-jump-pill"
          onClick={() => { playHoverSound(); arcadeRef.current?.scrollIntoView({ behavior: 'smooth' }); }}
          title="Play Arcade Game (Press 'G')"
        >
          <span className="pulse-indicator" /> 🕹️ Dev Arcade
        </button>

        <button className="theme-toggle" onClick={toggleTheme} title="Toggle theme">
          {theme === 'dark' ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
          )}
        </button>
      </div>

      <div className="bento-portfolio">

        {/* ═══ LEFT COLUMN ═══ */}
        <div className="col-left">

          {/* Profile Card */}
          <div {...cardProps('profile-card-glass staggered-enter reveal')} style={{ '--stagger': 0 }}>
            <div className="morph-blob" />
            <img
              src="/profile.png"
              alt="Bankim Chandra Kamila"
              className="profile-bg-img"
              onError={(e) => { e.target.onerror = null; e.target.src = "https://avatars.githubusercontent.com/u/174135567?v=4"; }}
            />
            <div className="profile-fog-overlay" />

            {/* Floating script labels */}
            <span className="float-label float-label-1">software developer</span>
            <span className="float-label float-label-2">Entrepreneur</span>
            <span className="float-label float-label-3">CTO</span>

            <div className="profile-glass-content">
              <div className="profile-fog-header">
                <h1>Bankim Chandra Kamila</h1>
                <svg className="verified-icon" viewBox="0 0 24 24" fill="#00f260">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
              </div>
              <p className="profile-fog-desc">
                <span className={`typing-text ${headline.done ? 'done' : ''}`}>
                  {headline.displayed}
                </span>
                <br />
                {headline.done && (
                  <span className={`typing-text sub-typing ${subHeadline.done ? 'done' : ''}`}>
                    {subHeadline.displayed}
                  </span>
                )}
              </p>
            </div>
          </div>

          {/* Live Status & Timezone Widget */}
          <div {...cardProps('status-card glass-tier-1 staggered-enter reveal')} style={{ '--stagger': 0.8 }}>
            <LiveStatusWidget />
          </div>

          {/* Social Connect */}
          <div {...cardProps('social-connect-card glass-tier-2 staggered-enter reveal')} style={{ '--stagger': 1 }}>
            <h3 className="social-connect-title">Connect with me</h3>
            <div className="social-icons-row">
              <a href="https://wa.me/919324634516" target="_blank" rel="noopener noreferrer" className="social-icon-btn whatsapp-btn" title="WhatsApp">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>
              </a>
              <a href="mailto:bankimkamila185@gmail.com" target="_blank" rel="noopener noreferrer" className="social-icon-btn email-btn" title="Email">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              </a>
              <a href="https://www.instagram.com/bankimkamila.23/" target="_blank" rel="noopener noreferrer" className="social-icon-btn instagram-btn" title="Instagram">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              <a href="https://www.linkedin.com/in/bankim-chandra-kamila-b07b59236/" target="_blank" rel="noopener noreferrer" className="social-icon-btn linkedin-btn" title="LinkedIn">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.45 1.45 0 1 0 0-2.9 1.45 1.45 0 0 0 0 2.9m1.39 9.74v-8.37H5.07v8.37h2.78z"/></svg>
              </a>
              <a href="https://github.com/BankimKamila185" target="_blank" rel="noopener noreferrer" className="social-icon-btn github-btn" title="GitHub">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/></svg>
              </a>
            </div>
          </div>

          {/* Current Roles */}
          <div ref={rolesRef}>
            {CURRENT_ROLES.map((role, i) => (
              <div key={i} {...cardProps(`glass-tier-2 staggered-enter reveal`)} style={{ '--stagger': 2 + i }}>
                <div className="role-banner">
                  <span className="role-badge"><span className="pulse" /> Current Role</span>
                  <div className="role-title">{role.role}</div>
                  <div className="role-company">{role.company} · {role.location}</div>
                  <div className="role-desc">{role.desc}</div>
                  <div className="role-chips">
                    {role.skills.map(s => <span key={s} className="role-chip">{s}</span>)}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* ═══ RIGHT COLUMN ═══ */}
        <div className="col-right">

          {/* 🎮 Interactive Arcade Hub Card */}
          <div
            ref={arcadeRef}
            {...cardProps('arcade-card glass-tier-2 staggered-enter reveal')}
            style={{ '--stagger': 1.2 }}
          >
            <div className="card-header-row">
              <div className="header-icon arcade-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M6 12h4m-2-2v4"/><circle cx="15" cy="11" r="1"/><circle cx="18" cy="13" r="1"/></svg>
              </div>
              <div className="header-title">Dev Arcade & AI Sandbox</div>
              <span className="live-game-badge">Interactive</span>
            </div>
            <InteractiveArcade playSound={playHoverSound} />
          </div>

          {/* Spotify */}
          <div {...cardProps('spotify-card glass-tier-1 staggered-enter reveal')} style={{ '--stagger': 1.8 }}>
            <iframe
              style={{ borderRadius: '12px' }}
              src="https://open.spotify.com/embed/playlist/37i9dQZF1DX11HM36ncRBG?utm_source=generator&theme=0"
              width="100%"
              height="152"
              frameBorder="0"
              allowFullScreen=""
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            />
          </div>

          {/* Tech Stack */}
          <div {...cardProps('tech-stack-card glass-tier-1 staggered-enter reveal')} style={{ '--stagger': 2.2 }}>
            <div className="card-header-row">
              <div className="header-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
              </div>
              <div className="header-title">Tech Stack</div>
            </div>
            <div className="tech-tags-container">
              {TECH_STACK.map((tech, i) => (
                <span key={tech.name} className={`tech-tag ${tech.className}`} style={{ '--tag-delay': i }}>
                  {tech.name}
                </span>
              ))}
            </div>
          </div>

          {/* Shipped Projects with Case Study Modal Trigger */}
          <div {...cardProps('projects-card glass-tier-2 staggered-enter reveal')} style={{ '--stagger': 3 }}>
            <div className="card-header-row">
              <div className="header-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
              </div>
              <div className="header-title">Shipped Projects</div>
            </div>
            <div className="projects-grid">
              {PROJECTS.map((item, idx) => (
                <div
                  key={idx}
                  className="project-link-card"
                  onClick={() => { playHoverSound(); setActiveModalProject(item); }}
                  title="Click to view details"
                  style={{ cursor: 'pointer' }}
                >
                  <div className="project-info">
                    <h4>{item.live && <span className="live-dot" />}{item.title}</h4>
                    <p>{item.desc}</p>
                  </div>
                  <div className="project-action-icons">
                    <span className="proj-view-pill">Details ↗</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div {...cardProps('certs-card glass-tier-1 staggered-enter reveal')} style={{ '--stagger': 4 }}>
            <div className="card-header-row">
              <div className="header-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>
              </div>
              <div className="header-title">Certifications</div>
            </div>
            <div className="certs-carousel-wrapper">
              <div className="certs-carousel">
                {[...CERTIFICATIONS, ...CERTIFICATIONS].map((cert, i) => (
                  <div key={i} className="cert-badge">
                    <h5>{cert.title}</h5>
                    <p>{cert.date}</p>
                    <div className="cert-issuer">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                      <span>{cert.issuer}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Experience Timeline */}
          <div {...cardProps('timeline-card glass-tier-2 staggered-enter reveal')} style={{ '--stagger': 5 }}>
            <div className="card-header-row">
              <div className="header-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
              </div>
              <div className="header-title">Experience</div>
            </div>
            <div className="timeline">
              <div className="timeline-item">
                <div className="timeline-dot" />
                <div className="timeline-year">2026 <span className="tl-current">Now</span></div>
                <div className="timeline-desc">CTO & COO at The Outliers Studio<br /><em>Mumbai, Hybrid · Full-time</em></div>
              </div>
              <div className="timeline-item">
                <div className="timeline-dot" />
                <div className="timeline-year">2025</div>
                <div className="timeline-desc">Sales Intern at Kwento<br /><em>Mumbai, Remote · 4 months</em></div>
              </div>
              <div className="timeline-item">
                <div className="timeline-dot" />
                <div className="timeline-year">2025</div>
                <div className="timeline-desc">Back End Developer at DESI DESTINY<br /><em>Maharashtra, Hybrid · 4 months</em></div>
              </div>
            </div>
          </div>

          {/* Education Timeline */}
          <div {...cardProps('timeline-card glass-tier-1 staggered-enter reveal')} style={{ '--stagger': 6 }}>
            <div className="card-header-row">
              <div className="header-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
              </div>
              <div className="header-title">Education</div>
            </div>
            <div className="timeline">
              <div className="timeline-item">
                <div className="timeline-dot" />
                <div className="timeline-year">2024 <span className="tl-current">Current</span></div>
                <div className="timeline-desc">ITM Skills University<br /><em>BTech, AI & Machine Learning (2024–2028)</em></div>
              </div>
              <div className="timeline-item">
                <div className="timeline-dot" />
                <div className="timeline-year">2022</div>
                <div className="timeline-desc">Swami Vivekanand International School<br /><em>12th, Computer Science (2022–2024)</em></div>
              </div>
              <div className="timeline-item">
                <div className="timeline-dot" />
                <div className="timeline-year">2009</div>
                <div className="timeline-desc">St. Xavier's High School, Goregaon<br /><em>10th Grade, Computer Science (2009–2022)</em></div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <div className="footer-text">
        Built by Bankim Chandra Kamila · {new Date().getFullYear()} · Press <kbd className="footer-kbd">⌘K</kbd> for Search · <kbd className="footer-kbd">G</kbd> for Arcade
      </div>
    </div>
  );
}

export default App;
