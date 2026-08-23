import React, { useState, useEffect, useRef } from 'react';
import './App.css';

import { PERSONAL_INFO } from './data/portfolioData';

const FEATURED_WORKS = [
  {
    num: "01",
    tabColor: "#2563eb",
    tabText: "✦ PROJECT 01",
    cardClass: "ca-card-blue",
    date: "MAR 19, 2026",
    title: "Wayline",
    desc: "Making a whole city's transit app feel less like decoding a puzzle.",
    tags: ["MOBILITY", "CONSUMER APP"],
    img: "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1200&auto=format&fit=crop",
    problem: "The app had every number and told you nothing. Commuters stared at confusing tables, had no idea which connection was delayed, and gave up before navigating unfamiliar transfers.",
    solution: "Rebuilt the entire transit companion from scratch around glanceable progress and intuitive live departure cards. Cut 55% of intermediate clicks.",
    result: "47% faster journey planning, 2.4× weekly return visits, and 99.98% session completion during peak morning rush hours."
  },
  {
    num: "02",
    tabColor: "#ff2d78",
    tabText: "✦ PROJECT 02",
    cardClass: "ca-card-magenta",
    date: "MAR 16, 2026",
    title: "Volt",
    desc: "Helping people actually understand the energy they use at home.",
    tags: ["CLIMATE", "DATA DESIGN"],
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
    problem: "People stared at complex kilowatt charts they couldn't read and had no idea what appliances were costing them.",
    solution: "Cut the dashboard down to plain summaries: what am I using, what is it costing, and what should I do about it. Deep charts are one tap away.",
    result: "2× more return check-ins, 3.5k+ daily energy habits saved in Q1, and guesswork eliminated."
  },
  {
    num: "03",
    tabColor: "#f59e0b",
    tabText: "✦ PROJECT 03",
    cardClass: "ca-card-yellow",
    date: "FEB 28, 2026",
    title: "Aura",
    desc: "Smart ambient assistant that adapts lighting and focus sounds to your flow state.",
    tags: ["HARDWARE", "AI INTERACTION"],
    img: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1200&auto=format&fit=crop",
    problem: "Work environments are noisy and static, leading to context-switching fatigue and lost deep focus time.",
    solution: "Connected biometrics and IDE signals to deliver unobtrusive ambient soundscapes and intelligent lighting cues.",
    result: "Over 80,000 deep work hours logged with a 94% positive user satisfaction rating."
  },
  {
    num: "04",
    tabColor: "#10b981",
    tabText: "✦ PROJECT 04",
    cardClass: "ca-card-mint",
    date: "JAN 14, 2026",
    title: "Orbit",
    desc: "Real-time collaborative canvas for engineering teams to architect distributed systems together.",
    tags: ["DEVTOOLS", "REALTIME"],
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop",
    problem: "System architecture diagrams go stale the moment they're drawn because they aren't connected to live infrastructure state.",
    solution: "Engineered a high-performance WebGL diagramming engine that syncs with Terraform and Kubernetes clusters in real time.",
    result: "Adopted by 300+ engineering teams with sub-16ms latency for 50+ concurrent diagram collaborators."
  }
];

