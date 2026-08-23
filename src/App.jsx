import React, { useState, useEffect, useRef } from 'react';
import './App.css';

import GitHubRepoExplorer from './components/GitHubRepoExplorer';
import CommandPalette from './components/CommandPalette';
import ProjectModal from './components/ProjectModal';
import { FEATURED_PROJECTS, EXPERIENCE, EDUCATION, CERTIFICATIONS, PERSONAL_INFO } from './data/portfolioData';
import { TECH_STACK_ITEMS } from './data/techIcons';

// Web Audio synthesized sound effects (Playful Pops & Clicks)
function playPopSound(type = 'pop') {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === 'pop') {
      osc.frequency.setValueAtTime(650, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1100, ctx.currentTime + 0.05);
      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
      osc.type = 'sine';
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.08);
    } else if (type === 'tab') {
      osc.frequency.setValueAtTime(450, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.04);
      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);
      osc.type = 'triangle';
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.06);
    } else if (type === 'success') {
      osc.frequency.setValueAtTime(520, ctx.currentTime);
      osc.frequency.setValueAtTime(780, ctx.currentTime + 0.06);
      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.16);
      osc.type = 'sine';
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.16);
    }
    setTimeout(() => ctx.close(), 200);
  } catch { /* audio not supported */ }
}

