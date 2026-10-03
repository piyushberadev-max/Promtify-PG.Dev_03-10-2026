import React from 'react';
import { BrandLogo } from '../components/BrandLogo';
import { NavTab } from '../types';

interface AboutViewProps {
  onNavigate: (tab: NavTab) => void;
  onOpenAuth: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onNavigate, onOpenAuth }) => {
  return (
    <div className="w-full min-h-screen bg-[#050505] text-[#e5e2e1] pt-24 pb-20 px-4 md:px-8 lg:px-12">
      <div className="max-w-5xl mx-auto space-y-16">
        {/* Brand Banner */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="flex justify-center mb-4">
            <BrandLogo size="lg" showWordmark={true} />
          </div>
          <div className="inline-flex items-center gap-1.5 font-mono text-xs text-[#8A8A8A] uppercase tracking-wider mb-3">
            <span>Foundational Mission</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold text-white tracking-tight mb-4">
            Make technical education practical, accessible, and structured.
          </h1>
          <p className="text-sm sm:text-base text-[#8A8A8A] leading-relaxed font-sans">
            _PG.Dev was founded to solve a pervasive breakdown in software engineering training: the chasm between basic tutorial syntax and production runtime engineering.
          </p>
        </div>

        {/* 3 Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-xl bg-[#090909] border border-white/10 space-y-3">
            <div className="w-8 h-8 rounded bg-[#161616] border border-white/10 flex items-center justify-center">
              <span className="material-symbols-outlined text-white text-[18px]">memory</span>
            </div>
            <h3 className="text-base font-semibold text-white">Deterministic Invariants</h3>
            <p className="text-xs text-[#8A8A8A] leading-relaxed font-sans">
              We do not teach through vague hand-waving or copy-pasting frameworks. Students learn compiler mechanics, virtual memory paging, POSIX calls, and distributed consensus from first principles.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-[#090909] border border-white/10 space-y-3">
            <div className="w-8 h-8 rounded bg-[#161616] border border-white/10 flex items-center justify-center">
              <span className="material-symbols-outlined text-white text-[18px]">terminal</span>
            </div>
            <h3 className="text-base font-semibold text-white">Containerized Rigor</h3>
            <p className="text-xs text-[#8A8A8A] leading-relaxed font-sans">
              Every lab runs inside containerized Linux sandboxes. Code is tested against rigorous unit suites, memory leaks via Valgrind, and concurrency race detectors before progressing.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-[#090909] border border-white/10 space-y-3">
            <div className="w-8 h-8 rounded bg-[#161616] border border-white/10 flex items-center justify-center">
              <span className="material-symbols-outlined text-white text-[18px]">verified</span>
            </div>
            <h3 className="text-base font-semibold text-white">Production Portfolios</h3>
            <p className="text-xs text-[#8A8A8A] leading-relaxed font-sans">
              Graduating students produce distributed key-value stores, custom database engines, and verifiable AI agents that stand up to senior and staff level technical scrutiny.
            </p>
          </div>
        </div>

        {/* Pedagogical Comparison Table */}
        <div className="rounded-2xl bg-[#0a0a0a] border border-white/15 p-6 md:p-8">
          <h2 className="text-xl md:text-2xl font-bold text-white mb-2 tracking-tight">
            How _PG.Dev Compares
          </h2>
          <p className="text-xs sm:text-sm text-[#8A8A8A] mb-6 font-sans">
            A clear comparison of traditional learning models versus our systems-first discipline.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-white/10 text-[#70757B]">
                  <th className="pb-3 pr-4 font-medium uppercase">Dimension</th>
                  <th className="pb-3 pr-4 font-medium uppercase text-[#888]">Bootcamps &amp; Videos</th>
                  <th className="pb-3 pr-4 font-medium uppercase text-[#888]">Traditional Academics</th>
                  <th className="pb-3 font-medium uppercase text-white font-bold">_PG.Dev Platform</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-[#AFAFAF]">
                <tr>
                  <td className="py-3.5 pr-4 text-white font-medium">Memory Management</td>
                  <td className="py-3.5 pr-4 text-[#777]">Ignored or abstracted</td>
                  <td className="py-3.5 pr-4 text-[#777]">Heavy theory, little practice</td>
                  <td className="py-3.5 text-white font-semibold">Custom allocators, slab pools, MMU paging</td>
                </tr>
                <tr>
                  <td className="py-3.5 pr-4 text-white font-medium">Testing &amp; CI</td>
                  <td className="py-3.5 pr-4 text-[#777]">console.log debugging</td>
                  <td className="py-3.5 pr-4 text-[#777]">Automated scripts on outdated VM</td>
                  <td className="py-3.5 text-white font-semibold">Deterministic test harnesses, race conditions</td>
                </tr>
                <tr>
                  <td className="py-3.5 pr-4 text-white font-medium">Capstone Depth</td>
                  <td className="py-3.5 pr-4 text-[#777]">Generic clone apps (Todo / Twitter)</td>
                  <td className="py-3.5 pr-4 text-[#777]">Research paper with mock script</td>
                  <td className="py-3.5 text-white font-semibold">Raft-replicated datastore, B+Tree engine</td>
                </tr>
                <tr>
                  <td className="py-3.5 pr-4 text-white font-medium">AI &amp; Runtimes</td>
                  <td className="py-3.5 pr-4 text-[#777]">Copy-paste API prompts</td>
                  <td className="py-3.5 pr-4 text-[#777]">Abstract matrix calculus</td>
                  <td className="py-3.5 text-white font-semibold">Transformer forward pass, vector indexes from scratch</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Call to Action */}
        <div className="p-8 rounded-xl bg-[#0d0d0d] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold text-white tracking-tight">Ready to build runtime software?</h3>
            <p className="text-xs text-[#8A8A8A] mt-1 font-sans">
              Enroll in foundational tracks and join over 10,000 active engineers.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => onNavigate('courses')}
              className="px-5 py-2.5 rounded bg-[#161616] hover:bg-[#202020] border border-white/15 text-white text-xs font-mono transition-colors"
            >
              Explore Tracks
            </button>
            <button
              type="button"
              onClick={onOpenAuth}
              className="px-5 py-2.5 rounded bg-white hover:bg-[#e2e2e2] text-black font-semibold text-xs transition-colors"
            >
              Start Learning
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
