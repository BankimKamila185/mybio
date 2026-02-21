import React from 'react';
import './App.css';
import LinkCard from './components/LinkCard';

// -----------------------------------------------------
// Edit Your Links Here!
// Define standard links that you can add or modify.
// -----------------------------------------------------
const LINKS = [
  // No initial links defined here as they are directly embedded.
];

function App() {
  return (
    <div className="App">
      <div className="bento-portfolio">

        {/* === LEFT COLUMN === */}
        <div className="col-left">

          {/* Profile Card (Dark Fog Glass) */}
          <div className="bento-card profile-card-glass staggered-enter" style={{ '--stagger': 0 }}>
            <img className="profile-bg-img" src="/profile.png" alt="Bankim Chandra Kamila" />

            <div className="profile-fog-overlay"></div>

            <div className="profile-glass-content">

              <div className="profile-fog-header">
                <h1>Bankim Chandra Kamila</h1>
                <svg className="verified-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
              </div>

              <p className="profile-fog-desc">
                Frontend Developer | UI/UX Designer<br />AI & Multimedia Creation
              </p>



            </div>
          </div>

          {/* --- Unified Social Connect Card --- */}
          <div className="bento-card social-connect-card staggered-enter" style={{ '--stagger': 1 }}>
            <h3 className="social-connect-title">Connect with me</h3>
            <div className="social-icons-row">
              <a href="https://wa.me/6281246345166" target="_blank" rel="noopener noreferrer" className="social-icon-btn whatsapp-btn">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
              </a>
              <a href="mailto:richaldiman@gmail.com" target="_blank" rel="noopener noreferrer" className="social-icon-btn email-btn">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              </a>
              <a href="https://instagram.com/manseris" target="_blank" rel="noopener noreferrer" className="social-icon-btn instagram-btn">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="https://www.linkedin.com/in/bankim-chandra-kamila-b07b59236/" target="_blank" rel="noopener noreferrer" className="social-icon-btn linkedin-btn">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
              <a href="https://github.com/BankimKamila185" target="_blank" rel="noopener noreferrer" className="social-icon-btn github-btn">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
              </a>
              <a href="https://discord.com/" target="_blank" rel="noopener noreferrer" className="social-icon-btn discord-btn">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2498-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8745-.6177-1.2498a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" /></svg>
              </a>
              <a href="https://x.com/" target="_blank" rel="noopener noreferrer" className="social-icon-btn x-btn">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"></path></svg>
              </a>
            </div>
          </div>
          {/* -------------------------- */}

        </div>

        {/* === RIGHT COLUMN === */}
        <div className="col-right">

          {/* Projects / Links */}
          <div className="bento-card projects-card staggered-enter" style={{ '--stagger': 4 }}>
            <div className="card-header-row">
              <div className="header-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
              </div>
              <div className="header-title">My Projects</div>
            </div>

            <div className="projects-grid">
              <a href="https://github.com/BankimKamila185" target="_blank" rel="noopener noreferrer" className="project-link-card">
                <div className="project-info">
                  <h4>GitHub Projects</h4>
                  <p>Check out my repositories</p>
                </div>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
              </a>

              <a href="https://www.linkedin.com/in/bankim-chandra-kamila-b07b59236/" target="_blank" rel="noopener noreferrer" className="project-link-card">
                <div className="project-info">
                  <h4>LinkedIn Profile</h4>
                  <p>Connect with me professionally</p>
                </div>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
              </a>
            </div>
          </div>

          {/* Resume Box */}
          <div className="bento-card resume-card staggered-enter" style={{ '--stagger': 5 }}>
            <div className="card-header-row">
              <div className="header-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
              </div>
              <div className="header-title">Resume</div>
            </div>
            <div className="job-pill">Frontend Developer</div>
          </div>

          {/* Experience Timeline */}
          <div className="bento-card timeline-card staggered-enter" style={{ '--stagger': 6 }}>
            <div className="card-header-row">
              <div className="header-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>
              </div>
              <div className="header-title">Experience</div>
            </div>
            <div className="timeline">
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-year">2025</div>
                <div className="timeline-desc">Sales Intern at Kwento<br /><em>Mumbai, Remote · 4 months</em></div>
              </div>
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-year">2025</div>
                <div className="timeline-desc">Back End Developer Intern at DESI DESTINY<br /><em>Maharashtra, Hybrid · 4 months</em></div>
              </div>
            </div>
          </div>

          {/* Education Timeline */}
          <div className="bento-card timeline-card staggered-enter" style={{ '--stagger': 7 }}>
            <div className="card-header-row">
              <div className="header-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path></svg>
              </div>
              <div className="header-title">Education</div>
            </div>
            <div className="timeline">
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-year">2024</div>
                <div className="timeline-desc">ITM Skills University<br /><em>BTech, AI & Machine Learning (2024–2028)</em></div>
              </div>
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-year">2022</div>
                <div className="timeline-desc">Swami Vivekanand International School<br /><em>11th & 12th, Computer Science (2022–2024)</em></div>
              </div>
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-year">2009</div>
                <div className="timeline-desc">St. Xavier's High School, Goregaon<br /><em>10th Grade, Computer Science (2009–2022)</em></div>
              </div>
            </div>
          </div>



        </div>

      </div>
    </div>
  );
}

export default App;
