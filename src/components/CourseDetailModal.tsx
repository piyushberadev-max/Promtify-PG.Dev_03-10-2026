import React from 'react';
import { Course } from '../types';

interface CourseDetailModalProps {
  course: Course | null;
  isOpen: boolean;
  onClose: () => void;
  onEnroll: (courseId: string) => void;
  isEnrolled: boolean;
  onOpenAssistantForCourse: (courseTitle: string) => void;
  onLaunchSandbox: () => void;
}

export const CourseDetailModal: React.FC<CourseDetailModalProps> = ({
  course,
  isOpen,
  onClose,
  onEnroll,
  isEnrolled,
  onOpenAssistantForCourse,
  onLaunchSandbox,
}) => {
  if (!isOpen || !course) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
      <div 
        className="w-full max-w-3xl max-h-[88vh] flex flex-col rounded-2xl bg-[#0e0e0e] border border-white/20 shadow-[0_32px_80px_rgba(0,0,0,0.95)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-white/10 bg-[#121212] flex items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2 font-mono text-xs">
              <span className="px-2 py-0.5 rounded bg-white/10 text-white font-medium">
                {course.category}
              </span>
              <span className="text-[#70757B]">&bull;</span>
              <span className="text-[#AFAFAF]">{course.difficulty}</span>
              <span className="text-[#70757B]">&bull;</span>
              <span className="text-[#AFAFAF]">{course.duration}</span>
              <span className="text-[#70757B]">&bull;</span>
              <span className="text-white">{course.rating} &starf; ({course.reviewsCount.toLocaleString()})</span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
              {course.title}
            </h2>
            <p className="text-xs md:text-sm text-[#AFAFAF] mt-1 leading-relaxed">
              {course.description}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded text-[#8A8A8A] hover:text-white hover:bg-white/10 transition-colors shrink-0"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs">
          {/* Progress if enrolled */}
          {isEnrolled && (
            <div className="p-4 rounded-xl bg-[#141414] border border-white/15">
              <div className="flex justify-between items-center mb-2">
                <span className="font-mono text-xs text-white font-medium">Syllabus Completion</span>
                <span className="font-mono text-xs text-white font-bold">{course.progressPercent || 25}%</span>
              </div>
              <div className="w-full bg-[#202020] rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-white h-2 rounded-full transition-all duration-300"
                  style={{ width: `${course.progressPercent || 25}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* Prerequisites */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-wider text-[#70757B] mb-2 font-semibold">
              Prerequisites &amp; Environment
            </h4>
            <div className="flex flex-wrap gap-2">
              {course.prerequisites.map((p, idx) => (
                <div key={idx} className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#161616] border border-white/10 text-[#D9D9D9]">
                  <span className="material-symbols-outlined text-[14px] text-white">check</span>
                  <span>{p}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Syllabus Modules Breakdown */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-mono text-xs uppercase tracking-wider text-[#70757B] font-semibold">
                Curriculum Modules ({course.lessonsCount} Lessons &bull; {course.labsCount} Labs)
              </h4>
              <span className="text-[11px] font-mono text-[#8A8A8A]">Deterministic CI Evaluated</span>
            </div>

            <div className="space-y-2.5">
              {course.syllabus.map((mod, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-[#141414] border border-white/10 flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded bg-[#202020] text-white font-mono text-[11px] flex items-center justify-center shrink-0 font-bold">
                      {idx + 1}
                    </div>
                    <div>
                      <div className="font-semibold text-white text-xs">{mod.title}</div>
                      <div className="text-[#8A8A8A] text-[11px] mt-0.5 leading-relaxed">{mod.description}</div>
                    </div>
                  </div>
                  <div className="font-mono text-[11px] text-[#AFAFAF] shrink-0">
                    {mod.duration}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-white/10 bg-[#121212] flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => onOpenAssistantForCourse(course.title)}
            className="w-full sm:w-auto px-3.5 py-2 rounded-lg bg-[#181818] hover:bg-[#222222] border border-white/15 text-white font-mono text-xs flex items-center justify-center gap-2 transition-colors"
          >
            <span className="material-symbols-outlined text-[15px]">smart_toy</span>
            <span>Ask PG Assistant About Track</span>
          </button>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={onLaunchSandbox}
              className="flex-1 sm:flex-none px-3.5 py-2 rounded-lg bg-[#181818] hover:bg-[#222222] border border-white/15 text-white text-xs font-medium transition-colors"
            >
              Open Sandbox
            </button>
            <button
              type="button"
              onClick={() => {
                onEnroll(course.id);
                onClose();
              }}
              className="flex-1 sm:flex-none px-5 py-2 rounded-lg bg-white hover:bg-[#e0e0e0] text-black font-semibold text-xs transition-colors shadow-sm"
            >
              {isEnrolled ? 'Continue Learning' : 'Enroll in Track'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
