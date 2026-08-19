import React, { useState, useEffect } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { playSound } from '../utils/soundFX';

export default function HeroProfile() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedRole, setDisplayedRole] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Typewriter effect cycling through roles
  useEffect(() => {
    const currentRole = PERSONAL_INFO.roles[roleIndex];
    const typingSpeed = isDeleting ? 30 : 60;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayedRole(currentRole.slice(0, displayedRole.length + 1));
        if (displayedRole.length === currentRole.length) {
          // Pause at end of text
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setDisplayedRole(currentRole.slice(0, displayedRole.length - 1));
        if (displayedRole.length === 0) {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % PERSONAL_INFO.roles.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayedRole, isDeleting, roleIndex]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    playSound('success');
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <div className="hero-bento-grid" id="overview">
      {/* Main Profile Showcase Card */}
      <div className="bento-card hero-main-card">
        {/* Animated Glow Blob */}
        <div className="morph-blob"></div>

        {/* Ambient Grid overlay */}
        <div className="hero-grid-pattern"></div>

        <div className="hero-card-inner">
          {/* Top Row: Avatar & Status */}
          <div className="hero-header-row">
            <div className="avatar-wrapper">
              <img 
                src={PERSONAL_INFO.avatar} 
                alt={PERSONAL_INFO.name} 
                className="hero-avatar-img"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://avatars.githubusercontent.com/u/174135567?v=4";
                }}
              />
              <div className="avatar-ring"></div>
              <div className="online-indicator" title="Available for hire"></div>
            </div>

            <div className="hero-status-pill">
              <span className="pulsing-green-dot"></span>
              <span>Available for Hire & Projects</span>
            </div>
          </div>

          {/* Identity & Dynamic Headline */}
          <div className="hero-identity">
            <div className="hero-name-row">
              <h1 className="hero-name">{PERSONAL_INFO.name}</h1>
              <span className="verified-badge" title="Verified Portfolio & GitHub Developer">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
              </span>
            </div>

            <div className="hero-typewriter-container">
              <span className="typewriter-prefix">&gt; </span>
              <span className="typewriter-text">{displayedRole}</span>
              <span className="cursor-blink">|</span>
            </div>

            <p className="hero-bio-text">
              {PERSONAL_INFO.tagline} Focused on crafting high-performance, real-time products with intuitive designs and robust engineering.
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="hero-metrics-bar">
            <div className="metric-item" onMouseEnter={() => playSound('hover')}>
              <span className="metric-val">{PERSONAL_INFO.stats.repos}</span>
              <span className="metric-label">GitHub Repos</span>
            </div>
            <div className="metric-divider"></div>
            <div className="metric-item" onMouseEnter={() => playSound('hover')}>
              <span className="metric-val">{PERSONAL_INFO.stats.liveApps}</span>
              <span className="metric-label">Live Deployed</span>
            </div>
            <div className="metric-divider"></div>
            <div className="metric-item" onMouseEnter={() => playSound('hover')}>
              <span className="metric-val">{PERSONAL_INFO.stats.certifications}</span>
              <span className="metric-label">Certifications</span>
            </div>
            <div className="metric-divider"></div>
            <div className="metric-item" onMouseEnter={() => playSound('hover')}>
              <span className="metric-val">AI &amp; ML</span>
              <span className="metric-label">B.Tech (2028)</span>
            </div>
          </div>

          {/* Socials & Action Buttons */}
          <div className="hero-footer-row">
            <div className="hero-social-strip">
              {/* GitHub */}
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="social-pill github-pill"
                onMouseEnter={() => playSound('hover')}
                onClick={() => playSound('click')}
                title="View Bankim's GitHub (55+ Repos)"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>
                </svg>
                <span>GitHub</span>
              </a>

              {/* LinkedIn */}
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="social-pill linkedin-pill"
                onMouseEnter={() => playSound('hover')}
                onClick={() => playSound('click')}
                title="Connect on LinkedIn"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.45 1.45 0 1 0 0-2.9 1.45 1.45 0 0 0 0 2.9m1.39 9.74v-8.37H5.07v8.37h2.78z"/>
                </svg>
                <span>LinkedIn</span>
              </a>

              {/* WhatsApp */}
              <a
                href={PERSONAL_INFO.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="social-pill whatsapp-pill"
                onMouseEnter={() => playSound('hover')}
                onClick={() => playSound('click')}
                title="Chat directly on WhatsApp"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25.7-.72 1.34-1.36 1.7-.58.33-1.3.4-2.02.2-.45-.13-.88-.34-1.29-.61-2.27-1.47-3.76-3.78-3.86-3.95-.12-.17-.96-1.28-.96-2.45 0-1.16.6-1.74.82-1.97.22-.24.48-.3.64-.3.16 0 .32 0 .46.01.15.01.35-.06.55.42.21.49.71 1.74.78 1.87.06.13.1.28.02.45-.09.17-.13.27-.26.42-.13.15-.27.34-.39.46-.13.13-.26.27-.11.53.15.25.66 1.09 1.42 1.77.97.87 1.8 1.13 2.05 1.26.26.13.41.11.56-.06.15-.17.65-.76.82-1.02.17-.26.35-.22.58-.13.24.09 1.5.71 1.76.84.26.13.43.19.49.3.06.11.06.66-.19 1.36z"/>
                </svg>
                <span>WhatsApp</span>
              </a>

              {/* Copy Email Button */}
              <button
                className="social-pill email-pill"
                onClick={handleCopyEmail}
                onMouseEnter={() => playSound('hover')}
                title="Click to copy email address"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                <span>{copiedEmail ? "Copied to Clipboard!" : "Copy Email"}</span>
              </button>
            </div>

            <div className="hero-cta-group">
              <a
                href="#projects"
                className="primary-hero-btn"
                onMouseEnter={() => playSound('hover')}
                onClick={() => playSound('click')}
              >
                <span>Explore Projects</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <polyline points="19 12 12 19 5 12"></polyline>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
