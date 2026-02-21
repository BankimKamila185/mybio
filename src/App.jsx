import React from 'react';
import './App.css';
import LinkCard from './components/LinkCard';

// -----------------------------------------------------
// Edit Your Links Here!
// Define standard links that you can add or modify.
// -----------------------------------------------------
const LINKS = [
  {
    id: 'whatsapp',
    type: 'split-whatsapp', // Specific type for the half-width green card
    title: 'WhatsApp',
    content: '+6281246345166',
    url: 'https://wa.me/6281246345166'
  },
  {
    id: 'email',
    type: 'split-email', // Specific type for the half-width orange card
    title: 'Email',
    content: 'richaldiman@gmail.com',
    url: 'mailto:richaldiman@gmail.com'
  },
  {
    id: 'instagram',
    type: 'image-dark', // Dark card with profile picture
    title: 'Instagram',
    content: '@manseris',
    url: 'https://instagram.com/manseris',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: 'custom-link',
    type: 'simple', // Thin white pill card with icon
    title: 'https://lynk.id/richaldi55',
    url: 'https://lynk.id/richaldi55'
  }
];

function App() {
  return (
    <div className="App">
      <div className="bento-portfolio">

        {/* === LEFT COLUMN === */}
        <div className="col-left">

          {/* Profile Card (Dark Fog Glass) */}
          <div className="bento-card profile-card-glass staggered-enter" style={{ '--stagger': 0 }}>
            <img className="profile-bg-img" src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop" alt="Richaldi Manseris" />

            <div className="profile-fog-overlay"></div>

            <div className="profile-glass-content">

              <div className="profile-fog-header">
                <h1>Richaldi Manseris</h1>
                <svg className="verified-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
              </div>

              <p className="profile-fog-desc">
                A Product Designer focused on <br />intuitive user experiences.
              </p>

              <div className="profile-fog-actions">
                <div className="fog-stats">
                  <div className="fog-stat-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                    312
                  </div>
                  <div className="fog-stat-item">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>
                    48
                  </div>
                </div>
                <button className="fog-follow-btn">
                  Follow <span style={{ marginLeft: '4px', fontSize: '1.2rem', fontWeight: 400 }}>+</span>
                </button>
              </div>

            </div>
          </div>

          {/* --- Grouped Links Card --- */}
          <div className="bento-card grouped-links-card staggered-enter" style={{ '--stagger': 1 }}>

            {/* Split Row for WhatsApp and Email */}
            <div className="split-row">
              {LINKS.filter(l => l.type.startsWith('split')).map((link, index) => (
                <LinkCard key={link.id} link={link} index={index + 1} />
              ))}
            </div>

            {/* Other Links (Instagram, Custom URLs) */}
            <div className="grouped-links-stack">
              {LINKS.filter(l => !l.type.startsWith('split')).map((link, index) => (
                <LinkCard key={link.id} link={link} index={index + 3} />
              ))}
            </div>

          </div>
          {/* -------------------------- */}

        </div>

        {/* === RIGHT COLUMN === */}
        <div className="col-right">

          {/* Resume Box */}
          <div className="bento-card resume-card staggered-enter" style={{ '--stagger': 5 }}>
            <div className="card-header-row">
              <div className="header-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
              </div>
              <div className="header-title">Resume</div>
            </div>
            <div className="job-pill">Graphic Designer</div>
          </div>

          {/* Experience Timeline */}
          <div className="bento-card timeline-card staggered-enter" style={{ '--stagger': 6 }}>
            <div className="card-header-row">
              <div className="header-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>
              </div>
              <div className="header-title">Experince</div>
            </div>
            <div className="timeline">
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-year">2021</div>
                <div className="timeline-desc">Intern Graphic Designer in Lavagna, Inc.</div>
              </div>
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-year">2022</div>
                <div className="timeline-desc">Junior Graphic Designer in Lantario & Co.</div>
              </div>
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-year">2024</div>
                <div className="timeline-desc">Senior Graphic Designer in Belevere Corp</div>
              </div>
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-year">2026</div>
                <div className="timeline-desc">Freelancer with many clients globally</div>
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
                <div className="timeline-year">2021</div>
                <div className="timeline-desc">Graduated from Hogwarts University<br /><em>Bachelor of Graphic Design</em></div>
              </div>
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-year">2023</div>
                <div className="timeline-desc">Graduated from Hogwarts University<br /><em>Master of Digital Art</em></div>
              </div>
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-year">Now</div>
                <div className="timeline-desc">Still learn from every course I can find</div>
              </div>
            </div>
          </div>

          {/* Skills Chart Card */}
          <div className="bento-card skills-card staggered-enter" style={{ '--stagger': 8 }}>
            <div className="skills-wrapper">
              <div className="skill-bar-container">
                <div className="skill-fill" style={{ '--target-height': '70%', background: 'var(--accent-orange)' }}>Lr</div>
              </div>
              <div className="skill-bar-container">
                <div className="skill-fill" style={{ '--target-height': '90%', background: 'var(--accent-black)' }}>Ps</div>
              </div>
              <div className="skill-bar-container">
                <div className="skill-fill" style={{ '--target-height': '85%', background: 'var(--accent-green)' }}>Ai</div>
              </div>
              <div className="skill-bar-container">
                <div className="skill-fill" style={{ '--target-height': '60%', background: 'var(--accent-orange)' }}>Ae</div>
              </div>
              <div className="skill-bar-container">
                <div className="skill-fill" style={{ '--target-height': '100%', background: 'linear-gradient(to top, rgba(0,0,0,0.5), rgba(0,0,0,0.9))' }}>Cva</div>
              </div>
            </div>

            <div className="skills-tools">
              <div className="tool-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 3 21 3 21 9"></polyline><polyline points="9 21 3 21 3 15"></polyline><line x1="21" y1="3" x2="14" y2="10"></line><line x1="3" y1="21" x2="10" y2="14"></line></svg>
              </div>
              <div className="tool-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

export default App;
