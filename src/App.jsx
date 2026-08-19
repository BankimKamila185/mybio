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
  { name: 'React', icon: '⚛️', color: '#61dafb' },
  { name: 'TypeScript', icon: '🔷', color: '#3178c6' },
  { name: 'Node.js', icon: '🟢', color: '#68a063' },
  { name: 'Python', icon: '🐍', color: '#3776ab' },
  { name: 'FastAPI', icon: '⚡', color: '#009688' },
  { name: 'MongoDB', icon: '🍃', color: '#47a248' },
  { name: 'Tailwind CSS', icon: '🎨', color: '#38bdf8' },
  { name: 'Vite', icon: '⚡', color: '#bd34fe' },
  { name: 'Figma', icon: '📐', color: '#a259ff' },
  { name: 'Postman', icon: '🚀', color: '#ff6c37' },
  { name: 'WebSockets', icon: '🔌', color: '#f59e0b' },
  { name: 'Git & GitHub', icon: '🐙', color: '#ffffff' },
];

const PROJECTS = [
  {
    title: 'Reactify',
    subtitle: 'Live Polling Engine',
    desc: 'Real-time anonymous voting with WebSockets & live animated charts.',
    longDesc: 'Engineered high-concurrency anonymous voting rooms with zero-latency WebSocket broadcasting, animated live tally charts, and clean responsive UI.',
    tags: ['React', 'Node.js', 'Socket.io', 'MongoDB', 'Vite'],
    link: 'https://reactify-pink.vercel.app',
    github: 'https://github.com/BankimKamila185/Reactify',
    live: true,
    accent: '#f25b2a',
    category: 'Full-Stack Web'
  },
  {
    title: 'PayIt',
    subtitle: 'Billing & Invoice Platform',
    desc: 'Automated payment calculations, invoice rendering, and historical ledger.',
    longDesc: 'Comprehensive invoicing engine powered by Python REST backend, supporting automated tax calculation, PDF invoice rendering, and historical ledger management.',
    tags: ['Python', 'FastAPI', 'React', 'Tailwind', 'PostgreSQL'],
    link: 'https://payit-mu.vercel.app',
    github: 'https://github.com/BankimKamila185/payit-',
    live: true,
    accent: '#c6ff00',
    category: 'Fintech Tool'
  },
  {
    title: 'Pixora',
    subtitle: 'AI Image Studio',
    desc: 'Extract dominant color palettes via K-Means clustering and apply neural filters.',
    longDesc: 'Computer vision platform using K-Means clustering to extract dominant HEX/RGB palettes from user uploads, with real-time neural filter processing.',
    tags: ['Python', 'Computer Vision', 'React', 'Canvas API'],
    link: 'https://pixora-lake.vercel.app',
    github: 'https://github.com/BankimKamila185/pixora',
    live: true,
    accent: '#ec4899',
    category: 'AI / Image Processing'
  },
  {
    title: 'WastCraft',
    subtitle: 'Eco Scrap Marketplace',
    desc: 'Circular economy platform connecting households with localized recyclers.',
    longDesc: 'Eco-commerce network designed to streamline recyclable scrap categorization, pricing estimation, and localized collection logistics.',
    tags: ['React', 'JavaScript', 'Tailwind', 'Vercel'],
    link: 'https://wastcraft.vercel.app',
    github: 'https://github.com/BankimKamila185/wastcraft',
    live: true,
    accent: '#22c55e',
    category: 'Marketplace'
  },
  {
    title: 'Brand Studio',
    subtitle: 'Design System Showcase',
    desc: 'Fluid typography scales, CSS token architecture, and micro-interactions.',
    longDesc: 'High-performance interactive design showcase implementing dynamic fluid typography scales, CSS token architectures, and micro-animations.',
    tags: ['React', 'Vite', 'CSS Architecture', 'UI/UX'],
    link: 'https://brand-two-mocha.vercel.app',
    github: 'https://github.com/BankimKamila185/brand',
    live: true,
    accent: '#a855f7',
    category: 'Design System'
  },
];

