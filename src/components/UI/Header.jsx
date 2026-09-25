import React from 'react';
import { 
  Dna, 
  Sliders, 
  GitCompare, 
  Bookmark, 
  Zap, 
  Share2, 
  Command, 
  Home
} from 'lucide-react';

export default function Header({
  activePage,
  onNavigate,
  activeDNA,
  onOpenMutate,
  onOpenExport,
  onOpenCommandPalette
}) {
  const navTabs = [
    { id: 'home', label: 'HOME', icon: Home },
    { id: 'lab', label: 'LABORATORY', icon: Dna },
    { id: 'analyzer', label: 'ANALYSIS LAB', icon: Sliders },
    { id: 'compare', label: 'COMPARE', icon: GitCompare },
    { id: 'library', label: 'LIBRARY', icon: Bookmark }
  ];

  return (
    <header className="lab-header">
      {/* Brand Section */}
      <div className="brand-section">
        <div
          onClick={() => onNavigate('home')}
          style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}
        >
          <div className="brand-logo-icon">
            <Dna size={18} />
          </div>
          <div className="brand-title">
            <span>UI DNA</span>
            <span className="brand-tag">v2.4-LAB</span>
            <span 
              className="brand-tag" 
              style={{ 
                color: 'var(--text-muted)', 
                border: '1px solid rgba(255, 255, 255, 0.12)', 
                background: 'rgba(255, 255, 255, 0.02)',
                letterSpacing: '0.04em'
              }}
              title="Copyright 2026 Developed by:- Aditya Kumar Jha"
            >
              DEV: ADITYA KUMAR JHA
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <nav className="nav-tabs">
        {navTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activePage === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onNavigate(tab.id)}
              className={`nav-tab-btn ${isActive ? 'active' : ''}`}
            >
              <Icon size={13} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Header Actions */}
      <div className="header-actions">
        {/* Active DNA Specimen Pill */}
        {activeDNA && (
          <div
            onClick={() => onNavigate('lab')}
            className="dna-badge-pill"
            style={{ cursor: 'pointer' }}
            title="Click to inspect active specimen in laboratory"
          >
            <span className="active-pulse-dot" />
            <span style={{ color: '#fff', fontWeight: 700 }}>{activeDNA.id}</span>
            <span style={{ color: 'var(--text-muted)' }}>V{activeDNA.version}</span>
          </div>
        )}

        {/* Mutate Quick Action */}
        <button
          onClick={onOpenMutate}
          className="btn-mutate"
          style={{ padding: '6px 12px', fontSize: '11px', gap: '6px' }}
          title="Open Mutation Lab (M)"
        >
          <Zap size={13} />
          <span>MUTATE</span>
        </button>

        {/* Export Profile Action */}
        <button
          onClick={onOpenExport}
          className="btn-secondary"
          style={{ padding: '6px 12px', fontSize: '11px', gap: '6px' }}
          title="Export DNA Profile (E)"
        >
          <Share2 size={13} />
          <span>EXPORT</span>
        </button>

        {/* Command Palette Trigger */}
        <button
          onClick={onOpenCommandPalette}
          className="btn-secondary"
          style={{
            padding: '6px 10px',
            fontSize: '11px',
            gap: '6px',
            fontFamily: 'var(--font-mono)'
          }}
          title="Open Command Palette (Ctrl + K)"
        >
          <Command size={12} />
          <span style={{ color: 'var(--text-muted)', fontSize: '10px' }}>⌘K</span>
        </button>
      </div>
    </header>
  );
}
