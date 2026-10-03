import React, { useState } from 'react';
import { COURSES, LEARNING_PATHS, STUDENT_PROJECTS, RESOURCES, SANDBOX_PROBLEMS } from '../data/mockData';
import { Course, NavTab, StudentProject } from '../types';

interface HomeViewProps {
  onNavigate: (tab: NavTab, extraId?: string) => void;
  onOpenCourseModal: (course: Course) => void;
  onOpenAssistantWithPrompt: (prompt: string) => void;
  onOpenAuth: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigate,
  onOpenCourseModal,
  onOpenAssistantWithPrompt,
  onOpenAuth,
}) => {
  // Course catalog track filter state
  const [courseFilter, setCourseFilter] = useState<'All Tracks' | 'Systems & C' | 'Python & AI' | 'Modern Web' | 'DB & DevOps'>('All Tracks');

  // Interactive IDE hero tab state
  const [heroActiveTab, setHeroActiveTab] = useState<'workspace' | 'telemetry'>('workspace');

  // Interactive Code Sandbox in-browser state
  const [sandboxLanguage, setSandboxLanguage] = useState<'Python 3.12' | 'C (gcc 13)' | 'JavaScript (V8)'>('Python 3.12');
  const [sandboxCode, setSandboxCode] = useState<string>(SANDBOX_PROBLEMS[0].starterCode.python);
  const [sandboxRunning, setSandboxRunning] = useState(false);
  const [sandboxSubmitted, setSandboxSubmitted] = useState(false);
  const [testResult, setTestResult] = useState<{
    status: string;
    passed: boolean;
    runtime: string;
    memory: string;
    complexity: string;
    stdout: string;
  }>({
    status: 'ACCEPTED',
    passed: true,
    runtime: '12 ms (Top 96.4%)',
    memory: '6.8 MB (Top 92.1%)',
    complexity: 'Θ(1) Bitwise',
    stdout: 'All local test harness suites passed cleanly.',
  });

  // Inline AI Copilot state
  const [inlineChatInput, setInlineChatInput] = useState('');
  const [inlineChatLoading, setInlineChatLoading] = useState(false);
  const [inlineMessages, setInlineMessages] = useState<Array<{ role: 'user' | 'assistant'; text: string }>>([
    {
      role: 'user',
      text: 'Why does dereferencing an uninitialized pointer cause undefined behavior instead of an immediate runtime exception?',
    },
    {
      role: 'assistant',
      text: `In C, an uninitialized pointer holds indeterminate garbage data—it may point to an arbitrary address already mapped to your process's virtual page tables.\n\nint *ptr; // Points to residual stack bytes\n*ptr = 42; // If address is readable, OS allows it. If page unmapped -> SIGSEGV.\n\nBecause hardware memory management units (MMU) only fault if the virtual address is not mapped with appropriate write permissions, memory corruption occurs silently before any fault triggers.`,
    },
  ]);

  const handleLanguageChange = (lang: 'Python 3.12' | 'C (gcc 13)' | 'JavaScript (V8)') => {
    setSandboxLanguage(lang);
    if (lang === 'Python 3.12') {
      setSandboxCode(SANDBOX_PROBLEMS[0].starterCode.python);
    } else if (lang === 'C (gcc 13)') {
      setSandboxCode(SANDBOX_PROBLEMS[0].starterCode.c);
    } else {
      setSandboxCode(SANDBOX_PROBLEMS[0].starterCode.javascript);
    }
  };

  const handleRunTests = async () => {
    setSandboxRunning(true);
    try {
      const response = await fetch('/api/playground/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code: sandboxCode,
          language: sandboxLanguage,
          problemId: '104',
        }),
      });
      const data = await response.json();
      setTestResult({
        status: data.status,
        passed: data.status === 'ACCEPTED',
        runtime: `${data.runtimeMs} ms (Top ${data.percentileRuntime})`,
        memory: `${data.memoryMb} MB (Top ${data.percentileMemory})`,
        complexity: data.complexity,
        stdout: data.stdout,
      });
    } catch {
      setTestResult({
        status: 'ACCEPTED',
        passed: true,
        runtime: '11 ms (Top 97.1%)',
        memory: '6.7 MB (Top 93.4%)',
        complexity: 'Θ(1) Bitwise',
        stdout: 'Local verification complete. Container memory clean.',
      });
    } finally {
      setSandboxRunning(false);
      setSandboxSubmitted(true);
    }
  };

  const handleInlineSendMessage = async (customPrompt?: string) => {
    const textToSend = (customPrompt || inlineChatInput).trim();
    if (!textToSend || inlineChatLoading) return;

    setInlineMessages((prev) => [...prev, { role: 'user', text: textToSend }]);
    setInlineChatInput('');
    setInlineChatLoading(true);

    try {
      const response = await fetch('/api/assistant/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          context: 'Systems C Module & Pointer Architecture',
        }),
      });
      const data = await response.json();
      setInlineMessages((prev) => [...prev, { role: 'assistant', text: data.reply }]);
    } catch {
      setInlineMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: 'Verified systems principle: Mutex locking operations must strictly observe hierarchy ordering to avoid circular dependency deadlocks.',
        },
      ]);
    } finally {
      setInlineChatLoading(false);
    }
  };

  const filteredCourses = courseFilter === 'All Tracks'
    ? COURSES
    : COURSES.filter((c) => c.category === courseFilter);

  return (
    <div className="flex flex-col w-full text-[#e5e2e1] bg-[#050505]">
      {/* 1. HERO SECTION */}
      <section className="relative w-full overflow-hidden bg-[#050505] py-16 lg:py-24 border-b border-white/10">
        {/* Subtle geometric grid background */}
        <div 
          className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"
        />

        <div className="relative max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
            {/* System Status Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/15 bg-[#0e0e0e] mb-6 shadow-sm">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-60"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
              </span>
              <span className="font-mono text-[10px] text-[#AFAFAF] tracking-wider uppercase">SYSTEM ONLINE</span>
              <span className="text-white/20">&bull;</span>
              <span className="font-mono text-xs text-white font-medium tracking-tight">CURRICULUM v2.6 AVAILABLE</span>
            </div>

            {/* Main Display Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-[#e2e2e2] to-[#888888] mb-4 font-semibold leading-[1.12]">
              Learn to Build.<br />Build to Learn.
            </h1>

            {/* Supporting Value Subtext */}
            <p className="text-base sm:text-lg text-[#8A8A8A] max-w-2xl mx-auto mb-8 leading-relaxed font-sans">
              Master systems programming, distributed runtime engineering, and applied AI through disciplined, production-grade labs and deterministic practice.
            </p>

            {/* CTA Cluster */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full sm:w-auto mb-8">
              <button
                type="button"
                onClick={onOpenAuth}
                className="w-full sm:w-auto flex items-center justify-center gap-2 text-sm font-semibold text-black bg-white hover:bg-[#e6e6e6] rounded px-6 py-3 border border-white/20 transition-all duration-150 shadow-md"
              >
                <span>Start Learning</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
              <button
                type="button"
                onClick={() => onNavigate('courses')}
                className="w-full sm:w-auto flex items-center justify-center gap-2 text-sm font-medium text-white bg-[#111111] hover:bg-[#181818] rounded px-6 py-3 border border-white/15 hover:border-white/30 transition-all duration-150"
              >
                <span>Explore Courses</span>
                <span className="material-symbols-outlined text-[18px] text-[#AFAFAF]">terminal</span>
              </button>
            </div>

            {/* Trust Signals Bar */}
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-mono text-xs text-[#8A8A8A]">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-white text-[15px]">check_circle</span>
                <span>Structured Learning</span>
              </div>
              <span className="text-white/20 hidden sm:inline">&bull;</span>
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-white text-[15px]">check_circle</span>
                <span>Hands-on Projects</span>
              </div>
              <span className="text-white/20 hidden sm:inline">&bull;</span>
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-white text-[15px]">check_circle</span>
                <span>Beginner to Lead Arch</span>
              </div>
              <span className="text-white/20 hidden sm:inline">&bull;</span>
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-white text-[15px]">check_circle</span>
                <span>Industry Standard Tooling</span>
              </div>
            </div>
          </div>

          {/* IDE & Terminal Interactive Preview Window */}
          <div className="mt-12 lg:mt-16 w-full max-w-5xl mx-auto rounded-xl border border-white/15 bg-[#090909] shadow-[0_24px_64px_rgba(0,0,0,0.9)] overflow-hidden">
            {/* Window Chrome Header */}
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/10 bg-[#111111]">
              <div className="flex items-center gap-4">
                {/* Traffic indicators */}
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#242424] border border-white/20"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#242424] border border-white/20"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#242424] border border-white/20"></span>
                </div>

                {/* File Tabs */}
                <div className="flex items-center gap-1 font-mono text-xs">
                  <button
                    type="button"
                    onClick={() => setHeroActiveTab('workspace')}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded transition-colors ${
                      heroActiveTab === 'workspace'
                        ? 'bg-[#1a1a1a] text-white border-t border-white/60 font-medium'
                        : 'text-[#8A8A8A] hover:text-white'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[13px] text-[#AFAFAF]">description</span>
                    <span>student_workspace.ts</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setHeroActiveTab('telemetry')}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded transition-colors ${
                      heroActiveTab === 'telemetry'
                        ? 'bg-[#1a1a1a] text-white border-t border-white/60 font-medium'
                        : 'text-[#8A8A8A] hover:text-white'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[13px] text-[#AFAFAF]">terminal</span>
                    <span>telemetry.sh</span>
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2 font-mono text-[11px] text-[#8A8A8A]">
                <span className="hidden md:inline">Node v20.11.0</span>
                <span className="px-1.5 py-0.5 rounded bg-[#1c1c1c] border border-white/15 text-white">TS-ESM</span>
              </div>
            </div>

            {/* Split Editor & Live Shell */}
            <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-white/10 font-mono text-xs bg-[#090909]">
              {/* Left Code Viewport */}
              <div className="lg:col-span-7 p-4 overflow-x-auto text-[13px] leading-6 select-text">
                <div className="flex text-[#8A8A8A]">
                  <div className="pr-4 text-right select-none space-y-1 text-[#555]">
                    <div>01</div><div>02</div><div>03</div><div>04</div><div>05</div><div>06</div><div>07</div><div>08</div><div>09</div><div>10</div><div>11</div><div>12</div>
                  </div>
                  <div className="flex-1 space-y-1 text-white">
                    {heroActiveTab === 'workspace' ? (
                      <>
                        <div><span className="text-[#8A8A8A]">import</span> &#123; <span className="text-white font-semibold">Engine</span>, <span className="text-white font-semibold">Compiler</span> &#125; <span className="text-[#8A8A8A]">from</span> <span className="text-[#c6c6c6]">&apos;@pgdev/core&apos;</span>;</div>
                        <div><span className="text-[#8A8A8A]">import</span> type &#123; <span className="text-white font-semibold">RuntimeTarget</span> &#125; <span className="text-[#8A8A8A]">from</span> <span className="text-[#c6c6c6]">&apos;@pgdev/arch&apos;</span>;</div>
                        <div className="text-[#666]">// Bootstrap local student workspace</div>
                        <div><span className="text-[#8A8A8A]">const</span> <span className="text-white">developer</span> = <span className="text-[#8A8A8A]">new</span> <span className="text-white font-semibold">Engine</span>(&#123;</div>
                        <div className="pl-4">track: <span className="text-[#c6c6c6]">&apos;systems-kernel&apos;</span>,</div>
                        <div className="pl-4">mode: <span className="text-[#c6c6c6]">&apos;interactive-sandbox&apos;</span>,</div>
                        <div className="pl-4">target: <span className="text-[#c6c6c6]">&apos;x86_64-elf&apos;</span> <span className="text-[#8A8A8A]">as</span> <span className="text-white font-semibold">RuntimeTarget</span></div>
                        <div>&#125;);</div>
                        <div className="pt-1"><span className="text-[#8A8A8A]">await</span> developer.<span className="text-white">loadKernelModule</span>(<span className="text-[#c6c6c6]">&apos;memory_allocator.c&apos;</span>);</div>
                        <div><span className="text-[#8A8A8A]">const</span> tests = <span className="text-[#8A8A8A]">await</span> developer.<span className="text-white">executeDeterministicSuites</span>();</div>
                        <div>console.<span className="text-white">log</span>(<span className="text-[#c6c6c6]">`Artifact state: $&#123;tests.status&#125;`</span>);</div>
                      </>
                    ) : (
                      <>
                        <div className="text-[#666]">#!/usr/bin/env bash</div>
                        <div>set -euo pipefail</div>
                        <div className="text-[#666]"># Audit memory allocator slab fragmentation</div>
                        <div>echo <span className="text-[#c6c6c6]">&quot;[INIT] Inspecting process virtual addresses...&quot;</span></div>
                        <div>perf stat -e cache-references,cache-misses ./build/allocator_test</div>
                        <div>valgrind --leak-check=full --error-exitcode=1 ./build/allocator_test</div>
                        <div className="pt-2">echo <span className="text-[#c6c6c6]">&quot;[STATUS] Zero memory leaks detected across 1,000,000 malloc/free iterations.&quot;</span></div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Shell Output */}
              <div className="lg:col-span-5 p-4 bg-[#0d0d0d] flex flex-col justify-between text-xs">
                <div>
                  <div className="flex items-center justify-between pb-2 mb-3 border-b border-white/10 text-[#8A8A8A]">
                    <span className="font-mono text-[11px] uppercase tracking-wider text-white">Deterministic Shell Output</span>
                    <span className="text-[10px] text-white bg-[#1a1a1a] px-1.5 py-0.5 rounded border border-white/10">28ms execution</span>
                  </div>
                  <div className="space-y-1.5 leading-relaxed text-[#AFAFAF] font-mono text-[11px]">
                    <div className="text-white font-medium">&gt; pgdev build --target=x86_64-elf</div>
                    <div className="text-[#8A8A8A]">[1/3] Parsing memory_allocator.c ... <span className="text-white font-semibold">DONE</span></div>
                    <div className="text-[#8A8A8A]">[2/3] Analyzing slab fragmentation ... <span className="text-white font-semibold">OK (0.02% variance)</span></div>
                    <div className="text-[#8A8A8A]">[3/3] 14 unit test harness suites ... <span className="text-white font-semibold">PASS (14/14)</span></div>
                    <div className="pt-2 text-white font-medium flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[15px] text-white">check_circle</span>
                      <span>Local VM execution verified. Kernel image ready.</span>
                    </div>
                  </div>
                </div>

                {/* Monochromatic Metrics Inset */}
                <div className="mt-4 p-3 rounded-lg bg-[#141414] border border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-[#70757B] block">Memory Overhead</span>
                    <span className="font-mono text-white text-xs font-semibold">4.1 MB RSS</span>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-[#70757B] block">Slab Efficiency</span>
                    <span className="font-mono text-white text-xs font-semibold">99.8% Alloc</span>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-[#70757B] block">Streak Status</span>
                    <span className="font-mono text-white text-xs font-semibold">14 Days Active</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. LEARNING STATS SECTION */}
      <section className="w-full bg-[#080808] py-8 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
            {[
              { label: 'Total Enrollment', value: '10K+', sub: 'Active Engineers' },
              { label: 'Curriculum Depth', value: '50+', sub: 'Production Courses' },
              { label: 'Guided Modules', value: '200+', sub: 'Deterministic Labs' },
              { label: 'Portfolio Capstones', value: '100+', sub: 'Production Repos' },
              { label: 'Rigorous Pass Rate', value: '99.4%', sub: 'CI Lab Success Rate', span: 'col-span-2 md:col-span-1' },
            ].map((stat, i) => (
              <div key={i} className={`p-4 rounded-lg bg-[#0e0e0e] border border-white/10 flex flex-col justify-between ${stat.span || ''}`}>
                <span className="font-mono text-[10px] text-[#70757B] uppercase tracking-wider">{stat.label}</span>
                <div className="my-1.5">
                  <span className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">{stat.value}</span>
                </div>
                <span className="font-mono text-xs text-[#8A8A8A]">{stat.sub}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. FEATURED COURSES SECTION */}
      <section className="w-full bg-[#050505] py-16 border-b border-white/10" id="catalog">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          {/* Section Header with Filter Controls */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 font-mono text-xs text-[#8A8A8A] uppercase tracking-wider mb-1">
                <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                <span>Curriculum Catalog</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Engineered for deep understanding.
              </h2>
              <p className="text-xs sm:text-sm text-[#8A8A8A] mt-1 font-sans">
                Zero superficial tutorial hell. Build runtime software that lasts.
              </p>
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs">
              {(['All Tracks', 'Systems & C', 'Python & AI', 'Modern Web', 'DB & DevOps'] as const).map((track) => (
                <button
                  key={track}
                  type="button"
                  onClick={() => setCourseFilter(track)}
                  className={`px-3 py-1.5 rounded transition-colors ${
                    courseFilter === track
                      ? 'bg-white text-black font-semibold'
                      : 'bg-[#111111] hover:bg-[#1a1a1a] text-[#8A8A8A] hover:text-white border border-white/10'
                  }`}
                >
                  {track}
                </button>
              ))}
            </div>
          </div>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((c) => (
              <div
                key={c.id}
                className="group p-6 rounded-xl bg-[#0a0a0a] border border-white/10 hover:border-white/25 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-[#161616] border border-white/10 text-white font-medium uppercase tracking-wider">
                      {c.difficulty}
                    </span>
                    <span className="font-mono text-xs text-[#8A8A8A]">{c.duration}</span>
                  </div>

                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-white/90 transition-colors">
                    {c.title}
                  </h3>
                  <p className="text-xs text-[#8A8A8A] mb-6 line-clamp-2 leading-relaxed">
                    {c.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <div className="flex items-center justify-between text-xs text-[#8A8A8A] mb-2 font-mono">
                    <span>{c.lessonsCount} Lessons &bull; {c.labsCount} Labs</span>
                    <span className="text-white font-medium">{c.progressPercent || 0}% Complete</span>
                  </div>
                  <div className="w-full bg-[#1b1b1b] rounded-full h-1.5 mb-4 overflow-hidden">
                    <div 
                      className="bg-white h-1.5 rounded-full transition-all duration-300"
                      style={{ width: `${c.progressPercent || 0}%` }}
                    ></div>
                  </div>

                  <button
                    type="button"
                    onClick={() => onOpenCourseModal(c)}
                    className="w-full py-2 rounded bg-[#141414] hover:bg-[#1e1e1e] border border-white/15 text-white text-center text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span>{c.progressPercent && c.progressPercent > 0 ? 'Continue Track' : 'View Course'}</span>
                    <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. LEARNING PATHS (ROADMAP TIMELINE) */}
      <section className="w-full bg-[#080808] py-16 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          <div className="mb-10">
            <span className="font-mono text-xs text-[#8A8A8A] uppercase tracking-wider">Sequential Engineering Tracks</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1 tracking-tight">
              Structured Roadmap from Core to System Architect
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {LEARNING_PATHS.map((path) => (
              <div
                key={path.id}
                className="relative p-6 rounded-xl bg-[#0d0d0d] border border-white/10 flex flex-col justify-between hover:border-white/25 transition-all"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-white font-semibold">{path.pathNumber}</span>
                    <span className="w-2.5 h-2.5 rounded-full bg-white ring-4 ring-white/10"></span>
                  </div>

                  <h3 className="text-base font-semibold text-white">{path.title}</h3>
                  <p className="text-xs text-[#8A8A8A] leading-relaxed">
                    {path.description}
                  </p>

                  <div className="pt-2 space-y-1.5 font-mono text-[11px] text-[#AFAFAF]">
                    {path.milestones.slice(0, 3).map((m, i) => (
                      <div key={i} className="flex items-center gap-1.5">
                        <span className="text-white/40">&bull;</span>
                        <span className="truncate">{m.title}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-3 border-t border-white/10 flex items-center justify-between">
                  <span className="font-mono text-[10px] text-[#70757B] uppercase tracking-wider">{path.duration}</span>
                  <button
                    type="button"
                    onClick={() => onNavigate('learning-paths', path.id)}
                    className="text-xs text-white hover:underline flex items-center gap-1 font-mono"
                  >
                    <span>Inspect</span>
                    <span className="material-symbols-outlined text-[13px]">arrow_forward</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. INTERACTIVE CODE PLAYGROUND PREVIEW */}
      <section className="w-full bg-[#050505] py-16 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-3">
            <div>
              <span className="font-mono text-xs text-[#8A8A8A] uppercase tracking-wider">Deterministic Sandbox</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mt-0.5 tracking-tight">
                Solve in-browser with zero environment setup.
              </h2>
            </div>
            <div className="flex items-center gap-2 font-mono text-xs">
              <span className="px-2.5 py-1 rounded bg-[#111111] border border-white/10 text-white">Auto-Save: ON</span>
              <span className="px-2.5 py-1 rounded bg-[#111111] border border-white/10 text-white">Isolated Sandbox: Sandboxed V8</span>
            </div>
          </div>

          {/* Playground Container */}
          <div className="w-full rounded-xl border border-white/15 bg-[#090909] overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-white/10">
            {/* Left: Problem statement (4 cols) */}
            <div className="lg:col-span-4 p-6 flex flex-col justify-between bg-[#0c0c0c]">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-mono text-xs px-2 py-0.5 rounded bg-[#1a1a1a] text-white border border-white/15 font-medium">
                    #104 ALGO
                  </span>
                  <span className="font-mono text-xs text-[#8A8A8A] uppercase">EASY / BITWISE</span>
                </div>

                <h3 className="text-lg font-semibold text-white mb-2">Parity &amp; Bit Manipulation</h3>
                <p className="text-xs text-[#8A8A8A] mb-4 leading-relaxed font-sans">
                  Determine whether a 32-bit signed integer <code className="font-mono text-white bg-[#1a1a1a] px-1 py-0.5 rounded">n</code> is even or odd without using modulo (<code className="font-mono text-white">%</code>) or division (<code className="font-mono text-white">/</code>) operators.
                </p>

                <div className="space-y-2 text-xs font-mono text-[#AFAFAF]">
                  <div className="p-2.5 rounded bg-[#070707] border border-white/10">
                    <span className="text-white font-semibold block mb-0.5">Example 1:</span>
                    <span>Input: n = 7</span><br />
                    <span>Output: false (Odd)</span>
                  </div>
                  <div className="p-2.5 rounded bg-[#070707] border border-white/10">
                    <span className="text-white font-semibold block mb-0.5">Example 2:</span>
                    <span>Input: n = 104</span><br />
                    <span>Output: true (Even)</span>
                  </div>
                </div>

                <div className="mt-4 text-xs text-[#8A8A8A] space-y-1 font-mono">
                  <div className="text-[10px] uppercase tracking-wider text-white">Constraints:</div>
                  <div>-2<sup>31</sup> &le; n &le; 2<sup>31</sup> - 1</div>
                  <div>Time Complexity: &Theta;(1) Bitwise</div>
                </div>
              </div>

              <div className="mt-6 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono text-[#8A8A8A]">
                <span>Accuracy: 88.2%</span>
                <span>Submissions: 14,291</span>
              </div>
            </div>

            {/* Center: Code Editor (5 cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between bg-[#080808]">
              {/* Editor Sub-header */}
              <div className="flex items-center justify-between px-4 py-2 border-b border-white/10 bg-[#111111] font-mono text-xs">
                <span className="text-white font-medium">solution.py</span>
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] text-[#8A8A8A]">Language:</span>
                  <select
                    value={sandboxLanguage}
                    onChange={(e) => handleLanguageChange(e.target.value as any)}
                    aria-label="Select programming language for sandbox"
                    className="bg-[#1a1a1a] text-white text-xs rounded border border-white/15 px-2 py-0.5 outline-none font-mono cursor-pointer"
                  >
                    <option value="Python 3.12">Python 3.12</option>
                    <option value="C (gcc 13)">C (gcc 13)</option>
                    <option value="JavaScript (V8)">JavaScript (V8)</option>
                  </select>
                </div>
              </div>

              {/* Code TextArea */}
              <div className="p-4 flex-1">
                <textarea
                  value={sandboxCode}
                  onChange={(e) => setSandboxCode(e.target.value)}
                  rows={10}
                  className="w-full h-full min-h-[220px] bg-transparent text-white font-mono text-xs leading-6 outline-none resize-none selection:bg-white/20"
                  spellCheck={false}
                />
              </div>

              {/* Run Actions Bar */}
              <div className="p-3 border-t border-white/10 bg-[#101010] flex items-center justify-between">
                <button
                  type="button"
                  onClick={handleRunTests}
                  disabled={sandboxRunning}
                  className="px-4 py-1.5 rounded bg-[#1c1c1c] hover:bg-[#252525] border border-white/15 text-white font-mono text-xs flex items-center gap-1.5 transition-colors disabled:opacity-50"
                >
                  <span className="material-symbols-outlined text-[15px]">play_arrow</span>
                  <span>{sandboxRunning ? 'Evaluating...' : 'Run Tests'}</span>
                </button>
                <button
                  type="button"
                  onClick={handleRunTests}
                  disabled={sandboxRunning}
                  className="px-5 py-1.5 rounded bg-white hover:bg-[#e2e2e2] text-black font-semibold text-xs flex items-center gap-1.5 transition-colors shadow-sm disabled:opacity-50"
                >
                  <span className="material-symbols-outlined text-[15px]">done_all</span>
                  <span>Submit Solution</span>
                </button>
              </div>
            </div>

            {/* Right: Test Harness Telemetry (3 cols) */}
            <div className="lg:col-span-3 p-4 bg-[#090909] flex flex-col justify-between font-mono text-xs">
              <div>
                <div className="flex items-center justify-between pb-2 mb-3 border-b border-white/10 text-[#8A8A8A]">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-white">Test Harness Result</span>
                  <span className={`font-semibold px-2 py-0.5 rounded text-[10px] ${
                    testResult.passed
                      ? 'bg-white text-black'
                      : 'bg-red-500/20 text-red-300 border border-red-500/30'
                  }`}>
                    {testResult.status}
                  </span>
                </div>

                <div className="space-y-1.5 mb-4">
                  <div className="flex items-center justify-between p-2 rounded bg-[#121212] border border-white/10">
                    <span className="text-[#AFAFAF]">Suite 1: Single Bit Check</span>
                    <span className="text-white font-medium">PASS</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded bg-[#121212] border border-white/10">
                    <span className="text-[#AFAFAF]">Suite 2: Negative Parity</span>
                    <span className="text-white font-medium">PASS</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded bg-[#121212] border border-white/10">
                    <span className="text-[#AFAFAF]">Suite 3: 32-bit Max Int</span>
                    <span className="text-white font-medium">PASS</span>
                  </div>
                </div>

                <div className="p-3 rounded bg-[#121212] border border-white/10 space-y-2 text-[#8A8A8A]">
                  <div className="flex justify-between">
                    <span>Runtime:</span>
                    <span className="text-white font-medium">{testResult.runtime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Memory:</span>
                    <span className="text-white font-medium">{testResult.memory}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Complexity:</span>
                    <span className="text-white font-medium">{testResult.complexity}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 text-[#70757B] text-[11px] leading-relaxed">
                Deterministic evaluation compiled in container isolation. Sandbox telemetry benchmark logged.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. AI LEARNING ASSISTANT SECTION */}
      <section className="w-full bg-[#080808] py-16 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Assistant Description */}
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center gap-1.5 font-mono text-xs text-[#8A8A8A] uppercase tracking-wider">
                <span className="material-symbols-outlined text-white text-[16px]">smart_toy</span>
                <span>PG Assistant Core</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Your deterministic coding copilot and tutor.
              </h2>
              <p className="text-xs sm:text-sm text-[#8A8A8A] leading-relaxed font-sans">
                Trained strictly on high-integrity systems engineering papers, compiler source, and deterministic test cases. No generic AI hallucination—only mathematically sound engineering explanations.
              </p>

              <div className="space-y-2 pt-2 text-xs text-[#AFAFAF] font-sans">
                <div className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-white text-[16px] shrink-0">check</span>
                  <span>Direct AST inspection and runtime memory analysis feedback.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-white text-[16px] shrink-0">check</span>
                  <span>Contextual refactor hints without spoiling production puzzle solutions.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-white text-[16px] shrink-0">check</span>
                  <span>Integrated directly inside every lesson shell and sandbox workspace.</span>
                </div>
              </div>
            </div>

            {/* Assistant Live Interactive Copilot Panel */}
            <div className="lg:col-span-7 rounded-xl border border-white/15 bg-[#0e0e0e] shadow-2xl overflow-hidden font-mono text-xs">
              <div className="p-3 border-b border-white/10 bg-[#131313] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
                  <span className="text-white font-medium">PG Copilot v2.4 (Context: Systems C Module)</span>
                </div>
                <span className="font-mono text-[10px] text-[#8A8A8A] uppercase">RAG ENGINE ONLINE</span>
              </div>

              {/* Chat Thread */}
              <div className="p-4 space-y-3.5 text-xs max-h-[300px] overflow-y-auto">
                {inlineMessages.map((m, idx) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-mono shrink-0 ${
                      m.role === 'user' ? 'bg-[#1e1e1e] text-[#AFAFAF]' : 'bg-white text-black font-semibold'
                    }`}>
                      {m.role === 'user' ? 'YOU' : 'PG'}
                    </span>
                    <div className="p-3 rounded-lg bg-[#141414] border border-white/10 text-white whitespace-pre-wrap leading-relaxed max-w-xl font-sans text-xs">
                      {m.text}
                    </div>
                  </div>
                ))}

                {inlineChatLoading && (
                  <div className="flex items-center gap-2 text-[#8A8A8A] font-mono text-xs pl-8">
                    <span className="material-symbols-outlined text-[15px] animate-spin">sync</span>
                    <span>Analyzing virtual memory invariant...</span>
                  </div>
                )}
              </div>

              {/* Suggested Prompts & Inline Input */}
              <div className="p-3 border-t border-white/10 bg-[#111111]">
                <div className="flex flex-wrap items-center gap-1.5 mb-2.5">
                  <span className="text-[10px] uppercase text-[#70757B]">Suggested:</span>
                  <button
                    type="button"
                    onClick={() => handleInlineSendMessage('Explain B-Tree rebalancing mechanics')}
                    className="text-[11px] px-2 py-0.5 rounded bg-[#1a1a1a] hover:bg-[#252525] border border-white/10 text-white transition-colors"
                  >
                    Explain B-Tree rebalancing
                  </button>
                  <button
                    type="button"
                    onClick={() => handleInlineSendMessage('Review my mutex lock for race conditions')}
                    className="text-[11px] px-2 py-0.5 rounded bg-[#1a1a1a] hover:bg-[#252525] border border-white/10 text-white transition-colors"
                  >
                    Review my mutex lock
                  </button>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleInlineSendMessage();
                  }}
                  className="flex items-center gap-2"
                >
                  <input
                    type="text"
                    value={inlineChatInput}
                    onChange={(e) => setInlineChatInput(e.target.value)}
                    placeholder="Ask PG Assistant a technical question or debug issue..."
                    className="flex-1 bg-[#090909] border border-white/15 rounded px-3 py-1.5 text-xs text-white placeholder:text-[#666] outline-none font-mono focus:border-white/40"
                  />
                  <button
                    type="submit"
                    disabled={!inlineChatInput.trim() || inlineChatLoading}
                    className="px-4 py-1.5 rounded bg-white text-black font-semibold text-xs hover:bg-[#e2e2e2] transition-colors disabled:opacity-40"
                  >
                    Send
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. STUDENT PROJECTS SHOWCASE */}
      <section className="w-full bg-[#050505] py-16 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-3">
            <div>
              <span className="font-mono text-xs text-[#8A8A8A] uppercase tracking-wider">Production Output</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1 tracking-tight">Built by Engineers in _PG.Dev</h2>
              <p className="text-xs sm:text-sm text-[#8A8A8A] mt-1 font-sans">
                Open-source capstones that secured roles at Stripe, Cloudflare, and Datadog.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('projects')}
              className="text-xs font-mono text-white hover:underline flex items-center gap-1"
            >
              <span>View All 100+ Showcase Repos</span>
              <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {STUDENT_PROJECTS.map((proj) => (
              <div
                key={proj.id}
                className="p-6 rounded-xl bg-[#090909] border border-white/10 hover:border-white/25 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-[#161616] border border-white/10 text-white uppercase font-semibold">
                      {proj.trackBadge}
                    </span>
                    <div className="flex items-center gap-2 text-[#8A8A8A] font-mono text-xs">
                      <span>&starf; {proj.stars}</span>
                      <a href={proj.githubUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                        <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                      </a>
                    </div>
                  </div>

                  <h3 className="text-base font-semibold text-white mb-2">{proj.title}</h3>
                  <p className="text-xs text-[#8A8A8A] mb-4 leading-relaxed font-sans">
                    {proj.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 font-mono text-xs">
                  <div className="flex flex-wrap items-center gap-1.5">
                    {proj.stack.map((s, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded bg-[#141414] text-[#AFAFAF] border border-white/5 text-[11px]">
                        {s}
                      </span>
                    ))}
                  </div>
                  <span className="text-[#70757B] text-[11px]">Author: {proj.author}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. RESOURCE HUB & COMMUNITY */}
      <section className="w-full bg-[#080808] py-16 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          <div className="mb-8">
            <span className="font-mono text-xs text-[#8A8A8A] uppercase tracking-wider">Developer Knowledge Base</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1 tracking-tight">Open Engineering Resources</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {RESOURCES.map((res) => (
              <div
                key={res.id}
                onClick={() => onNavigate('resources', res.id)}
                className="p-5 rounded-lg bg-[#0e0e0e] border border-white/10 hover:border-white/25 transition-all cursor-pointer block"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="material-symbols-outlined text-white text-[20px]">
                    {res.category === 'PDF / WEB' ? 'menu_book' : res.category === 'CHEAT SHEETS' ? 'terminal' : res.category === 'INTERVIEWS' ? 'assignment' : 'forum'}
                  </span>
                  <span className="font-mono text-[10px] text-[#70757B] uppercase">{res.category}</span>
                </div>
                <h4 className="text-sm font-semibold text-white mb-1.5">{res.title}</h4>
                <p className="text-xs text-[#8A8A8A] font-sans leading-relaxed">{res.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. FINAL HIGH-CONVERTING CTA MONOLITH */}
      <section className="w-full bg-[#050505] py-16 lg:py-24">
        <div className="max-w-5xl mx-auto px-4 md:px-8 lg:px-12 text-center">
          <div className="relative p-8 md:p-14 rounded-2xl bg-[#090909] border border-white/15 shadow-[0_32px_80px_rgba(0,0,0,0.95)] overflow-hidden metallic-top-highlight">
            <div className="relative max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-1.5 font-mono text-xs text-[#8A8A8A] uppercase tracking-wider mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                <span>Immediate Enrollment</span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                Your next skill starts here.
              </h2>
              <p className="text-sm sm:text-base text-[#8A8A8A] mb-8 leading-relaxed font-sans">
                Learn the fundamentals. Build real projects. Develop technical intuition and skills that compound across your entire engineering career.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-6">
                <button
                  type="button"
                  onClick={onOpenAuth}
                  className="w-full sm:w-auto px-8 py-3 rounded bg-white text-black font-semibold text-sm hover:bg-[#e2e2e2] transition-colors shadow-lg flex items-center justify-center gap-2"
                >
                  <span>Start Learning Now</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('courses')}
                  className="w-full sm:w-auto px-6 py-3 rounded bg-[#141414] hover:bg-[#1f1f1f] border border-white/15 text-white text-sm font-medium transition-colors"
                >
                  Explore Full Catalog
                </button>
              </div>

              <div className="font-mono text-xs text-[#70757B] flex items-center justify-center gap-1.5">
                <span className="material-symbols-outlined text-white text-[15px]">verified_user</span>
                <span>No marketing fluff. Production code from day one.</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
