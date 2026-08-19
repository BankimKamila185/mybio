import React, { useState, useEffect } from 'react';

export default function LiveStatusWidget() {
  const [timeStr, setTimeStr] = useState('');
  const [uptimeSeconds, setUptimeSeconds] = useState(1420);
  const [activeMetric, setActiveMetric] = useState(null);

  useEffect(() => {
    const updateTime = () => {
      const options = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      setTimeStr(new Intl.DateTimeFormat([], options).format(new Date()));
      setUptimeSeconds((prev) => prev + 1);
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const metrics = [
    {
      val: "2x",
      label: "Executive Roles",
      sub: "CTO & COO @ The Outliers",
      icon: "⚡",
      accent: "#f46c38"
    },
    {
      val: "10+",
      label: "Apps Shipped",
      sub: "Production Web & AI Systems",
      icon: "🚀",
      accent: "#61dafb"
    },
    {
      val: "55+",
      label: "GitHub Repos",
      sub: "Open Source Ecosystem",
      icon: "🐙",
      accent: "#22c55e"
    },
    {
      val: "100%",
      label: "Code Quality",
      sub: "Zero-Debt Engineering",
      icon: "🛡️",
      accent: "#a855f7"
    }
  ];

  return (
    <div className="cool-hud-widget">
      {/* Top HUD Telemetry Bar */}
      <div className="hud-top-bar">
        <div className="hud-location-badge">
          <span className="hud-ping-wrap">
            <span className="hud-ping-radar"></span>
            <span className="hud-ping-core"></span>
          </span>
          <div className="hud-geo-info">
            <span className="hud-city">Mumbai, IN</span>
            <span className="hud-coords">19.076° N, 72.877° E</span>
          </div>
          <span className="hud-separator">/</span>
          <span className="hud-live-clock">
            <span className="clock-icon">🕒</span> {timeStr || '01:54:00 PM'} IST
          </span>
        </div>

        <div className="hud-status-pill">
          <span className="hud-status-dot"></span>
          <span className="hud-status-text">Open to Advisory &amp; Tech Roles</span>
        </div>
      </div>

      {/* 4 Interactive Glassmorphic Metric Cards */}
      <div className="hud-metrics-grid">
        {metrics.map((m, idx) => (
          <div
            key={idx}
            className={`hud-metric-card ${activeMetric === idx ? 'active' : ''}`}
            onMouseEnter={() => setActiveMetric(idx)}
            onMouseLeave={() => setActiveMetric(null)}
          >
            <div className="metric-header-row">
              <span className="metric-number" style={{ color: m.accent }}>{m.val}</span>
              <span className="metric-symbol-icon">{m.icon}</span>
            </div>
            <div className="metric-label-text">{m.label}</div>
            <div className="metric-subtext">{m.sub}</div>
            <div className="metric-glow-bar" style={{ background: `linear-gradient(90deg, ${m.accent}, transparent)` }}></div>
          </div>
        ))}
      </div>
    </div>
  );
}
