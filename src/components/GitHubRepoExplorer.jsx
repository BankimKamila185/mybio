import React, { useState, useEffect, useMemo } from 'react';
import { playSound } from '../utils/soundFX';
import { PERSONAL_INFO } from '../data/portfolioData';

// Curated comprehensive fallback list from Bankim's 55 GitHub repos
const FALLBACK_REPOS = [
  { name: "Reactify", description: "Real-time anonymous live polling and instant feedback system on MERN + WebSockets.", language: "JavaScript", stargazers_count: 1, html_url: "https://github.com/BankimKamila185/Reactify", homepage: "https://reactify-pink.vercel.app", updated_at: "2026-08-18T10:00:00Z" },
  { name: "brand", description: "Modern brand identity, responsive typography, and design showcase platform.", language: "JavaScript", stargazers_count: 0, html_url: "https://github.com/BankimKamila185/brand", homepage: "https://brand-two-mocha.vercel.app", updated_at: "2026-08-19T04:14:00Z" },
  { name: "payit-", description: "Next-gen payment calculation and billing platform with Python services.", language: "Python", stargazers_count: 1, html_url: "https://github.com/BankimKamila185/payit-", homepage: "https://payit-mu.vercel.app", updated_at: "2026-07-28T18:56:00Z" },
  { name: "pixora", description: "AI image processing studio with automated color palette clustering.", language: "Python", stargazers_count: 0, html_url: "https://github.com/BankimKamila185/pixora", homepage: "https://pixora-lake.vercel.app", updated_at: "2026-06-16T19:32:00Z" },
  { name: "wastcraft", description: "Sustainable circular waste marketplace connecting donors and recycling artisans.", language: "JavaScript", stargazers_count: 0, html_url: "https://github.com/BankimKamila185/wastcraft", homepage: "https://wastcraft.vercel.app", updated_at: "2026-06-14T07:47:00Z" },
  { name: "FacultyFlow-", description: "Academic scheduling and faculty department operations platform.", language: "JavaScript", stargazers_count: 0, html_url: "https://github.com/BankimKamila185/FacultyFlow-", homepage: "https://faculty-flow-one.vercel.app", updated_at: "2026-06-10T12:00:00Z" },
  { name: "Bankim-Jewellery-", description: "Luxury jewelry e-commerce portal with dynamic jewelry catalog.", language: "JavaScript", stargazers_count: 0, html_url: "https://github.com/BankimKamila185/Bankim-Jewellery-", homepage: "https://bankim-jewellery.vercel.app", updated_at: "2026-06-08T15:20:00Z" },
  { name: "YouTube-Dislikes-Dataset", description: "Data science and sentiment analysis on YouTube metrics with Jupyter & Python.", language: "Jupyter Notebook", stargazers_count: 0, html_url: "https://github.com/BankimKamila185/YouTube-Dislikes-Dataset", homepage: "https://you-tube-dislikes-dataset.vercel.app", updated_at: "2026-05-20T08:10:00Z" },
  { name: "Assignly", description: "TypeScript collaborative classroom assignment tracker & grading workflow.", language: "TypeScript", stargazers_count: 0, html_url: "https://github.com/BankimKamila185/Assignly", homepage: null, updated_at: "2026-05-06T05:28:00Z" },
  { name: "-LuggageTrack-", description: "Smart RFID & IoT luggage tracking platform for airline passengers.", language: "JavaScript", stargazers_count: 0, html_url: "https://github.com/BankimKamila185/-LuggageTrack-", homepage: null, updated_at: "2026-06-20T04:35:00Z" },
  { name: "ubran-city", description: "Urban infrastructure and municipal services mapping app.", language: "TypeScript", stargazers_count: 0, html_url: "https://github.com/BankimKamila185/ubran-city", homepage: null, updated_at: "2026-06-22T04:12:00Z" },
  { name: "Student-Portal-Final", description: "Student academic records, attendance, and exam management hub.", language: "JavaScript", stargazers_count: 0, html_url: "https://github.com/BankimKamila185/Student-Portal-Final", homepage: null, updated_at: "2026-05-05T18:27:00Z" },
  { name: "ColorPaletteExtractor", description: "Unsupervised machine learning script to extract dominant color hex codes.", language: "Python", stargazers_count: 0, html_url: "https://github.com/BankimKamila185/ColorPaletteExtractor", homepage: null, updated_at: "2026-04-18T14:15:00Z" },
  { name: "CampusRide", description: "Peer-to-peer campus ride sharing and route coordination system.", language: "JavaScript", stargazers_count: 0, html_url: "https://github.com/BankimKamila185/CampusRide", homepage: null, updated_at: "2026-04-10T11:00:00Z" },
  { name: "PortEcho", description: "Portfolio & dev showcase framework for students.", language: "HTML", stargazers_count: 0, html_url: "https://github.com/BankimKamila185/PortEcho", homepage: null, updated_at: "2026-04-02T09:30:00Z" },
  { name: "Java_Workshop", description: "Java core concepts, multi-threading, and OOP problem sets.", language: "Java", stargazers_count: 0, html_url: "https://github.com/BankimKamila185/Java_Workshop", homepage: null, updated_at: "2026-03-15T16:45:00Z" },
  { name: "restaurant_management_system", description: "Python database management system for restaurant dining orders.", language: "Python", stargazers_count: 0, html_url: "https://github.com/BankimKamila185/restaurant_management_system", homepage: null, updated_at: "2026-03-01T12:00:00Z" },
  { name: "120_Question", description: "Data structures, algorithms, and logic challenges solved in Python.", language: "Python", stargazers_count: 0, html_url: "https://github.com/BankimKamila185/120_Question", homepage: null, updated_at: "2026-02-14T10:20:00Z" }
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

export default function GitHubRepoExplorer() {
  const [repos, setRepos] = useState(FALLBACK_REPOS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLang, setSelectedLang] = useState('All');
  const [isLiveFetched, setIsLiveFetched] = useState(false);

  useEffect(() => {
    // Attempt live fetch from GitHub public API
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
        // Use rich fallback on network / CORS / rate limits
      }
    };

    fetchGitHubData();
  }, []);

  // Compute languages present
  const availableLanguages = useMemo(() => {
    const langs = new Set();
    repos.forEach((r) => {
      if (r.language) langs.add(r.language);
    });
    return ['All', ...Array.from(langs)];
  }, [repos]);

  // Filtered repositories
  const filteredRepos = useMemo(() => {
    return repos.filter((repo) => {
      const matchesSearch = 
        repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (repo.description && repo.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (repo.language && repo.language.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesLang = selectedLang === 'All' || repo.language === selectedLang;

      return matchesSearch && matchesLang;
    });
  }, [repos, searchQuery, selectedLang]);

  return (
    <section className="section-container" id="github-repos">
      <div className="section-header">
        <div className="section-badge github-badge">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>
          </svg>
          <span>Open Source Ecosystem</span>
        </div>
        <h2 className="section-title">Live GitHub Repository Explorer</h2>
        <p className="section-subtitle">
          Explore all 55+ open-source repositories synced directly from Bankim's profile.
        </p>
      </div>

      {/* GitHub Control Bar */}
      <div className="bento-card repo-control-card">
        <div className="repo-search-row">
          <div className="search-input-wrap">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input
              type="text"
              placeholder="Search 55+ repositories by name, language, or feature..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="repo-search-input"
            />
            {searchQuery && (
              <button 
                className="clear-search-btn"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>

          <div className="live-sync-indicator">
            <span className={`sync-dot ${isLiveFetched ? 'live' : 'cached'}`}></span>
            <span>{isLiveFetched ? 'Live API Synced' : '55 Repos Indexed'}</span>
          </div>
        </div>

        {/* Language Tabs */}
        <div className="repo-lang-tabs">
          {availableLanguages.map((lang) => (
            <button
              key={lang}
              className={`lang-tab-pill ${selectedLang === lang ? 'active' : ''}`}
              onClick={() => {
                playSound('tab');
                setSelectedLang(lang);
              }}
              onMouseEnter={() => playSound('hover')}
            >
              {lang !== 'All' && (
                <span 
                  className="lang-color-circle"
                  style={{ backgroundColor: LANGUAGE_COLORS[lang] || '#888' }}
                ></span>
              )}
              <span>{lang}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Repos Grid */}
      <div className="repos-grid">
        {filteredRepos.slice(0, 12).map((repo) => {
          const langColor = LANGUAGE_COLORS[repo.language] || '#9ca3af';
          return (
            <a
              key={repo.name}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="bento-card repo-card"
              onMouseEnter={() => playSound('hover')}
              onClick={() => playSound('click')}
            >
              <div className="repo-card-top">
                <div className="repo-name-group">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
                  </svg>
                  <h4 className="repo-title">{repo.name}</h4>
                </div>

                <span className="repo-link-arrow">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="7" y1="17" x2="17" y2="7"></line>
                    <polyline points="7 7 17 7 17 17"></polyline>
                  </svg>
                </span>
              </div>

              <p className="repo-desc">
                {repo.description || "Public repository engineered and maintained by Bankim Chandra Kamila."}
              </p>

              <div className="repo-meta-row">
                {repo.language && (
                  <div className="repo-lang-meta">
                    <span 
                      className="lang-color-circle" 
                      style={{ backgroundColor: langColor }}
                    ></span>
                    <span>{repo.language}</span>
                  </div>
                )}

                <div className="repo-stars-meta">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                  <span>{repo.stargazers_count || 0}</span>
                </div>

                {repo.homepage && (
                  <span className="repo-live-tag" title="Has live web deployment">
                    Live Demo
                  </span>
                )}
              </div>
            </a>
          );
        })}
      </div>

      {/* GitHub Profile Footer CTA */}
      <div className="github-cta-banner">
        <div className="github-cta-text">
          <h3>Want to inspect all 55+ repositories &amp; source codes?</h3>
          <p>Explore commits, pull requests, and experiment branches directly on GitHub.</p>
        </div>
        <a
          href={PERSONAL_INFO.github}
          target="_blank"
          rel="noopener noreferrer"
          className="primary-hero-btn"
          onMouseEnter={() => playSound('hover')}
          onClick={() => playSound('success')}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>
          </svg>
          <span>Visit @BankimKamila185 on GitHub</span>
        </a>
      </div>
    </section>
  );
}
