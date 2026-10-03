import React, { useState } from 'react';
import { STUDENT_PROJECTS } from '../data/mockData';
import { StudentProject } from '../types';

interface ExtendedProject extends StudentProject {
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
}

const ALL_PROJECTS: ExtendedProject[] = [
  {
    ...STUDENT_PROJECTS[0],
    difficulty: 'Advanced',
    category: 'Systems & C',
  },
  {
    ...STUDENT_PROJECTS[1],
    difficulty: 'Advanced',
    category: 'Python & AI',
  },
  {
    ...STUDENT_PROJECTS[2],
    difficulty: 'Intermediate',
    category: 'Modern Web',
  },
  {
    ...STUDENT_PROJECTS[3],
    difficulty: 'Advanced',
    category: 'DB & DevOps',
  },
  {
    id: 'weather-runtime',
    title: 'High-Throughput Weather Telemetry Service',
    trackBadge: 'Backend Capstone',
    stars: '340',
    description: 'Real-time meteorological ingest service with sliding window aggregation, asynchronous cache stampede protection, and GeoJSON polygon indexing.',
    architectureDetails: 'Uses Go channels and ring buffers to ingest 50,000 sensor telemetry pings/sec. Computes rolling p95 temperature metrics using t-digest algorithms.',
    stack: ['Go', 'Redis', 'TimescaleDB', 'Docker'],
    author: 'Marcus C.',
    role: 'Backend Systems Engineer',
    githubUrl: 'https://github.com/pgdev-archive/weather-telemetry-engine',
    difficulty: 'Intermediate',
    category: 'DB & DevOps',
  },
  {
    id: 'expense-ledger',
    title: 'Double-Entry Cryptographic Expense Ledger',
    trackBadge: 'Full-Stack Capstone',
    stars: '410',
    description: 'Immutable financial accounting journal enforcing balanced debits and credits with hash-chained SHA-256 audit trails.',
    architectureDetails: 'Zero-floating-point integer arithmetic to prevent IEEE 754 precision drift. Automatic reconciliation via cryptographic Merkle tree state roots.',
    stack: ['Python', 'FastAPI', 'PostgreSQL', 'TypeScript'],
    author: 'Daniela R.',
    role: 'Fintech Software Engineer',
    githubUrl: 'https://github.com/pgdev-archive/double-entry-ledger',
    difficulty: 'Beginner',
    category: 'Python & AI',
  },
  {
    id: 'face-detection-embed',
    title: 'Embedded Face Landmark & Vector Indexer',
    trackBadge: 'Computer Vision Capstone',
    stars: '790',
    description: 'Lightweight ONNX model runtime pipeline that executes facial landmark regression and vector embedding generation in <15ms on CPU.',
    architectureDetails: 'Integrates SIMD AVX2 vector intrinsics to accelerate Euclidean distance calculations across 100,000 facial vector embeddings.',
    stack: ['C++', 'ONNX Runtime', 'OpenCV', 'SIMD'],
    author: 'Hiroshi T.',
    role: 'Embedded AI Engineer',
    githubUrl: 'https://github.com/pgdev-archive/embedded-face-landmarks',
    difficulty: 'Advanced',
    category: 'Systems & C',
  },
  {
    id: 'portfolio-terminal',
    title: 'Deterministic Developer Portfolio System',
    trackBadge: 'Web Architecture Capstone',
    stars: '290',
    description: 'A headless portfolio CMS and virtual shell emulator built with WebAssembly, custom ANSI terminal parsers, and static asset pre-rendering.',
    architectureDetails: 'Compiles a virtual POSIX file system into WebAssembly to let hiring managers navigate directories with ls, cat, and grep commands in browser.',
    stack: ['TypeScript', 'Rust (Wasm)', 'Tailwind CSS', 'Vite'],
    author: 'Chloe L.',
    role: 'Frontend Systems Engineer',
    githubUrl: 'https://github.com/pgdev-archive/portfolio-terminal-engine',
    difficulty: 'Beginner',
    category: 'Modern Web',
  },
];

