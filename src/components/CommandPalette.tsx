import React, { useState, useEffect, useRef } from 'react';
import { COURSES, LEARNING_PATHS, SANDBOX_PROBLEMS, RESOURCES } from '../data/mockData';
import { NavTab } from '../types';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (tab: NavTab, extraId?: string) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onNavigate,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else onClose(); // parent handles toggle
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const q = query.toLowerCase().trim();

  const filteredCourses = COURSES.filter(
    (c) => c.title.toLowerCase().includes(q) || c.description.toLowerCase().includes(q) || c.category.toLowerCase().includes(q)
  );

  const filteredProblems = SANDBOX_PROBLEMS.filter(
    (p) => p.title.toLowerCase().includes(q) || p.codeNumber.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
  );

  const filteredPaths = LEARNING_PATHS.filter(
    (p) => p.title.toLowerCase().includes(q) || p.pathNumber.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
  );

  const filteredResources = RESOURCES.filter(
    (r) => r.title.toLowerCase().includes(q) || r.category.toLowerCase().includes(q)
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150">
      <div 
        className="w-full max-w-2xl rounded-xl bg-[#0f0f0f] border border-white/20 shadow-[0_24px_64px_rgba(0,0,0,0.9)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/10 bg-[#141414]">
          <span className="material-symbols-outlined text-[20px] text-[#AFAFAF]">search</span>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or search courses, paths, sandbox algorithms, whitepapers..."
            className="flex-1 bg-transparent text-sm text-white placeholder:text-[#70757B] outline-none font-sans"
          />
          <button
            type="button"
            onClick={onClose}
            className="px-1.5 py-0.5 rounded border border-white/15 bg-[#1b1b1b] text-[11px] font-mono text-[#AFAFAF] hover:text-white"
          >
            ESC
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-2 space-y-4 text-xs">
          {/* Quick Actions */}
          {!q && (
            <div>
              <div className="px-3 py-1.5 font-mono text-[10px] text-[#70757B] uppercase tracking-wider">
                Quick Navigation
              </div>
              <div className="space-y-0.5">
                {[
                  { label: 'Interactive Sandbox IDE', tab: 'practice' as NavTab, icon: 'terminal' },
                  { label: 'Curriculum Catalog (50+ Courses)', tab: 'courses' as NavTab, icon: 'auto_stories' },
                  { label: 'Engineering Learning Paths (Roadmap)', tab: 'learning-paths' as NavTab, icon: 'timeline' },
                  { label: 'Production Projects Showcase', tab: 'projects' as NavTab, icon: 'deployed_code' },
                  { label: 'Architecture Whitepapers & Cheat Sheets', tab: 'resources' as NavTab, icon: 'menu_book' },
                ].map((item) => (
                  <button
                    key={item.tab}
                    type="button"
                    onClick={() => {
                      onNavigate(item.tab);
                      onClose();
                    }}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-left text-[#D9D9D9] hover:bg-[#1a1a1a] hover:text-white transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="material-symbols-outlined text-[16px] text-[#AFAFAF]">{item.icon}</span>
                      <span>{item.label}</span>
                    </div>
                    <span className="material-symbols-outlined text-[14px] text-[#70757B]">arrow_forward</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Courses Matches */}
          {filteredCourses.length > 0 && (
            <div>
              <div className="px-3 py-1.5 font-mono text-[10px] text-[#70757B] uppercase tracking-wider">
                Courses ({filteredCourses.length})
              </div>
              <div className="space-y-1">
                {filteredCourses.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => {
                      onNavigate('courses', c.id);
                      onClose();
                    }}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-left hover:bg-[#1a1a1a] transition-colors"
                  >
                    <div>
                      <div className="text-white font-medium">{c.title}</div>
                      <div className="text-[#8A8A8A] text-[11px] truncate max-w-md">{c.description}</div>
                    </div>
                    <div className="font-mono text-[10px] text-[#AFAFAF] px-2 py-0.5 rounded bg-[#1e1e1e] border border-white/10 shrink-0">
                      {c.difficulty}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Sandbox Problems Matches */}
          {filteredProblems.length > 0 && (
            <div>
              <div className="px-3 py-1.5 font-mono text-[10px] text-[#70757B] uppercase tracking-wider">
                Deterministic Sandbox Problems ({filteredProblems.length})
              </div>
              <div className="space-y-1">
                {filteredProblems.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => {
                      onNavigate('practice', p.id);
                      onClose();
                    }}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-left hover:bg-[#1a1a1a] transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-white text-[11px] px-1.5 py-0.5 rounded bg-white/10">
                        {p.codeNumber}
                      </span>
                      <span className="text-white font-medium">{p.title}</span>
                    </div>
                    <span className="font-mono text-[10px] text-[#AFAFAF]">{p.category}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Learning Paths Matches */}
          {filteredPaths.length > 0 && (
            <div>
              <div className="px-3 py-1.5 font-mono text-[10px] text-[#70757B] uppercase tracking-wider">
                Learning Paths ({filteredPaths.length})
              </div>
              <div className="space-y-1">
                {filteredPaths.map((lp) => (
                  <button
                    key={lp.id}
                    type="button"
                    onClick={() => {
                      onNavigate('learning-paths', lp.id);
                      onClose();
                    }}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-left hover:bg-[#1a1a1a] transition-colors"
                  >
                    <div>
                      <div className="text-white font-medium">{lp.pathNumber}: {lp.title}</div>
                      <div className="text-[#8A8A8A] text-[11px]">{lp.duration}</div>
                    </div>
                    <span className="material-symbols-outlined text-[14px] text-[#70757B]">arrow_forward</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Resources */}
          {filteredResources.length > 0 && (
            <div>
              <div className="px-3 py-1.5 font-mono text-[10px] text-[#70757B] uppercase tracking-wider">
                Engineering Resources ({filteredResources.length})
              </div>
              <div className="space-y-1">
                {filteredResources.map((r) => (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => {
                      onNavigate('resources', r.id);
                      onClose();
                    }}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-left hover:bg-[#1a1a1a] transition-colors"
                  >
                    <div>
                      <div className="text-white font-medium">{r.title}</div>
                      <div className="text-[#8A8A8A] text-[11px]">{r.description}</div>
                    </div>
                    <span className="font-mono text-[10px] text-white px-2 py-0.5 rounded bg-white/10">
                      {r.category}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {q && filteredCourses.length === 0 && filteredProblems.length === 0 && filteredPaths.length === 0 && (
            <div className="py-8 text-center text-[#70757B]">
              <span className="material-symbols-outlined text-3xl mb-2">find_in_page</span>
              <div>No results found for &quot;{query}&quot;</div>
              <div className="text-[11px] mt-1">Try searching for &quot;Python&quot;, &quot;C&quot;, &quot;Raft&quot;, &quot;Bitwise&quot;, or &quot;WAL&quot;</div>
            </div>
          )}
        </div>

        {/* Footer Shortcut Guide */}
        <div className="px-4 py-2 bg-[#090909] border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-[#70757B]">
          <div className="flex items-center gap-3">
            <span>[ENTER] to select</span>
            <span>[ESC] to dismiss</span>
          </div>
          <span>_PG.Dev v2.4</span>
        </div>
      </div>
    </div>
  );
};
