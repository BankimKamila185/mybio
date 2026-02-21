import React, { useState, useEffect, useRef, useCallback } from 'react';
import './App.css';

// ========================
// CERTIFICATIONS DATA
// ========================
const CERTIFICATIONS = [
  { title: 'GenAI 101 with Pieces', issuer: 'Pieces', date: 'Dec 2024' },
  { title: 'Postman API Fundamentals', issuer: 'Postman', date: 'Jul 2024' },
  { title: 'Google IT Support', issuer: 'Google / Coursera', date: 'Mar 2023' },
  { title: 'Digital Marketing', issuer: 'Google', date: 'Apr 2022' },
];

// ========================
// TECH STACK DATA
// ========================
const TECH_STACK = [
  { name: 'React', className: 'react' },
  { name: 'React Native', className: 'react' },
  { name: 'Node.js', className: 'node' },
  { name: 'Figma', className: 'figma' },
  { name: 'Python', className: 'python' },
  { name: 'Java', className: 'java' },
  { name: 'HTML', className: 'html' },
  { name: 'CSS', className: 'css' },
  { name: 'Android', className: 'android' },
  { name: 'GitHub', className: 'github' },
];

// ========================
// PORTFOLIOS DATA
// ========================
const PORTFOLIOS = [
  { title: 'My Work', desc: 'A collection of my best projects', link: '#', icon: 'M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z' },
  { title: 'Startup SIT', desc: 'Our innovative new platform', link: '#', icon: 'M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6' }
];

// ========================
// TYPING HOOK
// ========================
function useTyping(text, speed = 60, delay = 800) {
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
// HOVER SOUND (Web Audio)
// ========================
function playHoverSound() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.setValueAtTime(800, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.08);
    gain.gain.setValueAtTime(0.04, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
    osc.type = 'sine';
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.12);
    setTimeout(() => ctx.close(), 200);
  } catch (e) { /* ignore audio errors */ }
}

// ========================
// PARTICLES COMPONENT
// ========================
function Particles() {
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    size: `${1 + Math.random() * 2}px`,
    duration: `${8 + Math.random() * 12}s`,
    delay: `${Math.random() * 10}s`,
    opacity: 0.15 + Math.random() * 0.35,
  }));

  return (
    <div className="particles-container">
      {particles.map(p => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            animationDuration: p.duration,
            animationDelay: p.delay,
            opacity: p.opacity,
          }}
        />
      ))}
    </div>
  );
}