export const ProjectsView: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [activeProjectModal, setActiveProjectModal] = useState<ExtendedProject | null>(null);

  const filters = ['All', 'Systems & C', 'Python & AI', 'Modern Web', 'DB & DevOps'];

  const filtered = selectedFilter === 'All'
    ? ALL_PROJECTS
    : ALL_PROJECTS.filter((p) => p.category === selectedFilter);

  return (
    <div className="w-full min-h-screen bg-[#050505] text-[#e5e2e1] pt-24 pb-20 px-4 md:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10 max-w-3xl">
          <div className="inline-flex items-center gap-1.5 font-mono text-xs text-[#8A8A8A] uppercase tracking-wider mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
            <span>Production Repositories</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
            Open-Source Engineering Projects
          </h1>
          <p className="text-sm md:text-base text-[#8A8A8A] mt-2 font-sans leading-relaxed">
            Every learner at _PG.Dev builds production capstones with deterministic unit tests, stress benchmarks, and architecture documentation.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center gap-2 mb-8 font-mono text-xs">
          <span className="text-[#70757B] text-[11px] uppercase mr-1">Filter by Stack:</span>
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setSelectedFilter(f)}
              className={`px-3 py-1.5 rounded transition-colors ${
                selectedFilter === f
                  ? 'bg-white text-black font-semibold'
                  : 'bg-[#111111] text-[#8A8A8A] hover:text-white border border-white/10'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((proj) => (
            <div
              key={proj.id}
              className="p-6 rounded-xl bg-[#090909] border border-white/10 hover:border-white/25 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-[#161616] border border-white/10 text-white uppercase font-semibold">
                      {proj.trackBadge}
                    </span>
                    <span className="font-mono text-[10px] text-[#8A8A8A] uppercase">
                      {proj.difficulty}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 font-mono text-xs text-[#8A8A8A]">
                    <span>&starf; {proj.stars}</span>
                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white"
                      title="Inspect GitHub repository"
                    >
                      <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                    </a>
                  </div>
                </div>

                <h3 className="text-base font-semibold text-white mb-2">{proj.title}</h3>
                <p className="text-xs text-[#8A8A8A] mb-4 leading-relaxed font-sans">
                  {proj.description}
                </p>

                {/* Tech Stack Metadata */}
                <div className="mb-4 font-mono text-xs text-[#70757B]">
                  <span className="text-[10px] uppercase text-[#AFAFAF] block mb-1">Stack:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {proj.stack.map((s, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded bg-[#131313] border border-white/10 text-[#D9D9D9] text-[11px]">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                <span className="text-[#8A8A8A]">Author: <span className="text-white">{proj.author}</span> ({proj.role})</span>
                <button
                  type="button"
                  onClick={() => setActiveProjectModal(proj)}
                  className="text-white hover:underline flex items-center gap-1"
                >
                  <span>Architecture Spec</span>
                  <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Project Architecture Modal */}
        {activeProjectModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
            <div 
              className="w-full max-w-2xl rounded-2xl bg-[#0d0d0d] border border-white/20 p-6 md:p-8 shadow-[0_32px_80px_rgba(0,0,0,0.95)] max-h-[85vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="font-mono text-xs text-[#8A8A8A] uppercase mb-1">
                    {activeProjectModal.trackBadge} &bull; {activeProjectModal.difficulty}
                  </div>
                  <h3 className="text-xl font-bold text-white tracking-tight">
                    {activeProjectModal.title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveProjectModal(null)}
                  className="p-1 rounded text-[#8A8A8A] hover:text-white"
                >
                  <span className="material-symbols-outlined text-[20px]">close</span>
                </button>
              </div>

              <div className="space-y-4 text-xs font-sans text-[#AFAFAF] leading-relaxed">
                <div>
                  <div className="font-mono text-xs text-white font-semibold uppercase mb-1">System Architecture Overview</div>
                  <p>{activeProjectModal.description}</p>
                </div>

                <div className="p-4 rounded-xl bg-[#141414] border border-white/10 font-mono text-xs text-white">
                  <div className="text-[10px] text-[#70757B] uppercase mb-1">Low-Level Runtime Invariants:</div>
                  <p>{activeProjectModal.architectureDetails}</p>
                </div>

                <div>
                  <div className="font-mono text-xs text-white font-semibold uppercase mb-1">Verified Tech Stack</div>
                  <div className="flex flex-wrap gap-2 pt-1 font-mono text-xs">
                    {activeProjectModal.stack.map((s, idx) => (
                      <span key={idx} className="px-2.5 py-1 rounded bg-[#181818] border border-white/15 text-white">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between font-mono text-xs">
                  <span>Author: {activeProjectModal.author} &bull; {activeProjectModal.role}</span>
                  <a
                    href={activeProjectModal.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded bg-white text-black font-semibold hover:bg-[#e2e2e2] transition-colors flex items-center gap-1.5"
                  >
                    <span>View GitHub Repo</span>
                    <span className="material-symbols-outlined text-[15px]">open_in_new</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
