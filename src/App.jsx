import React, { useState, useEffect, useRef } from 'react';
import './App.css';

import { FEATURED_PROJECTS, EXPERIENCE, CERTIFICATIONS, EDUCATION, PERSONAL_INFO } from './data/portfolioData';
import { TECH_STACK_ITEMS } from './data/techIcons';

const PRINCIPLES = [
  {
    title: "Start with the why",
    body: "Before I open a code editor or design tool, I want to know what we're actually solving and who it's for. Skip that and you ship something polished that nobody needed. Every good project starts with a better question.",
    note: "questions before code."
  },
  {
    title: "Design for a bad day",
    body: "Nobody uses your product rested, on gigabit fiber, with infinite time to spare. I design for spotty signals, rushed deadlines, and edge cases. That's where good architecture earns its keep.",
    note: "no perfect users here!"
  },
  {
    title: "Make it with the team",
    body: "The best work I've shipped came from engineers, designers, and PMs poking holes in it early while it was still a rough concept. I'd rather be wrong on a Tuesday whiteboard than precious about a deployment Friday.",
    note: "us, not me."
  }
];

const PLAYGROUND_PHOTOS = [
  { caption: "random shot", rotate: "-2deg", color: "var(--ca-yellow-soft)", img: "/hero.png" },
  { caption: "what is this", rotate: "3deg", color: "var(--ca-mint)", img: "/profile.png" },
  { caption: "hello world", rotate: "-3deg", color: "var(--ca-cyan-soft)", img: "/hero.png" },
  { caption: "first time", rotate: "2deg", color: "var(--ca-pink-soft)", img: "/profile.png" },
  { caption: "20th take", rotate: "-1deg", color: "var(--ca-yellow-soft)", img: "/hero.png" },
  { caption: "practiceee", rotate: "3deg", color: "var(--ca-mint)", img: "/profile.png" },
  { caption: "uhm", rotate: "-2deg", color: "var(--ca-cyan-soft)", img: "/hero.png" },
  { caption: "found!", rotate: "1deg", color: "var(--ca-pink-soft)", img: "/profile.png" }
];

