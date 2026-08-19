import React, { useState, useEffect, useRef } from 'react';
import './App.css';

import GitHubRepoExplorer from './components/GitHubRepoExplorer';
import CommandPalette from './components/CommandPalette';
import ProjectModal from './components/ProjectModal';
import { FEATURED_PROJECTS, EXPERIENCE, EDUCATION, CERTIFICATIONS, PERSONAL_INFO } from './data/portfolioData';

import { TECH_STACK_ITEMS } from './data/techIcons';

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
  const [isCmdOpen, setIsCmdOpen] = useState(false);
  const [activeModalProject, setActiveModalProject] = useState(null);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const homeRef = useRef(null);
  const projectsRef = useRef(null);
  const reposRef = useRef(null);
  const stackRef = useRef(null);
  const experienceRef = useRef(null);
  const arcadeRef = useRef(null);
  const contactRef = useRef(null);

  const categories = ['All', 'Full-Stack Web', 'Fintech Tool', 'AI & ML', 'Marketplace', 'Design System'];

  const filteredProjects = selectedCategory === 'All'
    ? FEATURED_PROJECTS
    : FEATURED_PROJECTS.filter(p => p.category === selectedCategory);

  const copyEmail = () => {
    navigator.clipboard.writeText('bankimkamila185@gmail.com');
    playPopSound();
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll('.sawad-reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

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
    if (destination === 'repos') reposRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (destination === 'role' || destination === 'experience') experienceRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="sawad-app">
      {/* ⌘K Spotlight Command Palette */}
      <CommandPalette
        isOpen={isCmdOpen}
        onClose={() => setIsCmdOpen(false)}
        onNavigate={handleCmdNavigate}
        onToggleTheme={() => {}}
        playSound={playPopSound}
      />

      {/* Project Case Study Deep-Dive Modal */}
      <ProjectModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
        playSound={playPopSound}
      />

      {/* ══════════════════════════════════════════
          TOP FLOATING DOCK NAVBAR (6 ICON CAPSULE)
         ══════════════════════════════════════════ */}
      <header className="sawad-nav-wrapper">
        <nav className="sawad-floating-dock">
          {/* 1. Home Icon */}
          <button
            className="dock-item"
            onClick={() => { playPopSound(); homeRef.current?.scrollIntoView({ behavior: 'smooth' }); }}
            title="Home"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
          </button>
          {/* 2. Projects Icon */}
          <button
            className="dock-item"
            onClick={() => { playPopSound(); projectsRef.current?.scrollIntoView({ behavior: 'smooth' }); }}
            title="Projects"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
          </button>
          {/* 3. GitHub Repos Icon */}
          <button
            className="dock-item"
            onClick={() => { playPopSound(); reposRef.current?.scrollIntoView({ behavior: 'smooth' }); }}
            title="Open Source Repos"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/></svg>
          </button>
          {/* 4. Experience Icon */}
          <button
            className="dock-item"
            onClick={() => { playPopSound(); experienceRef.current?.scrollIntoView({ behavior: 'smooth' }); }}
            title="Experience"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
          </button>

          {/* 6. Contact Icon */}
          <button
            className="dock-item"
            onClick={() => { playPopSound(); contactRef.current?.scrollIntoView({ behavior: 'smooth' }); }}
            title="Contact"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
          </button>
        </nav>
      </header>

      <main className="sawad-container">

        {/* ══════════════════════════════════════════
            HERO SECTION (DARK OBSIDIAN EXECUTIVE HERO)
           ══════════════════════════════════════════ */}
        <section ref={homeRef} className="sawad-hero sawad-reveal">
          
          {/* LEFT: OBSIDIAN GLASS PROFILE CARD */}
          <div className="sawad-profile-card">
            
            {/* Ambient Profile Glow Backdrop */}
            <div className="card-ambient-glow"></div>

            {/* Profile Avatar Box */}
            <div className="sawad-avatar-box">
              <img
                src="/profile.png"
                alt="Bankim Chandra Kamila"
                className="sawad-avatar-img"
                onError={(e) => { e.target.onerror = null; e.target.src = "https://avatars.githubusercontent.com/u/174135567?v=4"; }}
              />
              <div className="avatar-glass-overlay">
                <span className="avatar-status-pill">
                  <span className="status-ping-dot"></span>
                  <span>Available for Advisory &amp; Roles</span>
                </span>
              </div>
            </div>

            {/* Name & Title */}
            <div className="profile-text-body">
              <h2 className="sawad-profile-name">Bankim Chandra Kamila</h2>
              <div className="profile-role-tag">
                <span className="role-prefix">CTO &amp; COO</span>
                <span className="role-company">@ The Outliers Studio</span>
              </div>

              <p className="sawad-profile-bio">
                Software Engineer architecting scalable full-stack applications, real-time WebSockets, and AI/ML systems.
              </p>

              <div className="profile-skill-pills">
                <span className="skill-chip">AI &amp; ML</span>
                <span className="skill-chip">FastAPI</span>
                <span className="skill-chip">MERN</span>
                <span className="skill-chip">WebSockets</span>
              </div>
            </div>

            {/* 4 Social Icons */}
            <div className="sawad-social-row">
              <a href={PERSONAL_INFO.github} target="_blank" rel="noopener noreferrer" className="sawad-social-icon" title="GitHub Profile">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
              </a>
              <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer" className="sawad-social-icon" title="LinkedIn Profile">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                </svg>
              </a>
              <a href={PERSONAL_INFO.instagram} target="_blank" rel="noopener noreferrer" className="sawad-social-icon" title="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href={PERSONAL_INFO.whatsapp} target="_blank" rel="noopener noreferrer" className="sawad-social-icon" title="WhatsApp Message">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* RIGHT: BIG EDITORIAL TITLES, HERO CTA & STATS */}
          <div className="sawad-hero-right">
            <div className="sawad-hero-titles">
              <span className="hero-kicker-tag">LEADERSHIP &amp; ARCHITECTURE</span>
              <h1 className="sawad-title-solid">SOFTWARE</h1>
              <h1 className="sawad-title-muted">ENGINEER</h1>
            </div>

            <p className="sawad-hero-desc">
              Passionate technologist architecting high-performance full-stack applications, real-time WebSockets, and AI/ML tools. Leading engineering and operations at <strong>The Outliers Studio</strong>.
            </p>

            {/* Hero Quick Action Buttons */}
            <div className="sawad-hero-actions">
              <button
                className="sawad-hero-primary-btn"
                onClick={() => { playPopSound(); contactRef.current?.scrollIntoView({ behavior: 'smooth' }); }}
              >
                Let's Talk ↗
              </button>
              <button
                className="sawad-hero-secondary-btn"
                onClick={() => { playPopSound(); projectsRef.current?.scrollIntoView({ behavior: 'smooth' }); }}
              >
                Selected Work ↓
              </button>
            </div>

            {/* 3 Real, Impactful Stats Columns */}
            <div className="sawad-stats-row">
              <div className="sawad-stat-box">
                <span className="stat-number">+55</span>
                <span className="stat-label">OPEN SOURCE<br />REPOSITORIES</span>
              </div>
              <div className="sawad-stat-box">
                <span className="stat-number">+10</span>
                <span className="stat-label">PRODUCTION<br />APPS SHIPPED</span>
              </div>
              <div className="sawad-stat-box">
                <span className="stat-number">2x</span>
                <span className="stat-label">EXECUTIVE<br />ROLES (CTO & COO)</span>
              </div>
            </div>
          </div>

        </section>

        {/* ══════════════════════════════════════════
            HIGHLIGHT BANNER CARDS
           ══════════════════════════════════════════ */}
        <section className="sawad-banner-grid sawad-reveal">
          {/* Orange Feature Banner */}
          <div className="sawad-banner-card orange-card">
            <div className="banner-icon-box">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
            </div>
            <h3 className="banner-title">FULL-STACK SCALABILITY & REAL-TIME WEBSOCKETS</h3>
          </div>

          {/* Lime Neon Feature Banner */}
          <div className="sawad-banner-card lime-card">
            <div className="banner-icon-box">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>
            </div>
            <h3 className="banner-title">AI & MACHINE LEARNING · PYTHON REST SERVICES</h3>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            FEATURED PROJECTS SECTION WITH CATEGORY FILTER
           ══════════════════════════════════════════ */}
        <section ref={projectsRef} className="sawad-section sawad-reveal">
          <div className="section-header-row">
            <div>
              <span className="section-tag">PORTFOLIO</span>
              <h2 className="section-title">Selected Projects</h2>
            </div>
            <a href={PERSONAL_INFO.github} target="_blank" rel="noopener noreferrer" className="sawad-view-all-btn">
              All 55+ on GitHub ↗
            </a>
          </div>

          {/* Project Category Filter Pills */}
          <div className="project-filter-pills-row">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`project-cat-pill ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => { playPopSound(); setSelectedCategory(cat); }}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="sawad-projects-grid">
            {filteredProjects.map((proj) => (
              <div
                key={proj.title}
                className="sawad-project-card"
                onClick={() => { playPopSound(); setActiveModalProject(proj); }}
              >
                <div className="proj-card-top">
                  <span className="proj-tag-pill">{proj.category}</span>
                  <div className="proj-action-group" onClick={(e) => e.stopPropagation()}>
                    {proj.link && (
                      <a href={proj.link} target="_blank" rel="noopener noreferrer" className="proj-link-mini-btn" title="Live Preview">
                        Live ↗
                      </a>
                    )}
                    {proj.github && (
                      <a href={proj.github} target="_blank" rel="noopener noreferrer" className="proj-link-mini-btn" title="Source Code">
                        Code ↗
                      </a>
                    )}
                  </div>
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
            OPEN SOURCE ECOSYSTEM (GITHUB REPO EXPLORER)
           ══════════════════════════════════════════ */}
        <section ref={reposRef} className="sawad-section sawad-reveal">
          <div className="section-header-row">
            <div>
              <span className="section-tag">OPEN SOURCE</span>
              <h2 className="section-title">Live GitHub Repositories</h2>
            </div>
            <span className="arcade-live-indicator">● 55+ Public Repos</span>
          </div>

          <GitHubRepoExplorer playSound={playPopSound} />
        </section>



        {/* ══════════════════════════════════════════
            TECH STACK MATRIX
           ══════════════════════════════════════════ */}
        <section ref={stackRef} className="sawad-section sawad-reveal">
          <div className="section-header-row">
            <div>
              <span className="section-tag">STACK</span>
              <h2 className="section-title">Core Technologies</h2>
            </div>
          </div>

          <div className="sawad-stack-grid">
            {TECH_STACK_ITEMS.map(tech => (
              <div key={tech.name} className="sawad-stack-item">
                <div className="stack-icon-wrap">{tech.icon}</div>
                <div className="stack-text-group">
                  <span className="stack-name">{tech.name}</span>
                  <span className="stack-cat">{tech.category}</span>
                </div>
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
              <span className="section-tag">EXPERIENCE</span>
              <h2 className="section-title">Career &amp; Credentials</h2>
            </div>
          </div>

          <div className="sawad-timeline-grid">
            {/* Experience Column */}
            <div className="sawad-timeline-col">
              <h3 className="timeline-col-title">Leadership &amp; Work Experience</h3>
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
                  </div>
                ))}
              </div>
            </div>

            {/* Education & Certs Column */}
            <div className="sawad-timeline-col">
              <h3 className="timeline-col-title">Education &amp; Credentials</h3>
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
                  <h4 className="certs-heading">Verified Certifications</h4>
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
            <span className="contact-kicker">CONTACT</span>
            <h2 className="contact-heading">Let's build something remarkable together.</h2>
            <p className="contact-sub">Available for tech leadership, full-stack architecture & AI engineering.</p>

            <div className="contact-actions-row">
              <button className="sawad-btn-primary" onClick={copyEmail}>
                {copiedEmail ? 'Email Copied ✓' : `Copy Email: ${PERSONAL_INFO.email}`}
              </button>
              <a href={PERSONAL_INFO.whatsapp} target="_blank" rel="noopener noreferrer" className="sawad-btn-secondary">
                WhatsApp ↗
              </a>
              <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer" className="sawad-btn-secondary">
                LinkedIn ↗
              </a>
              <a href={PERSONAL_INFO.github} target="_blank" rel="noopener noreferrer" className="sawad-btn-secondary">
                GitHub ↗
              </a>
            </div>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="sawad-footer">
        <p>© {new Date().getFullYear()} {PERSONAL_INFO.name} · Built with React &amp; Vite</p>
      </footer>
    </div>
  );
}