export default function App() {
  const [isCmdOpen, setIsCmdOpen] = useState(false);
  const [activeModalProject, setActiveModalProject] = useState(null);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [selectedTechCategory, setSelectedTechCategory] = useState('All');
  const [activeNav, setActiveNav] = useState('home');

  // Section Refs
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const worksRef = useRef(null);
  const techRef = useRef(null);
  const reposRef = useRef(null);
  const experienceRef = useRef(null);
  const contactRef = useRef(null);

  // Global ⌘K keyboard shortcut
  useEffect(() => {
    const handleGlobalKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        playPopSound('pop');
        setIsCmdOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleGlobalKey);
    return () => window.removeEventListener('keydown', handleGlobalKey);
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    playPopSound('success');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2400);
  };

  const scrollTo = (ref, navId) => {
    playPopSound('tab');
    setActiveNav(navId);
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const techCategories = ['All', 'Frontend', 'Backend', 'Database', 'Architecture', 'Strategy'];

  const filteredTech = selectedTechCategory === 'All'
    ? TECH_STACK_ITEMS
    : TECH_STACK_ITEMS.filter(t => t.category.toLowerCase().includes(selectedTechCategory.toLowerCase()));

  // Card themes for Featured Works
  const cardThemes = ['ca-card-blue', 'ca-card-ink', 'ca-card-yellow', 'ca-card-magenta', 'ca-card-mint'];

  return (
    <div className="ca-app">
      {/* Background Dot/Square Matrix Canvas */}
      <div className="ca-canvas-bg" aria-hidden="true" />

      {/* ⌘K Command Palette Modal */}
      <CommandPalette
        isOpen={isCmdOpen}
        onClose={() => setIsCmdOpen(false)}
        onNavigate={(dest) => {
          if (dest === 'projects' || dest === 'works') scrollTo(worksRef, 'works');
          if (dest === 'about') scrollTo(aboutRef, 'about');
          if (dest === 'repos') scrollTo(reposRef, 'repos');
          if (dest === 'skills' || dest === 'tech') scrollTo(techRef, 'skills');
          if (dest === 'role' || dest === 'experience') scrollTo(experienceRef, 'exp');
          if (dest === 'contact') scrollTo(contactRef, 'contact');
        }}
        onToggleTheme={() => {}}
        playSound={() => playPopSound('pop')}
      />

      {/* Project Deep-Dive Modal */}
      <ProjectModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
        playSound={() => playPopSound('pop')}
      />

      {/* ══════════════════════════════════════════════
          STICKY SCRAPBOOK HEADER & NAVIGATION
         ══════════════════════════════════════════════ */}
      <header className="ca-header">
        <div className="ca-header-inner">
          {/* Brand Smiley Avatar */}
          <button
            className="ca-brand-badge"
            onClick={() => scrollTo(homeRef, 'home')}
            aria-label="Bankim Kamila — Home"
          >
            <svg viewBox="0 0 24 24" className="ca-smiley-logo" aria-hidden="true">
              <circle cx="12" cy="12" r="10" fill="var(--ca-magenta)" stroke="var(--ca-ink)" strokeWidth="2.2" />
              <circle cx="8.5" cy="10" r="1.4" fill="#ffffff" />
              <circle cx="15.5" cy="10" r="1.4" fill="#ffffff" />
              <path d="M8 14.5 Q12 18 16 14.5" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <span className="ca-brand-name">Bankim Kamila</span>
          </button>

          {/* Center Tabs Navigation */}
          <nav className="ca-nav-menu" aria-label="Main Navigation">
            <button
              className={`ca-nav-link ${activeNav === 'home' ? 'active' : ''}`}
              onClick={() => scrollTo(homeRef, 'home')}
            >
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.9 6.26 6.85.72-5.1 4.62 1.44 6.7L12 17.6l-6.09 3.7 1.44-6.7-5.1-4.62 6.85-.72z"/></svg>
              Home
            </button>
            <button
              className={`ca-nav-link ${activeNav === 'about' ? 'active' : ''}`}
              onClick={() => scrollTo(aboutRef, 'about')}
            >
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 3a3.6 3.6 0 100 7.2A3.6 3.6 0 0012 3zM4.8 20a7.2 7.2 0 0114.4 0z"/></svg>
              About
            </button>
            <button
              className={`ca-nav-link ${activeNav === 'works' ? 'active' : ''}`}
              onClick={() => scrollTo(worksRef, 'works')}
            >
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z"/></svg>
              Works
            </button>
            <button
              className={`ca-nav-link ${activeNav === 'skills' ? 'active' : ''}`}
              onClick={() => scrollTo(techRef, 'skills')}
            >
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l10 10-10 10L2 12z"/></svg>
              Skills
            </button>
            <button
              className={`ca-nav-link ${activeNav === 'repos' ? 'active' : ''}`}
              onClick={() => scrollTo(reposRef, 'repos')}
            >
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57v-2.235c-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
              Repos
            </button>
            <button
              className={`ca-nav-link ${activeNav === 'exp' ? 'active' : ''}`}
              onClick={() => scrollTo(experienceRef, 'exp')}
            >
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"/></svg>
              Career
            </button>
          </nav>

          {/* Right Action Items & Social Pills */}
          <div className="ca-header-actions">
            <button
              className="ca-cmd-btn"
              onClick={() => { playPopSound('pop'); setIsCmdOpen(true); }}
              title="Search Portfolio (⌘K)"
            >
              <span>⌘K</span>
            </button>

            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="ca-social-pill yellow"
              aria-label="LinkedIn Profile"
              onClick={() => playPopSound('pop')}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76c.94 0 1.7-.76 1.7-1.7s-.76-1.7-1.7-1.7-1.7.76-1.7 1.7.76 1.7 1.7 1.7m1.39 9.74v-8.37H5.07v8.37h2.78z"/></svg>
            </a>

            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="ca-social-pill pink"
              aria-label="GitHub Profile"
              onClick={() => playPopSound('pop')}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/></svg>
            </a>

            <button
              className="ca-contact-nav-btn"
              onClick={() => scrollTo(contactRef, 'contact')}
            >
              <svg width="14" height="14" viewBox="0 0 24 22" fill="currentColor"><path d="M12 21C5 16 1 12 1 7.5 1 4 3.6 1.5 6.8 1.5c2 0 3.9 1 5.2 2.6 1.3-1.6 3.2-2.6 5.2-2.6C20.4 1.5 23 4 23 7.5 23 12 19 16 12 21Z"/></svg>
              Contact
            </button>
          </div>
        </div>
      </header>

      {/* ══════════════════════════════════════════════
          HERO SCRAPBOOK CANVAS SECTION
         ══════════════════════════════════════════════ */}
      <section ref={homeRef} className="ca-hero" id="home">
        {/* Intro Tag */}
        <div className="ca-hero-intro">
          <span className="ca-hero-label">my name is</span>
          <svg className="ca-squiggle" viewBox="0 0 64 12" fill="none" stroke="var(--ca-ink)" strokeWidth="2" strokeLinecap="round">
            <path d="M3 4c18-3 40-3 58 0" />
            <path d="M9 9c14-2.5 32-2.5 46 0" />
          </svg>
        </div>

        {/* Giant Doodle Name Box with Floating Scrapbook Stickers */}
        <div className="ca-name-wrapper">
          {/* Top-Left Pinned Tape Badge: CTO & COO */}
          <div className="ca-hero-sticker ca-sticker-role">
            <span className="ca-tape yellow">
              CTO &amp; COO @ The Outliers Studio
            </span>
          </div>

          {/* Top-Right Pinned Tape Badge: 55+ Repos */}
          <div className="ca-hero-sticker ca-sticker-pill">
            <span className="ca-tape pink">
              55+ Repositories
            </span>
          </div>

          {/* The Big Name Doodle Frame */}
          <div className="ca-doodle-box">
            <h1 className="ca-hero-name">
              BANKIM
            </h1>
          </div>

          {/* Bottom-Right Pinned Tape Badge: Location */}
          <div className="ca-hero-sticker ca-sticker-location">
            <span className="ca-tape mint">
              Mumbai, India 🇮🇳
            </span>
          </div>
        </div>

        {/* Punchy Headline with Slow Spinning Floral Badges */}
        <h2 className="ca-hero-headline">
          I build software that turns ambitious ideas into reality.{' '}
          <svg viewBox="0 0 40 40" className="ca-spin-slow" aria-hidden="true">
            <circle cx="20" cy="20" r="18" fill="var(--ca-green)" stroke="var(--ca-ink)" strokeWidth="2.5" />
            <circle cx="20" cy="20" r="11" fill="var(--ca-surface)" />
            <circle cx="20" cy="20" r="5" fill="var(--ca-green)" />
          </svg>
        </h2>

        {/* Live Availability Status */}
        <div className="ca-status-pill">
          <span className="ca-status-dot"></span>
          <span>Open for high-impact roles &amp; engineering builds</span>
        </div>

        {/* Hero CTA Action Buttons */}
        <div className="ca-hero-actions">
          <button
            className="ca-btn-primary"
            onClick={() => scrollTo(worksRef, 'works')}
          >
            <span className="ca-btn-icon-box">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8"><path d="M7 17 17 7M9 7h8v8"/></svg>
            </span>
            Explore My Work
          </button>

          <button
            className="ca-btn-secondary"
            onClick={() => scrollTo(contactRef, 'contact')}
          >
            Drop A Line ✉️
          </button>
        </div>

        {/* Floating Polaroid Photo with Washi Tape on Corners */}
        <div style={{ marginTop: '3.5rem' }}>
          <div className="ca-polaroid" style={{ transform: 'rotate(-2.5deg)', maxWidth: '240px' }}>
            <span className="ca-tape-corner-tl" aria-hidden="true" />
            <span className="ca-tape-corner-tr" aria-hidden="true" />
            <img src="/profile.png" alt="Bankim Chandra Kamila" className="ca-polaroid-img" />
            <p className="ca-polaroid-caption">Bankim · 2026</p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          ABOUT ME / MANIFESTO / SKILL STAMPS
         ══════════════════════════════════════════════ */}
      <section ref={aboutRef} className="ca-about-section" id="about">
        {/* Hand-drawn SVG wave line */}
        <svg viewBox="0 0 1440 100" fill="none" preserveAspectRatio="none" className="ca-wave-divider">
          <path d="M-10 80C420 10 1030 4 1450 60" stroke="var(--ca-ink)" strokeWidth="2" strokeDasharray="6 6" />
        </svg>

        <div className="ca-section-lead">
          <span className="ca-section-badge-hand">about me!</span>
          <div className="ca-section-title-box">
            <span>WHAT'S UP</span>
          </div>
        </div>

        {/* Manifesto Body Copy */}
        <p className="ca-manifesto-text">
          I'm a 20-year-old technologist from Mumbai serving as CTO &amp; COO at The Outliers Studio.
          I study AI &amp; Machine Learning at ITM Skills University and build high-concurrency systems,
          fluid interfaces, and products that solve real problems.
        </p>

        {/* Jagged Polygon Cutout Skill Stamps */}
        <div className="ca-skills-stamps-grid">
          {/* Stamp 1 */}
          <div className="ca-skill-stamp-group">
            <span className="ca-stamp-badge yellow">Full-Stack Architecture</span>
            <span className="ca-stamp-icon-box yellow">⚡</span>
          </div>

          {/* Stamp 2 */}
          <div className="ca-skill-stamp-group">
            <span className="ca-stamp-badge green">AI Systems &amp; Vision</span>
            <span className="ca-stamp-icon-box green">🧠</span>
          </div>

          {/* Stamp 3 */}
          <div className="ca-skill-stamp-group">
            <span className="ca-stamp-badge magenta">Real-Time WebSockets</span>
            <span className="ca-stamp-icon-box magenta">📡</span>
          </div>

          {/* Stamp 4 */}
          <div className="ca-skill-stamp-group">
            <span className="ca-stamp-badge blue">Product Strategy</span>
            <span className="ca-stamp-icon-box blue">🎯</span>
          </div>

          {/* Stamp 5 */}
          <div className="ca-skill-stamp-group">
            <span className="ca-stamp-badge purple">Motion &amp; UI Design</span>
            <span className="ca-stamp-icon-box purple">✨</span>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          STICKY STACKING FEATURED WORKS SECTION
         ══════════════════════════════════════════════ */}
      <section ref={worksRef} className="ca-works-section" id="works">
        <div className="ca-works-header">
          <span className="ca-hero-label">explore my work!</span>
          <h2 className="ca-works-title">FEATURED WORKS</h2>
          <span className="ca-works-desc-tape">
            Flagship products engineered with zero compromises on performance &amp; speed.
          </span>
        </div>

        {/* Sticky Stacking Project Cards */}
        <div className="ca-project-stack">
          {FEATURED_PROJECTS.map((project, idx) => {
            const themeClass = cardThemes[idx % cardThemes.length];
            const projectNumber = `Project 0${idx + 1}`;

            return (
              <article key={project.title} className="ca-project-card-wrap">
                {/* Project Tab Handle */}
                <div className="ca-project-tab-handle">
                  <span className="ca-project-tab">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2c1 5 4 8 9 9-5 1-8 4-9 9-1-5-4-8-9-9 5-1 8-4 9-9Z"/></svg>
                    {projectNumber}
                  </span>
                </div>

                {/* Main Themed Card Box */}
                <div className={`ca-project-card ${themeClass}`}>
                  {/* Left Column: Project Info */}
                  <div className="ca-project-info">
                    <div>
                      <span className="ca-project-date-badge">
                        <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'currentColor' }}></span>
                        {project.category}
                      </span>
                      <h3 className="ca-project-name">{project.title}</h3>
                      <p className="ca-project-subtitle">{project.subtitle}</p>
                      <p className="ca-project-desc">{project.longDesc || project.desc}</p>
                    </div>

                    <div>
                      {/* Action Links */}
                      <div className="ca-project-links">
                        {project.link && (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ca-project-btn"
                            onClick={() => playPopSound('pop')}
                          >
                            Live Application ↗
                          </a>
                        )}
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ca-project-btn"
                            onClick={() => playPopSound('pop')}
                          >
                            GitHub Source ↗
                          </a>
                        )}
                        <button
                          className="ca-project-btn"
                          style={{ background: 'none', border: 'none', cursor: 'pointer', borderBottom: '2.5px solid currentColor' }}
                          onClick={() => {
                            playPopSound('pop');
                            setActiveModalProject(project);
                          }}
                        >
                          Deep-Dive Specs 🔍
                        </button>
                      </div>

                      {/* Tag Chips */}
                      <div className="ca-project-tags">
                        {project.tags.map(tag => (
                          <span key={tag} className="ca-project-tag-pill">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Polaroid Mockup with Washi Tape */}
                  <div className="ca-project-media">
                    <div className="ca-project-polaroid-frame">
                      <span className="ca-tape-corner-top" aria-hidden="true" />
                      <div style={{ position: 'relative', width: '100%', background: '#191510', padding: '1rem', color: '#fff', borderRadius: '2px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.75rem' }}>
                          <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ff5f56' }}></span>
                          <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ffbd2e' }}></span>
                          <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#27c93f' }}></span>
                          <span style={{ marginLeft: 'auto', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#888' }}>
                            {project.title.toLowerCase()}.vercel.app
                          </span>
                        </div>
                        <div style={{ padding: '1.5rem 1rem', background: '#222', borderRadius: '2px', textAlign: 'center' }}>
                          <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: project.accent || '#ffe853' }}>
                            {project.title}
                          </h4>
                          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', marginTop: '0.5rem', color: '#ccc' }}>
                            {project.desc}
                          </p>
                        </div>
                      </div>
                      <p className="ca-polaroid-caption">{project.title} · Production</p>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          TECHNICAL ARSENAL (SCRAPBOOK BOARD)
         ══════════════════════════════════════════════ */}
      <section ref={techRef} className="ca-tech-section" id="skills">
        <div className="ca-section-lead">
          <span className="ca-section-badge-hand">what I build with</span>
          <div className="ca-section-title-box">
            <span>TECH ARSENAL</span>
          </div>
        </div>

        {/* Discipline Filter Row */}
        <div className="ca-filter-row">
          {techCategories.map(cat => (
            <button
              key={cat}
              className={`ca-filter-btn ${selectedTechCategory === cat ? 'active' : ''}`}
              onClick={() => {
                playPopSound('tab');
                setSelectedTechCategory(cat);
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Tech Stack Grid Cards */}
        <div className="ca-tech-grid">
          {filteredTech.map(item => (
            <div key={item.name} className="ca-tech-item-card" onMouseEnter={() => playPopSound('pop')}>
              <div className="ca-tech-icon-circle">
                {item.icon}
              </div>
              <div className="ca-tech-meta">
                <span className="ca-tech-name">{item.name}</span>
                <span className="ca-tech-cat">{item.category}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          55+ GITHUB REPOSITORIES EXPLORER
         ══════════════════════════════════════════════ */}
      <section ref={reposRef} className="ca-section" id="repos">
        <div className="ca-section-lead">
          <span className="ca-section-badge-hand">open source &amp; code</span>
          <div className="ca-section-title-box">
            <span>55+ REPOSITORIES</span>
          </div>
        </div>

        <GitHubRepoExplorer playSound={() => playPopSound('pop')} />
      </section>

      {/* ══════════════════════════════════════════════
          EXPERIENCE & TIMELINE BOARD
         ══════════════════════════════════════════════ */}
      <section ref={experienceRef} className="ca-experience-section" id="exp">
        <div className="ca-section-lead">
          <span className="ca-section-badge-hand">leadership &amp; track record</span>
          <div className="ca-section-title-box">
            <span>EXPERIENCE &amp; CERTS</span>
          </div>
        </div>

        <div className="ca-exp-grid">
          {/* Work Experience */}
          <div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', marginBottom: '1.5rem', textTransform: 'uppercase' }}>
              Leadership Roles
            </h3>
            {EXPERIENCE.map((exp, idx) => (
              <div key={idx} className={`ca-timeline-card ${exp.current ? 'active-role' : ''}`}>
                <h4 className="ca-exp-role">{exp.role}</h4>
                <p className="ca-exp-company">{exp.company} · {exp.location}</p>
                <span className="ca-exp-period">{exp.period}</span>
                <p className="ca-exp-desc">{exp.desc}</p>
                {exp.skills && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '0.85rem' }}>
                    {exp.skills.map(s => (
                      <span key={s} className="ca-tape yellow" style={{ fontSize: '0.7rem', padding: '0.2rem 0.5rem' }}>
                        {s}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Credentials & Education */}
          <div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', marginBottom: '1.5rem', textTransform: 'uppercase' }}>
              Verified Credentials
            </h3>
            {CERTIFICATIONS.map((cert, idx) => (
              <div key={idx} className="ca-cert-item">
                <div>
                  <p className="ca-cert-title">{cert.title}</p>
                  <span className="ca-cert-issuer">{cert.issuer} · {cert.date}</span>
                </div>
                <span className="ca-cert-badge">Verified ✦</span>
              </div>
            ))}

            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', margin: '2.5rem 0 1.5rem', textTransform: 'uppercase' }}>
              Education
            </h3>
            {EDUCATION.map((edu, idx) => (
              <div key={idx} className="ca-timeline-card" style={{ marginBottom: '1rem' }}>
                <h4 className="ca-exp-role" style={{ fontSize: '1.2rem' }}>{edu.degree}</h4>
                <p className="ca-exp-company" style={{ fontSize: '1.1rem' }}>{edu.institution}</p>
                <span className="ca-exp-period">{edu.period}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          GIANT CONTACT CALLOUT ("LET'S TALK")
         ══════════════════════════════════════════════ */}
      <section ref={contactRef} className="ca-contact-section" id="contact">
        {/* Animated Mascot Face with Blush Cheeks */}
        <svg viewBox="0 0 200 200" className="ca-mascot-face" aria-hidden="true" onClick={() => playPopSound('pop')}>
          <circle cx="100" cy="100" r="88" fill="var(--ca-yellow)" stroke="var(--ca-ink)" strokeWidth="3.5" />
          <circle cx="56" cy="120" r="12" fill="var(--ca-magenta)" opacity="0.45" />
          <circle cx="144" cy="120" r="12" fill="var(--ca-magenta)" opacity="0.45" />
          <g className="ca-blink">
            <rect x="65" y="68" width="16" height="42" rx="8" fill="var(--ca-ink)" />
            <rect x="119" y="68" width="16" height="42" rx="8" fill="var(--ca-ink)" />
          </g>
          <path d="M62 130 Q100 172 138 130" fill="none" stroke="var(--ca-ink)" strokeWidth="6" strokeLinecap="round" />
        </svg>

        <h2 className="ca-contact-big-title">LET'S TALK</h2>
        <p className="ca-manifesto-text" style={{ fontSize: '1.6rem', maxWidth: '640px', marginTop: '1rem' }}>
          Got a product to ship, an engineering challenge, or want to collaborate? I read every message.
        </p>

        {/* Giant Yellow Banner Callout Card with Floating Speech Note */}
        <div style={{ position: 'relative', maxWidth: '860px', margin: '0 auto' }}>
          {/* Floating Cyan Comment Note */}
          <div className="ca-floating-comment">
            <span className="ca-tape-corner-tl" aria-hidden="true" />
            <div className="ca-comment-header">
              <img src="/profile.png" alt="Bankim" className="ca-comment-avatar" />
              <span className="ca-comment-author">Bankim Kamila</span>
            </div>
            <p className="ca-comment-text">
              "Open to CTO / Lead Engineering roles, contract builds, and ambitious software startups."
            </p>
          </div>

          <div className="ca-contact-banner-card" onClick={copyEmail}>
            <span className="ca-tape-corner-top" aria-hidden="true" />
            <span className="ca-banner-tagline">let's make something together</span>
            <span className="ca-banner-main-btn">
              {copiedEmail ? 'COPIED TO CLIPBOARD! ✨' : 'CONTACT ME'}
            </span>
            <span className="ca-banner-action-link">
              {copiedEmail ? 'Email ready to paste ✉️' : 'click to copy bankimkamila185@gmail.com ↗'}
            </span>
          </div>
        </div>

        {/* Quick Social & Contact Channels */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem', marginTop: '2.5rem' }}>
          <a
            href={PERSONAL_INFO.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="ca-btn-secondary"
            onClick={() => playPopSound('pop')}
          >
            Direct WhatsApp 💬
          </a>
          <a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="ca-btn-secondary"
            onClick={() => playPopSound('pop')}
          >
            LinkedIn Profile 👔
          </a>
          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            className="ca-btn-secondary"
            onClick={() => playPopSound('pop')}
          >
            GitHub (55+ Repos) 🐙
          </a>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          SCRAPBOOK FOOTER
         ══════════════════════════════════════════════ */}
      <footer className="ca-footer">
        <svg viewBox="0 0 1440 100" fill="none" preserveAspectRatio="none" className="ca-wave-divider">
          <path d="M-10 80C420 10 1030 4 1450 60" stroke="var(--ca-ink)" strokeWidth="2" strokeDasharray="6 6" />
        </svg>

        <div className="ca-footer-inner">
          <div>
            <p className="ca-footer-name">Bankim Chandra Kamila</p>
            <p className="ca-footer-role">
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--ca-blue)' }}></span>
              CTO &amp; COO · Full-Stack &amp; AI Engineer
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer" className="ca-social-pill yellow" aria-label="LinkedIn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76c.94 0 1.7-.76 1.7-1.7s-.76-1.7-1.7-1.7-1.7.76-1.7 1.7.76 1.7 1.7 1.7m1.39 9.74v-8.37H5.07v8.37h2.78z"/></svg>
              </a>
              <a href={PERSONAL_INFO.github} target="_blank" rel="noopener noreferrer" className="ca-social-pill pink" aria-label="GitHub">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/></svg>
              </a>
              <a href={PERSONAL_INFO.instagram} target="_blank" rel="noopener noreferrer" className="ca-social-pill mint" aria-label="Instagram">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href={PERSONAL_INFO.whatsapp} target="_blank" rel="noopener noreferrer" className="ca-social-pill cyan" aria-label="WhatsApp">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/></svg>
              </a>
            </div>
          </div>
        </div>

        <div className="ca-footer-bottom">
          <span>© {new Date().getFullYear()} Bankim Chandra Kamila. All rights reserved.</span>
          <span className="ca-badge-pill">✦ Creative Artsy Edition</span>
        </div>
      </footer>
    </div>
  );
}
