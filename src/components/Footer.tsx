import React from 'react';
import { NavTab } from '../types';

interface FooterProps {
  onTabChange: (tab: NavTab) => void;
  onOpenPrivacy?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onTabChange }) => {
  return (
    <footer className="w-full bg-[#080808] border-t border-white/10 text-xs">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 pt-16 pb-12">
        {/* Link Columns */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-16">
          {/* Column 1: Platform */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-wider text-white mb-4 font-semibold">
              Platform
            </h4>
            <ul className="space-y-2.5 text-[#8A8A8A]">
              <li>
                <button type="button" onClick={() => onTabChange('courses')} className="hover:text-white transition-colors">
                  Courses
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onTabChange('learning-paths')} className="hover:text-white transition-colors">
                  Learning Paths
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onTabChange('practice')} className="hover:text-white transition-colors">
                  Interactive Sandboxes
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onTabChange('projects')} className="hover:text-white transition-colors">
                  Production Projects
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onTabChange('practice')} className="hover:text-white transition-colors">
                  Terminal IDE
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Curriculum */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-wider text-white mb-4 font-semibold">
              Curriculum
            </h4>
            <ul className="space-y-2.5 text-[#8A8A8A]">
              <li>
                <button type="button" onClick={() => onTabChange('courses')} className="hover:text-white transition-colors">
                  Systems Architecture
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onTabChange('courses')} className="hover:text-white transition-colors">
                  Distributed Systems
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onTabChange('courses')} className="hover:text-white transition-colors">
                  Kernel &amp; Runtimes
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onTabChange('courses')} className="hover:text-white transition-colors">
                  Database Internals
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onTabChange('courses')} className="hover:text-white transition-colors">
                  Compiler Design
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-wider text-white mb-4 font-semibold">
              Resources
            </h4>
            <ul className="space-y-2.5 text-[#8A8A8A]">
              <li>
                <button type="button" onClick={() => onTabChange('resources')} className="hover:text-white transition-colors">
                  Documentation
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onTabChange('resources')} className="hover:text-white transition-colors">
                  API Reference
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onTabChange('resources')} className="hover:text-white transition-colors">
                  RFC Index
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onTabChange('resources')} className="hover:text-white transition-colors">
                  Release Notes
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onTabChange('resources')} className="hover:text-white transition-colors">
                  Engineering Whitepapers
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Company */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-wider text-white mb-4 font-semibold">
              Company
            </h4>
            <ul className="space-y-2.5 text-[#8A8A8A]">
              <li>
                <button type="button" onClick={() => onTabChange('about')} className="hover:text-white transition-colors">
                  About Us
                </button>
              </li>
              <li>
                <a href="#about" onClick={() => onTabChange('about')} className="hover:text-white transition-colors">
                  Pedagogy &amp; Craft
                </a>
              </li>
              <li>
                <span className="hover:text-white cursor-pointer transition-colors">
                  Security &amp; Audits
                </span>
              </li>
              <li>
                <span className="hover:text-white cursor-pointer transition-colors">
                  Terms of Service
                </span>
              </li>
              <li>
                <span className="hover:text-white cursor-pointer transition-colors">
                  Privacy Policy
                </span>
              </li>
            </ul>
          </div>

          {/* Column 5: Network */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-wider text-white mb-4 font-semibold">
              Network
            </h4>
            <ul className="space-y-2.5 text-[#8A8A8A]">
              <li>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <span>GitHub</span>
                  <span className="material-symbols-outlined text-[13px]">arrow_outward</span>
                </a>
              </li>
              <li>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <span>LinkedIn</span>
                  <span className="material-symbols-outlined text-[13px]">arrow_outward</span>
                </a>
              </li>
              <li>
                <button type="button" onClick={() => onTabChange('resources')} className="hover:text-white transition-colors flex items-center gap-1.5">
                  <span>Discord Engineering</span>
                </button>
              </li>
              <li>
                <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <span>X / Twitter</span>
                  <span className="material-symbols-outlined text-[13px]">arrow_outward</span>
                </a>
              </li>
              <li>
                <span className="hover:text-white cursor-pointer transition-colors">
                  Status Dispatch
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Operational Status & Copyright Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-xs text-[#8A8A8A]">
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-40"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
              </span>
              <span className="text-[#D9D9D9]">All systems operational</span>
            </div>
            <span className="font-sans text-[#AFAFAF]">
              &copy; 2026 _PG.Dev &mdash; Build. Learn. Create.
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded border border-white/10 bg-[#111111] text-[#AFAFAF]">
              v2.4.0-prod
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