// ========================
// MAIN APP
// ========================
function App() {
  const [theme, setTheme] = useState('dark');
  const appRef = useRef(null);
  const cardsRef = useRef([]);

  // Typing animations
  const headline = useTyping('Frontend Developer | UI/UX Designer.', 50, 600);
  const subHeadline = useTyping('AI & Multimedia Creation', 50, headline.done ? 200 : 9999999);

  // ---- THEME TOGGLE ----
  const toggleTheme = useCallback(() => {
    setTheme(prev => {
      const next = prev === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      return next;
    });
  }, []);

  // ---- CARD GLOW UPDATE ----
  const handleMouseMove = useCallback((e) => {
    // Update card-internal glow
    cardsRef.current.forEach(card => {
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  }, []);

  // ---- MAGNETIC TILT ----
  const handleCardMouseMove = useCallback((e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
  }, []);

  const handleCardMouseLeave = useCallback((e) => {
    e.currentTarget.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)';
  }, []);

  // ---- SCROLL REVEAL ----
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Store card ref
  const addCardRef = useCallback((el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  }, []);

  // Card props helper
  const cardProps = (extraClass = '') => ({
    ref: addCardRef,
    onMouseMove: handleCardMouseMove,
    onMouseLeave: handleCardMouseLeave,
    onMouseEnter: playHoverSound,
    className: `bento-card ${extraClass}`.trim(),
  });

  return (
    <div className="App" ref={appRef} onMouseMove={handleMouseMove}>

      {/* Particles */}
      <Particles />

      {/* Theme Toggle */}
      <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
        {theme === 'dark' ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        )}
      </button>

      <div className="bento-portfolio">
        {/* === LEFT COLUMN === */}
        <div className="col-left">

          {/* Profile Card with Morphing Blob */}
          <div
            className="bento-card profile-card-glass staggered-enter"
            style={{ '--stagger': 0 }}
          >
            {/* Morphing Blob */}
            <div className="morph-blob"></div>

            <img className="profile-bg-img" src="/profile.png" alt="Bankim Chandra Kamila" />
            <div className="profile-fog-overlay"></div>

            <div className="profile-glass-content">


              <div className="profile-fog-header">
                <h1>Bankim Chandra Kamila</h1>
                <svg className="verified-icon" viewBox="0 0 24 24" fill="currentColor">
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

          {/* --- Social Connect Card --- */}
          <div
            {...cardProps('social-connect-card glass-tier-2 staggered-enter reveal')}
            style={{ '--stagger': 1 }}
          >
            <h3 className="social-connect-title">Connect with me</h3>
            <div className="social-icons-row">
              {/* WhatsApp (Bubble only) */}
              <a href="https://wa.me/6281246345166" target="_blank" rel="noopener noreferrer" className="social-icon-btn whatsapp-btn">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" id="whatsapp" width="24" height="24" fill="currentColor">
                  <path d="M16 3A13 13 0 0 0 4.53 22.13L3 27.74a1 1 0 0 0 .27 1A1 1 0 0 0 4 29a.84.84 0 0 0 .27 0l5.91-1.65a1 1 0 0 0-.53-1.93l-4.23 1.14 1.15-4.3a1 1 0 0 0-.1-.76A11 11 0 1 1 16 27a11.23 11.23 0 0 1-1.84-.15 1 1 0 0 0-1.15.82 1 1 0 0 0 .82 1.15A13 13 0 1 0 16 3Z"></path>
                  <path d="m15 11.21-1.16-1.6a2.06 2.06 0 0 0-1.5-.84 2.08 2.08 0 0 0-1.62.6l-1.2 1.2a2.81 2.81 0 0 0-.8 2.08c0 1.77 1.36 4 4 6.6 3.09 3 5.23 4 6.69 4a2.7 2.7 0 0 0 2-.81l1.2-1.2a2 2 0 0 0-.24-3.11L20.8 17a2.09 2.09 0 0 0-1.83-.3l-1.49.47a.53.53 0 0 1-.26-.09 11.42 11.42 0 0 1-2.35-2.26.31.31 0 0 1 0-.11c.13-.44.35-1.15.5-1.64a2 2 0 0 0-.37-1.86Zm1.29 7.63a2.33 2.33 0 0 0 1.75.2l1.54-.46 1.61 1.25L20 21c-.48.47-2.25.33-5.86-3.21-3-2.91-3.41-4.5-3.41-5.18A.89.89 0 0 1 11 12l1.28-1.19 1.18 1.65c-.16.49-.39 1.22-.51 1.65a2.12 2.12 0 0 0 .05 1.4 11.24 11.24 0 0 0 3.33 3.33Z"></path>
                </svg>
              </a>
              {/* Email (Standard Envelope) */}
              <a href="mailto:bankimkamila185@gmail.com" target="_blank" rel="noopener noreferrer" className="social-icon-btn email-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" id="gmail" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6.111 18.994H4.788C4.192 19.047 3 18.753 3 17.15V7.741c0-2.225 2.3-1.982 3.46-1.116l5.528 4.032 5.644-4.169C18.98 5.418 21 6.169 21 8.448v8.314c0 .888-.237 2.232-2.02 2.232h-2.091v-6.788l-4.9 3.645-4.878-3.645v4.513"></path>
                </svg>
              </a>
              {/* Instagram (Camera only) */}
              <a href="https://instagram.com/manseris" target="_blank" rel="noopener noreferrer" className="social-icon-btn instagram-btn">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" id="instagram" width="24" height="24" fill="currentColor">
                  <path d="M20.45 13.32a1 1 0 0 0-.57 1.3 4 4 0 1 1-2.31-2.3 1 1 0 1 0 .71-1.87 6 6 0 0 0-6.37 9.85 6 6 0 0 0 8.48 0 6 6 0 0 0 1.36-6.41 1 1 0 0 0-1.3-.57Z"></path>
                  <circle cx="23" cy="9" r="1"></circle>
                  <path d="M28 9a5 5 0 0 0-4.9-5A77.11 77.11 0 0 0 9 4a5 5 0 0 0-5 4.92A91.91 91.91 0 0 0 4 23a5 5 0 0 0 4.9 5c2.36.22 4.73.34 7.1.34s4.71-.11 7.05-.34A5 5 0 0 0 28 23.08 87.09 87.09 0 0 0 28 9Zm-2 14a3 3 0 0 1-3 3h-.1A71.73 71.73 0 0 1 9 26a3 3 0 0 1-3-3.08A92.4 92.4 0 0 1 6 9a3 3 0 0 1 3.09-3q3.44-.31 6.9-.32T23 6a3 3 0 0 1 3 3.08A85.13 85.13 0 0 1 26 23Z"></path>
                </svg>
              </a>
              {/* LinkedIn (Standard Logo) */}
              <a href="https://www.linkedin.com/in/bankim-chandra-kamila-b07b59236/" target="_blank" rel="noopener noreferrer" className="social-icon-btn linkedin-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" id="linkedin" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3.501 6.906C2.375 5.719 3.241 3.96 5.147 4c1.906.04 2.47 2.127 1.69 3.682C6.213 8.927 4.353 9.347 3.5 9.402V20h5.674V8.952H12.9v1.8c2.6-3.069 8.1-2.127 8.1 2.25V20h-3.898v-5.483c0-2.496-1.126-3.008-2.404-2.496-1.278.511-1.798 1.432-1.798 3.314V20"></path>
                </svg>
              </a>
              {/* GitHub (Cat logo) */}
              <a href="https://github.com/BankimKamila185" target="_blank" rel="noopener noreferrer" className="social-icon-btn github-btn">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" id="github" width="24" height="24" fill="currentColor">
                  <path d="M16 3a13 13 0 0 0-3.46 25.53 1 1 0 1 0 .53-1.92 11 11 0 1 1 7-.4 15.85 15.85 0 0 0-.3-3.92A6.27 6.27 0 0 0 24.68 16a6.42 6.42 0 0 0-1.05-3.87 7.09 7.09 0 0 0-.4-3.36 1 1 0 0 0-1.1-.67 8 8 0 0 0-3.37 1.28A11.35 11.35 0 0 0 16 9a13.09 13.09 0 0 0-3 .43 5.74 5.74 0 0 0-3.38-1.18 1 1 0 0 0-1 .66 7.06 7.06 0 0 0-.37 3.19A7.15 7.15 0 0 0 7.2 16a6.66 6.66 0 0 0 5 6.28 7.43 7.43 0 0 0-.15.79c-1 .06-1.58-.55-2.32-1.48a3.45 3.45 0 0 0-1.94-1.53 1 1 0 0 0-1.15.76A1 1 0 0 0 7.35 22c.16 0 .55.52.77.81a4.74 4.74 0 0 0 3.75 2.25 4.83 4.83 0 0 0 1.3-.18 1 1 0 0 0 .29-.14.72.72 0 0 0 .18-.21.34.34 0 0 0 .08-.09.85.85 0 0 0 .06-.17 1.52 1.52 0 0 0 .06-.2 4.11 4.11 0 0 1 .46-1.91 1 1 0 0 0-.76-1.65A4.6 4.6 0 0 1 9.2 16a4.84 4.84 0 0 1 .87-3 1 1 0 0 0 .24-.83 5 5 0 0 1 0-1.85 3.59 3.59 0 0 1 1.74.92 1 1 0 0 0 1 .23A12.49 12.49 0 0 1 16 11a9.91 9.91 0 0 1 2.65.43 1 1 0 0 0 1-.18 5 5 0 0 1 2-1 4.11 4.11 0 0 1 0 1.91 1.05 1.05 0 0 0 .32 1 4 4 0 0 1 .71 2.84 4.29 4.29 0 0 1-4.41 4.46 1 1 0 0 0-.94.65 1 1 0 0 0 .28 1.11c.59.51.5 4 .47 5.36a1 1 0 0 0 .38.81 1 1 0 0 0 .62.21 1.07 1.07 0 0 0 .25 0A13 13 0 0 0 16 3Z"></path>
                </svg>
              </a>
            </div>
          </div>

        </div>

        {/* === RIGHT COLUMN === */}
        <div className="col-right">

          {/* Spotify Widget */}
          <div
            {...cardProps('spotify-card glass-tier-1 staggered-enter reveal')}
            style={{ '--stagger': 1.5 }}
          >
            <iframe
              style={{ borderRadius: '12px' }}
              src="https://open.spotify.com/embed/playlist/37i9dQZF1DX11HM36ncRBG?utm_source=generator&theme=0"
              width="100%"
              height="152"
              frameBorder="0"
              allowFullScreen=""
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            ></iframe>
          </div>

          {/* Tech Stack */}
          <div
            {...cardProps('tech-stack-card glass-tier-1 staggered-enter reveal')}
            style={{ '--stagger': 2 }}
          >
            <div className="card-header-row">
              <div className="header-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
              </div>
              <div className="header-title">Tech Stack</div>
            </div>
            <div className="tech-tags-container">
              {TECH_STACK.map((tech, i) => (
                <span
                  key={tech.name}
                  className={`tech-tag ${tech.className}`}
                  style={{ '--tag-delay': i }}
                >
                  {tech.name}
                </span>
              ))}
            </div>
          </div>

          {/* Projects & Portfolios */}
          <div
            {...cardProps('projects-card glass-tier-2 staggered-enter reveal')}
            style={{ '--stagger': 4 }}
          >
            <div className="card-header-row">
              <div className="header-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
              </div>
              <div className="header-title">Projects & Portfolios</div>
            </div>
            <div className="projects-grid">
              {PORTFOLIOS.map((item, idx) => (
                <a key={idx} href={item.link} target="_blank" rel="noopener noreferrer" className="project-link-card">
                  <div className="project-info">
                    <h4>{item.title}</h4>
                    <p>{item.desc}</p>
                  </div>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
                </a>
              ))}
            </div>
          </div>

          {/* Certifications Carousel */}
          <div
            {...cardProps('certs-card glass-tier-1 staggered-enter reveal')}
            style={{ '--stagger': 5 }}
          >
            <div className="card-header-row">
              <div className="header-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>
              </div>
              <div className="header-title">Certifications</div>
            </div>
            <div className="certs-carousel-wrapper">
              <div className="certs-carousel">
                {/* Duplicate for infinite scroll */}
                {[...CERTIFICATIONS, ...CERTIFICATIONS].map((cert, i) => (
                  <div key={i} className="cert-badge">
                    <h5>{cert.title}</h5>
                    <p>{cert.date}</p>
                    <div className="cert-issuer">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                      <span>{cert.issuer}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Resume Box */}
          <div
            {...cardProps('resume-card glass-tier-3 staggered-enter reveal')}
            style={{ '--stagger': 6 }}
          >
            <div className="card-header-row">
              <div className="header-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
              </div>
              <div className="header-title">Resume</div>
            </div>
            <div className="job-pill">Frontend Developer</div>
          </div>

          {/* Experience Timeline */}
          <div
            {...cardProps('timeline-card glass-tier-2 staggered-enter reveal')}
            style={{ '--stagger': 7 }}
          >
            <div className="card-header-row">
              <div className="header-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>
              </div>
              <div className="header-title">Experience</div>
            </div>
            <div className="timeline">
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-year">2025</div>
                <div className="timeline-desc">Sales Intern at Kwento<br /><em>Mumbai, Remote · 4 months</em></div>
              </div>
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-year">2025</div>
                <div className="timeline-desc">Back End Developer Intern at DESI DESTINY<br /><em>Maharashtra, Hybrid · 4 months</em></div>
              </div>
            </div>
          </div>

          {/* Education Timeline */}
          <div
            {...cardProps('timeline-card glass-tier-1 staggered-enter reveal')}
            style={{ '--stagger': 8 }}
          >
            <div className="card-header-row">
              <div className="header-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path></svg>
              </div>
              <div className="header-title">Education</div>
            </div>
            <div className="timeline">
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-year">2024</div>
                <div className="timeline-desc">ITM Skills University<br /><em>BTech, AI &amp; Machine Learning (2024–2028)</em></div>
              </div>
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-year">2022</div>
                <div className="timeline-desc">Swami Vivekanand International School<br /><em>11th &amp; 12th, Computer Science (2022–2024)</em></div>
              </div>
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-year">2009</div>
                <div className="timeline-desc">St. Xavier's High School, Goregaon<br /><em>10th Grade, Computer Science (2009–2022)</em></div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div >
  );
}

export default App;
