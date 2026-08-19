import React, { useState, useEffect, useMemo } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';

// Curated list of Bankim's high-value, production-grade repositories
const VALUABLE_REPOS = [
  {
    name: "Reactify",
    description: "Real-time live polling and instant feedback system architected with MERN stack, WebSockets event mesh, and dynamic SVG visualizers.",
    language: "JavaScript",
    stargazers_count: 3,
    html_url: "https://github.com/BankimKamila185/Reactify",
    homepage: "https://reactify-pink.vercel.app",
    topics: ["WebSockets", "MERN", "Real-Time"]
  },
  {
    name: "payit-",
    description: "Next-gen payment calculation, automated PDF invoicing, tax breakdowns, and financial ledger platform with Python FastAPI backend.",
    language: "Python",
    stargazers_count: 2,
    html_url: "https://github.com/BankimKamila185/payit-",
    homepage: "https://payit-mu.vercel.app",
    topics: ["Fintech", "FastAPI", "Python"]
  },
  {
    name: "pixora",
    description: "AI computer vision studio featuring unsupervised K-Means automated color palette extraction, image filters, and matrix transforms.",
    language: "Python",
    stargazers_count: 2,
    html_url: "https://github.com/BankimKamila185/pixora",
    homepage: "https://pixora-lake.vercel.app",
    topics: ["AI/ML", "Computer Vision", "Python"]
  },
  {
    name: "brand",
    description: "Modern brand identity system, fluid responsive typography engine, and interactive layout components showcase.",
    language: "JavaScript",
    stargazers_count: 2,
    html_url: "https://github.com/BankimKamila185/brand",
    homepage: "https://brand-two-mocha.vercel.app",
    topics: ["Design System", "React", "CSS"]
  },
  {
    name: "wastcraft",
    description: "Circular economy marketplace connecting material donors with recycling artisans with live valuation and catalog management.",
    language: "JavaScript",
    stargazers_count: 1,
    html_url: "https://github.com/BankimKamila185/wastcraft",
    homepage: "https://wastcraft.vercel.app",
    topics: ["Marketplace", "Full-Stack"]
  },
  {
    name: "FacultyFlow-",
    description: "Academic scheduling and university department operations portal streamlining lecture timetables and workload distribution.",
    language: "JavaScript",
    stargazers_count: 1,
    html_url: "https://github.com/BankimKamila185/FacultyFlow-",
    homepage: "https://faculty-flow-one.vercel.app",
    topics: ["EdTech", "Operations"]
  },
  {
    name: "Bankim-Jewellery-",
    description: "Luxury jewelry e-commerce portal with dynamic collection filtering, responsive high-res galleries, and order flow.",
    language: "JavaScript",
    stargazers_count: 1,
    html_url: "https://github.com/BankimKamila185/Bankim-Jewellery-",
    homepage: "https://bankim-jewellery.vercel.app",
    topics: ["E-Commerce", "React"]
  },
  {
    name: "ColorPaletteExtractor",
    description: "Unsupervised machine learning algorithm extracting harmonic dominant color swatches and hex codes from complex image datasets.",
    language: "Python",
    stargazers_count: 2,
    html_url: "https://github.com/BankimKamila185/ColorPaletteExtractor",
    homepage: null,
    topics: ["Machine Learning", "Algorithms"]
  },
  {
    name: "Assignly",
    description: "TypeScript collaborative classroom assignment tracker, submission validation, and milestone grading pipeline.",
    language: "TypeScript",
    stargazers_count: 1,
    html_url: "https://github.com/BankimKamila185/Assignly",
    homepage: null,
    topics: ["TypeScript", "Collaboration"]
  },
  {
    name: "YouTube-Dislikes-Dataset",
    description: "Data science modeling and statistical regression analyzing video viewer engagement metrics and sentiment trends in Python.",
    language: "Jupyter Notebook",
    stargazers_count: 2,
    html_url: "https://github.com/BankimKamila185/YouTube-Dislikes-Dataset",
    homepage: null,
    topics: ["Data Science", "Python"]
  },
  {
    name: "CampusRide",
    description: "Peer-to-peer campus ride sharing network coordinating route matching and vehicle capacity for student transit.",
    language: "JavaScript",
    stargazers_count: 1,
    html_url: "https://github.com/BankimKamila185/CampusRide",
    homepage: null,
    topics: ["Full-Stack", "Transit"]
  },
  {
    name: "restaurant_management_system",
    description: "Relational database transaction engine for dining orders, kitchen billing tickets, and staff shift administration.",
    language: "Python",
    stargazers_count: 1,
    html_url: "https://github.com/BankimKamila185/restaurant_management_system",
    homepage: null,
    topics: ["SQL", "Database"]
  }
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

// Ignore low-value / temporary / duplicate repository names
const EXCLUDED_REPO_NAMES = new Set([
  "-LuggageTrack-",
  "ubran-city",
  "120_Question",
  "test",
  "temp",
  "portfolio-old",
  "demo",
  "practice"
]);

export default function GitHubRepoExplorer({ playSound }) {
  const [repos, setRepos] = useState(VALUABLE_REPOS);
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
            // Keep only meaningful, non-fork, non-excluded repos and enhance with curated details
            const filtered = data
              .filter(r => !r.fork && !EXCLUDED_REPO_NAMES.has(r.name) && r.name !== 'mybio')
              .map(liveRepo => {
                const curated = VALUABLE_REPOS.find(c => c.name.toLowerCase() === liveRepo.name.toLowerCase());
                return {
                  ...liveRepo,
                  description: curated?.description || liveRepo.description || "Production-grade software engineered with modern full-stack architecture.",
                  homepage: curated?.homepage || liveRepo.homepage,
                  topics: curated?.topics || []
                };
              });

            // Put curated high-priority repos at the top
            const finalRepos = [
              ...VALUABLE_REPOS,
              ...filtered.filter(f => !VALUABLE_REPOS.some(v => v.name.toLowerCase() === f.name.toLowerCase()))
            ];

            setRepos(finalRepos);
            setIsLiveFetched(true);
          }
        }
      } catch {
        // Safe fallback to curated dataset
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
          const curated = VALUABLE_REPOS.find(f => f.name.toLowerCase() === repo.name.toLowerCase());
          const cleanDesc = curated?.description || repo.description || "Production-grade software engineered with clean architecture & modern tooling.";
          const repoTopics = repo.topics && repo.topics.length > 0 ? repo.topics : (curated?.topics || []);

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

              {repoTopics.length > 0 && (
                <div className="repo-card-topics">
                  {repoTopics.map((topic) => (
                    <span key={topic} className="repo-topic-pill">
                      #{topic}
                    </span>
                  ))}
                </div>
              )}

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
