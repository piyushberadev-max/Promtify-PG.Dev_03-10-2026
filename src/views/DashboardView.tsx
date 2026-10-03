import React, { useState } from 'react';
import { UserProfile, Course, NavTab } from '../types';
import { COURSES, SANDBOX_PROBLEMS } from '../data/mockData';
import { BrandLogo } from '../components/BrandLogo';

interface DashboardViewProps {
  user: UserProfile;
  onNavigate: (tab: NavTab, extraId?: string) => void;
  onOpenCourseModal: (course: Course) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  user,
  onNavigate,
  onOpenCourseModal,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'overview' | 'courses' | 'certificates' | 'profile'>('overview');
  const [showCertificateModal, setShowCertificateModal] = useState(false);

  const enrolledCourses = COURSES.filter((c) => user.enrolledCourseIds.includes(c.id));
  const activeCourse = enrolledCourses[0] || COURSES[0];

  return (
    <div className="w-full min-h-screen bg-[#050505] text-[#e5e2e1] pt-24 pb-20 px-4 md:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Welcome Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-white/10 gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white text-black flex items-center justify-center font-bold text-2xl shadow-lg shrink-0">
              {user.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                  Welcome back, {user.name}
                </h1>
                <span className="font-mono text-xs px-2 py-0.5 rounded bg-white/10 text-white">
                  {user.handle}
                </span>
              </div>
              <p className="text-xs text-[#8A8A8A] mt-1 font-mono">
                Workstation: x86_64 Linux Container &bull; 14 Days Active Engineering Streak
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => onNavigate('practice')}
              className="px-4 py-2 rounded-lg bg-[#141414] hover:bg-[#1e1e1e] border border-white/15 text-white font-mono text-xs flex items-center gap-1.5 transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">terminal</span>
              <span>Open Sandbox IDE</span>
            </button>
            <button
              type="button"
              onClick={() => setShowCertificateModal(true)}
              className="px-4 py-2 rounded-lg bg-white hover:bg-[#e2e2e2] text-black font-semibold text-xs flex items-center gap-1.5 transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">workspace_premium</span>
              <span>View Certificate</span>
            </button>
          </div>
        </div>

        {/* Dashboard Sub-navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-white/10 pb-2 font-mono text-xs">
          {[
            { id: 'overview', label: 'Overview & Velocity', icon: 'dashboard' },
            { id: 'courses', label: 'My Enrolled Courses', icon: 'auto_stories' },
            { id: 'certificates', label: 'Credentials & Certs', icon: 'verified' },
            { id: 'profile', label: 'Workstation Profile', icon: 'person' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors ${
                activeSubTab === tab.id
                  ? 'bg-white text-black font-semibold'
                  : 'text-[#8A8A8A] hover:text-white hover:bg-[#111111]'
              }`}
            >
              <span className="material-symbols-outlined text-[15px]">{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* 1. OVERVIEW TAB */}
        {activeSubTab === 'overview' && (
          <div className="space-y-8">
            {/* Top Metric Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-5 rounded-xl bg-[#0a0a0a] border border-white/10">
                <span className="font-mono text-[10px] text-[#70757B] uppercase tracking-wider block mb-1">Active Streak</span>
                <div className="text-2xl font-bold text-white font-mono">{user.streakDays} Days</div>
                <span className="text-[11px] text-[#AFAFAF] mt-1 block">Consistency Rank: Top 3%</span>
              </div>
              <div className="p-5 rounded-xl bg-[#0a0a0a] border border-white/10">
                <span className="font-mono text-[10px] text-[#70757B] uppercase tracking-wider block mb-1">Labs Completed</span>
                <div className="text-2xl font-bold text-white font-mono">{user.totalLabsCompleted} / 200</div>
                <span className="text-[11px] text-[#AFAFAF] mt-1 block">Deterministic CI Verified</span>
              </div>
              <div className="p-5 rounded-xl bg-[#0a0a0a] border border-white/10">
                <span className="font-mono text-[10px] text-[#70757B] uppercase tracking-wider block mb-1">Active Tracks</span>
                <div className="text-2xl font-bold text-white font-mono">{user.enrolledCourseIds.length} Courses</div>
                <span className="text-[11px] text-[#AFAFAF] mt-1 block">Syllabus In Progress</span>
              </div>
              <div className="p-5 rounded-xl bg-[#0a0a0a] border border-white/10">
                <span className="font-mono text-[10px] text-[#70757B] uppercase tracking-wider block mb-1">Certifications</span>
                <div className="text-2xl font-bold text-white font-mono">1 Issued</div>
                <span className="text-[11px] text-[#AFAFAF] mt-1 block">Cryptographically Signed</span>
              </div>
            </div>

            {/* Resume Current Course Hero Card */}
            <div className="p-6 md:p-8 rounded-2xl bg-[#0c0c0c] border border-white/15 relative overflow-hidden metallic-top-highlight">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-3 max-w-xl">
                  <div className="flex items-center gap-2 font-mono text-xs">
                    <span className="px-2 py-0.5 rounded bg-white/10 text-white font-medium">Continue Learning</span>
                    <span className="text-[#70757B]">&bull;</span>
                    <span className="text-[#AFAFAF]">{activeCourse.category}</span>
                  </div>

                  <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                    {activeCourse.title}
                  </h2>

                  <p className="text-xs text-[#AFAFAF] font-sans leading-relaxed">
                    Next Lesson: <strong className="text-white font-mono">Module 3: POSIX Threads &amp; Memory Barriers</strong>. Estimated time to milestone completion: 45 minutes.
                  </p>

                  <div className="pt-2">
                    <div className="flex justify-between items-center text-xs font-mono mb-1.5">
                      <span className="text-[#8A8A8A]">Track Progress</span>
                      <span className="text-white font-bold">{activeCourse.progressPercent || 85}%</span>
                    </div>
                    <div className="w-full bg-[#1e1e1e] rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-white h-2 rounded-full transition-all duration-300"
                        style={{ width: `${activeCourse.progressPercent || 85}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row md:flex-col gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => onOpenCourseModal(activeCourse)}
                    className="px-6 py-2.5 rounded-lg bg-white text-black font-semibold text-xs hover:bg-[#e2e2e2] transition-colors flex items-center justify-center gap-2 shadow-sm"
                  >
                    <span>Resume Module</span>
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => onNavigate('practice')}
                    className="px-6 py-2.5 rounded-lg bg-[#161616] hover:bg-[#202020] border border-white/15 text-white font-mono text-xs flex items-center justify-center gap-2 transition-colors"
                  >
                    <span>Launch Sandbox</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Two-Column Detail Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left: Recently Solved Algorithms */}
              <div className="lg:col-span-7 p-6 rounded-xl bg-[#090909] border border-white/10 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <h3 className="font-semibold text-sm text-white">Verified Sandbox Submissions</h3>
                  <button
                    type="button"
                    onClick={() => onNavigate('practice')}
                    className="text-xs font-mono text-[#8A8A8A] hover:text-white"
                  >
                    View All &rarr;
                  </button>
                </div>

                <div className="space-y-3 font-mono text-xs">
                  {SANDBOX_PROBLEMS.map((prob) => (
                    <div
                      key={prob.id}
                      onClick={() => onNavigate('practice', prob.id)}
                      className="p-3.5 rounded-lg bg-[#111111] border border-white/10 hover:border-white/20 transition-all cursor-pointer flex items-center justify-between"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-white font-semibold">{prob.codeNumber}</span>
                          <span className="text-[#AFAFAF]">{prob.title}</span>
                        </div>
                        <span className="text-[10px] text-[#70757B] mt-0.5 block">{prob.category}</span>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-white/10 text-white text-[10px] font-bold">
                        ACCEPTED
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Upcoming Labs & CI Calendar */}
              <div className="lg:col-span-5 p-6 rounded-xl bg-[#090909] border border-white/10 space-y-4">
                <div className="pb-3 border-b border-white/10">
                  <h3 className="font-semibold text-sm text-white">Upcoming Deterministic Labs</h3>
                  <p className="text-[11px] text-[#8A8A8A] mt-0.5 font-mono">Assigned for weekly milestone check</p>
                </div>

                <div className="space-y-2.5 font-mono text-xs">
                  {[
                    { title: 'Lab 14: Virtual Slab Paging Harness', deadline: 'Due in 2 days', status: 'Pending' },
                    { title: 'Lab 15: Raft Split-Brain Partition Simulation', deadline: 'Due in 5 days', status: 'Queued' },
                    { title: 'Lab 16: SIMD Matrix Quantization', deadline: 'Next Week', status: 'Locked' },
                  ].map((lab, i) => (
                    <div key={i} className="p-3 rounded-lg bg-[#111111] border border-white/10 flex items-center justify-between">
                      <div>
                        <div className="text-white font-medium text-xs">{lab.title}</div>
                        <div className="text-[10px] text-[#70757B]">{lab.deadline}</div>
                      </div>
                      <span className="text-[10px] text-[#AFAFAF] px-2 py-0.5 rounded bg-[#181818]">
                        {lab.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. COURSES TAB */}
        {activeSubTab === 'courses' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-white tracking-tight">Enrolled Curriculum Tracks</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {enrolledCourses.map((c) => (
                <div key={c.id} className="p-6 rounded-xl bg-[#090909] border border-white/15 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2 font-mono text-xs">
                      <span className="px-2 py-0.5 rounded bg-white/10 text-white">{c.difficulty}</span>
                      <span className="text-[#8A8A8A]">{c.duration}</span>
                    </div>
                    <h3 className="text-base font-semibold text-white mb-2">{c.title}</h3>
                    <p className="text-xs text-[#8A8A8A] mb-4">{c.description}</p>
                  </div>
                  <div>
                    <div className="flex justify-between items-center text-xs font-mono mb-1 text-[#AFAFAF]">
                      <span>Progress</span>
                      <span className="text-white font-bold">{c.progressPercent || 25}%</span>
                    </div>
                    <div className="w-full bg-[#1e1e1e] rounded-full h-1.5 mb-4 overflow-hidden">
                      <div className="bg-white h-1.5 rounded-full" style={{ width: `${c.progressPercent || 25}%` }}></div>
                    </div>
                    <button
                      type="button"
                      onClick={() => onOpenCourseModal(c)}
                      className="w-full py-2 rounded bg-white text-black font-semibold text-xs hover:bg-[#e2e2e2] transition-colors"
                    >
                      Open Syllabus
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. CERTIFICATES TAB */}
        {activeSubTab === 'certificates' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white tracking-tight">Verified Engineering Credentials</h2>
                <p className="text-xs text-[#8A8A8A] mt-1 font-mono">
                  Issued upon completing all deterministic labs and passing isolated CI benchmark evaluations.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-[#090909] border border-white/20 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs px-2 py-0.5 rounded bg-white/10 text-white font-bold">
                      VERIFIED CREDENTIAL
                    </span>
                    <span className="font-mono text-xs text-[#8A8A8A]">ID: PG-CERT-99428-A</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    Git &amp; Production Engineering Certification
                  </h3>
                  <p className="text-xs text-[#8A8A8A] font-sans leading-relaxed mb-4">
                    Demonstrated proficiency in content-addressable storage DAGs, binary packfiles, hermetic Docker CI runners, and cryptographic supply chain artifact signing.
                  </p>
                  <div className="p-3 rounded-lg bg-[#141414] border border-white/10 font-mono text-xs text-[#AFAFAF] space-y-1 mb-4">
                    <div>Recipient: <span className="text-white">{user.name}</span></div>
                    <div>Issued: <span className="text-white">October 2026</span></div>
                    <div>Validation: <span className="text-white">SHA-256 Signatures Matched</span></div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setShowCertificateModal(true)}
                  className="w-full py-2.5 rounded bg-white text-black font-semibold text-xs hover:bg-[#e2e2e2] transition-colors flex items-center justify-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[16px]">visibility</span>
                  <span>Inspect Full Certificate</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 4. PROFILE TAB */}
        {activeSubTab === 'profile' && (
          <div className="max-w-2xl p-6 rounded-2xl bg-[#090909] border border-white/15 space-y-6 text-xs font-mono">
            <h2 className="text-xl font-bold text-white tracking-tight font-sans">
              Workstation Identity &amp; Keyrings
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-[#70757B] mb-1">Engineer Name</label>
                <input
                  type="text"
                  readOnly
                  value={user.name}
                  className="w-full px-3 py-2 rounded bg-[#141414] border border-white/10 text-white outline-none"
                />
              </div>
              <div>
                <label className="block text-[#70757B] mb-1">Email Identifier</label>
                <input
                  type="text"
                  readOnly
                  value={user.email}
                  className="w-full px-3 py-2 rounded bg-[#141414] border border-white/10 text-white outline-none"
                />
              </div>
              <div>
                <label className="block text-[#70757B] mb-1">Terminal Handle</label>
                <input
                  type="text"
                  readOnly
                  value={user.handle}
                  className="w-full px-3 py-2 rounded bg-[#141414] border border-white/10 text-white outline-none"
                />
              </div>
              <div>
                <label className="block text-[#70757B] mb-1">Attached Public Key Fingerprint</label>
                <div className="p-3 rounded bg-[#141414] border border-white/10 text-[#AFAFAF] text-[11px] break-all">
                  SHA256:7f4kE3zLqP9wM2vB8rT1xY0uN6sD5cF4gH3jK2mN1bV
                </div>
              </div>
            </div>
          </div>
        )}

        {/* High-Fidelity Certificate View Modal */}
        {showCertificateModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-150">
            <div 
              className="w-full max-w-3xl rounded-2xl bg-[#090909] border border-white/30 p-8 md:p-12 shadow-[0_32px_80px_rgba(0,0,0,0.95)] relative text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setShowCertificateModal(false)}
                className="absolute top-6 right-6 text-[#8A8A8A] hover:text-white"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>

              <div className="flex justify-center mb-6">
                <BrandLogo size="lg" showWordmark={true} />
              </div>

              <div className="font-mono text-xs tracking-widest uppercase text-[#8A8A8A] mb-2">
                Certificate of Technical Mastery
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-4">
                This is formally awarded to
              </h2>
              <div className="text-3xl md:text-4xl font-serif text-white tracking-wide mb-6 border-b border-white/15 pb-4 max-w-md mx-auto">
                {user.name}
              </div>

              <p className="text-xs md:text-sm text-[#AFAFAF] max-w-xl mx-auto leading-relaxed font-sans mb-8">
                for rigorous completion and deterministic verification in <strong className="text-white font-mono">Git &amp; Production Engineering</strong>, demonstrating proficiency in content-addressable DAG data structures, containerized hermetic test runners, and cryptographic supply chain signing.
              </p>

              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10 font-mono text-xs text-[#8A8A8A] max-w-lg mx-auto">
                <div>
                  <span className="block text-[10px] text-[#70757B]">ISSUE DATE</span>
                  <span className="text-white">October 2026</span>
                </div>
                <div>
                  <span className="block text-[10px] text-[#70757B]">VERIFICATION ID</span>
                  <span className="text-white">PG-CERT-99428-A</span>
                </div>
                <div>
                  <span className="block text-[10px] text-[#70757B]">SIGNATURE</span>
                  <span className="text-white">_PG.Dev Arch Council</span>
                </div>
              </div>

              <div className="mt-8 flex justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setShowCertificateModal(false)}
                  className="px-6 py-2 rounded-lg bg-white text-black font-semibold text-xs hover:bg-[#e2e2e2] transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
