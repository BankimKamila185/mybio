import React from 'react';
import { EXPERIENCE, EDUCATION } from '../data/portfolioData';
import { playSound } from '../utils/soundFX';

export default function ExperienceEducation() {
  return (
    <section className="section-container" id="experience">
      <div className="section-header">
        <div className="section-badge journey-badge">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
          </svg>
          <span>Career &amp; Academic Path</span>
        </div>
        <h2 className="section-title">Experience &amp; Education</h2>
        <p className="section-subtitle">
          Professional internships and academic milestones in AI &amp; Software Engineering.
        </p>
      </div>

      <div className="timeline-dual-grid">
        {/* Experience Column */}
        <div className="timeline-column">
          <div className="timeline-column-header">
            <div className="col-header-icon work-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
              </svg>
            </div>
            <h3>Work &amp; Internships</h3>
          </div>

          <div className="timeline-items-list">
            {EXPERIENCE.map((exp, idx) => (
              <div
                key={idx}
                className="bento-card timeline-card-item"
                onMouseEnter={() => playSound('hover')}
              >
                <div className="item-badge-row">
                  <span className="period-pill">{exp.period}</span>
                  <span className="type-pill">{exp.type}</span>
                </div>

                <h4 className="item-title">{exp.role}</h4>
                <div className="item-company-row">
                  <span className="company-name">{exp.company}</span>
                  <span className="company-location">· {exp.location}</span>
                </div>

                <p className="item-description">{exp.description}</p>

                <div className="item-skills-chips">
                  {exp.skills.map((skill) => (
                    <span key={skill} className="mini-chip">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Education Column */}
        <div className="timeline-column">
          <div className="timeline-column-header">
            <div className="col-header-icon edu-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
              </svg>
            </div>
            <h3>Education &amp; Degrees</h3>
          </div>

          <div className="timeline-items-list">
            {EDUCATION.map((edu, idx) => (
              <div
                key={idx}
                className="bento-card timeline-card-item edu-item"
                onMouseEnter={() => playSound('hover')}
              >
                <div className="item-badge-row">
                  <span className="period-pill">{edu.period}</span>
                  <span className="edu-status-pill">{edu.badge}</span>
                </div>

                <h4 className="item-title">{edu.degree}</h4>
                <div className="item-company-row">
                  <span className="company-name">{edu.institution}</span>
                </div>

                <p className="item-description">{edu.description}</p>

                {edu.highlight && (
                  <div className="edu-highlight-box">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                    <span>{edu.highlight}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
