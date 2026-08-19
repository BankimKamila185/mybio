import React from 'react';

const STRATEGY_PILLARS = [
  {
    id: "arch",
    num: "01",
    tag: "PRODUCT ARCHITECTURE",
    title: "0 → 1 Scalable Technical Roadmaps",
    desc: "Translating ambiguous business goals into modular full-stack architectures, high-throughput database schemas, and microservice APIs built for scale.",
    deliverables: ["Microservice Blueprints", "Real-Time WebSocket Meshes", "Database Optimization", "Zero-Downtime CI/CD"],
    impact: "40% Faster Time-to-Market",
    accent: "#f46c38",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </svg>
    )
  },
  {
    id: "ops",
    num: "02",
    tag: "EXECUTIVE OPERATIONS",
    title: "Engineering Leadership & Sprint Velocity",
    desc: "Directing engineering, sprint cadence, and cross-functional operations as CTO & COO at The Outliers Studio to ensure reliable software delivery.",
    deliverables: ["Agile Sprint Frameworks", "Resource Allocation", "Code Quality Audits", "Operational SOPs"],
    impact: "2x Team Sprint Velocity",
    accent: "#c5ff41",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
        <circle cx="9" cy="7" r="4"></circle>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
      </svg>
    )
  },
  {
    id: "fintech",
    num: "03",
    tag: "FINTECH & REVENUE",
    title: "Automated Invoicing & Transaction Engines",
    desc: "Architecting fault-tolerant payment calculators, automated invoice generation pipelines, and financial ledger systems that eliminate manual overhead.",
    deliverables: ["Automated PDF Invoicing", "FastAPI Billing Engines", "Ledger Reconciliation", "Unit Economics Modeling"],
    impact: "100% Automated Billing Flow",
    accent: "#38bdf8",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="5" width="20" height="14" rx="2"></rect>
        <line x1="2" y1="10" x2="22" y2="10"></line>
      </svg>
    )
  },
  {
    id: "ai",
    num: "04",
    tag: "AI & MODERNIZATION",
    title: "Applied AI & Intelligence Integration",
    desc: "Identifying high-ROI workflows to embed computer vision, automated machine learning models, and real-time streaming to drive business efficiency.",
    deliverables: ["K-Means Neural Vision", "Predictive Analytics Models", "Custom Python APIs", "Legacy Stack Modernization"],
    impact: "60% Reduction in Manual Tasks",
    accent: "#a855f7",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
      </svg>
    )
  }
];

export default function BusinessStrategy({ playSound }) {
  return (
    <section className="sawad-section sawad-reveal" id="strategy">
      <div className="section-header-row">
        <div>
          <span className="section-tag">EXECUTIVE LEADERSHIP</span>
          <h2 className="section-title">Business Strategy & Advisory</h2>
        </div>
        <div className="strategy-executive-badge">
          <span className="badge-pulse-glow"></span>
          <span>CTO & COO Advisory Framework</span>
        </div>
      </div>

      <div className="strategy-bento-grid">
        {STRATEGY_PILLARS.map((pillar) => (
          <div
            key={pillar.id}
            className="strategy-card"
            style={{ '--accent-color': pillar.accent }}
            onMouseEnter={() => playSound?.()}
          >
            <div className="strategy-card-header">
              <div className="strategy-icon-box">
                {pillar.icon}
              </div>
              <div className="strategy-num-tag">{pillar.num}</div>
            </div>

            <div className="strategy-tag-row">
              <span className="strategy-pill-tag">{pillar.tag}</span>
              <span className="strategy-impact-badge">{pillar.impact}</span>
            </div>

            <h3 className="strategy-card-title">{pillar.title}</h3>
            <p className="strategy-card-desc">{pillar.desc}</p>

            <div className="strategy-deliverables-box">
              <span className="deliverables-heading">CORE DELIVERABLES:</span>
              <div className="deliverables-tags-list">
                {pillar.deliverables.map((item, idx) => (
                  <span key={idx} className="deliverable-chip">
                    <span className="chip-bullet">✦</span>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
