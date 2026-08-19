import React, { useState } from 'react';
import { CERTIFICATIONS, ACHIEVEMENTS } from '../data/portfolioData';
import { playSound } from '../utils/soundFX';

export default function AchievementsCerts() {
  const [activeTab, setActiveTab] = useState('certs');

  return (
    <section className="section-container" id="achievements">
      <div className="section-header">
        <div className="section-badge certs-badge">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <circle cx="12" cy="8" r="7"></circle>
            <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
          </svg>
          <span>Credentials &amp; Milestones</span>
        </div>
        <h2 className="section-title">Verified Certifications &amp; Achievements</h2>
        <p className="section-subtitle">
          Industry accreditations from Google, Postman, and Pieces, alongside open-source achievements.
        </p>

        {/* Tab switch */}
        <div className="filter-pill-container">
          <button
            className={`filter-pill ${activeTab === 'certs' ? 'active' : ''}`}
            onClick={() => {
              playSound('tab');
              setActiveTab('certs');
            }}
            onMouseEnter={() => playSound('hover')}
          >
            Certifications ({CERTIFICATIONS.length})
          </button>
          <button
            className={`filter-pill ${activeTab === 'achievements' ? 'active' : ''}`}
            onClick={() => {
              playSound('tab');
              setActiveTab('achievements');
            }}
            onMouseEnter={() => playSound('hover')}
          >
            Milestones ({ACHIEVEMENTS.length})
          </button>
        </div>
      </div>

      {activeTab === 'certs' ? (
        <div className="certs-grid">
          {CERTIFICATIONS.map((cert) => (
            <div
              key={cert.id}
              className="bento-card cert-card-item"
              onMouseEnter={() => playSound('hover')}
            >
              <div className="cert-top-row">
                <div className="cert-issuer-badge">
                  {cert.issuer === 'Postman' && (
                    <span className="issuer-icon postman-icon">🚀</span>
                  )}
                  {cert.issuer.includes('Google') && (
                    <span className="issuer-icon google-icon">🌐</span>
                  )}
                  {cert.issuer.includes('Pieces') && (
                    <span className="issuer-icon ai-icon">⚡</span>
                  )}
                  <span className="issuer-name">{cert.issuer}</span>
                </div>
                <span className="cert-date-tag">{cert.date}</span>
              </div>

              <h3 className="cert-title">{cert.title}</h3>
              <p className="cert-desc">{cert.desc}</p>

              <div className="cert-skills-wrap">
                {cert.skills.map((skill) => (
                  <span key={skill} className="cert-skill-pill">
                    {skill}
                  </span>
                ))}
              </div>

              <div className="cert-footer">
                <span className="cert-verified-label">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                  <span>{cert.badge}</span>
                </span>

                <a
                  href={cert.verifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cert-verify-link"
                  onMouseEnter={() => playSound('hover')}
                  onClick={() => playSound('click')}
                >
                  <span>Verify on LinkedIn</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="7" y1="17" x2="17" y2="7"></line>
                    <polyline points="7 7 17 7 17 17"></polyline>
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="achievements-grid">
          {ACHIEVEMENTS.map((ach, idx) => (
            <div
              key={idx}
              className="bento-card achievement-card"
              onMouseEnter={() => playSound('hover')}
            >
              <div className="ach-metric-badge">{ach.metric}</div>
              <h3 className="ach-title">{ach.title}</h3>
              <p className="ach-subtitle">{ach.subtitle}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
