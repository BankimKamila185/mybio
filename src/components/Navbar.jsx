import React, { useState, useEffect } from 'react';
import { playSound, toggleAudioMute, getAudioMuted } from '../utils/soundFX';
import { PERSONAL_INFO } from '../data/portfolioData';

export default function Navbar({ theme, onToggleTheme, onOpenContact }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAudioMuted, setIsAudioMuted] = useState(getAudioMuted());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAudioToggle = () => {
    const nextMuted = toggleAudioMute();
    setIsAudioMuted(nextMuted);
    if (!nextMuted) playSound('click');
  };

  const navItems = [
    { label: 'Overview', href: '#overview' },
    { label: 'Projects', href: '#projects', badge: '12+' },
    { label: 'GitHub Explorer', href: '#github-repos', badge: '55' },
    { label: 'Achievements', href: '#achievements' },
    { label: 'Terminal', href: '#terminal', badge: 'CLI' },
    { label: 'Experience', href: '#experience' }
  ];

  return (
    <header className={`portfolio-nav-wrapper ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        {/* Brand */}
        <a 
          href="#overview" 
          className="nav-brand"
          onMouseEnter={() => playSound('hover')}
          onClick={() => playSound('click')}
        >
          <div className="brand-badge">BK</div>
          <div className="brand-info">
            <span className="brand-name">{PERSONAL_INFO.name}</span>
            <span className="brand-status">
              <span className="status-dot"></span>
              {PERSONAL_INFO.availability}
            </span>
          </div>
        </a>

        {/* Desktop Links */}
        <nav className="nav-links desktop-only">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="nav-link"
              onMouseEnter={() => playSound('hover')}
              onClick={() => playSound('tab')}
            >
              {item.label}
              {item.badge && <span className="nav-pill-badge">{item.badge}</span>}
            </a>
          ))}
        </nav>

        {/* Controls */}
        <div className="nav-actions">
          {/* Sound FX Button */}
          <button
            className={`icon-btn ${isAudioMuted ? 'muted' : ''}`}
            onClick={handleAudioToggle}
            title={isAudioMuted ? "Enable Sound Effects" : "Mute Sound Effects"}
            aria-label="Toggle Audio Feedback"
          >
            {isAudioMuted ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="1" y1="1" x2="23" y2="23"></line>
                <path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"></path>
                <path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23"></path>
                <line x1="12" y1="19" x2="12" y2="23"></line>
                <line x1="8" y1="23" x2="16" y2="23"></line>
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
              </svg>
            )}
          </button>

          {/* Theme Toggle Button */}
          <button
            className="icon-btn theme-btn"
            onClick={() => {
              playSound('click');
              onToggleTheme();
            }}
            title={theme === 'dark' ? "Switch to Light Mode" : "Switch to Dark Mode"}
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>

          {/* Get In Touch CTA */}
          <button 
            className="nav-cta-btn"
            onClick={() => {
              playSound('success');
              if (onOpenContact) onOpenContact();
              else {
                const el = document.getElementById('contact');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            <span>Let's Talk</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>

          {/* Mobile Menu Toggle */}
          <button 
            className="icon-btn mobile-menu-toggle mobile-only"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-nav-drawer">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="mobile-nav-link"
              onClick={() => {
                playSound('tab');
                setMobileMenuOpen(false);
              }}
            >
              <span>{item.label}</span>
              {item.badge && <span className="nav-pill-badge">{item.badge}</span>}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
