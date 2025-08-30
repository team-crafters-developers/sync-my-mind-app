// Mock Data for MindSync Development

import { User, Note, WellnessCheckIn, StudySession, AIMessage, Test, DashboardStats } from '@/types';

export const mockUser: User = {
  id: '1',
  name: 'Alex Chen',
  email: 'alex.chen@student.edu',
  avatar: 'https://api.dicebear.com/8/avataaars/svg?seed=Alex',
  preferences: {
    studyHours: 6,
    breakInterval: 25,
    theme: 'light',
    notifications: true,
  },
};

export const mockNotes: Note[] = [
  {
    id: '1',
    title: 'Neural Networks Fundamentals',
    content: 'Deep learning basics: perceptrons, backpropagation, gradient descent...',
    subject: 'Computer Science',
    tags: ['AI', 'Machine Learning', 'Neural Networks'],
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    title: 'Organic Chemistry - Alkenes',
    content: 'Double bonds, pi electrons, addition reactions, Markovnikov rule...',
    subject: 'Chemistry',
    tags: ['Organic', 'Reactions', 'Alkenes'],
    createdAt: new Date('2024-01-14'),
    updatedAt: new Date('2024-01-14'),
  },
  {
    id: '3',
    title: 'World War II Timeline',
    content: '1939-1945: Major events, battles, political changes...',
    subject: 'History',
    tags: ['WWII', 'Timeline', 'Europe'],
    createdAt: new Date('2024-01-13'),
    updatedAt: new Date('2024-01-13'),
  },
];

export const mockWellnessData: WellnessCheckIn[] = [
  {
    id: '1',
    date: new Date('2024-01-15'),
    mood: 4,
    sleepHours: 7,
    hydration: 6,
    exercise: true,
    stress: 2,
  },
  {
    id: '2',
    date: new Date('2024-01-14'),
    mood: 3,
    sleepHours: 6,
    hydration: 4,
    exercise: false,
    stress: 3,
  },
  {
    id: '3',
    date: new Date('2024-01-13'),
    mood: 5,
    sleepHours: 8,
    hydration: 8,
    exercise: true,
    stress: 1,
  },
];

export const mockStudySessions: StudySession[] = [
  {
    id: '1',
    subject: 'Computer Science',
    duration: 120,
    startTime: new Date('2024-01-15T09:00:00'),
    endTime: new Date('2024-01-15T11:00:00'),
    productivity: 4,
  },
  {
    id: '2',
    subject: 'Chemistry',
    duration: 90,
    startTime: new Date('2024-01-15T14:00:00'),
    endTime: new Date('2024-01-15T15:30:00'),
    productivity: 5,
  },
];

export const mockAIMessages: AIMessage[] = [
  {
    id: '1',
    role: 'user',
    content: 'How can I improve my study efficiency?',
    timestamp: new Date('2024-01-15T10:00:00'),
    type: 'academic',
  },
  {
    id: '2',
    role: 'assistant',
    content: 'Great question! Here are some proven strategies to boost your study efficiency: 1) Use the Pomodoro Technique - study for 25 minutes, then take a 5-minute break. 2) Create a dedicated study space free from distractions. 3) Use active recall instead of just re-reading notes. 4) Practice spaced repetition for long-term retention.',
    timestamp: new Date('2024-01-15T10:00:30'),
    type: 'academic',
  },
  {
    id: '3',
    role: 'user',
    content: 'I\'ve been feeling stressed about exams lately',
    timestamp: new Date('2024-01-15T15:30:00'),
    type: 'wellness',
  },
  {
    id: '4',
    role: 'assistant',
    content: 'I understand exam stress can be overwhelming. Here are some techniques to help manage it: 1) Practice deep breathing exercises - try the 4-7-8 technique. 2) Break your study material into smaller, manageable chunks. 3) Maintain a regular sleep schedule. 4) Don\'t forget to take breaks and do activities you enjoy. Remember, some stress is normal and can actually help you perform better!',
    timestamp: new Date('2024-01-15T15:31:00'),
    type: 'wellness',
  },
];

export const mockTests: Test[] = [
  {
    id: '1',
    title: 'Neural Networks Quiz',
    subject: 'Computer Science',
    difficulty: 'medium',
    duration: 30,
    createdAt: new Date('2024-01-15'),
    questions: [
      {
        id: '1',
        text: 'What is the primary function of backpropagation in neural networks?',
        options: [
          'To initialize weights',
          'To calculate gradients and update weights',
          'To add more layers',
          'To remove overfitting'
        ],
        correctAnswer: 1,
        explanation: 'Backpropagation calculates gradients of the loss function with respect to weights and uses them to update the network parameters.'
      },
      {
        id: '2',
        text: 'Which activation function is most commonly used in hidden layers of modern neural networks?',
        options: ['Sigmoid', 'Tanh', 'ReLU', 'Linear'],
        correctAnswer: 2,
        explanation: 'ReLU (Rectified Linear Unit) is widely used because it helps mitigate the vanishing gradient problem.'
      },
    ],
  },
];

export const mockDashboardStats: DashboardStats = {
  todaysStudyHours: 3.5,
  weeklyStudyHours: 28,
  wellnessScore: 85,
  completedTasks: 12,
  pendingTasks: 5,
  streak: 7,
};

// Chart data for analytics
export const studyAnalyticsData = [
  { name: 'Mon', study: 4, wellness: 7 },
  { name: 'Tue', study: 6, wellness: 8 },
  { name: 'Wed', study: 3, wellness: 6 },
  { name: 'Thu', study: 5, wellness: 9 },
  { name: 'Fri', study: 7, wellness: 7 },
  { name: 'Sat', study: 2, wellness: 8 },
  { name: 'Sun', study: 4, wellness: 9 },
];

export const subjectDistribution = [
  { name: 'CS', value: 35, color: '#3b82f6' },
  { name: 'Math', value: 25, color: '#8b5cf6' },
  { name: 'Chemistry', value: 20, color: '#10b981' },
  { name: 'History', value: 15, color: '#f59e0b' },
  { name: 'Physics', value: 5, color: '#ef4444' },
];