const EXPERIENCE = [
  {
    role: 'Chief Technology Officer',
    company: 'The Outliers Studio',
    location: 'Mumbai · Hybrid',
    period: 'Jul 2026 — Present',
    type: 'Full-time · Executive',
    current: true,
    desc: 'Directing technical strategy, product architecture, infrastructure scaling, and leading the core engineering team.',
    skills: ['Executive Leadership', 'Product Architecture', 'Full-Stack Scalability', 'AI Systems'],
  },
  {
    role: 'Chief Operating Officer',
    company: 'The Outliers Studio',
    location: 'Mumbai · Hybrid',
    period: 'Jul 2026 — Present',
    type: 'Full-time · Executive',
    current: true,
    desc: 'Managing business operations, delivery timelines, cross-functional synergy, and strategic growth partnerships.',
    skills: ['Operations Strategy', 'Team Management', 'Business Growth'],
  },
  {
    role: 'Sales Intern',
    company: 'Kwento',
    location: 'Mumbai · Remote',
    period: 'Jun 2025 — Sep 2025',
    type: 'Internship',
    current: false,
    desc: 'Customer discovery pipelines, lifecycle analytics, and client communication workflows.',
    skills: ['Client Relations', 'Analytics'],
  },
  {
    role: 'Back End Developer',
    company: 'DESI DESTINY',
    location: 'Maharashtra · Hybrid',
    period: 'Jun 2025 — Sep 2025',
    type: 'Internship',
    current: false,
    desc: 'Built RESTful microservices, normalized relational database schemas, and implemented API test suites.',
    skills: ['Node.js', 'REST APIs', 'Database Architecture'],
  },
];

const EDUCATION = [
  {
    institution: 'ITM Skills University',
    degree: 'B.Tech · Artificial Intelligence & Machine Learning',
    period: '2024 — 2028',
    current: true,
  },
  {
    institution: 'Swami Vivekanand International School',
    degree: '12th Grade · Computer Science',
    period: '2022 — 2024',
    current: false,
  },
];

// ========================
// SOUND UTILITY
// ========================
function playPopSound() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.setValueAtTime(600, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1000, ctx.currentTime + 0.05);
    gain.gain.setValueAtTime(0.04, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
    osc.type = 'sine';
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.08);
    setTimeout(() => ctx.close(), 120);
  } catch { /* ignore */ }
}

