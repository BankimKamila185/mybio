import React, { useState, useEffect, useRef } from 'react';
import './App.css';

import { PERSONAL_INFO } from './data/portfolioData';

const FEATURED_WORKS = [
  {
    num: "01",
    tabClass: "tab-pos-0",
    tabBg: "#2563eb",
    tabTextColor: "#ffffff",
    cardClass: "ca-card-blue",
    date: "2026 · FULL-STACK WEB",
    title: "Reactify",
    desc: "Real-time anonymous live voting engine with WebSockets, instant room codes, and zero sign-up friction.",
    tags: ["REACT", "NODE.JS", "SOCKET.IO", "MONGODB"],
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
    role: "Full-Stack Engineer & Architect",
    timeline: "3 Months",
    team: "Lead Developer",
    year: "2026",
    link: "https://reactify-pink.vercel.app",
    github: "https://github.com/BankimKamila185/Reactify",
    problem: "Traditional polling tools mandate lengthy account sign-ups, suffer from high websocket latency during live audience interaction, and fail under sudden concurrent traffic bursts.",
    solution: "Engineered high-concurrency anonymous voting rooms with zero-latency WebSocket broadcasting, animated live tally charts, and clean responsive UI with instant room code sharing.",
    result: "Sub-50ms sync latency across 100+ connected clients, zero barrier to entry for participants, and 100% session reliability during live presentations."
  },
  {
    num: "02",
    tabClass: "tab-pos-1",
    tabBg: "#191510",
    tabTextColor: "#ffffff",
    cardClass: "ca-card-charcoal",
    date: "2026 · FINTECH TOOL",
    title: "PayIt",
    desc: "Automated invoice calculation, tax rendering, and historical ledger powered by a Python & FastAPI backend.",
    tags: ["PYTHON", "FASTAPI", "REACT", "POSTGRESQL"],
    img: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=1200&auto=format&fit=crop",
    role: "Backend & Systems Developer",
    timeline: "2 Months",
    team: "Solo Project",
    year: "2026",
    link: "https://payit-mu.vercel.app",
    github: "https://github.com/BankimKamila185/payit-",
    problem: "Freelancers and small agencies lose hours manually calculating invoice tax splits, generating error-prone billing PDFs, and tracking overdue payment states.",
    solution: "Built a robust invoicing engine powered by Python and FastAPI with automated tax calculations, dynamic PDF invoice rendering, and persistent ledger storage.",
    result: "Eliminated calculation errors, reduced invoice generation time to under 30 seconds, and provided one-click downloadable PDF exports."
  },
  {
    num: "03",
    tabClass: "tab-pos-2",
    tabBg: "#f59e0b",
    tabTextColor: "#191510",
    cardClass: "ca-card-yellow",
    date: "2026 · AI & ML",
    title: "Pixora",
    desc: "AI Image Studio extracting dominant color palettes via K-Means clustering and applying neural filters in real time.",
    tags: ["PYTHON", "OPENCV", "K-MEANS", "REACT"],
    img: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1200&auto=format&fit=crop",
    role: "AI / ML Developer",
    timeline: "2 Months",
    team: "Lead Developer",
    year: "2026",
    link: "https://pixora-lake.vercel.app",
    github: "https://github.com/BankimKamila185/pixora",
    problem: "Designers and developers often lack quick tools to mathematically isolate dominant color schemes and harmonize assets directly from raw photo uploads.",
    solution: "Applied unsupervised K-Means clustering in Python to extract prominent RGB/HEX color clusters, combined with instant browser canvas neural filter previews.",
    result: "Sub-second palette extraction, exact HEX/RGB copying for design workflows, and seamless in-browser canvas transformations."
  },
  {
    num: "04",
    tabClass: "tab-pos-3",
    tabBg: "#ff2d78",
    tabTextColor: "#191510",
    cardClass: "ca-card-magenta",
    date: "2026 · MARKETPLACE",
    title: "WastCraft",
    desc: "Circular economy platform connecting households with localized recyclers with scrap categorization and pricing.",
    tags: ["REACT", "JAVASCRIPT", "TAILWIND", "VERCEL"],
    img: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=1200&auto=format&fit=crop",
    role: "Full Stack Developer",
    timeline: "3 Months",
    team: "Core Contributor",
    year: "2026",
    link: "https://wastcraft.vercel.app",
    github: "https://github.com/BankimKamila185/wastcraft",
    problem: "Household recyclables are often discarded as trash due to lack of price transparency and disconnected scrap pickup services.",
    solution: "Created an intuitive marketplace connecting scrap sellers with verified local recyclers, featuring transparent itemized scrap rate estimation.",
    result: "Empowered urban households to monetize sorted recyclables and reduced neighborhood landfill waste."
  },
  {
    num: "05",
    tabClass: "tab-pos-4",
    tabBg: "#8b5cf6",
    tabTextColor: "#ffffff",
    cardClass: "ca-card-purple",
    date: "2026 · DESIGN SYSTEM",
    title: "Brand Studio",
    desc: "Fluid typography scales, CSS token architecture, and high-performance interactive micro-animations.",
    tags: ["REACT", "VITE", "CSS TOKENS", "UI/UX"],
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop",
    role: "Design Engineer",
    timeline: "1 Month",
    team: "Solo Project",
    year: "2026",
    link: "https://brand-two-mocha.vercel.app",
    github: "https://github.com/BankimKamila185/brand",
    problem: "Modern web applications frequently suffer from inconsistent typography scales, jarring layout shifts, and fragmented UI tokens across pages.",
    solution: "Engineered a living design showcase featuring mathematical fluid clamp() typography scales, dark-mode CSS custom properties, and buttery micro-animations.",
    result: "100/100 Lighthouse performance, zero layout shift, and clean reusable design tokens ready for production deployment."
  }
];

