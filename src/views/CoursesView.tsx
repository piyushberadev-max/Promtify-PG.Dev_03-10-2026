import React, { useState } from 'react';
import { COURSES } from '../data/mockData';
import { Course, DifficultyLevel } from '../types';

interface CoursesViewProps {
  onOpenCourseModal: (course: Course) => void;
  enrolledCourseIds: string[];
}

export const CoursesView: React.FC<CoursesViewProps> = ({
  onOpenCourseModal,
  enrolledCourseIds,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTrack, setSelectedTrack] = useState<string>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');

  const tracks = ['All', 'Systems & C', 'Python & AI', 'Modern Web', 'DB & DevOps'];
  const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  const filteredCourses = COURSES.filter((c) => {
    const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTrack = selectedTrack === 'All' || c.category === selectedTrack;
    const matchesDiff = selectedDifficulty === 'All' || c.difficulty === selectedDifficulty;
    return matchesSearch && matchesTrack && matchesDiff;
  });

  return (
    <div className="w-full min-h-screen bg-[#050505] text-[#e5e2e1] pt-24 pb-20 px-4 md:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10 max-w-3xl">
          <div className="inline-flex items-center gap-1.5 font-mono text-xs text-[#8A8A8A] uppercase tracking-wider mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
            <span>Formal Technical Curriculum</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
            Curriculum Catalog
          </h1>
          <p className="text-sm md:text-base text-[#8A8A8A] mt-2 font-sans leading-relaxed">
            Every course is engineered around deterministic execution, runtime memory analysis, and building full-stack production software from scratch.
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="p-4 rounded-xl bg-[#0c0c0c] border border-white/10 mb-8 space-y-4">
          <div className="flex flex-col md:flex-row items-center gap-4">
            {/* Search Input */}
            <div className="relative flex-1 w-full">
              <span className="material-symbols-outlined absolute left-3 top-2.5 text-[18px] text-[#70757B]">
                search
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search courses by keyword, runtime, compiler, or algorithm..."
                className="w-full pl-9 pr-4 py-2 rounded-lg bg-[#141414] border border-white/10 text-xs text-white placeholder:text-[#666] outline-none focus:border-white/30 font-sans"
              />
            </div>

            {/* Difficulty Selector */}
            <div className="flex items-center gap-1.5 w-full md:w-auto font-mono text-xs">
              <span className="text-[#70757B] text-[11px] uppercase mr-1">Level:</span>
              {difficulties.map((diff) => (
                <button
                  key={diff}
                  type="button"
                  onClick={() => setSelectedDifficulty(diff)}
                  className={`px-2.5 py-1 rounded text-xs transition-colors ${
                    selectedDifficulty === diff
                      ? 'bg-white text-black font-semibold'
                      : 'bg-[#141414] text-[#8A8A8A] hover:text-white border border-white/10'
                  }`}
                >
                  {diff}
                </button>
              ))}
            </div>
          </div>

          {/* Track Filters */}
          <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-white/5 font-mono text-xs">
            <span className="text-[#70757B] text-[11px] uppercase mr-1">Track:</span>
            {tracks.map((track) => (
              <button
                key={track}
                type="button"
                onClick={() => setSelectedTrack(track)}
                className={`px-3 py-1 rounded transition-colors ${
                  selectedTrack === track
                    ? 'bg-white/15 text-white font-medium border border-white/30'
                    : 'bg-[#111111] text-[#8A8A8A] hover:text-white border border-white/5'
                }`}
              >
                {track}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6 font-mono text-xs text-[#8A8A8A]">
          <span>Showing {filteredCourses.length} of {COURSES.length} courses</span>
          <span>Updated for Curriculum v2.6</span>
        </div>

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => {
            const isEnrolled = enrolledCourseIds.includes(course.id);
            return (
              <div
                key={course.id}
                className="group p-6 rounded-xl bg-[#090909] border border-white/10 hover:border-white/25 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-[#161616] border border-white/10 text-white font-medium uppercase tracking-wider">
                      {course.difficulty}
                    </span>
                    <span className="font-mono text-xs text-[#8A8A8A]">{course.duration}</span>
                  </div>

                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-white/90 transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-xs text-[#8A8A8A] mb-6 leading-relaxed">
                    {course.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <div className="flex items-center justify-between text-xs text-[#8A8A8A] mb-2 font-mono">
                    <span>{course.lessonsCount} Lessons &bull; {course.labsCount} Labs</span>
                    <span className="text-[#AFAFAF]">{course.rating} &starf; ({course.reviewsCount})</span>
                  </div>

                  {isEnrolled && (
                    <div className="w-full bg-[#1b1b1b] rounded-full h-1.5 mb-4 overflow-hidden">
                      <div 
                        className="bg-white h-1.5 rounded-full"
                        style={{ width: `${course.progressPercent || 20}%` }}
                      ></div>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={() => onOpenCourseModal(course)}
                    className="w-full py-2.5 rounded bg-[#141414] hover:bg-[#1e1e1e] border border-white/15 text-white text-center text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span>{isEnrolled ? 'Continue Course' : 'View Course Syllabus'}</span>
                    <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {filteredCourses.length === 0 && (
          <div className="py-20 text-center text-[#70757B]">
            <span className="material-symbols-outlined text-4xl mb-3">search_off</span>
            <div className="text-sm text-white">No courses match the current filters</div>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedTrack('All');
                setSelectedDifficulty('All');
              }}
              className="mt-4 px-4 py-1.5 rounded bg-[#161616] text-white text-xs border border-white/10"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