export default function App() {
  const [theme, setTheme] = useState('dark');
  const [isCmdOpen, setIsCmdOpen] = useState(false);
  const [activeModalProject, setActiveModalProject] = useState(null);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const homeRef = useRef(null);
  const projectsRef = useRef(null);
  const stackRef = useRef(null);
  const experienceRef = useRef(null);
  const arcadeRef = useRef(null);
  const contactRef = useRef(null);

  const toggleTheme = useCallback(() => {
    setTheme(prev => {
      const next = prev === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      return next;
    });
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText('bankimkamila185@gmail.com');
    playPopSound();
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  // Scroll reveal observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll('.sawad-reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleGlobalKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        playPopSound();
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
    if (destination === 'projects') projectsRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (destination === 'role' || destination === 'experience') experienceRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="sawad-app">
      {/* ⌘K Spotlight Command Palette */}
      <CommandPalette
        isOpen={isCmdOpen}
        onClose={() => setIsCmdOpen(false)}
        onNavigate={handleCmdNavigate}
        onToggleTheme={toggleTheme}
        playSound={playPopSound}
      />

      {/* Project Case Study Deep-Dive Modal */}
      <ProjectModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
        playSound={playPopSound}
      />

      {/* ══════════════════════════════════════════
          TOP FLOATING DOCK NAVBAR (SAWAD STYLE)
         ══════════════════════════════════════════ */}
      <header className="sawad-nav-wrapper">
        <nav className="sawad-floating-dock">
          <button
            className="dock-item"
            onClick={() => { playPopSound(); homeRef.current?.scrollIntoView({ behavior: 'smooth' }); }}
            title="Home"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
          </button>
          <button
            className="dock-item"
            onClick={() => { playPopSound(); projectsRef.current?.scrollIntoView({ behavior: 'smooth' }); }}
            title="Projects & Work"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
          </button>
          <button
            className="dock-item"
            onClick={() => { playPopSound(); experienceRef.current?.scrollIntoView({ behavior: 'smooth' }); }}
            title="Experience & Leadership"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
          </button>
          <button
            className="dock-item"
            onClick={() => { playPopSound(); stackRef.current?.scrollIntoView({ behavior: 'smooth' }); }}
            title="Tech Stack"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
          </button>
          <button
            className="dock-item"
            onClick={() => { playPopSound(); arcadeRef.current?.scrollIntoView({ behavior: 'smooth' }); }}
            title="Dev Arcade"
          >
            <span style={{ fontSize: '1.1rem' }}>🕹️</span>
          </button>
          <button
            className="dock-item"
            onClick={() => { playPopSound(); contactRef.current?.scrollIntoView({ behavior: 'smooth' }); }}
            title="Contact"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
          </button>
          <div className="dock-separator" />
          <button
            className="dock-item cmd-pill-btn"
            onClick={() => { playPopSound(); setIsCmdOpen(true); }}
            title="Search (⌘K)"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <span className="dock-kbd">⌘K</span>
          </button>
          <button
            className="dock-item"
            onClick={() => { playPopSound(); toggleTheme(); }}
            title="Toggle theme"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </nav>
      </header>

      <main className="sawad-container">

        {/* ══════════════════════════════════════════
            HERO SECTION (SAWAD 2-COLUMN SPLIT)
           ══════════════════════════════════════════ */}
        <section ref={homeRef} className="sawad-hero sawad-reveal">
          
          {/* LEFT: THE SIGNATURE SAWAD WHITE CARD */}
          <div className="sawad-profile-card">
            {/* Top decorative dashed curve */}
            <svg className="sawad-curve-top" viewBox="0 0 140 70" fill="none">
              <path d="M10,60 Q70,5 130,20" stroke="#f25b2a" strokeWidth="2.5" strokeDasharray="5 5" />
            </svg>

            {/* Profile Avatar Box with Orange Backdrop */}
            <div className="sawad-avatar-box">
              <img
                src="/profile.png"
                alt="Bankim Chandra Kamila"
                className="sawad-avatar-img"
                onError={(e) => { e.target.onerror = null; e.target.src = "https://avatars.githubusercontent.com/u/174135567?v=4"; }}
              />
            </div>

            {/* Name & Title */}
            <h2 className="sawad-profile-name">Bankim Chandra Kamila</h2>

            {/* Middle Fire Badge on Curve */}
            <div className="sawad-fire-badge-wrap">
              <svg className="sawad-curve-mid" viewBox="0 0 140 40" fill="none">
                <path d="M10,20 Q70,40 130,10" stroke="#f25b2a" strokeWidth="2" strokeDasharray="4 4" />
              </svg>
              <div className="sawad-fire-circle">
                <span>🔥</span>
              </div>
            </div>

            {/* Bio Blurb */}
            <p className="sawad-profile-bio">
              CTO & COO who has architected and shipped scalable AI & full-stack software products.
            </p>

            {/* Social Icons Row */}
            <div className="sawad-social-row">
              <a href="https://github.com/BankimKamila185" target="_blank" rel="noopener noreferrer" className="sawad-social-icon" title="GitHub">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/></svg>
              </a>
              <a href="https://www.linkedin.com/in/bankim-chandra-kamila-b07b59236/" target="_blank" rel="noopener noreferrer" className="sawad-social-icon" title="LinkedIn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.45 1.45 0 1 0 0-2.9 1.45 1.45 0 0 0 0 2.9m1.39 9.74v-8.37H5.07v8.37h2.78z"/></svg>
              </a>
              <a href="https://www.instagram.com/bankimkamila.23/" target="_blank" rel="noopener noreferrer" className="sawad-social-icon" title="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              <a href="https://wa.me/919324634516" target="_blank" rel="noopener noreferrer" className="sawad-social-icon" title="WhatsApp">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>
              </a>
            </div>
          </div>

          {/* RIGHT: EDITORIAL BIG TYPOGRAPHY & STATS */}
          <div className="sawad-hero-right">
            <div className="sawad-hero-titles">
              <h1 className="sawad-title-solid">SOFTWARE</h1>
              <h1 className="sawad-title-muted">ENGINEER</h1>
              <h2 className="sawad-title-sub">& CTO @ THE OUTLIERS STUDIO</h2>
            </div>

            <p className="sawad-hero-desc">
              Passionate about architecting intuitive, high-performance systems and leading digital product innovation. Specialize in transforming ambitious ideas into production-ready software.
            </p>

            {/* Stats Row (Exact Sawad Format) */}
            <div className="sawad-stats-row">
              <div className="sawad-stat-box">
                <span className="stat-number">+2</span>
                <span className="stat-label">EXECUTIVE ROLES (CTO & COO)</span>
              </div>
              <div className="sawad-stat-box">
                <span className="stat-number">+10</span>
                <span className="stat-label">PROJECTS COMPLETED</span>
              </div>
              <div className="sawad-stat-box">
                <span className="stat-number">+55</span>
                <span className="stat-label">GITHUB REPOSITORIES</span>
              </div>
            </div>

            {/* Live Status Widget embedded */}
            <div className="sawad-status-embed">
              <LiveStatusWidget />
            </div>
          </div>

        </section>

        {/* ══════════════════════════════════════════
            HIGHLIGHT CARDS (ORANGE & LIME BANNER CARDS)
           ══════════════════════════════════════════ */}
        <section className="sawad-banner-grid sawad-reveal">
          {/* Orange Feature Banner */}
          <div className="sawad-banner-card orange-card">
            <div className="banner-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
            </div>
            <h3 className="banner-title">DYNAMIC FULL-STACK & SYSTEM ARCHITECTURE</h3>
            <p className="banner-desc">React, Node.js, WebSockets, Python REST microservices, scalable databases, and zero-downtime deployments.</p>
          </div>

          {/* Lime Neon Feature Banner */}
          <div className="sawad-banner-card lime-card">
            <div className="banner-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>
            </div>
            <h3 className="banner-title">AI & MACHINE LEARNING / COMPUTER VISION</h3>
            <p className="banner-desc">K-Means clustering, Neural Filter Processing, FastAPI integration, Model evaluation, and ITM Skills University AI/ML research.</p>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            PROJECTS & CASE STUDIES SECTION
           ══════════════════════════════════════════ */}
        <section ref={projectsRef} className="sawad-section sawad-reveal">
          <div className="section-header-row">
            <div>
              <span className="section-tag">SELECTED WORK</span>
              <h2 className="section-title">Featured Projects</h2>
            </div>
            <a href="https://github.com/BankimKamila185" target="_blank" rel="noopener noreferrer" className="sawad-view-all-btn">
              Explore all repos ↗
            </a>
          </div>

          <div className="sawad-projects-grid">
            {PROJECTS.map((proj, i) => (
              <div
                key={proj.title}
                className="sawad-project-card"
                onClick={() => { playPopSound(); setActiveModalProject(proj); }}
                style={{ '--proj-accent': proj.accent }}
              >
                <div className="proj-card-top">
                  <span className="proj-tag-pill">{proj.category}</span>
                  <span className="proj-arrow-circle">↗</span>
                </div>

                <div className="proj-card-content">
                  <h3 className="proj-main-title">{proj.title}</h3>
                  <span className="proj-subtitle-text">{proj.subtitle}</span>
                  <p className="proj-card-desc">{proj.desc}</p>
                </div>

                <div className="proj-tags-footer">
                  {proj.tags.slice(0, 4).map(t => (
                    <span key={t} className="proj-mini-tag">{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════════
            DEV ARCADE & INTERACTIVE SANDBOX
           ══════════════════════════════════════════ */}
        <section ref={arcadeRef} className="sawad-section sawad-reveal">
          <div className="section-header-row">
            <div>
              <span className="section-tag">INTERACTIVE EXPERIENCE</span>
              <h2 className="section-title">Dev Arcade & AI Sandbox</h2>
            </div>
            <span className="arcade-live-indicator">● Playable in Browser</span>
          </div>

          <div className="sawad-arcade-card">
            <InteractiveArcade playSound={playPopSound} />
          </div>
        </section>

        {/* ══════════════════════════════════════════
            TECH STACK MATRIX
           ══════════════════════════════════════════ */}
        <section ref={stackRef} className="sawad-section sawad-reveal">
          <div className="section-header-row">
            <div>
              <span className="section-tag">ENGINEERING TOOLBOX</span>
              <h2 className="section-title">Technologies & Stacks</h2>
            </div>
          </div>

          <div className="sawad-stack-grid">
            {TECH_STACK.map(tech => (
              <div key={tech.name} className="sawad-stack-item">
                <span className="stack-icon">{tech.icon}</span>
                <span className="stack-name">{tech.name}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════════
            EXPERIENCE & LEADERSHIP TIMELINE
           ══════════════════════════════════════════ */}
        <section ref={experienceRef} className="sawad-section sawad-reveal">
          <div className="section-header-row">
            <div>
              <span className="section-tag">TRACK RECORD</span>
              <h2 className="section-title">Experience & Education</h2>
            </div>
          </div>

          <div className="sawad-timeline-grid">
            {/* Experience Column */}
            <div className="sawad-timeline-col">
              <h3 className="timeline-col-title">💼 Leadership & Work Experience</h3>
              <div className="timeline-items-wrap">
                {EXPERIENCE.map((exp, idx) => (
                  <div key={idx} className={`sawad-tl-card ${exp.current ? 'current-active' : ''}`}>
                    <div className="tl-card-header">
                      <span className="tl-period-badge">{exp.period}</span>
                      {exp.current && <span className="tl-now-badge">Current</span>}
                    </div>
                    <h4 className="tl-role-title">{exp.role}</h4>
                    <p className="tl-company-info">{exp.company} · {exp.location}</p>
                    <p className="tl-desc-text">{exp.desc}</p>
                    <div className="tl-chips-row">
                      {exp.skills.map(s => <span key={s} className="tl-skill-chip">{s}</span>)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Education & Certs Column */}
            <div className="sawad-timeline-col">
              <h3 className="timeline-col-title">🎓 Education & Certifications</h3>
              <div className="timeline-items-wrap">
                {EDUCATION.map((edu, idx) => (
                  <div key={idx} className="sawad-tl-card">
                    <div className="tl-card-header">
                      <span className="tl-period-badge">{edu.period}</span>
                      {edu.current && <span className="tl-now-badge">Ongoing</span>}
                    </div>
                    <h4 className="tl-role-title">{edu.degree}</h4>
                    <p className="tl-company-info">{edu.institution}</p>
                  </div>
                ))}

                <div className="sawad-certs-card">
                  <h4 className="certs-heading">Professional Credentials</h4>
                  <div className="certs-chips-list">
                    {CERTIFICATIONS.map((c, i) => (
                      <div key={i} className="cert-mini-row">
                        <div>
                          <strong>{c.title}</strong>
                          <div className="cert-meta">{c.issuer} · {c.date}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            CONTACT & CALL TO ACTION
           ══════════════════════════════════════════ */}
        <section ref={contactRef} className="sawad-contact-section sawad-reveal">
          <div className="sawad-contact-card">
            <span className="contact-kicker">LET'S BUILD SOMETHING GREAT</span>
            <h2 className="contact-heading">Have a project or leadership opportunity in mind?</h2>
            <p className="contact-sub">I'm always open to discussing new technology ventures, AI products, and engineering leadership.</p>

            <div className="contact-actions-row">
              <button className="sawad-btn-primary" onClick={copyEmail}>
                {copiedEmail ? 'Email Copied to Clipboard ✓' : 'Copy Email: bankimkamila185@gmail.com'}
              </button>
              <a href="https://wa.me/919324634516" target="_blank" rel="noopener noreferrer" className="sawad-btn-secondary">
                WhatsApp Direct ↗
              </a>
              <a href="https://www.linkedin.com/in/bankim-chandra-kamila-b07b59236/" target="_blank" rel="noopener noreferrer" className="sawad-btn-secondary">
                LinkedIn ↗
              </a>
            </div>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="sawad-footer">
        <p>© {new Date().getFullYear()} Bankim Chandra Kamila · Crafted with Framer-grade aesthetics · Press <kbd className="footer-kbd">⌘K</kbd> for Search</p>
      </footer>
    </div>
  );
}
