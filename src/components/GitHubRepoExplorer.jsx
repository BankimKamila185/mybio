import React, { useState, useEffect, useMemo } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';

// Curated fallback list of Bankim's 55+ GitHub repositories
const FALLBACK_REPOS = [
  { name: "Reactify", description: "Real-time anonymous live polling and instant feedback system on MERN + WebSockets with live charts.", language: "JavaScript", stargazers_count: 3, html_url: "https://github.com/BankimKamila185/Reactify", homepage: "https://reactify-pink.vercel.app", updated_at: "2026-08-18T10:00:00Z" },
  { name: "brand", description: "Modern brand identity, fluid responsive typography, and design systems showcase platform.", language: "JavaScript", stargazers_count: 2, html_url: "https://github.com/BankimKamila185/brand", homepage: "https://brand-two-mocha.vercel.app", updated_at: "2026-08-19T04:14:00Z" },
  { name: "payit-", description: "Next-gen payment calculation, automated invoicing, and billing platform with Python backend.", language: "Python", stargazers_count: 2, html_url: "https://github.com/BankimKamila185/payit-", homepage: "https://payit-mu.vercel.app", updated_at: "2026-07-28T18:56:00Z" },
  { name: "pixora", description: "AI computer vision image studio with K-Means automated color palette extraction & neural filters.", language: "Python", stargazers_count: 1, html_url: "https://github.com/BankimKamila185/pixora", homepage: "https://pixora-lake.vercel.app", updated_at: "2026-06-16T19:32:00Z" },
  { name: "wastcraft", description: "Circular waste marketplace connecting donors and recycling artisans with live price estimation.", language: "JavaScript", stargazers_count: 1, html_url: "https://github.com/BankimKamila185/wastcraft", homepage: "https://wastcraft.vercel.app", updated_at: "2026-06-14T07:47:00Z" },
  { name: "FacultyFlow-", description: "Academic scheduling and faculty department operations platform for university campuses.", language: "JavaScript", stargazers_count: 1, html_url: "https://github.com/BankimKamila185/FacultyFlow-", homepage: "https://faculty-flow-one.vercel.app", updated_at: "2026-06-10T12:00:00Z" },
  { name: "Bankim-Jewellery-", description: "Luxury jewelry e-commerce portal with dynamic jewelry catalog and responsive UI.", language: "JavaScript", stargazers_count: 1, html_url: "https://github.com/BankimKamila185/Bankim-Jewellery-", homepage: "https://bankim-jewellery.vercel.app", updated_at: "2026-06-08T15:20:00Z" },
  { name: "YouTube-Dislikes-Dataset", description: "Data science and sentiment analysis on YouTube engagement metrics with Jupyter & Python.", language: "Jupyter Notebook", stargazers_count: 2, html_url: "https://github.com/BankimKamila185/YouTube-Dislikes-Dataset", homepage: null, updated_at: "2026-05-20T08:10:00Z" },
  { name: "Assignly", description: "TypeScript collaborative classroom assignment tracker & grading workflow system.", language: "TypeScript", stargazers_count: 1, html_url: "https://github.com/BankimKamila185/Assignly", homepage: null, updated_at: "2026-05-06T05:28:00Z" },
  { name: "-LuggageTrack-", description: "Smart RFID & IoT luggage tracking platform for airline passengers.", language: "JavaScript", stargazers_count: 1, html_url: "https://github.com/BankimKamila185/-LuggageTrack-", homepage: null, updated_at: "2026-06-20T04:35:00Z" },
  { name: "ubran-city", description: "Urban infrastructure and municipal services mapping web application.", language: "TypeScript", stargazers_count: 1, html_url: "https://github.com/BankimKamila185/ubran-city", homepage: null, updated_at: "2026-06-22T04:12:00Z" },
  { name: "Student-Portal-Final", description: "Student academic records, attendance tracking, and exam management hub.", language: "JavaScript", stargazers_count: 1, html_url: "https://github.com/BankimKamila185/Student-Portal-Final", homepage: null, updated_at: "2026-05-05T18:27:00Z" },
  { name: "ColorPaletteExtractor", description: "Unsupervised machine learning script to extract dominant color hex codes from images.", language: "Python", stargazers_count: 2, html_url: "https://github.com/BankimKamila185/ColorPaletteExtractor", homepage: null, updated_at: "2026-04-18T14:15:00Z" },
  { name: "CampusRide", description: "Peer-to-peer campus ride sharing and route coordination network for students.", language: "JavaScript", stargazers_count: 1, html_url: "https://github.com/BankimKamila185/CampusRide", homepage: null, updated_at: "2026-04-10T11:00:00Z" },
  { name: "restaurant_management_system", description: "Python relational database management system for restaurant dining orders and billing.", language: "Python", stargazers_count: 1, html_url: "https://github.com/BankimKamila185/restaurant_management_system", homepage: null, updated_at: "2026-03-01T12:00:00Z" },
  { name: "120_Question", description: "Data structures, algorithms, recursion, and dynamic programming challenges solved in Python.", language: "Python", stargazers_count: 3, html_url: "https://github.com/BankimKamila185/120_Question", homepage: null, updated_at: "2026-02-14T10:20:00Z" }
];

