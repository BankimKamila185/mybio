import React, { useState } from 'react';
import { FEATURED_PROJECTS } from '../data/portfolioData';
import { playSound } from '../utils/soundFX';

export default function FeaturedProjects({ onSelectProject }) {
  const [activeFilter, setActiveFilter] = useState('All');

  const categories = ['All', 'Featured', 'Full Stack', 'Python / AI', 'Design & Systems'];

  const filteredProjects = FEATURED_PROJECTS.filter((proj) => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Featured') return proj.featured;
    return proj.category === activeFilter;
  });

  return (
    <section className="section-container" id="projects">
      <div className="section-header">
        <div className="section-badge">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
          </svg>
          <span>Crafted Works</span>
        </div>
        <h2 className="section-title">Featured Projects &amp; Deployments</h2>
        <p className="section-subtitle">
          Real-time applications, AI/ML models, and interactive web tools built with modern tech stacks.
        </p>

        {/* Filter Pills */}
        <div className="filter-pill-container">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-pill ${activeFilter === cat ? 'active' : ''}`}
              onClick={() => {
                playSound('tab');
                setActiveFilter(cat);
              }}
              onMouseEnter={() => playSound('hover')}
            >
              {cat}
              {cat === 'Featured' && <span className="pill-dot"></span>}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="projects-grid-bento">
        {filteredProjects.map((project, index) => (
          <div
            key={project.id}
            className={`bento-card project-card-item ${project.featured ? 'featured-card' : ''}`}
            style={{
              '--proj-accent': project.accent || '#10b981',
              '--card-delay': index
            }}
          >
            {/* Card Top Pill & Actions */}
            <div className="project-card-header">
              <span className="project-category-tag">
                {project.category}
              </span>

              <div className="project-header-links">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-action-icon"
                    title="View Source on GitHub"
                    onMouseEnter={() => playSound('hover')}
                    onClick={(e) => {
                      e.stopPropagation();
                      playSound('click');
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>
                    </svg>
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-action-icon live-link"
                    title="Open Live Deployment"
                    onMouseEnter={() => playSound('hover')}
                    onClick={(e) => {
                      e.stopPropagation();
                      playSound('click');
                    }}
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                  </a>
                )}
              </div>
            </div>

            {/* Project Content */}
            <div className="project-body">
              <h3 className="project-title">{project.name}</h3>
              <p className="project-tagline">{project.tagline}</p>
              <p className="project-description">{project.description}</p>

              {/* Highlights Checklist */}
              {project.highlights && (
                <ul className="project-highlights">
                  {project.highlights.slice(0, 2).map((item, i) => (
                    <li key={i}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Tech Tags */}
            <div className="project-tags-wrap">
              {project.tags.map((tag) => (
                <span key={tag} className="tech-badge-chip">
                  {tag}
                </span>
              ))}
            </div>

            {/* Card Bottom CTA */}
            <div className="project-footer">
              <button
                className="project-details-btn"
                onClick={() => {
                  playSound('click');
                  onSelectProject(project);
                }}
                onMouseEnter={() => playSound('hover')}
              >
                <span>View Architecture</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </button>

              {project.liveUrl ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="live-demo-btn"
                  onMouseEnter={() => playSound('hover')}
                  onClick={() => playSound('success')}
                >
                  <span className="live-pulse"></span>
                  <span>Live App</span>
                </a>
              ) : (
                <span className="repo-only-badge">Source Code</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
