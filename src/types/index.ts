export type NavTab = 
  | 'home' 
  | 'courses' 
  | 'learning-paths' 
  | 'practice' 
  | 'projects' 
  | 'resources' 
  | 'about' 
  | 'dashboard';

export type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export interface Course {
  id: string;
  title: string;
  category: 'Systems & C' | 'Python & AI' | 'Modern Web' | 'DB & DevOps';
  difficulty: DifficultyLevel;
  duration: string;
  lessonsCount: number;
  labsCount: number;
  description: string;
  rating: number;
  reviewsCount: number;
  progressPercent?: number;
  prerequisites: string[];
  syllabus: {
    title: string;
    description: string;
    duration: string;
  }[];
}

export interface LearningPathMilestone {
  title: string;
  topics: string[];
  completed?: boolean;
}

export interface LearningPath {
  id: string;
  pathNumber: string;
  title: string;
  description: string;
  duration: string;
  milestonesCount: number;
  milestones: LearningPathMilestone[];
  targetOutcome: string;
}

export interface SandboxProblem {
  id: string;
  codeNumber: string;
  title: string;
  category: string;
  difficulty: DifficultyLevel;
  description: string;
  examples: {
    input: string;
    output: string;
    explanation?: string;
  }[];
  constraints: string[];
  starterCode: {
    python: string;
    c: string;
    javascript: string;
  };
  solutionCode: {
    python: string;
    c: string;
    javascript: string;
  };
  accuracy: string;
  submissions: string;
}

export interface StudentProject {
  id: string;
  title: string;
  trackBadge: string;
  stars: string;
  description: string;
  architectureDetails: string;
  stack: string[];
  author: string;
  role: string;
  githubUrl: string;
}

export interface ResourceItem {
  id: string;
  title: string;
  category: 'PDF / WEB' | 'CHEAT SHEETS' | 'INTERVIEWS' | 'COMMUNITY' | 'RFC';
  description: string;
  downloadUrl?: string;
  readTime?: string;
  contentMarkdown?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  codeSnippet?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  category: string;
}

export interface UserProfile {
  name: string;
  email: string;
  handle: string;
  avatarUrl?: string;
  streakDays: number;
  enrolledCourseIds: string[];
  completedProblemIds: string[];
  totalLabsCompleted: number;
  certificateEarned?: {
    courseTitle: string;
    issueDate: string;
    certId: string;
  };
}