export default function App() {
  const [currentPage, setCurrentPage] = useState('home'); // 'home' | 'about' | 'works'
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeCaseStudy, setActiveCaseStudy] = useState(null);

  const contactRef = useRef(null);

  const navigateTo = (pageId) => {
    setCurrentPage(pageId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToContact = () => {
    setMobileMenuOpen(false);
    contactRef.current?.scrollIntoView({ behavior: 'smooth' });
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
              onClick={() => navigateTo('home')}
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
              <button
                className={`ca-nav-tab ${currentPage === 'home' ? 'active' : ''}`}
                onClick={() => navigateTo('home')}
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 2l2.9 6.26 6.85.72-5.1 4.62 1.44 6.7L12 17.6l-6.09 3.7 1.44-6.7-5.1-4.62 6.85-.72z"/></svg>
                Home
              </button>

              <button
                className={`ca-nav-tab ${currentPage === 'about' ? 'active' : ''}`}
                onClick={() => navigateTo('about')}
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 3a3.6 3.6 0 100 7.2A3.6 3.6 0 0012 3zM4.8 20a7.2 7.2 0 0114.4 0z"/></svg>
                About
              </button>

              <button
                className={`ca-nav-tab ${currentPage === 'works' ? 'active' : ''}`}
                onClick={() => navigateTo('works')}
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
              onClick={scrollToContact}
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
            <button className={`ca-nav-tab ${currentPage === 'home' ? 'active' : ''}`} onClick={() => navigateTo('home')}>⭐ Home</button>
            <button className={`ca-nav-tab ${currentPage === 'about' ? 'active' : ''}`} onClick={() => navigateTo('about')}>👤 About</button>
            <button className={`ca-nav-tab ${currentPage === 'works' ? 'active' : ''}`} onClick={() => navigateTo('works')}>田 Case Study</button>
            <button className="ca-nav-tab" onClick={scrollToContact}>🖤 Contact</button>
          </div>
        )}
      </header>

      {/* ══════════════════════════════════════════════
          PAGE 1: HOME PAGE
         ══════════════════════════════════════════════ */}
      {currentPage === 'home' && (
        <>
          {/* HERO CANVAS */}
          <section className="ca-hero" id="home">
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

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <p className="ca-name-label">my name is</p>
              <svg className="ca-name-underline" viewBox="0 0 64 12" fill="none" stroke="#191510" strokeWidth="1.6" strokeLinecap="round">
                <path d="M3 4c18-3 40-3 58 0" />
                <path d="M9 9c14-2.5 32-2.5 46 0" />
              </svg>
            </div>

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

            <p className="ca-status-line">
              <span className="ca-status-blue-dot"></span>
              OPEN TO NEW WORK AND GOOD PROBLEMS
            </p>

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

            <button className="ca-hero-contact-cta" onClick={scrollToContact}>
              <span className="ca-blue-arrow-box">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8">
                  <path d="M7 17 17 7M9 7h8v8" />
                </svg>
              </span>
              Contact me
            </button>
          </section>

          {/* FEATURED WORKS - SCROLL-DRIVEN STACKING FOLDERS */}
          <section className="ca-works-wrap" id="works">
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

            <div className="ca-stack-container">
              {FEATURED_WORKS.map((p, idx) => (
                <article
                  key={p.title}
                  className="ca-stack-article"
                  style={{ zIndex: idx + 1 }}
                >
                  <div className={`ca-tab-handle-row ${p.tabClass}`}>
                    <span
                      className={`ca-stack-tab-pill ${idx > 0 ? (idx === FEATURED_WORKS.length - 1 ? 'trapezoid tab-last' : 'trapezoid') : ''}`}
                      style={{
                        backgroundColor: p.tabBg,
                        color: p.tabTextColor
                      }}
                    >
                      ✦ PROJECT {p.num}
                    </span>
                  </div>

                  <div className={`ca-work-card ${p.cardClass}`}>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <div>
                        <span className="ca-mono" style={{ fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.15em', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                          <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: p.cardClass === 'ca-card-magenta' || p.cardClass === 'ca-card-yellow' ? '#191510' : '#ffffff' }}></span>
                          {p.date}
                        </span>
                        <h2 className="ca-work-title" style={{ color: p.cardClass === 'ca-card-magenta' || p.cardClass === 'ca-card-yellow' ? '#191510' : '#ffffff' }}>
                          {p.title}
                        </h2>
                        <p className="ca-work-desc" style={{ color: p.cardClass === 'ca-card-magenta' || p.cardClass === 'ca-card-yellow' ? '#191510' : 'rgba(255,255,255,0.92)' }}>
                          {p.desc}
                        </p>
                        
                        <div style={{ display: 'flex', gap: '0.85rem', alignItems: 'center', marginTop: '1.25rem', flexWrap: 'wrap' }}>
                          <button
                            onClick={() => setActiveCaseStudy(p)}
                            className="ca-work-link"
                            style={{ color: p.cardClass === 'ca-card-magenta' || p.cardClass === 'ca-card-yellow' ? '#191510' : '#ffffff' }}
                          >
                            VIEW CASE STUDY ↗
                          </button>
                          {p.link && (
                            <a
                              href={p.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="ca-work-link"
                              style={{
                                color: p.cardClass === 'ca-card-magenta' || p.cardClass === 'ca-card-yellow' ? '#191510' : '#ffffff',
                                borderBottomStyle: 'dashed',
                                opacity: 0.95
                              }}
                            >
                              LIVE APP ↗
                            </a>
                          )}
                          {p.github && (
                            <a
                              href={p.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="ca-work-link"
                              style={{
                                color: p.cardClass === 'ca-card-magenta' || p.cardClass === 'ca-card-yellow' ? '#191510' : '#ffffff',
                                borderBottomStyle: 'dashed',
                                opacity: 0.95
                              }}
                            >
                              GITHUB ↗
                            </a>
                          )}
                        </div>
                      </div>

                      <div className="ca-work-tags">
                        {p.tags.map(t => (
                          <span key={t} className="ca-work-tag-badge">{t}</span>
                        ))}
                      </div>
                    </div>

                    <div style={{ alignSelf: 'center' }}>
                      <div className="ca-work-mockup-frame">
                        <span className="ca-tape-mockup-tl" aria-hidden="true" />
                        <span className="ca-tape-mockup-tr" aria-hidden="true" />
                        <img
                          src={p.img}
                          alt={p.title}
                          style={{ width: '100%', height: '360px', objectFit: 'cover', display: 'block' }}
                        />
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* ABOUT ME PREVIEW SECTION */}
          <section className="ca-about-wrap" id="about">
            <p className="ca-about-eyebrow">about me!</p>
            <div className="ca-doodle-frame-title">
              <span>what's up</span>
            </div>

            <div className="ca-about-center-stage">
              <div className="ca-flank-polaroid-left">
                <span className="ca-tape-corner-left" aria-hidden="true" />
                <span className="ca-tape-corner-right" aria-hidden="true" />
                <img src="/profile.png" alt="2026" className="ca-polaroid-img-taped" />
                <p className="ca-hand" style={{ fontSize: '1.25rem', marginTop: '0.6rem' }}>2026</p>
              </div>

              <div className="ca-flank-polaroid-right">
                <span className="ca-tape-corner-left" aria-hidden="true" />
                <span className="ca-tape-corner-right" aria-hidden="true" />
                <img src="/hero.png" alt="my workspace" className="ca-polaroid-img-taped" />
                <p className="ca-hand" style={{ fontSize: '1.25rem', marginTop: '0.6rem' }}>my workspace</p>
              </div>

              <p className="ca-manifesto-large">
                I'm a technologist and product builder from Mumbai serving as CTO & COO at The Outliers Studio. ✨ I engineer full-stack web apps, Python backends, real-time WebSocket systems, and AI models that solve real problems. 🚀
              </p>
            </div>

            <div className="ca-skills-sticker-grid">
              <div className="ca-skill-sticker sticker-yellow">
                <div className="ca-sticker-icon-wrap">
                  <span>⚡</span>
                </div>
                <div className="ca-sticker-info">
                  <span className="ca-sticker-title">Full-Stack Web</span>
                  <span className="ca-sticker-sub">React · Node.js · Express · Vite</span>
                </div>
              </div>

              <div className="ca-skill-sticker sticker-green">
                <div className="ca-sticker-icon-wrap">
                  <span>🐍</span>
                </div>
                <div className="ca-sticker-info">
                  <span className="ca-sticker-title">Python &amp; FastAPI</span>
                  <span className="ca-sticker-sub">REST APIs · PostgreSQL · Microservices</span>
                </div>
              </div>

              <div className="ca-skill-sticker sticker-magenta">
                <div className="ca-sticker-icon-wrap">
                  <span>🤖</span>
                </div>
                <div className="ca-sticker-info">
                  <span className="ca-sticker-title">AI &amp; Computer Vision</span>
                  <span className="ca-sticker-sub">K-Means · Neural Filters · OpenCV</span>
                </div>
              </div>

              <div className="ca-skill-sticker sticker-blue">
                <div className="ca-sticker-icon-wrap">
                  <span>📡</span>
                </div>
                <div className="ca-sticker-info">
                  <span className="ca-sticker-title">Real-Time WebSockets</span>
                  <span className="ca-sticker-sub">Socket.io · Live Tallies · High Concurrency</span>
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      {/* ══════════════════════════════════════════════
          PAGE 2: DEDICATED ABOUT PAGE
         ══════════════════════════════════════════════ */}
      {currentPage === 'about' && (
        <div style={{ paddingTop: '3rem' }}>
          <section className="ca-about-wrap">
            <p className="ca-about-eyebrow">about me!</p>
            <div className="ca-doodle-frame-title">
              <span>what's up</span>
            </div>

            <div className="ca-about-center-stage">
              <div className="ca-flank-polaroid-left">
                <span className="ca-tape-corner-left" aria-hidden="true" />
                <span className="ca-tape-corner-right" aria-hidden="true" />
                <img src="/profile.png" alt="2026" className="ca-polaroid-img-taped" />
                <p className="ca-hand" style={{ fontSize: '1.25rem', marginTop: '0.6rem' }}>2026</p>
              </div>

              <div className="ca-flank-polaroid-right">
                <span className="ca-tape-corner-left" aria-hidden="true" />
                <span className="ca-tape-corner-right" aria-hidden="true" />
                <img src="/hero.png" alt="my workspace" className="ca-polaroid-img-taped" />
                <p className="ca-hand" style={{ fontSize: '1.25rem', marginTop: '0.6rem' }}>my workspace</p>
              </div>

              <p className="ca-manifesto-large">
                I'm a technologist and product builder from Mumbai serving as CTO & COO at The Outliers Studio. ✨ I engineer full-stack web apps, Python backends, real-time WebSocket systems, and AI models that solve real problems. 🚀
              </p>
            </div>

            <div className="ca-skills-sticker-grid">
              <div className="ca-skill-sticker sticker-yellow">
                <div className="ca-sticker-icon-wrap">
                  <span>⚡</span>
                </div>
                <div className="ca-sticker-info">
                  <span className="ca-sticker-title">Full-Stack Web</span>
                  <span className="ca-sticker-sub">React · Node.js · Express · Vite</span>
                </div>
              </div>

              <div className="ca-skill-sticker sticker-green">
                <div className="ca-sticker-icon-wrap">
                  <span>🐍</span>
                </div>
                <div className="ca-sticker-info">
                  <span className="ca-sticker-title">Python &amp; FastAPI</span>
                  <span className="ca-sticker-sub">REST APIs · PostgreSQL · Microservices</span>
                </div>
              </div>

              <div className="ca-skill-sticker sticker-magenta">
                <div className="ca-sticker-icon-wrap">
                  <span>🤖</span>
                </div>
                <div className="ca-sticker-info">
                  <span className="ca-sticker-title">AI &amp; Computer Vision</span>
                  <span className="ca-sticker-sub">K-Means · Neural Filters · OpenCV</span>
                </div>
              </div>

              <div className="ca-skill-sticker sticker-blue">
                <div className="ca-sticker-icon-wrap">
                  <span>📡</span>
                </div>
                <div className="ca-sticker-info">
                  <span className="ca-sticker-title">Real-Time WebSockets</span>
                  <span className="ca-sticker-sub">Socket.io · Live Tallies · High Concurrency</span>
                </div>
              </div>
            </div>

            {/* Extended Experience & Story Cards */}
            <div style={{ maxWidth: '820px', margin: '5rem auto 0', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div style={{ backgroundColor: '#ffffff', border: '3px solid var(--ca-ink)', padding: '2rem', boxShadow: '6px 6px 0 var(--ca-ink)' }}>
                <span className="ca-hand-tape-box yellow" style={{ fontSize: '1.4rem' }}>my philosophy</span>
                <p style={{ marginTop: '1rem', fontSize: '1.1rem', lineHeight: 1.7, color: 'var(--ca-ink)' }}>
                  Great software should be blazingly fast, reliable, and intuitive. I combine deep engineering rigor with user empathy to architect products that deliver exceptional performance and solve real operational needs.
                </p>
              </div>

              <div style={{ backgroundColor: '#ffffff', border: '3px solid var(--ca-ink)', padding: '2rem', boxShadow: '6px 6px 0 var(--ca-ink)' }}>
                <span className="ca-hand-tape-box mint" style={{ fontSize: '1.4rem' }}>background &amp; experience</span>
                <p style={{ marginTop: '1rem', fontSize: '1.1rem', lineHeight: 1.7, color: 'var(--ca-ink)' }}>
                  Currently CTO & COO at The Outliers Studio, studying AI & Machine Learning at ITM Skills University. I have shipped 10+ production web and backend applications, created 55+ open-source repositories, and specialize in high-concurrency systems, Python microservices, and modern frontend platforms.
                </p>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* ══════════════════════════════════════════════
          PAGE 3: DEDICATED CASE STUDY PAGE
         ══════════════════════════════════════════════ */}
      {currentPage === 'works' && (
        <div style={{ paddingTop: '3rem' }}>
          <section className="ca-works-wrap">
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
                Real-world web apps, AI systems, and fintech platforms shipped to production.
              </span>
            </div>

            <div className="ca-stack-container">
              {FEATURED_WORKS.map((p, idx) => (
                <article
                  key={p.title}
                  className="ca-stack-article"
                  style={{ zIndex: idx + 1 }}
                >
                  <div className={`ca-tab-handle-row ${p.tabClass}`}>
                    <span
                      className={`ca-stack-tab-pill ${idx > 0 ? (idx === FEATURED_WORKS.length - 1 ? 'trapezoid tab-last' : 'trapezoid') : ''}`}
                      style={{
                        backgroundColor: p.tabBg,
                        color: p.tabTextColor
                      }}
                    >
                      ✦ PROJECT {p.num}
                    </span>
                  </div>

                  <div className={`ca-work-card ${p.cardClass}`}>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <div>
                        <span className="ca-mono" style={{ fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.15em', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                          <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: p.cardClass === 'ca-card-magenta' || p.cardClass === 'ca-card-yellow' ? '#191510' : '#ffffff' }}></span>
                          {p.date}
                        </span>
                        <h2 className="ca-work-title" style={{ color: p.cardClass === 'ca-card-magenta' || p.cardClass === 'ca-card-yellow' ? '#191510' : '#ffffff' }}>
                          {p.title}
                        </h2>
                        <p className="ca-work-desc" style={{ color: p.cardClass === 'ca-card-magenta' || p.cardClass === 'ca-card-yellow' ? '#191510' : 'rgba(255,255,255,0.92)' }}>
                          {p.desc}
                        </p>
                        
                        <div style={{ display: 'flex', gap: '0.85rem', alignItems: 'center', marginTop: '1.25rem', flexWrap: 'wrap' }}>
                          <button
                            onClick={() => setActiveCaseStudy(p)}
                            className="ca-work-link"
                            style={{ color: p.cardClass === 'ca-card-magenta' || p.cardClass === 'ca-card-yellow' ? '#191510' : '#ffffff' }}
                          >
                            VIEW CASE STUDY ↗
                          </button>
                          {p.link && (
                            <a
                              href={p.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="ca-work-link"
                              style={{
                                color: p.cardClass === 'ca-card-magenta' || p.cardClass === 'ca-card-yellow' ? '#191510' : '#ffffff',
                                borderBottomStyle: 'dashed',
                                opacity: 0.95
                              }}
                            >
                              LIVE APP ↗
                            </a>
                          )}
                          {p.github && (
                            <a
                              href={p.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="ca-work-link"
                              style={{
                                color: p.cardClass === 'ca-card-magenta' || p.cardClass === 'ca-card-yellow' ? '#191510' : '#ffffff',
                                borderBottomStyle: 'dashed',
                                opacity: 0.95
                              }}
                            >
                              GITHUB ↗
                            </a>
                          )}
                        </div>
                      </div>

                      <div className="ca-work-tags">
                        {p.tags.map(t => (
                          <span key={t} className="ca-work-tag-badge">{t}</span>
                        ))}
                      </div>
                    </div>

                    <div style={{ alignSelf: 'center' }}>
                      <div className="ca-work-mockup-frame">
                        <span className="ca-tape-mockup-tl" aria-hidden="true" />
                        <span className="ca-tape-mockup-tr" aria-hidden="true" />
                        <img
                          src={p.img}
                          alt={p.title}
                          style={{ width: '100%', height: '360px', objectFit: 'cover', display: 'block' }}
                        />
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      )}

      {/* ══════════════════════════════════════════════
          CONTACT SECTION (SHARED ACROSS ALL PAGES)
         ══════════════════════════════════════════════ */}
      <section ref={contactRef} className="ca-contact-wrap" id="contact">
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
          Got a project, a technical problem, or an idea to build together? Drop a line.
        </p>

        <div style={{ position: 'relative', maxWidth: '820px', margin: '3.5rem auto 0' }}>
          <div className="ca-comment-pinned">
            <span style={{ position: 'absolute', top: '-10px', left: '-12px', width: '55px', height: '18px', backgroundColor: 'rgba(254, 240, 138, 0.8)', transform: 'rotate(-38deg)', boxShadow: '0 1px 3px rgba(17,18,18,0.15)', zIndex: 10 }} />
            <span style={{ position: 'absolute', top: '-10px', right: '-12px', width: '55px', height: '18px', backgroundColor: 'rgba(251, 207, 232, 0.8)', transform: 'rotate(38deg)', boxShadow: '0 1px 3px rgba(17,18,18,0.15)', zIndex: 10 }} />
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
              <img src="/profile.png" alt="Bankim Chandra Kamila" style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }} />
              <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>Bankim Chandra Kamila</span>
            </div>
            <p style={{ fontSize: '0.88rem', lineHeight: 1.4, color: 'var(--ca-ink)' }}>
              CTO &amp; COO @ The Outliers Studio. Open to technology leadership, software engineering collaborations, and high-impact systems work.
            </p>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', marginTop: '0.75rem', border: '1.5px solid var(--ca-ink)', backgroundColor: '#ffffff', padding: '0.15rem 0.55rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 700 }}>
              ⚡ 55+ Repos
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
              <p className="ca-display" style={{ fontSize: 'clamp(2.4rem, 6vw, 4.5rem)', lineHeight: 0.95 }}>BANKIM KAMILA</p>
              <p className="ca-mono" style={{ fontSize: '0.85rem', marginTop: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--ca-blue)' }}></span>
                CTO &amp; COO · FULL-STACK &amp; AI ENGINEER
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '1.25rem' }}>
              <div className="ca-footer-nav-links">
                <button className="ca-footer-nav-link" onClick={() => navigateTo('about')}>ABOUT</button>
                <button className="ca-footer-nav-link" onClick={() => navigateTo('works')}>CASE STUDY</button>
                <button className="ca-footer-nav-link" onClick={scrollToContact}>CONTACT</button>
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
            <span style={{ fontSize: '0.85rem', color: 'rgba(25,21,16,0.7)' }}>© 2026 Bankim Chandra Kamila</span>
            <span className="ca-mono" style={{ fontSize: '0.75rem', fontWeight: 700, backgroundColor: 'var(--ca-chrome)', padding: '0.35rem 0.85rem', borderRadius: '9999px' }}>
              ✦ BUILT WITH PASSION
            </span>
          </div>
        </div>
      </footer>

      {/* ══════════════════════════════════════════════
          CASE STUDY DETAIL MODAL
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
              ● {activeCaseStudy.title} · Production Case Study
            </span>
            <h2 className="ca-display" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', marginTop: '0.5rem', lineHeight: 1 }}>
              {activeCaseStudy.title}
            </h2>
            <p style={{ fontSize: '1.2rem', marginTop: '0.5rem', color: 'rgba(25,21,16,0.8)' }}>
              {activeCaseStudy.desc}
            </p>

            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '1rem' }}>
              {activeCaseStudy.tags?.map((t) => (
                <span key={t} className="ca-work-tag-badge" style={{ backgroundColor: '#ffffff', color: 'var(--ca-ink)' }}>
                  {t}
                </span>
              ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem', margin: '2rem 0', padding: '1.25rem', backgroundColor: 'var(--ca-chrome)', border: '2px solid var(--ca-ink)' }}>
              <div>
                <p className="ca-mono" style={{ fontSize: '0.75rem', opacity: 0.7 }}>ROLE</p>
                <p style={{ fontWeight: 700 }}>{activeCaseStudy.role || "Lead Developer"}</p>
              </div>
              <div>
                <p className="ca-mono" style={{ fontSize: '0.75rem', opacity: 0.7 }}>TIMELINE</p>
                <p style={{ fontWeight: 700 }}>{activeCaseStudy.timeline || "2-3 Months"}</p>
              </div>
              <div>
                <p className="ca-mono" style={{ fontSize: '0.75rem', opacity: 0.7 }}>AUTHOR</p>
                <p style={{ fontWeight: 700 }}>Bankim Chandra Kamila</p>
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
                <span className="ca-hand-tape-box mint" style={{ fontSize: '1.3rem' }}>the architectural solution</span>
                <p style={{ marginTop: '0.75rem', fontSize: '1.05rem', lineHeight: 1.7 }}>
                  {activeCaseStudy.solution}
                </p>
              </div>

              <div>
                <span className="ca-hand-tape-box yellow" style={{ fontSize: '1.3rem' }}>the outcome &amp; metrics</span>
                <p style={{ marginTop: '0.75rem', fontSize: '1.05rem', lineHeight: 1.7 }}>
                  {activeCaseStudy.result}
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '2.5rem', flexWrap: 'wrap' }}>
              {activeCaseStudy.link && (
                <a
                  href={activeCaseStudy.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ca-hero-contact-cta"
                  style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.6rem' }}
                >
                  <span className="ca-blue-arrow-box">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8">
                      <path d="M7 17 17 7M9 7h8v8" />
                    </svg>
                  </span>
                  Open Live Application ↗
                </a>
              )}
              {activeCaseStudy.github && (
                <a
                  href={activeCaseStudy.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ca-hero-contact-cta"
                  style={{ textDecoration: 'none', backgroundColor: '#ffffff', color: 'var(--ca-ink)' }}
                >
                  View GitHub Source Code ↗
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