export default function App() {
  const [activeNav, setActiveNav] = useState('home');
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [splashPhase, setSplashPhase] = useState(1);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeCaseStudy, setActiveCaseStudy] = useState(null);

  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const worksRef = useRef(null);
  const playgroundRef = useRef(null);
  const contactRef = useRef(null);

  useEffect(() => {
    const timer1 = setTimeout(() => setSplashPhase(2), 900);
    return () => clearTimeout(timer1);
  }, []);

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

  const renderInteractiveWords = (sentence, startDelay = 0.2) => {
    return sentence.split(' ').map((word, idx) => (
      <React.Fragment key={idx}>
        <span
          className="ca-word-reveal revealed ca-word-interactive"
          style={{ animationDelay: `${startDelay + idx * 0.04}s` }}
        >
          {word}
        </span>
        {' '}
      </React.Fragment>
    ));
  };

  return (
    <div className="ca-app">
      {/* ══════════════════════════════════════════════
          INITIAL SPLASH LOADING SCREEN (OH, HELLO! YOU FOUND ME!)
         ══════════════════════════════════════════════ */}
      <div className="ca-splash-overlay" aria-hidden="true">
        {splashPhase === 1 ? (
          <div className="ca-splash-bubble">
            {renderStaggerText("Oh, hello!", 0.1, 0.05)}
          </div>
        ) : (
          <div className="ca-splash-bubble">
            {renderStaggerText("You found me!", 0.1, 0.05)}
          </div>
        )}
      </div>

      {/* Ruled Notebook Lines & Grain Background */}
      <div className="ca-notebook-bg" aria-hidden="true" />
      <div className="ca-grain" aria-hidden="true" />

      {/* ══════════════════════════════════════════════
          TOP HEADER (EXACT 1:1 RECREATION)
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
              <svg viewBox="0 0 24 24" width="32" height="32">
                <circle cx="12" cy="12" r="10" fill="#ff2d78" stroke="#ffffff" strokeWidth="2.5" />
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

              {/* PLAYGROUND Tab */}
              <button
                className={`ca-nav-tab ${activeNav === 'playground' ? 'active' : ''}`}
                onClick={() => scrollTo(playgroundRef, 'playground')}
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 2l10 10-10 10L2 12z"/></svg>
                Playground
              </button>
            </nav>
          </div>

          {/* Right: Round Social Buttons + Contact CTA */}
          <div className="ca-header-right">
            {/* LinkedIn (Yellow) */}
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="ca-social-circle yellow"
              aria-label="LinkedIn"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76c.94 0 1.7-.76 1.7-1.7s-.76-1.7-1.7-1.7-1.7.76-1.7 1.7.76 1.7 1.7 1.7m1.39 9.74v-8.37H5.07v8.37h2.78z"/></svg>
            </a>

            {/* GitHub / Dribbble (Magenta) */}
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="ca-social-circle magenta"
              aria-label="GitHub"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/></svg>
            </a>

            {/* Instagram (Green) */}
            <a
              href={PERSONAL_INFO.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="ca-social-circle green"
              aria-label="Instagram"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </a>

            {/* CONTACT Button with Heart Icon */}
            <button
              className="ca-header-contact-btn"
              onClick={() => scrollTo(contactRef, 'contact')}
            >
              <svg width="14" height="14" viewBox="0 0 24 22" fill="currentColor"><path d="M12 21C5 16 1 12 1 7.5 1 4 3.6 1.5 6.8 1.5c2 0 3.9 1 5.2 2.6 1.3-1.6 3.2-2.6 5.2-2.6C20.4 1.5 23 4 23 7.5 23 12 19 16 12 21Z"/></svg>
              Contact
            </button>

            {/* Mobile Menu Toggle Button */}
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

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="ca-mobile-drawer">
            <button className="ca-nav-tab" onClick={() => scrollTo(homeRef, 'home')}>⭐ Home</button>
            <button className="ca-nav-tab" onClick={() => scrollTo(aboutRef, 'about')}>👤 About</button>
            <button className="ca-nav-tab" onClick={() => scrollTo(worksRef, 'works')}>田 Case Study</button>
            <button className="ca-nav-tab" onClick={() => scrollTo(playgroundRef, 'playground')}>◆ Playground</button>
            <button className="ca-nav-tab" onClick={() => scrollTo(contactRef, 'contact')}>🖤 Contact</button>
          </div>
        )}
      </header>

      {/* ══════════════════════════════════════════════
          HERO SECTION (SAME TO SAME WITH SCREENSHOT)
         ══════════════════════════════════════════════ */}
      <section ref={homeRef} className="ca-hero" id="home">
        {/* Floating Circular Orange-Framed Avatars (Left & Right) with Float Animation */}
        <div className="ca-floating-avatar-left ca-gentle-float" aria-hidden="true">
          <div className="ca-avatar-ring">
            <img src="/profile.png" alt="" className="ca-avatar-img-circle" />
          </div>
        </div>

        <div className="ca-floating-avatar-right ca-gentle-float" aria-hidden="true" style={{ animationDelay: '1.5s' }}>
          <div className="ca-avatar-ring">
            <img src="/profile.png" alt="" className="ca-avatar-img-circle" />
          </div>
        </div>

        {/* "my name is" + Double Underline */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <p className="ca-name-label">{renderInteractiveWords("my name is", 0.1)}</p>
          <svg className="ca-name-underline" viewBox="0 0 64 12" fill="none" stroke="#191510" strokeWidth="1.6" strokeLinecap="round">
            <path d="M3 4c18-3 40-3 58 0" />
            <path d="M9 9c14-2.5 32-2.5 46 0" />
          </svg>
        </div>

        {/* Main Name Canvas with Orange Contour Box & Taped Notes */}
        <div className="ca-name-canvas-wrap">
          {/* Top-Left Pill Sticker: MADE THINGS */}
          <span className="ca-pill-tag purple ca-gentle-float" style={{ '--rot': '-12deg' }}>
            MADE THINGS
          </span>

          {/* Top-Right Pill Sticker: SWEAT THE DETAILS */}
          <span className="ca-pill-tag yellow-soft ca-gentle-float" style={{ '--rot': '12deg', animationDelay: '1s' }}>
            SWEAT THE DETAILS
          </span>

          {/* Hover Invert Lens with Corner Anchors */}
          <div className="ca-hover-invert-lens" aria-hidden="true">
            <span className="ca-lens-corner tl" />
            <span className="ca-lens-corner tr" />
            <span className="ca-lens-corner bl" />
            <span className="ca-lens-corner br" />
          </div>

          {/* The Big Orange Contour Box with Pixel Name */}
          <div className="ca-orange-contour-box">
            <h1 className="ca-pixel-hero-name">
              {renderStaggerText("BANKIM", 0.2, 0.08)}
            </h1>
          </div>

          {/* Bottom-Left Tape Note + Arrow: CTO & COO */}
          <div className="ca-sticky-note-left">
            <span className="ca-hand-tape-box yellow">
              CTO &amp; COO
            </span>
            <svg className="ca-hand-arrow" viewBox="0 0 40 40" fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M8 32 C 18 24, 25 18, 32 8" />
              <path d="M18 7 L 32 8 L 31 22" />
            </svg>
          </div>

          {/* Bottom-Right Tape Note + Arrow: Location */}
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

        {/* Status Line: Blue Dot + Open to new work */}
        <p className="ca-status-line">
          <span className="ca-status-blue-dot"></span>
          OPEN TO NEW WORK AND GOOD PROBLEMS
        </p>

        {/* Headline with Target / Concentric Radar and Flower Spinner */}
        <h2 className="ca-hero-headline-main">
          {renderInteractiveWords("I design software that", 0.3)}
          <svg viewBox="0 0 40 40" className="ca-spin-slow" aria-hidden="true" style={{ margin: '0 0.2em' }}>
            <circle cx="20" cy="20" r="18" fill="#22c55e" stroke="#191510" strokeWidth="2.5" />
            <circle cx="20" cy="20" r="11" fill="#faf6ee" />
            <circle cx="20" cy="20" r="5" fill="#22c55e" />
            <circle cx="14" cy="9" r="2.4" fill="#191510" />
          </svg>
          <br />
          {renderInteractiveWords("gets out of your way.", 0.5)}
          <svg viewBox="0 0 40 40" className="ca-spin-slow" aria-hidden="true" style={{ margin: '0 0.2em' }}>
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

        {/* Contact CTA Button (Black box with Blue Arrow square) */}
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
        <svg viewBox="0 0 1440 130" fill="none" preserveAspectRatio="none" style={{ width: '100%', height: '60px', marginBottom: '2rem' }}>
          <path d="M-10 120C420 10 1030 4 1450 80" stroke="rgba(25,21,16,0.2)" strokeWidth="1.5" />
        </svg>

        <div style={{ textAlign: 'center' }}>
          <p className="ca-name-label" style={{ marginBottom: '0.5rem' }}>about me!</p>
          <div className="ca-doodle-frame-title">
            <span>what's up</span>
          </div>

          {/* Taped Polaroid Photos on Left & Right */}
          <div className="ca-polaroids-row">
            <div className="ca-polaroid-taped ca-gentle-float" style={{ '--rot': '-3deg' }}>
              <span className="ca-tape-corner-left" aria-hidden="true" />
              <span className="ca-tape-corner-right" aria-hidden="true" />
              <img src="/profile.png" alt="2026" className="ca-polaroid-img-taped" />
              <p className="ca-hand" style={{ fontSize: '1.2rem', marginTop: '0.5rem' }}>2026</p>
            </div>

            <div className="ca-polaroid-taped right ca-gentle-float" style={{ '--rot': '3deg', animationDelay: '1.2s' }}>
              <span className="ca-tape-corner-left" aria-hidden="true" />
              <span className="ca-tape-corner-right" aria-hidden="true" />
              <img src="/hero.png" alt="my workspace" className="ca-polaroid-img-taped" />
              <p className="ca-hand" style={{ fontSize: '1.2rem', marginTop: '0.5rem' }}>my workspace</p>
            </div>
          </div>

          <p className="ca-manifesto-large">
            {renderInteractiveWords("I'm a technologist & builder who gets a little too excited about making complicated things feel simple. ✨ I care about the small details, the edge cases everyone forgets, and shipping work that genuinely makes someone's day easier. 🎨", 0.1)}
          </p>

          {/* Jagged Skill Badges with Alternating Cycling Emojis */}
          <div className="ca-jagged-skills">
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
            <div className="ca-jagged-item">
              <span className="ca-jagged-label magenta">Full-Stack Systems</span>
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

          {/* Principles Grid in About */}
          <div className="ca-principles-grid">
            {PRINCIPLES.map((principle, idx) => (
              <div key={idx} className="ca-principle-card">
                <span className="ca-principle-tape">{principle.note}</span>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '0.75rem' }}>{principle.title}</h3>
                <p style={{ fontSize: '0.95rem', color: 'rgba(25,21,16,0.85)', lineHeight: 1.6 }}>{principle.body}</p>
              </div>
            ))}
          </div>

          {/* Experience List in About */}
          <div className="ca-experience-section">
            <h3 className="ca-pixel" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Work &amp; History</h3>
            {EXPERIENCE.map((exp, idx) => (
              <div key={idx} className="ca-exp-row">
                <div>
                  <h4 style={{ fontSize: '1.15rem', fontWeight: 700 }}>{exp.role}</h4>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'rgba(25,21,16,0.7)' }}>{exp.company}</p>
                </div>
                <span className="ca-mono" style={{ fontSize: '0.85rem', fontWeight: 700, backgroundColor: 'var(--ca-yellow-soft)', padding: '0.25rem 0.75rem', borderRadius: '4px' }}>
                  {exp.period}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          FEATURED CASE STUDIES (STICKY STACKING)
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

        {/* Sticky Stacking Project Cards */}
        <div className="ca-stack-container">
          {FEATURED_PROJECTS.slice(0, 4).map((p, idx) => {
            const cardStyles = ['ca-card-blue', 'ca-card-ink', 'ca-card-yellow', 'ca-card-magenta'];
            const cardTheme = cardStyles[idx % cardStyles.length];
            const handleClass = `ca-tab-handle-${idx}`;

            return (
              <article key={p.title} className="ca-stack-card-wrap">
                {/* Numbered Tab with Staggered Offset & Trapezoid Clip-Path */}
                <div style={{ display: 'flex' }} className={handleClass}>
                  <span className={`ca-card-tab ${idx > 0 ? 'trapezoid' : ''}`}>
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M12 2c1 5 4 8 9 9-5 1-8 4-9 9-1-5-4-8-9-9 5-1 8-4 9-9Z"/></svg>
                    Project 0{idx + 1}
                  </span>
                </div>

                <div className={`ca-work-card ${cardTheme}`}>
                  {/* Left Column: Info */}
                  <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <span className="ca-mono" style={{ fontSize: '0.8rem', opacity: 0.9 }}>
                        ● {p.category}
                      </span>
                      <h3 className="ca-work-title">{p.title}</h3>
                      <p className="ca-work-desc">{p.longDesc || p.desc}</p>
                      
                      <button
                        onClick={() => setActiveCaseStudy(p)}
                        className="ca-work-link"
                      >
                        View project ↗
                      </button>
                    </div>

                    <div className="ca-work-tags">
                      {p.tags.map(t => (
                        <span key={t} className="ca-work-tag-badge">{t}</span>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Polaroid Mockup with Dual Tapes */}
                  <div style={{ alignSelf: 'center' }}>
                    <div className="ca-work-mockup-frame">
                      <span className="ca-tape-mockup-tl" aria-hidden="true" />
                      <span className="ca-tape-mockup-tr" aria-hidden="true" />
                      <div style={{ background: '#191510', padding: '2.5rem 1.5rem', textAlign: 'center', color: '#fff', minHeight: '220px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <h4 style={{ fontFamily: 'var(--font-pixel)', fontSize: '2.4rem', color: p.accent || '#ffe853' }}>
                          {p.title}
                        </h4>
                        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', marginTop: '0.5rem', color: '#ccc' }}>
                          {p.subtitle}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          CLIENTS / TRUSTED BY TAPED GRID
         ══════════════════════════════════════════════ */}
      <section className="ca-clients-wrap">
        <p className="ca-name-label">trusted by</p>
        <div className="ca-clients-grid">
          {[
            { name: 'THE OUTLIERS', color: 'var(--ca-yellow-soft)', rotate: '-2deg' },
            { name: 'REACT / VITE', color: 'var(--ca-mint)', rotate: '1deg' },
            { name: 'PYTHON / AI', color: 'var(--ca-cyan-soft)', rotate: '2deg' },
            { name: 'POSTMAN API', color: 'var(--ca-pink-soft)', rotate: '-1deg' },
            { name: 'FASTAPI', color: 'var(--ca-yellow-soft)', rotate: '-2deg' },
            { name: 'VERCEL', color: 'var(--ca-mint)', rotate: '1deg' }
          ].map((client, idx) => (
            <div key={idx} className="ca-client-tape-card" style={{ transform: `rotate(${client.rotate})` }}>
              <span className="ca-tape-strip-bg" style={{ backgroundColor: client.color }} aria-hidden="true" />
              <span className="ca-client-brand-name">{client.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          PLAYGROUND / ARSENAL / GALLERY
         ══════════════════════════════════════════════ */}
      <section ref={playgroundRef} className="ca-about-wrap" id="playground">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <p className="ca-name-label">playground</p>
          <div className="ca-doodle-frame-title">
            <span>just for fun</span>
          </div>
        </div>

        {/* Polaroid Snapshots Gallery Grid */}
        <div className="ca-playground-gallery">
          {PLAYGROUND_PHOTOS.map((item, idx) => (
            <div
              key={idx}
              className="ca-polaroid-grid-item"
              style={{ transform: `rotate(${item.rotate})` }}
            >
              <span
                style={{
                  position: 'absolute',
                  top: '-10px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '60px',
                  height: '18px',
                  backgroundColor: item.color,
                  boxShadow: '0 1px 3px rgba(17,18,18,0.15)',
                  zIndex: 10
                }}
              />
              <img src={item.img} alt={item.caption} style={{ width: '100%', aspectRatio: '1', objectFit: 'cover' }} />
              <p className="ca-hand" style={{ fontSize: '1.2rem', textAlign: 'center', marginTop: '0.5rem' }}>{item.caption}</p>
            </div>
          ))}
        </div>

        {/* Core Tech Stack Section */}
        <div style={{ marginTop: '5rem', textAlign: 'center' }}>
          <p className="ca-name-label">arsenal &amp; tools</p>
          <div className="ca-doodle-frame-title" style={{ fontSize: '1.8rem', marginTop: '0.5rem' }}>
            <span>CORE STACK</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.25rem', marginTop: '2rem' }}>
            {TECH_STACK_ITEMS.map(tech => (
              <div
                key={tech.name}
                style={{
                  backgroundColor: '#ffffff',
                  border: '2.5px solid #191510',
                  padding: '1.2rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  boxShadow: '3px 3px 0 #191510'
                }}
              >
                <div style={{ width: '42px', height: '42px', borderRadius: '50%', backgroundColor: 'var(--ca-chrome)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1.5px solid #191510' }}>
                  {tech.icon}
                </div>
                <div style={{ textAlign: 'left' }}>
                  <p style={{ fontWeight: 700, fontSize: '0.95rem' }}>{tech.name}</p>
                  <span className="ca-mono" style={{ fontSize: '0.75rem', color: 'rgba(25,21,16,0.6)' }}>{tech.category}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          CONTACT SECTION (SAME TO SAME WITH MASCOT)
         ══════════════════════════════════════════════ */}
      <section ref={contactRef} className="ca-contact-wrap" id="contact">
        {/* Animated Mascot with Blush Cheeks */}
        <svg viewBox="0 0 200 200" className="ca-mascot-smiley" aria-hidden="true">
          <circle cx="100" cy="100" r="88" fill="var(--ca-yellow)" stroke="var(--ca-ink)" strokeWidth="3.5" />
          <circle cx="56" cy="120" r="12" fill="var(--ca-magenta)" opacity="0.45" />
          <circle cx="144" cy="120" r="12" fill="var(--ca-magenta)" opacity="0.45" />
          <g className="ca-blink">
            <rect x="65" y="68" width="16" height="42" rx="8" fill="var(--ca-ink)" />
            <rect x="119" y="68" width="16" height="42" rx="8" fill="var(--ca-ink)" />
          </g>
          <path d="M62 130 Q100 172 138 130" fill="none" stroke="var(--ca-ink)" strokeWidth="6" strokeLinecap="round" />
        </svg>

        <div className="ca-lets-talk-wrap">
          {/* Hover Invert Lens on Contact Title */}
          <div className="ca-hover-invert-lens" aria-hidden="true">
            <span className="ca-lens-corner tl" />
            <span className="ca-lens-corner tr" />
            <span className="ca-lens-corner bl" />
            <span className="ca-lens-corner br" />
          </div>

          <h2 className="ca-lets-talk-title">
            {renderStaggerText("LET'S TALK", 0.1, 0.05)}
          </h2>
        </div>

        <p className="ca-manifesto-large" style={{ fontSize: '1.6rem', marginTop: '1rem' }}>
          {renderInteractiveWords("Got a project, a hard problem, or just want to say hi? Send it over. I read every message.", 0.2)}
        </p>

        {/* Big Yellow Banner Card */}
        <div style={{ position: 'relative', maxWidth: '820px', margin: '0 auto' }}>
          {/* Floating Cyan Comment Note */}
          <div className="ca-comment-pinned">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem' }}>
              <img src="/profile.png" alt="Bankim" style={{ width: '34px', height: '34px', borderRadius: '50%', border: '1.5px solid #191510' }} />
              <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>Bankim Kamila</span>
            </div>
            <p style={{ fontSize: '0.85rem', lineHeight: 1.4 }}>
              Open to contract work, leadership roles, and interesting conversations about hard software problems.
            </p>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', marginTop: '0.6rem', border: '1px solid var(--ca-blue)', padding: '0.15rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 700 }}>
              ⚡ 1
            </span>
          </div>

          <div className="ca-contact-big-banner" onClick={copyEmail}>
            <p className="ca-name-label" style={{ fontSize: '2.4rem' }}>let's make something together</p>
            <span className="ca-pixel" style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', lineHeight: 0.9 }}>
              {copiedEmail ? 'COPIED EMAIL!' : 'CONTACT'}
            </span>
            <span className="ca-mono" style={{ fontSize: '0.9rem', fontWeight: 700, borderBottom: '2px solid #191510', paddingBottom: '0.2rem' }}>
              {copiedEmail ? 'Ready to send ✉️' : 'drop a line ↗'}
            </span>
          </div>
        </div>
      </section>

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
              ● {activeCaseStudy.category} · Case Study
            </span>
            <h2 className="ca-pixel" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', marginTop: '0.5rem', lineHeight: 1 }}>
              {activeCaseStudy.title}
            </h2>
            <p style={{ fontSize: '1.2rem', marginTop: '0.5rem', color: 'rgba(25,21,16,0.8)' }}>
              {activeCaseStudy.subtitle}
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem', margin: '2rem 0', padding: '1.25rem', backgroundColor: 'var(--ca-chrome)', border: '2px solid var(--ca-ink)' }}>
              <div>
                <p className="ca-mono" style={{ fontSize: '0.75rem', opacity: 0.7 }}>ROLE</p>
                <p style={{ fontWeight: 700 }}>Lead Architect</p>
              </div>
              <div>
                <p className="ca-mono" style={{ fontSize: '0.75rem', opacity: 0.7 }}>TIMELINE</p>
                <p style={{ fontWeight: 700 }}>4 Months</p>
              </div>
              <div>
                <p className="ca-mono" style={{ fontSize: '0.75rem', opacity: 0.7 }}>TEAM</p>
                <p style={{ fontWeight: 700 }}>Core Product Team</p>
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
                  {activeCaseStudy.problem || "Users faced high latency and fragmented user journeys that led to cognitive fatigue. Navigation was buried under legacy constraints, and workflows felt like deciphering a manual."}
                </p>
              </div>

              <div>
                <span className="ca-hand-tape-box mint" style={{ fontSize: '1.3rem' }}>the approach</span>
                <p style={{ marginTop: '0.75rem', fontSize: '1.05rem', lineHeight: 1.7 }}>
                  {activeCaseStudy.solution || "We rebuilt the entire interaction pipeline around instant feedback and intuitive defaults. We removed 55% of intermediary steps and introduced intelligent optimistic updates."}
                </p>
              </div>

              <div>
                <span className="ca-hand-tape-box yellow" style={{ fontSize: '1.3rem' }}>the results</span>
                <p style={{ marginTop: '0.75rem', fontSize: '1.05rem', lineHeight: 1.7 }}>
                  {activeCaseStudy.result || "47% faster task execution, 2× weekly user retention, and zero dropped sessions during peak traffic spikes."}
                </p>
              </div>
            </div>

            {activeCaseStudy.link && (
              <a
                href={activeCaseStudy.link}
                target="_blank"
                rel="noopener noreferrer"
                className="ca-hero-contact-cta"
                style={{ marginTop: '2.5rem' }}
              >
                <span className="ca-blue-arrow-box">↗</span>
                Launch Live App
              </a>
            )}
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════
          FOOTER
         ══════════════════════════════════════════════ */}
      <footer style={{ borderTop: '2px solid var(--ca-ink)', padding: '4rem 1.5rem 3rem', backgroundColor: 'var(--ca-surface)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: '2rem' }}>
          <div>
            <p className="ca-pixel" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', lineHeight: 0.95 }}>Bankim Kamila</p>
            <p className="ca-mono" style={{ fontSize: '0.85rem', marginTop: '0.75rem' }}>
              <span style={{ display: 'inline-block', width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'var(--ca-blue)', marginRight: '0.5rem' }}></span>
              CTO &amp; COO · Technologist
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '1.25rem' }}>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer" className="ca-social-circle yellow" aria-label="LinkedIn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76c.94 0 1.7-.76 1.7-1.7s-.76-1.7-1.7-1.7-1.7.76-1.7 1.7.76 1.7 1.7 1.7m1.39 9.74v-8.37H5.07v8.37h2.78z"/></svg>
              </a>
              <a href={PERSONAL_INFO.github} target="_blank" rel="noopener noreferrer" className="ca-social-circle magenta" aria-label="GitHub">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/></svg>
              </a>
              <a href={PERSONAL_INFO.instagram} target="_blank" rel="noopener noreferrer" className="ca-social-circle green" aria-label="Instagram">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.85rem', color: 'rgba(25,21,16,0.7)' }}>© 2026 Bankim Kamila</span>
              <span className="ca-mono" style={{ fontSize: '0.75rem', fontWeight: 700, backgroundColor: 'var(--ca-chrome)', padding: '0.35rem 0.85rem', borderRadius: '9999px' }}>
                ✦ Made with Portfoliofy
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
