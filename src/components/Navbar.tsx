import React, { useState } from 'react';
import { BrandLogo } from './BrandLogo';
import { NavTab, UserProfile } from '../types';

interface NavbarProps {
  currentTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  onOpenSearch: () => void;
  onOpenAuth: () => void;
  user: UserProfile | null;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onTabChange,
  onOpenSearch,
  onOpenAuth,
  user,
  onLogout,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const navItems: { label: string; tab: NavTab }[] = [
    { label: 'Home', tab: 'home' },
    { label: 'Courses', tab: 'courses' },
    { label: 'Learning Paths', tab: 'learning-paths' },
    { label: 'Practice', tab: 'practice' },
    { label: 'Projects', tab: 'projects' },
    { label: 'Resources', tab: 'resources' },
    { label: 'About', tab: 'about' },
  ];

  const handleNavClick = (tab: NavTab) => {
    onTabChange(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#050505]/85 backdrop-blur-xl border-b border-white/10 transition-colors">
      <div className="h-16 max-w-7xl mx-auto px-4 md:px-8 lg:px-12 flex items-center justify-between gap-4">
        {/* Left: Brand Logo */}
        <div className="flex items-center gap-8">
          <BrandLogo 
            size="md" 
            showWordmark={true} 
            onClick={() => handleNavClick('home')} 
          />

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-6">
            {navItems.map((item) => {
              const isActive = currentTab === item.tab;
              return (
                <button
                  key={item.tab}
                  type="button"
                  onClick={() => handleNavClick(item.tab)}
                  className={`py-1 text-sm font-medium transition-all relative ${
                    isActive
                      ? 'text-white border-b-2 border-white'
                      : 'text-[#8A8A8A] hover:text-[#D9D9D9]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Right Action Cluster */}
        <div className="flex items-center gap-3">
          {/* Quick Search Trigger (Cmd+K) */}
          <button
            type="button"
            onClick={onOpenSearch}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded bg-[#111111] hover:bg-[#181818] text-[#8A8A8A] hover:text-[#D9D9D9] border border-white/10 hover:border-white/20 transition-all text-xs"
            title="Search curriculum and resources (⌘K)"
          >
            <span className="material-symbols-outlined text-[16px]">search</span>
            <span>Search</span>
            <span className="px-1.5 py-0.5 rounded border border-white/10 bg-[#1c1c1c] text-[10px] font-mono text-[#AFAFAF]">
              ⌘K
            </span>
          </button>

          {/* Auth State Button */}
          {user ? (
            <div className="relative">
              <button
                type="button"
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 px-2.5 py-1 rounded bg-[#111111] border border-white/15 hover:border-white/30 text-xs font-mono text-white transition-colors"
              >
                <div className="w-5 h-5 rounded-full bg-white text-black flex items-center justify-center font-bold text-[10px]">
                  {user.name.charAt(0)}
                </div>
                <span className="hidden md:inline">{user.handle}</span>
                <span className="material-symbols-outlined text-[14px]">arrow_drop_down</span>
              </button>

              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded bg-[#111111] border border-white/15 shadow-2xl py-1 text-xs z-50">
                  <div className="px-3 py-2 border-b border-white/10 text-[#8A8A8A]">
                    <div className="font-semibold text-white">{user.name}</div>
                    <div className="text-[11px] truncate">{user.email}</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      onTabChange('dashboard');
                      setUserDropdownOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 hover:bg-[#1c1c1c] text-white flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[15px]">dashboard</span>
                    <span>Learning Dashboard</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      onTabChange('practice');
                      setUserDropdownOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 hover:bg-[#1c1c1c] text-white flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[15px]">terminal</span>
                    <span>Deterministic Sandbox</span>
                  </button>
                  <div className="border-t border-white/10 my-1"></div>
                  <button
                    type="button"
                    onClick={() => {
                      onLogout();
                      setUserDropdownOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 hover:bg-[#1c1c1c] text-[#ff8080] flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[15px]">logout</span>
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              type="button"
              onClick={onOpenAuth}
              className="text-xs font-medium text-[#AFAFAF] hover:text-white px-2.5 py-1.5 transition-colors"
            >
              Sign In
            </button>
          )}

          {/* Primary CTA button */}
          <button
            type="button"
            onClick={user ? () => handleNavClick('dashboard') : onOpenAuth}
            className="text-xs font-semibold text-[#050505] bg-white hover:bg-[#e2e2e2] rounded px-3.5 py-1.5 border border-white/20 transition-all duration-150 shadow-sm"
          >
            {user ? 'My Workspace' : 'Get Started'}
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-1.5 rounded text-[#AFAFAF] hover:text-white hover:bg-[#181818] border border-white/10"
            aria-label="Toggle navigation menu"
          >
            <span className="material-symbols-outlined text-[20px]">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#0a0a0a] border-b border-white/10 px-4 py-4 space-y-2">
          <div className="mb-3">
            <button
              type="button"
              onClick={() => {
                onOpenSearch();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-between px-3 py-2 rounded bg-[#111111] text-[#8A8A8A] text-xs border border-white/10"
            >
              <span className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px]">search</span>
                <span>Search curriculum...</span>
              </span>
              <span className="font-mono text-[10px] border border-white/10 px-1 rounded">⌘K</span>
            </button>
          </div>

          {navItems.map((item) => (
            <button
              key={item.tab}
              type="button"
              onClick={() => handleNavClick(item.tab)}
              className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                currentTab === item.tab
                  ? 'bg-white/10 text-white font-medium'
                  : 'text-[#AFAFAF] hover:bg-white/5 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}

          {user && (
            <button
              type="button"
              onClick={() => handleNavClick('dashboard')}
              className="w-full text-left px-3 py-2 rounded text-sm text-white bg-white/5 hover:bg-white/10 flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-[16px]">dashboard</span>
              <span>Student Dashboard</span>
            </button>
          )}
        </div>
      )}
    </header>
  );
};
