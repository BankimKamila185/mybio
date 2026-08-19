import React, { useState, useEffect } from 'react';

export default function LiveStatusWidget() {
  const [timeStr, setTimeStr] = useState('');

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
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="status-widget-box">
      <div className="status-header">
        <div className="status-location">
          <span className="live-radar-dot" />
          <span className="location-text">Mumbai, IN · {timeStr || 'Loading...'} IST</span>
        </div>
        <span className="status-badge-avail">🟢 Open to Advisory</span>
      </div>

      <div className="status-metrics-grid">
        <div className="metric-item">
          <span className="metric-val">2x</span>
          <span className="metric-lbl">Executive Roles</span>
        </div>
        <div className="metric-item">
          <span className="metric-val">10+</span>
          <span className="metric-lbl">Apps Shipped</span>
        </div>
        <div className="metric-item">
          <span className="metric-val">55+</span>
          <span className="metric-lbl">GitHub Repos</span>
        </div>
        <div className="metric-item">
          <span className="metric-val">100%</span>
          <span className="metric-lbl">Code Quality</span>
        </div>
      </div>
    </div>
  );
}
