import React, { useState } from 'react';
import { TECH_MATRIX } from '../data/portfolioData';
import { playSound } from '../utils/soundFX';

export default function TechStackMatrix() {
  const [activeCategory, setActiveCategory] = useState('All');

  const displayedCategories = activeCategory === 'All'
    ? TECH_MATRIX
    : TECH_MATRIX.filter((cat) => cat.category === activeCategory);

  return (
    <section className="section-container" id="skills">
      <div className="section-header">
        <div className="section-badge skills-badge">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="16 18 22 12 16 6"></polyline>
            <polyline points="8 6 2 12 8 18"></polyline>
          </svg>
          <span>Technical Arsenal</span>
        </div>
        <h2 className="section-title">Skills &amp; Technology Stack</h2>
        <p className="section-subtitle">
          Core languages, modern libraries, system architectures, and AI tools I build with every day.
        </p>

        {/* Category switcher */}
        <div className="filter-pill-container">
          <button
            className={`filter-pill ${activeCategory === 'All' ? 'active' : ''}`}
            onClick={() => {
              playSound('tab');
              setActiveCategory('All');
            }}
            onMouseEnter={() => playSound('hover')}
          >
            All Disciplines
          </button>
          {TECH_MATRIX.map((c) => (
            <button
              key={c.category}
              className={`filter-pill ${activeCategory === c.category ? 'active' : ''}`}
              onClick={() => {
                playSound('tab');
                setActiveCategory(c.category);
              }}
              onMouseEnter={() => playSound('hover')}
            >
              {c.category}
            </button>
          ))}
        </div>
      </div>

      <div className="tech-matrix-grid">
        {displayedCategories.map((group) => (
          <div
            key={group.category}
            className="bento-card tech-matrix-card"
            onMouseEnter={() => playSound('hover')}
          >
            <div className="matrix-card-header">
              <h3 className="matrix-cat-title">{group.category}</h3>
              <span className="matrix-cat-count">{group.skills.length} tools</span>
            </div>

            <div className="skills-meter-list">
              {group.skills.map((skill) => (
                <div key={skill.name} className="skill-meter-item">
                  <div className="skill-meta-label">
                    <span className="skill-name">{skill.name}</span>
                    <span className="skill-percentage">{skill.level}%</span>
                  </div>
                  <div className="skill-bar-track">
                    <div
                      className="skill-bar-fill"
                      style={{
                        width: `${skill.level}%`,
                        backgroundColor: skill.color
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
