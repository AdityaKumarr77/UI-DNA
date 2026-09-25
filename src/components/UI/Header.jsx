import React, { useState } from 'react';
import { 
  Dna, 
  Sliders, 
  GitCompare, 
  Bookmark, 
  Zap, 
  Share2, 
  Command, 
  Home,
  Menu,
  X,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header({
  activePage,
  onNavigate,
  activeDNA,
  onOpenMutate,
  onOpenExport,
  onOpenCommandPalette
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navTabs = [
    { id: 'home', label: 'HOME', icon: Home, desc: 'Overview & 3D Helix' },
    { id: 'lab', label: 'LABORATORY', icon: Dna, desc: '12-Trait DNA Workspace' },
    { id: 'analyzer', label: 'ANALYSIS LAB', icon: Sliders, desc: 'Manual & Image Extraction' },
    { id: 'compare', label: 'COMPARE', icon: GitCompare, desc: 'Dual Specimen Divergence' },
    { id: 'library', label: 'LIBRARY', icon: Bookmark, desc: 'Saved Profiles & Presets' }
  ];

  const handleMobileNav = (id) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="lab-header">
        {/* Brand Section */}
        <div className="brand-section">
          <div
            onClick={() => onNavigate('home')}
            style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
          >
            <div className="brand-logo-icon">
              <Dna size={18} />
            </div>
            <div className="brand-title">
              <span>UI DNA</span>
              <span className="brand-tag">v2.4-LAB</span>
              <span 
                className="brand-tag dev-chip-badge" 
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

        {/* Desktop Navigation Tabs */}
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
              className="dna-badge-pill header-dna-pill"
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
            <span className="hide-on-mobile-xs">MUTATE</span>
          </button>

          {/* Export Profile Action (hidden on mobile header, available in mobile menu) */}
          <button
            onClick={onOpenExport}
            className="btn-secondary header-btn-hide-mobile"
            style={{ padding: '6px 12px', fontSize: '11px', gap: '6px' }}
            title="Export DNA Profile (E)"
          >
            <Share2 size={13} />
            <span>EXPORT</span>
          </button>

          {/* Command Palette Trigger */}
          <button
            onClick={onOpenCommandPalette}
            className="btn-secondary header-btn-hide-mobile"
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

          {/* Mobile Hamburger Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="btn-secondary mobile-menu-toggle-btn"
            style={{
              padding: '6px 10px',
              height: '32px'
            }}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </header>

      {/* Mobile Navigation Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="mobile-nav-drawer"
            style={{
              position: 'fixed',
              top: '60px',
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(6, 9, 14, 0.97)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              zIndex: 99,
              display: 'flex',
              flexDirection: 'column',
              padding: '20px',
              overflowY: 'auto',
              borderTop: '1px solid var(--border-hairline)'
            }}
          >
            {/* Active Specimen Summary */}
            {activeDNA && (
              <div
                style={{
                  background: 'rgba(14, 20, 30, 0.8)',
                  border: '1px solid var(--border-accent)',
                  borderRadius: '6px',
                  padding: '14px',
                  marginBottom: '18px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--accent-cyan)' }}>
                    ACTIVE LABORATORY SPECIMEN
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', fontWeight: 800, color: '#fff', marginTop: '2px' }}>
                    {activeDNA.id} • V{activeDNA.version}
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                    {activeDNA.classification}
                  </div>
                </div>

                <button
                  onClick={() => handleMobileNav('lab')}
                  className="btn-primary"
                  style={{ padding: '6px 12px', fontSize: '11px' }}
                >
                  OPEN LAB
                </button>
              </div>
            )}

            {/* Navigation Links */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-muted)', letterSpacing: '0.08em', padding: '0 4px 4px' }}>
                NAVIGATION PROTOCOLS
              </div>
              {navTabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activePage === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => handleMobileNav(tab.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '14px 16px',
                      background: isActive ? 'rgba(0, 242, 254, 0.12)' : 'rgba(14, 20, 30, 0.5)',
                      border: isActive ? '1px solid var(--accent-cyan)' : '1px solid var(--border-hairline)',
                      borderRadius: '6px',
                      color: isActive ? '#ffffff' : 'var(--text-secondary)',
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div
                        style={{
                          width: 32,
                          height: 32,
                          borderRadius: '4px',
                          background: isActive ? 'rgba(0, 242, 254, 0.2)' : 'rgba(255, 255, 255, 0.04)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: isActive ? 'var(--accent-cyan)' : 'var(--text-muted)'
                        }}
                      >
                        <Icon size={16} />
                      </div>
                      <div>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', fontWeight: 700, color: '#ffffff' }}>
                          {tab.label}
                        </div>
                        <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                          {tab.desc}
                        </div>
                      </div>
                    </div>

                    <ChevronRight size={16} color={isActive ? 'var(--accent-cyan)' : 'var(--text-muted)'} />
                  </button>
                );
              })}
            </div>

            {/* Quick Action Buttons in Drawer */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '24px' }}>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenMutate();
                }}
                className="btn-mutate"
                style={{ padding: '12px', fontSize: '12px', justifyContent: 'center' }}
              >
                <Zap size={14} />
                MUTATE SPECIMEN
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenExport();
                }}
                className="btn-secondary"
                style={{ padding: '12px', fontSize: '12px', justifyContent: 'center' }}
              >
                <Share2 size={14} />
                EXPORT PROFILE
              </button>
            </div>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCommandPalette();
              }}
              className="btn-secondary"
              style={{ width: '100%', padding: '12px', fontSize: '12px', justifyContent: 'center', gap: '8px' }}
            >
              <Command size={14} />
              COMMAND PALETTE (CTRL+K)
            </button>

            {/* Footer Attribution in Drawer */}
            <div
              style={{
                marginTop: 'auto',
                paddingTop: '20px',
                borderTop: '1px solid var(--border-hairline)',
                textAlign: 'center',
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                color: 'var(--text-muted)'
              }}
            >
              <div>Copyright © 2026 UI DNA</div>
              <div style={{ color: 'var(--accent-cyan)', marginTop: '2px', fontWeight: 600 }}>
                Developed by:- Aditya Kumar Jha
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
