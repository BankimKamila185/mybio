import React, { useState } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { playSound } from '../utils/soundFX';

export default function ContactSection() {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    playSound('success');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <section className="section-container" id="contact">
      <div className="section-header">
        <div className="section-badge contact-badge">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
          <span>Get in Touch</span>
        </div>
        <h2 className="section-title">Let's Build Something Impactful Together</h2>
        <p className="section-subtitle">
          Open for full-time opportunities, internship roles, freelance projects, and tech collaborations.
        </p>
      </div>

      <div className="contact-bento-grid">
        {/* Main Connect Card */}
        <div className="bento-card contact-main-card">
          <div className="contact-card-header">
            <h3>Direct Contact Coordinates</h3>
            <p>Reach out directly via email, message on WhatsApp, or connect on LinkedIn.</p>
          </div>

          <div className="contact-methods-list">
            {/* Email item */}
            <div className="contact-item-row" onMouseEnter={() => playSound('hover')}>
              <div className="contact-item-icon email-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </div>
              <div className="contact-item-info">
                <span className="contact-item-label">Email Address</span>
                <a href={`mailto:${PERSONAL_INFO.email}`} className="contact-item-val">
                  {PERSONAL_INFO.email}
                </a>
              </div>
              <button
                className="contact-copy-btn"
                onClick={() => handleCopy(PERSONAL_INFO.email, 'email')}
                title="Copy Email"
              >
                {copiedEmail ? "Copied!" : "Copy"}
              </button>
            </div>

            {/* WhatsApp item */}
            <div className="contact-item-row" onMouseEnter={() => playSound('hover')}>
              <div className="contact-item-icon whatsapp-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25.7-.72 1.34-1.36 1.7-.58.33-1.3.4-2.02.2-.45-.13-.88-.34-1.29-.61-2.27-1.47-3.76-3.78-3.86-3.95-.12-.17-.96-1.28-.96-2.45 0-1.16.6-1.74.82-1.97.22-.24.48-.3.64-.3.16 0 .32 0 .46.01.15.01.35-.06.55.42.21.49.71 1.74.78 1.87.06.13.1.28.02.45-.09.17-.13.27-.26.42-.13.15-.27.34-.39.46-.13.13-.26.27-.11.53.15.25.66 1.09 1.42 1.77.97.87 1.8 1.13 2.05 1.26.26.13.41.11.56-.06.15-.17.65-.76.82-1.02.17-.26.35-.22.58-.13.24.09 1.5.71 1.76.84.26.13.43.19.49.3.06.11.06.66-.19 1.36z"/>
                </svg>
              </div>
              <div className="contact-item-info">
                <span className="contact-item-label">WhatsApp Direct</span>
                <a href={PERSONAL_INFO.whatsapp} target="_blank" rel="noopener noreferrer" className="contact-item-val">
                  {PERSONAL_INFO.phone}
                </a>
              </div>
              <a
                href={PERSONAL_INFO.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-copy-btn action-link"
                onMouseEnter={() => playSound('hover')}
                onClick={() => playSound('click')}
              >
                Chat
              </a>
            </div>

            {/* LinkedIn item */}
            <div className="contact-item-row" onMouseEnter={() => playSound('hover')}>
              <div className="contact-item-icon linkedin-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.45 1.45 0 1 0 0-2.9 1.45 1.45 0 0 0 0 2.9m1.39 9.74v-8.37H5.07v8.37h2.78z"/>
                </svg>
              </div>
              <div className="contact-item-info">
                <span className="contact-item-label">LinkedIn Profile</span>
                <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer" className="contact-item-val">
                  bankim-chandra-kamila
                </a>
              </div>
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-copy-btn action-link"
                onMouseEnter={() => playSound('hover')}
                onClick={() => playSound('click')}
              >
                Connect
              </a>
            </div>
          </div>
        </div>

        {/* Ambient Spotify Focus Vibes Card */}
        <div className="bento-card spotify-bento-card">
          <div className="spotify-header">
            <div className="spotify-pill">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.66 2 12 2zm4.58 14.42c-.18.3-.55.4-.85.22-2.33-1.42-5.26-1.74-8.71-.95-.34.08-.68-.14-.76-.48-.08-.34.14-.68.48-.76 3.78-.86 7.03-.5 9.62 1.09.3.18.4.55.22.88zm1.22-2.73c-.23.37-.71.49-1.08.26-2.67-1.64-6.73-2.12-9.89-1.16-.42.13-.86-.11-.99-.52-.13-.42.11-.86.52-.99 3.61-1.1 8.08-.57 11.18 1.33.37.23.49.71.26 1.08zm.11-2.85C14.71 8.9 9.44 8.72 6.38 9.65c-.49.15-1.02-.13-1.17-.62-.15-.49.13-1.02.62-1.17 3.56-1.08 9.39-.88 13.09 1.31.44.26.59.84.33 1.28-.26.44-.84.59-1.28.33z"/>
              </svg>
              <span>Coding Soundtrack</span>
            </div>
            <h4>Deep Focus Music</h4>
          </div>
          <div className="spotify-embed-wrapper">
            <iframe
              style={{ borderRadius: '14px' }}
              src="https://open.spotify.com/embed/playlist/37i9dQZF1DX11HM36ncRBG?utm_source=generator&theme=0"
              width="100%"
              height="152"
              frameBorder="0"
              allowFullScreen=""
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              title="Spotify Focus Playlist"
            ></iframe>
          </div>
        </div>
      </div>

      {/* Copyright / Footer Note */}
      <footer className="portfolio-footer">
        <p>
          Crafted with React, Vite &amp; Vanilla CSS Glassmorphism by <strong>Bankim Chandra Kamila</strong>.
        </p>
        <p className="footer-sub">
          © {new Date().getFullYear()} Bankim Chandra Kamila · All repositories open-sourced on GitHub.
        </p>
      </footer>
    </section>
  );
}
