import React, { useState } from 'react';
import { UserProfile } from '../types';
import { BrandLogo } from './BrandLogo';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: UserProfile) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const [mode, setMode] = useState<'signin' | 'signup' | 'ssh'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [sshKey, setSshKey] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      const userHandle = email ? email.split('@')[0] : 'engineer_dev';
      const user: UserProfile = {
        name: name || (mode === 'signup' ? 'New Engineer' : 'Alex Mercer'),
        email: email || 'alex.m@pgdev.internal',
        handle: `@${userHandle}`,
        streakDays: 14,
        enrolledCourseIds: ['python-software-engineers', 'c-systems-programming'],
        completedProblemIds: ['104'],
        totalLabsCompleted: 21,
        certificateEarned: {
          courseTitle: 'Git & Production Engineering',
          issueDate: 'October 2026',
          certId: 'PG-CERT-99428-A',
        },
      };
      setLoading(false);
      onLoginSuccess(user);
      onClose();
    }, 450);
  };

  const handleDemoLogin = () => {
    setLoading(true);
    setTimeout(() => {
      const demoUser: UserProfile = {
        name: 'Alex Mercer',
        email: 'alex.mercer@systems.pgdev',
        handle: '@alex_m',
        streakDays: 14,
        enrolledCourseIds: ['python-software-engineers', 'c-systems-programming', 'practical-ai-llms'],
        completedProblemIds: ['104', '101'],
        totalLabsCompleted: 28,
        certificateEarned: {
          courseTitle: 'Git & Production Engineering',
          issueDate: 'October 2026',
          certId: 'PG-CERT-99428-A',
        },
      };
      setLoading(false);
      onLoginSuccess(demoUser);
      onClose();
    }, 300);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="w-full max-w-md rounded-2xl bg-[#0d0d0d] border border-white/15 p-6 md:p-8 shadow-[0_32px_80px_rgba(0,0,0,0.95)] relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 text-[#8A8A8A] hover:text-white transition-colors"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <div className="flex justify-center mb-3">
            <BrandLogo size="lg" showWordmark={false} />
          </div>
          <h3 className="text-xl font-semibold text-white tracking-tight">
            {mode === 'signin' ? 'Sign in to _PG.Dev' : mode === 'signup' ? 'Create Engineer Account' : 'SSH Public Key Auth'}
          </h3>
          <p className="text-xs text-[#8A8A8A] mt-1">
            Access containerized deterministic sandboxes and syllabus repos.
          </p>
        </div>

        {/* Mode Selector Tabs */}
        <div className="flex items-center gap-1 p-1 bg-[#141414] rounded-lg mb-6 border border-white/10 text-xs">
          <button
            type="button"
            onClick={() => setMode('signin')}
            className={`flex-1 py-1.5 rounded-md font-medium transition-colors ${
              mode === 'signin' ? 'bg-white text-black font-semibold' : 'text-[#8A8A8A] hover:text-white'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setMode('signup')}
            className={`flex-1 py-1.5 rounded-md font-medium transition-colors ${
              mode === 'signup' ? 'bg-white text-black font-semibold' : 'text-[#8A8A8A] hover:text-white'
            }`}
          >
            Register
          </button>
          <button
            type="button"
            onClick={() => setMode('ssh')}
            className={`flex-1 py-1.5 rounded-md font-mono text-[11px] transition-colors ${
              mode === 'ssh' ? 'bg-white text-black font-semibold' : 'text-[#8A8A8A] hover:text-white'
            }`}
          >
            ssh-ed25519
          </button>
        </div>

        {/* Form Body */}
        {mode !== 'ssh' ? (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {mode === 'signup' && (
              <div>
                <label className="block text-[#AFAFAF] mb-1 font-medium">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Alex Mercer"
                  className="w-full px-3 py-2 rounded-lg bg-[#141414] border border-white/10 text-white placeholder:text-[#555] outline-none focus:border-white/40 transition-colors"
                />
              </div>
            )}

            <div>
              <label className="block text-[#AFAFAF] mb-1 font-medium">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="developer@workstation.io"
                className="w-full px-3 py-2 rounded-lg bg-[#141414] border border-white/10 text-white placeholder:text-[#555] outline-none focus:border-white/40 transition-colors"
              />
            </div>

            <div>
              <label className="block text-[#AFAFAF] mb-1 font-medium">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-3 py-2 rounded-lg bg-[#141414] border border-white/10 text-white placeholder:text-[#555] outline-none focus:border-white/40 transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-lg bg-white hover:bg-[#e6e6e6] text-black font-semibold text-xs transition-colors flex items-center justify-center gap-2 mt-2 disabled:opacity-50"
            >
              {loading && <span className="material-symbols-outlined text-[16px] animate-spin">refresh</span>}
              <span>{mode === 'signin' ? 'Authenticate' : 'Initialize Workspace'}</span>
            </button>
          </form>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block text-[#AFAFAF] mb-1 font-mono text-[11px]">Paste Public Key (~/.ssh/id_ed25519.pub)</label>
              <textarea
                required
                rows={3}
                value={sshKey}
                onChange={(e) => setSshKey(e.target.value)}
                placeholder="ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAI... dev@pgbox"
                className="w-full px-3 py-2 rounded-lg bg-[#141414] border border-white/10 text-white placeholder:text-[#555] outline-none font-mono text-[11px] focus:border-white/40 transition-colors"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-lg bg-white hover:bg-[#e6e6e6] text-black font-semibold text-xs transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <span>Verify Signature &amp; Connect</span>
            </button>
          </form>
        )}

        {/* Divider */}
        <div className="relative my-5">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
          </div>
          <div className="relative flex justify-center text-[10px] uppercase font-mono">
            <span className="bg-[#0d0d0d] px-2 text-[#70757B]">Or Quick Access</span>
          </div>
        </div>

        {/* Demo Fast Login Button */}
        <button
          type="button"
          onClick={handleDemoLogin}
          className="w-full py-2 rounded-lg bg-[#161616] hover:bg-[#202020] border border-white/15 text-white text-xs font-mono transition-colors flex items-center justify-center gap-2"
        >
          <span className="material-symbols-outlined text-[15px] text-[#AFAFAF]">bolt</span>
          <span>Instant Demo Sign-In (Alex Mercer)</span>
        </button>
      </div>
    </div>
  );
};
