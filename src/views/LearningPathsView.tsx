import React, { useState } from 'react';
import { LEARNING_PATHS } from '../data/mockData';
import { NavTab } from '../types';

interface LearningPathsViewProps {
  onNavigate: (tab: NavTab, extraId?: string) => void;
  selectedPathId?: string;
}

export const LearningPathsView: React.FC<LearningPathsViewProps> = ({
  onNavigate,
  selectedPathId,
}) => {
  const [activePathId, setActivePathId] = useState<string>(selectedPathId || 'path-01');

  const activePath = LEARNING_PATHS.find((p) => p.id === activePathId) || LEARNING_PATHS[0];

  return (
    <div className="w-full min-h-screen bg-[#050505] text-[#e5e2e1] pt-24 pb-20 px-4 md:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10 max-w-3xl">
          <div className="inline-flex items-center gap-1.5 font-mono text-xs text-[#8A8A8A] uppercase tracking-wider mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
            <span>Architectural Progression</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
            Learning Paths &amp; Engineering Roadmaps
          </h1>
          <p className="text-sm md:text-base text-[#8A8A8A] mt-2 font-sans leading-relaxed">
            Move step-by-step from raw memory pointers and compiler theory up to multi-region distributed consensus and frontier AI agents.
          </p>
        </div>

        {/* Path Selection Horizontal Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {LEARNING_PATHS.map((path) => {
            const isActive = activePath.id === path.id;
            return (
              <button
                key={path.id}
                type="button"
                onClick={() => setActivePathId(path.id)}
                className={`p-5 rounded-xl text-left border transition-all ${
                  isActive
                    ? 'bg-[#121212] border-white/40 shadow-[0_4px_24px_rgba(255,255,255,0.05)]'
                    : 'bg-[#090909] border-white/10 hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs font-semibold text-white">{path.pathNumber}</span>
                  <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-white ring-4 ring-white/20' : 'bg-[#333]'}`}></span>
                </div>
                <div className="font-semibold text-sm text-white mb-1">{path.title}</div>
                <div className="font-mono text-[11px] text-[#8A8A8A]">{path.duration}</div>
              </button>
            );
          })}
        </div>

        {/* Detailed Active Roadmap View */}
        <div className="p-6 md:p-8 rounded-2xl bg-[#0a0a0a] border border-white/15 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 mb-8 border-b border-white/10 gap-4">
            <div>
              <div className="font-mono text-xs text-[#8A8A8A] uppercase tracking-wider mb-1">
                Active Track &bull; {activePath.pathNumber}
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                {activePath.title}
              </h2>
              <p className="text-xs md:text-sm text-[#AFAFAF] mt-1 max-w-2xl font-sans leading-relaxed">
                {activePath.description}
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => onNavigate('practice')}
                className="px-4 py-2 rounded-lg bg-[#141414] hover:bg-[#1e1e1e] border border-white/15 text-white font-mono text-xs transition-colors"
              >
                Launch Track Sandbox
              </button>
              <button
                type="button"
                onClick={() => onNavigate('courses')}
                className="px-4 py-2 rounded-lg bg-white hover:bg-[#e2e2e2] text-black font-semibold text-xs transition-colors"
              >
                Enroll in Track
              </button>
            </div>
          </div>

          {/* Outcome Banner */}
          <div className="p-4 rounded-xl bg-[#121212] border border-white/10 mb-8 flex items-start gap-3">
            <span className="material-symbols-outlined text-white text-[20px] shrink-0 mt-0.5">
              verified
            </span>
            <div>
              <div className="font-mono text-xs font-semibold text-white uppercase tracking-wider">
                Target Engineering Invariant
              </div>
              <div className="text-xs text-[#AFAFAF] mt-0.5 leading-relaxed font-sans">
                {activePath.targetOutcome}
              </div>
            </div>
          </div>

          {/* Milestone Progression Steps */}
          <div className="space-y-6">
            <h3 className="font-mono text-xs uppercase tracking-wider text-[#70757B] font-semibold">
              Sequential Milestones &amp; Capstone Checks
            </h3>

            <div className="relative pl-6 md:pl-8 space-y-8 before:absolute before:left-3 before:top-3 before:bottom-3 before:w-px before:bg-white/20">
              {activePath.milestones.map((m, idx) => (
                <div key={idx} className="relative">
                  {/* Step node dot */}
                  <div className="absolute -left-6 md:-left-8 top-1 w-5 h-5 rounded-full bg-[#050505] border border-white/40 flex items-center justify-center font-mono text-[10px] text-white font-bold">
                    {idx + 1}
                  </div>

                  <div className="p-5 rounded-xl bg-[#111111] border border-white/10 hover:border-white/20 transition-all">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 gap-2">
                      <h4 className="text-sm font-semibold text-white">
                        Milestone {idx + 1}: {m.title}
                      </h4>
                      <span className="font-mono text-[10px] text-[#AFAFAF] px-2 py-0.5 rounded bg-white/5 border border-white/10">
                        Lab CI: Mandatory Pass
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-1 font-mono text-xs">
                      {m.topics.map((t, tidx) => (
                        <span key={tidx} className="px-2.5 py-1 rounded bg-[#181818] border border-white/10 text-[#D9D9D9]">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