const LANGUAGE_COLORS = {
  JavaScript: "#f7df1e",
  Python: "#3776ab",
  TypeScript: "#3178c6",
  Java: "#f89820",
  HTML: "#e34f26",
  CSS: "#264de4",
  "Jupyter Notebook": "#da5b0b"
};

export default function GitHubRepoExplorer({ playSound }) {
  const [repos, setRepos] = useState(FALLBACK_REPOS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLang, setSelectedLang] = useState('All');
  const [isLiveFetched, setIsLiveFetched] = useState(false);
  const [visibleLimit, setVisibleLimit] = useState(6);

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        const res = await fetch('https://api.github.com/users/BankimKamila185/repos?sort=updated&per_page=100');
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setRepos(data);
            setIsLiveFetched(true);
          }
        }
      } catch {
        // Safe fallback to curated repo dataset
      }
    };
    fetchGitHubData();
  }, []);

  const availableLanguages = useMemo(() => {
    const langs = new Set();
    repos.forEach((r) => {
      if (r.language) langs.add(r.language);
    });
    return ['All', ...Array.from(langs)];
  }, [repos]);

  const filteredRepos = useMemo(() => {
    return repos.filter((repo) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        repo.name.toLowerCase().includes(q) ||
        (repo.description && repo.description.toLowerCase().includes(q)) ||
        (repo.language && repo.language.toLowerCase().includes(q));
      const matchesLang = selectedLang === 'All' || repo.language === selectedLang;
      return matchesSearch && matchesLang;
    });
  }, [repos, searchQuery, selectedLang]);

  return (
    <div className="sawad-repo-explorer-wrap">
      {/* Control Bar */}
      <div className="repo-control-panel">
        <div className="repo-search-box">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            type="text"
            placeholder="Search 55+ repositories by name or tech..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="repo-search-input-field"
          />
          {searchQuery && (
            <button
              className="clear-search-x"
              onClick={() => { playSound?.(); setSearchQuery(''); }}
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </div>

        <div className="repo-sync-status">
          <span className={`sync-pulse-dot ${isLiveFetched ? 'live-api' : 'cached-data'}`}></span>
          <span>{isLiveFetched ? 'Live GitHub Sync' : '55+ Repos Indexed'}</span>
        </div>
      </div>

      {/* Language Filter Pills */}
      <div className="repo-lang-row">
        {availableLanguages.map((lang) => (
          <button
            key={lang}
            className={`repo-lang-pill ${selectedLang === lang ? 'active' : ''}`}
            onClick={() => {
              playSound?.();
              setSelectedLang(lang);
            }}
          >
            {lang !== 'All' && (
              <span
                className="lang-color-indicator"
                style={{ backgroundColor: LANGUAGE_COLORS[lang] || '#888' }}
              />
            )}
            <span>{lang}</span>
          </button>
        ))}
      </div>

      {/* Repository Grid (Sleek 2-Column Bento Flow) */}
      <div className="repo-cards-grid">
        {filteredRepos.slice(0, visibleLimit).map((repo) => {
          const langColor = LANGUAGE_COLORS[repo.language] || '#9ca3af';
          const cleanDesc = repo.description && !repo.description.includes('Public repository engineered')
            ? repo.description
            : (FALLBACK_REPOS.find(f => f.name.toLowerCase() === repo.name.toLowerCase())?.description || "Open source software project engineered with clean architecture & modern tooling.");

          return (
            <div
              key={repo.name}
              className="sawad-repo-item-card"
            >
              <div className="repo-card-head">
                <div className="repo-title-row">
                  <div className="repo-icon-cube">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                    </svg>
                  </div>
                  <h4 className="repo-card-name">{repo.name}</h4>
                </div>

                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="repo-action-chip"
                  onClick={() => playSound?.()}
                  title="View on GitHub"
                >
                  <span>Code</span>
                  <span className="repo-card-arrow">↗</span>
                </a>
              </div>

              <p className="repo-card-description">
                {cleanDesc}
              </p>

              <div className="repo-card-footer">
                <div className="repo-footer-left">
                  {repo.language && (
                    <div className="repo-badge-lang">
                      <span className="lang-color-indicator" style={{ backgroundColor: langColor }}></span>
                      <span>{repo.language}</span>
                    </div>
                  )}
                  {repo.stargazers_count > 0 && (
                    <div className="repo-badge-stars">
                      <span>★ {repo.stargazers_count}</span>
                    </div>
                  )}
                </div>

                {repo.homepage && (
                  <a
                    href={repo.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="repo-badge-live"
                    onClick={(e) => { e.stopPropagation(); playSound?.(); }}
                  >
                    <span className="live-pulse-dot"></span>
                    <span>Live Demo ↗</span>
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Show more or View Profile CTA */}
      <div className="repo-bottom-actions">
        {filteredRepos.length > visibleLimit && (
          <button
            className="sawad-load-more-btn"
            onClick={() => {
              playSound?.();
              setVisibleLimit((prev) => prev + 6);
            }}
          >
            Show More Repositories ({filteredRepos.length - visibleLimit} remaining) ↓
          </button>
        )}
        <a
          href={PERSONAL_INFO.github}
          target="_blank"
          rel="noopener noreferrer"
          className="sawad-github-external-btn"
          onClick={() => playSound?.()}
        >
          View Full GitHub Profile (55+ Repos) ↗
        </a>
      </div>
    </div>
  );
}
