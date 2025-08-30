// Core Types for MindSync

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  preferences: UserPreferences;
}

export interface UserPreferences {
  studyHours: number;
  breakInterval: number;
  theme: 'light' | 'dark';
  notifications: boolean;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  subject: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  aiGenerated?: boolean;
}

export interface WellnessCheckIn {
  id: string;
  date: Date;
  mood: 1 | 2 | 3 | 4 | 5;
  sleepHours: number;
  hydration: number; // glasses of water
  exercise: boolean;
  stress: 1 | 2 | 3 | 4 | 5;
  notes?: string;
}

export interface StudySession {
  id: string;
  subject: string;
  duration: number; // minutes
  startTime: Date;
  endTime: Date;
  productivity: 1 | 2 | 3 | 4 | 5;
  notes?: string;
}

export interface AIMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  type: 'academic' | 'wellness' | 'general';
}

export interface Test {
  id: string;
  title: string;
  subject: string;
  questions: Question[];
  createdAt: Date;
  difficulty: 'easy' | 'medium' | 'hard';
  duration: number; // minutes
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

export interface DashboardStats {
  todaysStudyHours: number;
  weeklyStudyHours: number;
  wellnessScore: number;
  completedTasks: number;
  pendingTasks: number;
  streak: number;
}