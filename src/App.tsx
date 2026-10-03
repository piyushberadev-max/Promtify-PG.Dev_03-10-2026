/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { NavTab, Course, UserProfile } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CommandPalette } from './components/CommandPalette';
import { AuthModal } from './components/AuthModal';
import { CourseDetailModal } from './components/CourseDetailModal';
import { AiAssistantDrawer } from './components/AiAssistantDrawer';

import { HomeView } from './views/HomeView';
import { CoursesView } from './views/CoursesView';
import { LearningPathsView } from './views/LearningPathsView';
import { PracticeView } from './views/PracticeView';
import { ProjectsView } from './views/ProjectsView';
import { ResourcesView } from './views/ResourcesView';
import { AboutView } from './views/AboutView';
import { DashboardView } from './views/DashboardView';

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavTab>('home');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedPathId, setSelectedPathId] = useState<string | undefined>(undefined);
  const [selectedProblemId, setSelectedProblemId] = useState<string | undefined>(undefined);

  // Modals state
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [assistantContext, setAssistantContext] = useState<string>('General Systems Curriculum');

  // User state
  const [user, setUser] = useState<UserProfile | null>(() => {
    // Default logged-in demo engineer for rich dashboard and learning preview
    return {
      name: 'Alex Mercer',
      email: 'alex.mercer@systems.pgdev',
      handle: '@alex_m',
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
  });

  // Scroll to top on navigation change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentTab]);

  const handleTabChange = (tab: NavTab) => {
    setCurrentTab(tab);
  };

  const handleNavigateWithId = (tab: NavTab, extraId?: string) => {
    setCurrentTab(tab);
    if (tab === 'courses' && extraId) {
      // Find course
      import('./data/mockData').then(({ COURSES }) => {
        const found = COURSES.find((c) => c.id === extraId);
        if (found) setSelectedCourse(found);
      });
    } else if (tab === 'learning-paths' && extraId) {
      setSelectedPathId(extraId);
    } else if (tab === 'practice' && extraId) {
      setSelectedProblemId(extraId);
    }
  };

  const handleEnrollCourse = (courseId: string) => {
    if (!user) {
      setIsAuthOpen(true);
      return;
    }
    setUser((prev) => {
      if (!prev) return prev;
      if (prev.enrolledCourseIds.includes(courseId)) return prev;
      return {
        ...prev,
        enrolledCourseIds: [...prev.enrolledCourseIds, courseId],
      };
    });
  };

  const handleOpenAssistantWithPrompt = (prompt: string, context?: string) => {
    setAssistantContext(context || `Context: ${prompt.slice(0, 40)}...`);
    setIsAssistantOpen(true);
  };

  const handleLoginSuccess = (newUser: UserProfile) => {
    setUser(newUser);
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentTab('home');
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#e5e2e1] flex flex-col font-sans selection:bg-white/20 selection:text-white">
      {/* Top Fixed Navigation Bar */}
      <Navbar
        currentTab={currentTab}
        onTabChange={handleTabChange}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        user={user}
        onLogout={handleLogout}
      />

      {/* Main View Router */}
      <main className="flex-1 w-full">
        {currentTab === 'home' && (
          <HomeView
            onNavigate={handleNavigateWithId}
            onOpenCourseModal={(course) => setSelectedCourse(course)}
            onOpenAssistantWithPrompt={handleOpenAssistantWithPrompt}
            onOpenAuth={() => setIsAuthOpen(true)}
          />
        )}

        {currentTab === 'courses' && (
          <CoursesView
            onOpenCourseModal={(course) => setSelectedCourse(course)}
            enrolledCourseIds={user ? user.enrolledCourseIds : []}
          />
        )}

        {currentTab === 'learning-paths' && (
          <LearningPathsView
            onNavigate={handleNavigateWithId}
            selectedPathId={selectedPathId}
          />
        )}

        {currentTab === 'practice' && (
          <PracticeView
            initialProblemId={selectedProblemId}
            onOpenAssistantWithPrompt={handleOpenAssistantWithPrompt}
          />
        )}

        {currentTab === 'projects' && <ProjectsView />}

        {currentTab === 'resources' && <ResourcesView />}

        {currentTab === 'about' && (
          <AboutView
            onNavigate={handleTabChange}
            onOpenAuth={() => setIsAuthOpen(true)}
          />
        )}

        {currentTab === 'dashboard' && user && (
          <DashboardView
            user={user}
            onNavigate={handleNavigateWithId}
            onOpenCourseModal={(course) => setSelectedCourse(course)}
          />
        )}
      </main>

      {/* Footer */}
      <Footer onTabChange={handleTabChange} />

      {/* Floating AI Assistant Trigger Button (Bottom Right) */}
      <button
        type="button"
        onClick={() => {
          setAssistantContext(`General Session: ${currentTab.toUpperCase()}`);
          setIsAssistantOpen(true);
        }}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-3.5 py-2.5 rounded-full bg-[#121212] hover:bg-[#1a1a1a] border border-white/20 hover:border-white/40 text-white shadow-[0_8px_32px_rgba(0,0,0,0.85)] transition-all duration-200 group select-none"
        title="Open PG Assistant"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-50"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
        </span>
        <span className="material-symbols-outlined text-[18px] text-white">smart_toy</span>
        <span className="font-mono text-xs font-semibold tracking-wide">PG Assistant</span>
      </button>

      {/* Slide-over PG Assistant Drawer */}
      <AiAssistantDrawer
        isOpen={isAssistantOpen}
        onClose={() => setIsAssistantOpen(false)}
        currentContext={assistantContext}
      />

      {/* Command Palette (⌘K) Modal */}
      <CommandPalette
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={handleNavigateWithId}
      />

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Course Detail Modal */}
      <CourseDetailModal
        course={selectedCourse}
        isOpen={selectedCourse !== null}
        onClose={() => setSelectedCourse(null)}
        onEnroll={handleEnrollCourse}
        isEnrolled={selectedCourse ? (user?.enrolledCourseIds.includes(selectedCourse.id) ?? false) : false}
        onOpenAssistantForCourse={(courseTitle) => {
          setSelectedCourse(null);
          handleOpenAssistantWithPrompt(
            `Explain the technical prerequisites and syllabus structure for "${courseTitle}".`,
            `Course: ${courseTitle}`
          );
        }}
        onLaunchSandbox={() => {
          setSelectedCourse(null);
          setCurrentTab('practice');
        }}
      />
    </div>
  );
}
