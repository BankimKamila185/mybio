import React, { useState, useEffect, useRef } from 'react';

export default function CommandPalette({ isOpen, onClose, onNavigate, onToggleTheme, playSound }) {
  const [query, setQuery] = useState('');
  const [selectedIdx, setSelectedIdx] = useState(0);
  const inputRef = useRef(null);

  const ACTIONS = [
    { id: 'role', icon: '💼', title: 'Current Role', desc: 'CTO & COO @ The Outliers Studio', category: 'About', action: () => onNavigate('role') },
    { id: 'reactify', icon: '⚛️', title: 'Reactify', desc: 'Live Polling Engine (MERN + Socket.io)', category: 'Projects', link: 'https://reactify-pink.vercel.app' },
    { id: 'payit', icon: '💳', title: 'PayIt', desc: 'Automated Billing & Invoice Platform', category: 'Projects', link: 'https://payit-mu.vercel.app' },
    { id: 'pixora', icon: '🎨', title: 'Pixora', desc: 'AI Image Palette Extraction Studio', category: 'Projects', link: 'https://pixora-lake.vercel.app' },
    { id: 'wastcraft', icon: '🌱', title: 'WastCraft', desc: 'Eco Scrap Marketplace', category: 'Projects', link: 'https://wastcraft.vercel.app' },
    { id: 'brand', icon: '✨', title: 'Brand Studio', desc: 'Fluid Design System Showcase', category: 'Projects', link: 'https://brand-two-mocha.vercel.app' },
    { id: 'arcade', icon: '🎮', title: 'Play Dev Arcade', desc: 'Snake, Code Typer, Neural Canvas', category: 'Interactive', action: () => onNavigate('arcade') },
    { id: 'github', icon: '🐙', title: 'GitHub Profile', desc: 'Explore 55+ open source repos', category: 'Links', link: 'https://github.com/BankimKamila185' },
    { id: 'linkedin', icon: '👔', title: 'LinkedIn Profile', desc: 'Connect with Bankim', category: 'Links', link: 'https://www.linkedin.com/in/bankim-chandra-kamila-b07b59236/' },
    { id: 'whatsapp', icon: '💬', title: 'Direct WhatsApp', desc: 'Send a quick message', category: 'Contact', link: 'https://wa.me/919324634516' },
    { id: 'email', icon: '✉️', title: 'Copy Email Address', desc: 'bankimkamila185@gmail.com', category: 'Contact', action: () => { navigator.clipboard.writeText('bankimkamila185@gmail.com'); alert('Email copied: bankimkamila185@gmail.com'); } },
    { id: 'theme', icon: '🌓', title: 'Toggle Theme', desc: 'Switch Dark / Light mode', category: 'System', action: onToggleTheme },
  ];

  const filtered = ACTIONS.filter(a =>
    a.title.toLowerCase().includes(query.toLowerCase()) ||
    a.desc.toLowerCase().includes(query.toLowerCase()) ||
    a.category.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIdx(0);
    }
  }, [isOpen]);

  const executeItem = (item) => {
    playSound?.();
    if (item.link) {
      window.open(item.link, '_blank');
    } else if (item.action) {
      item.action();
    }
    onClose();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIdx(i => (i + 1) % (filtered.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIdx(i => (i - 1 + (filtered.length || 1)) % (filtered.length || 1));
    } else if (e.key === 'Enter' && filtered[selectedIdx]) {
      e.preventDefault();
      executeItem(filtered[selectedIdx]);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="cmd-backdrop" onClick={onClose}>
      <div className="cmd-modal" onClick={e => e.stopPropagation()} onKeyDown={handleKeyDown}>
        <div className="cmd-header">
          <svg className="cmd-search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            className="cmd-input"
            placeholder="Type a command, project, or link... (e.g. 'Reactify', 'Arcade', 'Email')"
            value={query}
            onChange={e => { setQuery(e.target.value); setSelectedIdx(0); }}
          />
          <span className="cmd-esc-badge" onClick={onClose}>ESC</span>
        </div>

        <div className="cmd-list">
          {filtered.length === 0 ? (
            <div className="cmd-empty">No results found for "{query}"</div>
          ) : (
            filtered.map((item, idx) => (
              <div
                key={item.id}
                className={`cmd-item ${idx === selectedIdx ? 'selected' : ''}`}
                onClick={() => executeItem(item)}
                onMouseEnter={() => setSelectedIdx(idx)}
              >
                <span className="cmd-item-icon">{item.icon}</span>
                <div className="cmd-item-info">
                  <span className="cmd-item-title">{item.title}</span>
                  <span className="cmd-item-desc">{item.desc}</span>
                </div>
                <span className="cmd-item-category">{item.category}</span>
                <span className="cmd-item-arrow">↵</span>
              </div>
            ))
          )}
        </div>

        <div className="cmd-footer">
          <span>Navigate with <kbd>↑</kbd> <kbd>↓</kbd></span>
          <span>Select with <kbd>↵ Enter</kbd></span>
          <span>Close with <kbd>Esc</kbd></span>
        </div>
      </div>
    </div>
  );
}