export default function App() {
  const [activeNav, setActiveNav] = useState('home');
  const [activeProjectIdx, setActiveProjectIdx] = useState(0);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeCaseStudy, setActiveCaseStudy] = useState(null);

  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const worksRef = useRef(null);
  const contactRef = useRef(null);

  const scrollTo = (ref, navId) => {
    setActiveNav(navId);
    setMobileMenuOpen(false);
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2400);
  };

  const renderStaggerText = (text, startDelay = 0.1, delayInc = 0.045) => {
    return text.split('').map((char, index) => (
      <span
        key={index}
        className="ca-char-stagger"
        style={{ animationDelay: `${startDelay + index * delayInc}s` }}
      >
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  const currentProject = FEATURED_WORKS[activeProjectIdx];

  return (
    <div className="ca-app ca-grid min-h-screen">
      {/* Paper Grain Overlay */}
      <div className="ca-grain" aria-hidden="true" />

      {/* ══════════════════════════════════════════════
          TOP HEADER
         ══════════════════════════════════════════════ */}
      <header className="ca-header">
        <div className="ca-header-inner">
          {/* Left: Smiley Avatar + Nav Tabs */}
          <div className="ca-header-left">
            <button
              className="ca-header-smiley"
              onClick={() => scrollTo(homeRef, 'home')}
              aria-label="Home"
            >
              <svg viewBox="0 0 24 24" width="30" height="30">
                <circle cx="12" cy="12" r="10" fill="var(--ca-magenta)" stroke="#ffffff" strokeWidth="2.5" />
                <circle cx="8.5" cy="10.5" r="1.35" fill="#ffffff" />
                <circle cx="15.5" cy="10.5" r="1.35" fill="#ffffff" />
                <path d="M8 14 Q12 18 16 14" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>

            <nav className="ca-nav-tabs" aria-label="Main Navigation">
              {/* HOME Tab */}
              <button
                className={`ca-nav-tab ${activeNav === 'home' ? 'active' : ''}`}
                onClick={() => scrollTo(homeRef, 'home')}
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 2l2.9 6.26 6.85.72-5.1 4.62 1.44 6.7L12 17.6l-6.09 3.7 1.44-6.7-5.1-4.62 6.85-.72z"/></svg>
                Home
              </button>

              {/* ABOUT Tab */}
              <button
                className={`ca-nav-tab ${activeNav === 'about' ? 'active' : ''}`}
                onClick={() => scrollTo(aboutRef, 'about')}
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 3a3.6 3.6 0 100 7.2A3.6 3.6 0 0012 3zM4.8 20a7.2 7.2 0 0114.4 0z"/></svg>
                About
              </button>

              {/* CASE STUDY Tab */}
              <button
                className={`ca-nav-tab ${activeNav === 'works' ? 'active' : ''}`}
                onClick={() => scrollTo(worksRef, 'works')}
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z"/></svg>
                Case Study
              </button>
            </nav>
          </div>

          {/* Right: Round Social Buttons + Contact CTA */}
          <div className="ca-header-right">
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="ca-social-circle yellow"
              aria-label="LinkedIn"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76c.94 0 1.7-.76 1.7-1.7s-.76-1.7-1.7-1.7-1.7.76-1.7 1.7.76 1.7 1.7 1.7m1.39 9.74v-8.37H5.07v8.37h2.78z"/></svg>
            </a>

            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="ca-social-circle magenta"
              aria-label="GitHub"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/></svg>
            </a>

            <a
              href={PERSONAL_INFO.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="ca-social-circle green"
              aria-label="Instagram"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </a>

            <button
              className="ca-header-contact-btn"
              onClick={() => scrollTo(contactRef, 'contact')}
            >
              <svg width="14" height="14" viewBox="0 0 24 22" fill="currentColor"><path d="M12 21C5 16 1 12 1 7.5 1 4 3.6 1.5 6.8 1.5c2 0 3.9 1 5.2 2.6 1.3-1.6 3.2-2.6 5.2-2.6C20.4 1.5 23 4 23 7.5 23 12 19 16 12 21Z"/></svg>
              Contact
            </button>

            <button
              className="ca-mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Menu"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2.2" fill="none">
                {mobileMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M3 6h18M3 12h18M3 18h18" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="ca-mobile-drawer">
            <button className="ca-nav-tab" onClick={() => scrollTo(homeRef, 'home')}>⭐ Home</button>
            <button className="ca-nav-tab" onClick={() => scrollTo(aboutRef, 'about')}>👤 About</button>
            <button className="ca-nav-tab" onClick={() => scrollTo(worksRef, 'works')}>田 Case Study</button>
            <button className="ca-nav-tab" onClick={() => scrollTo(contactRef, 'contact')}>🖤 Contact</button>
          </div>
        )}
      </header>

      {/* ══════════════════════════════════════════════
          HERO SECTION
         ══════════════════════════════════════════════ */}
      <section ref={homeRef} className="ca-hero" id="home">
        {/* Floating Circular Orange-Framed Avatars */}
        <div className="ca-floating-avatar-left ca-wobble" aria-hidden="true">
          <div className="ca-avatar-ring">
            <img src="/profile.png" alt="" className="ca-avatar-img-circle" />
          </div>
        </div>

        <div className="ca-floating-avatar-right ca-wobble" aria-hidden="true" style={{ animationDelay: '1.4s' }}>
          <div className="ca-avatar-ring">
            <img src="/profile.png" alt="" className="ca-avatar-img-circle" />
          </div>
        </div>

        {/* "my name is" + Double Underline */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <p className="ca-name-label">my name is</p>
          <svg className="ca-name-underline" viewBox="0 0 64 12" fill="none" stroke="#191510" strokeWidth="1.6" strokeLinecap="round">
            <path d="M3 4c18-3 40-3 58 0" />
            <path d="M9 9c14-2.5 32-2.5 46 0" />
          </svg>
        </div>

        {/* Main Name Canvas */}
        <div className="ca-name-canvas-wrap">
          <span className="ca-pill-tag purple">
            MADE THINGS
          </span>

          <span className="ca-pill-tag yellow-soft">
            SWEAT THE DETAILS
          </span>

          <div className="ca-orange-contour-box">
            <h1 className="ca-pixel-hero-name">
              {renderStaggerText("BANKIM", 0.2, 0.08)}
            </h1>
          </div>

          <div className="ca-sticky-note-left">
            <span className="ca-hand-tape-box yellow">
              CTO &amp; COO
            </span>
            <svg className="ca-hand-arrow" viewBox="0 0 40 40" fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M8 32 C 18 24, 25 18, 32 8" />
              <path d="M18 7 L 32 8 L 31 22" />
            </svg>
          </div>

          <div className="ca-sticky-note-right">
            <svg className="ca-hand-arrow" viewBox="0 0 40 40" fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M32 32 C 22 24, 15 18, 8 8" />
              <path d="M9 22 L 8 8 L 22 7" />
            </svg>
            <span className="ca-hand-tape-box mint">
              Mumbai, IN
            </span>
          </div>
        </div>

        {/* Status Line */}
        <p className="ca-status-line">
          <span className="ca-status-blue-dot"></span>
          OPEN TO NEW WORK AND GOOD PROBLEMS
        </p>

        {/* Headline with Radar and Flower Spinners */}
        <h2 className="ca-hero-headline-main">
          <span>I design software that </span>
          <svg viewBox="0 0 40 40" className="ca-spin-slow" aria-hidden="true" style={{ display: 'inline-block', verticalAlign: '-0.08em', width: '0.85em', height: '0.85em', margin: '0 0.15em' }}>
            <circle cx="20" cy="20" r="18" fill="#22c55e" stroke="#191510" strokeWidth="2.5" />
            <circle cx="20" cy="20" r="11" fill="#faf6ee" />
            <circle cx="20" cy="20" r="5" fill="#22c55e" />
            <circle cx="14" cy="9" r="2.4" fill="#191510" />
          </svg>
          <br />
          <span>gets out of your way. </span>
          <svg viewBox="0 0 40 40" className="ca-spin-slow" aria-hidden="true" style={{ display: 'inline-block', verticalAlign: '-0.08em', width: '0.85em', height: '0.85em', margin: '0 0.15em' }}>
            <ellipse cx="20" cy="8" rx="4.6" ry="8" fill="#ff2d78" transform="rotate(0 20 20)" />
            <ellipse cx="20" cy="8" rx="4.6" ry="8" fill="#ff2d78" transform="rotate(45 20 20)" />
            <ellipse cx="20" cy="8" rx="4.6" ry="8" fill="#ff2d78" transform="rotate(90 20 20)" />
            <ellipse cx="20" cy="8" rx="4.6" ry="8" fill="#ff2d78" transform="rotate(135 20 20)" />
            <ellipse cx="20" cy="8" rx="4.6" ry="8" fill="#ff2d78" transform="rotate(180 20 20)" />
            <ellipse cx="20" cy="8" rx="4.6" ry="8" fill="#ff2d78" transform="rotate(225 20 20)" />
            <ellipse cx="20" cy="8" rx="4.6" ry="8" fill="#ff2d78" transform="rotate(270 20 20)" />
            <ellipse cx="20" cy="8" rx="4.6" ry="8" fill="#ff2d78" transform="rotate(315 20 20)" />
            <circle cx="20" cy="20" r="4" fill="#191510" />
          </svg>
        </h2>

        {/* Contact CTA */}
        <button
          className="ca-hero-contact-cta"
          onClick={() => scrollTo(contactRef, 'contact')}
        >
          <span className="ca-blue-arrow-box">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8">
              <path d="M7 17 17 7M9 7h8v8" />
            </svg>
          </span>
          Contact me
        </button>
      </section>

      {/* ══════════════════════════════════════════════
          ABOUT ME SECTION
         ══════════════════════════════════════════════ */}
      <section ref={aboutRef} className="ca-about-wrap" id="about">
        <p className="ca-about-eyebrow">about me!</p>

        <div className="ca-doodle-frame-title">
          <span>what's up</span>
        </div>

        <div className="ca-about-center-stage">
          {/* Left Flanking Polaroid: 2026 */}
          <div className="ca-flank-polaroid-left">
            <span className="ca-tape-corner-left" aria-hidden="true" />
            <span className="ca-tape-corner-right" aria-hidden="true" />
            <img src="/profile.png" alt="2026" className="ca-polaroid-img-taped" />
            <p className="ca-hand" style={{ fontSize: '1.25rem', marginTop: '0.6rem' }}>2026</p>
          </div>

          {/* Right Flanking Polaroid: my workspace */}
          <div className="ca-flank-polaroid-right">
            <span className="ca-tape-corner-left" aria-hidden="true" />
            <span className="ca-tape-corner-right" aria-hidden="true" />
            <img src="/hero.png" alt="my workspace" className="ca-polaroid-img-taped" />
            <p className="ca-hand" style={{ fontSize: '1.25rem', marginTop: '0.6rem' }}>my workspace</p>
          </div>

          <p className="ca-manifesto-large">
            I'm a product designer who gets a little too excited about making complicated things feel simple. ✨ I care about the small details, the edge cases everyone forgets, and shipping work that genuinely makes someone's day easier. 🎨
          </p>
        </div>

        {/* 2-Row Jagged Skill Badges */}
        <div className="ca-jagged-skills-container">
          <div className="ca-jagged-row">
            <div className="ca-jagged-item">
              <span className="ca-jagged-label yellow">Interaction Design</span>
              <span className="ca-jagged-icon yellow">
                <span className="ca-emoji-a">✨</span>
                <span className="ca-emoji-b">🎨</span>
              </span>
            </div>
            <div className="ca-jagged-item">
              <span className="ca-jagged-label green">Prototyping</span>
              <span className="ca-jagged-icon green">
                <span className="ca-emoji-a">🎨</span>
                <span className="ca-emoji-b">🧩</span>
              </span>
            </div>
          </div>

          <div className="ca-jagged-row">
            <div className="ca-jagged-item">
              <span className="ca-jagged-label magenta">User Research</span>
              <span className="ca-jagged-icon magenta">
                <span className="ca-emoji-a">🧩</span>
                <span className="ca-emoji-b">👀</span>
              </span>
            </div>
            <div className="ca-jagged-item">
              <span className="ca-jagged-label blue">Motion Design</span>
              <span className="ca-jagged-icon blue">
                <span className="ca-emoji-a">👀</span>
                <span className="ca-emoji-b">💡</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          FEATURED CASE STUDIES (CLEAN 4-TAB BINDER SYSTEM)
         ══════════════════════════════════════════════ */}
      <section ref={worksRef} className="ca-works-wrap" id="works">
        <div className="ca-works-head">
          <p className="ca-name-label">explore my work!</p>
          <svg className="ca-name-underline" viewBox="0 0 64 12" fill="none" stroke="#191510" strokeWidth="1.6" strokeLinecap="round" style={{ margin: '0 auto' }}>
            <path d="M3 4c18-3 40-3 58 0" />
            <path d="M9 9c14-2.5 32-2.5 46 0" />
          </svg>
          <h2 className="ca-featured-title">
            {renderStaggerText("FEATURED WORKS", 0.1, 0.04)}
          </h2>
          <span className="ca-works-tape-desc">
            A few products I helped make simpler, calmer, and easier to trust.
          </span>
        </div>

        {/* Clean 4-Tab Binder Container (No weird clipping or blue corners) */}
        <div className="ca-binder-container">
          {/* Continuous Row of All 4 Trapezoid Tabs */}
          <div className="ca-tabs-header-row">
            {FEATURED_WORKS.map((work, idx) => {
              const isActive = activeProjectIdx === idx;
              return (
                <button
                  key={work.num}
                  className={`ca-binder-tab ${idx > 0 ? 'trapezoid' : ''} ${isActive ? 'active' : ''}`}
                  style={{
                    backgroundColor: work.tabColor,
                    opacity: isActive ? 1 : 0.75,
                    zIndex: isActive ? 10 : idx + 1
                  }}
                  onClick={() => setActiveProjectIdx(idx)}
                >
                  {work.tabText}
                </button>
              );
            })}
          </div>

          {/* Active Card Body */}
          <div className={`ca-work-card ${currentProject.cardClass}`}>
            {/* Left Column: Info */}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <span className="ca-mono" style={{ fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.15em', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#ffffff' }}></span>
                  {currentProject.date}
                </span>
                <h2 className="ca-work-title">{currentProject.title}</h2>
                <p className="ca-work-desc">{currentProject.desc}</p>
                
                <button
                  onClick={() => setActiveCaseStudy(currentProject)}
                  className="ca-work-link"
                >
                  VIEW PROJECT ↗
                </button>
              </div>

              <div className="ca-work-tags">
                {currentProject.tags.map(t => (
                  <span key={t} className="ca-work-tag-badge">{t}</span>
                ))}
              </div>
            </div>

            {/* Right Column: Polaroid Device Mockup Frame with Tapes */}
            <div style={{ alignSelf: 'center' }}>
              <div className="ca-work-mockup-frame">
                <span className="ca-tape-mockup-tl" aria-hidden="true" />
                <span className="ca-tape-mockup-tr" aria-hidden="true" />
                <img
                  src={currentProject.img}
                  alt={currentProject.title}
                  style={{ width: '100%', height: '340px', objectFit: 'cover', display: 'block' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          CONTACT SECTION (CLEAN TRANSITION FROM WORKS)
         ══════════════════════════════════════════════ */}
      <section ref={contactRef} className="ca-contact-wrap" id="contact">
        {/* Animated Big Yellow Mascot */}
        <svg viewBox="0 0 200 200" className="ca-mascot-smiley" aria-hidden="true">
          <circle cx="100" cy="100" r="88" fill="var(--ca-yellow)" stroke="var(--ca-ink)" strokeWidth="3.5" />
          <circle cx="56" cy="120" r="12" fill="var(--ca-magenta)" opacity="0.45" />
          <circle cx="144" cy="120" r="12" fill="var(--ca-magenta)" opacity="0.45" />
          <g className="ca-blink">
            <rect x="68" y="68" width="16" height="42" rx="8" fill="var(--ca-ink)" />
            <rect x="116" y="68" width="16" height="42" rx="8" fill="var(--ca-ink)" />
          </g>
          <path d="M62 130 Q100 172 138 130" fill="none" stroke="var(--ca-ink)" strokeWidth="6" strokeLinecap="round" />
        </svg>

        <h2 className="ca-lets-talk-title">
          {renderStaggerText("LET'S TALK", 0.1, 0.05)}
        </h2>

        <p className="ca-manifesto-large" style={{ fontSize: '1.6rem', marginTop: '1rem', maxWidth: '720px' }}>
          Got a project, a hard problem, or just want to say hi? Send it over. I read every message.
        </p>

        {/* Big Yellow Banner Card Container */}
        <div style={{ position: 'relative', maxWidth: '820px', margin: '3.5rem auto 0' }}>
          {/* Lavender-Blue Pinned Comment Note */}
          <div className="ca-comment-pinned">
            <span style={{ position: 'absolute', top: '-10px', left: '-12px', width: '55px', height: '18px', backgroundColor: 'rgba(254, 240, 138, 0.8)', transform: 'rotate(-38deg)', boxShadow: '0 1px 3px rgba(17,18,18,0.15)', zIndex: 10 }} />
            <span style={{ position: 'absolute', top: '-10px', right: '-12px', width: '55px', height: '18px', backgroundColor: 'rgba(251, 207, 232, 0.8)', transform: 'rotate(38deg)', boxShadow: '0 1px 3px rgba(17,18,18,0.15)', zIndex: 10 }} />
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
              <img src="/profile.png" alt="Robin Vale" style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }} />
              <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>Robin Vale</span>
            </div>
            <p style={{ fontSize: '0.88rem', lineHeight: 1.4, color: 'var(--ca-ink)' }}>
              Open to contract work, full-time roles, and interesting conversations about hard design problems.
            </p>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', marginTop: '0.75rem', border: '1.5px solid var(--ca-ink)', backgroundColor: '#ffffff', padding: '0.15rem 0.55rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 700 }}>
              ⚡ 1
            </span>
          </div>

          <div className="ca-contact-big-banner" onClick={copyEmail}>
            <p className="ca-name-label" style={{ fontSize: '2.4rem' }}>let's make something together</p>
            <span className="ca-display" style={{ fontSize: 'clamp(3.5rem, 9vw, 6.5rem)', lineHeight: 0.9 }}>
              {copiedEmail ? 'COPIED EMAIL!' : 'CONTACT'}
            </span>
            <span className="ca-mono" style={{ fontSize: '0.9rem', fontWeight: 700, borderBottom: '2px solid #191510', paddingBottom: '0.2rem' }}>
              {copiedEmail ? 'Ready to send ✉️' : 'DROP A LINE ↗'}
            </span>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          FOOTER
         ══════════════════════════════════════════════ */}
      <footer className="ca-footer-wrap">
        <svg viewBox="0 0 1440 40" fill="none" className="ca-footer-arc-line" preserveAspectRatio="none">
          <path d="M0 30 Q720 0 1440 30" stroke="rgba(25, 21, 16, 0.2)" strokeWidth="1.5" />
        </svg>

        <div className="ca-footer-inner">
          <div className="ca-footer-top-row">
            <div>
              <p className="ca-display" style={{ fontSize: 'clamp(2.4rem, 6vw, 4.5rem)', lineHeight: 0.95 }}>ROBIN VALE</p>
              <p className="ca-mono" style={{ fontSize: '0.85rem', marginTop: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--ca-blue)' }}></span>
                PRODUCT DESIGNER
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '1.25rem' }}>
              <div className="ca-footer-nav-links">
                <button className="ca-footer-nav-link" onClick={() => scrollTo(aboutRef, 'about')}>ABOUT</button>
                <button className="ca-footer-nav-link" onClick={() => scrollTo(worksRef, 'works')}>CASE STUDY</button>
                <button className="ca-footer-nav-link" onClick={() => scrollTo(contactRef, 'contact')}>CONTACT</button>
              </div>

              <div style={{ display: 'flex', gap: '0.6rem' }}>
                <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer" className="ca-social-circle yellow" aria-label="LinkedIn">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76c.94 0 1.7-.76 1.7-1.7s-.76-1.7-1.7-1.7-1.7.76-1.7 1.7.76 1.7 1.7 1.7m1.39 9.74v-8.37H5.07v8.37h2.78z"/></svg>
                </a>
                <a href={PERSONAL_INFO.github} target="_blank" rel="noopener noreferrer" className="ca-social-circle magenta" aria-label="GitHub">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/></svg>
                </a>
                <a href={PERSONAL_INFO.instagram} target="_blank" rel="noopener noreferrer" className="ca-social-circle green" aria-label="Instagram">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
              </div>
            </div>
          </div>

          <div className="ca-footer-bot-row">
            <span style={{ fontSize: '0.85rem', color: 'rgba(25,21,16,0.7)' }}>© 2026 Robin Vale</span>
            <span className="ca-mono" style={{ fontSize: '0.75rem', fontWeight: 700, backgroundColor: 'var(--ca-chrome)', padding: '0.35rem 0.85rem', borderRadius: '9999px' }}>
              ✦ MADE WITH PORTFOLIOFY
            </span>
          </div>
        </div>
      </footer>

      {/* ══════════════════════════════════════════════
          CASE STUDY DEEP-DIVE MODAL
         ══════════════════════════════════════════════ */}
      {activeCaseStudy && (
        <div className="ca-modal-backdrop" onClick={() => setActiveCaseStudy(null)}>
          <div className="ca-modal-card" onClick={(e) => e.stopPropagation()}>
            <button
              className="ca-modal-close-btn"
              onClick={() => setActiveCaseStudy(null)}
              aria-label="Close modal"
            >
              ✕
            </button>

            <span className="ca-mono" style={{ fontSize: '0.85rem', color: 'var(--ca-blue)', fontWeight: 700 }}>
              ● {activeCaseStudy.title} · Case Study
            </span>
            <h2 className="ca-display" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', marginTop: '0.5rem', lineHeight: 1 }}>
              {activeCaseStudy.title}
            </h2>
            <p style={{ fontSize: '1.2rem', marginTop: '0.5rem', color: 'rgba(25,21,16,0.8)' }}>
              {activeCaseStudy.desc}
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem', margin: '2rem 0', padding: '1.25rem', backgroundColor: 'var(--ca-chrome)', border: '2px solid var(--ca-ink)' }}>
              <div>
                <p className="ca-mono" style={{ fontSize: '0.75rem', opacity: 0.7 }}>ROLE</p>
                <p style={{ fontWeight: 700 }}>Lead Product Designer</p>
              </div>
              <div>
                <p className="ca-mono" style={{ fontSize: '0.75rem', opacity: 0.7 }}>TIMELINE</p>
                <p style={{ fontWeight: 700 }}>5 Months</p>
              </div>
              <div>
                <p className="ca-mono" style={{ fontSize: '0.75rem', opacity: 0.7 }}>TEAM</p>
                <p style={{ fontWeight: 700 }}>2 designers, 4 engineers</p>
              </div>
              <div>
                <p className="ca-mono" style={{ fontSize: '0.75rem', opacity: 0.7 }}>YEAR</p>
                <p style={{ fontWeight: 700 }}>2026</p>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginTop: '2rem' }}>
              <div>
                <span className="ca-hand-tape-box yellow" style={{ fontSize: '1.3rem' }}>the challenge</span>
                <p style={{ marginTop: '0.75rem', fontSize: '1.05rem', lineHeight: 1.7 }}>
                  {activeCaseStudy.problem}
                </p>
              </div>

              <div>
                <span className="ca-hand-tape-box mint" style={{ fontSize: '1.3rem' }}>the approach</span>
                <p style={{ marginTop: '0.75rem', fontSize: '1.05rem', lineHeight: 1.7 }}>
                  {activeCaseStudy.solution}
                </p>
              </div>

              <div>
                <span className="ca-hand-tape-box yellow" style={{ fontSize: '1.3rem' }}>the results</span>
                <p style={{ marginTop: '0.75rem', fontSize: '1.05rem', lineHeight: 1.7 }}>
                  {activeCaseStudy.result}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
