import React from 'react';

export default function ProjectModal({ project, onClose, playSound }) {
  if (!project) return null;

  return (
    <div className="proj-modal-backdrop" onClick={onClose}>
      <div className="proj-modal" onClick={e => e.stopPropagation()}>
        <button className="proj-modal-close" onClick={onClose} aria-label="Close modal">✕</button>

        <div className="proj-modal-badge-row">
          <span className="proj-status-badge">🟢 Live Production</span>
          <span className="proj-cat-badge">{project.category || 'Web / AI App'}</span>
        </div>

        <h2 className="proj-modal-title">{project.title}</h2>
        <p className="proj-modal-desc">{project.longDesc || project.desc}</p>

        <div className="proj-modal-stack">
          <h4>Core Technologies</h4>
          <div className="proj-modal-tags">
            {(project.tags || ['React', 'Node.js', 'Vite', 'Tailwind', 'REST API']).map(t => (
              <span key={t} className="proj-tag-chip">{t}</span>
            ))}
          </div>
        </div>

        <div className="proj-modal-actions">
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="proj-action-btn primary"
              onClick={() => playSound?.()}
            >
              Open Live Application ↗
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="proj-action-btn secondary"
              onClick={() => playSound?.()}
            >
              View GitHub Source
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
