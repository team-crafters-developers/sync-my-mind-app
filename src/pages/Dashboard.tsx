import { useState, useEffect } from "react";
import { 
  BookOpen, Brain, Heart, Trophy, Clock, Target, 
  TrendingUp, Calendar, Zap, AlertCircle 
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { studyAnalyticsData, subjectDistribution, mockDashboardStats } from "@/data/mockData";

export default function Dashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [studyProgress, setStudyProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Animate study progress
    const progressTimer = setTimeout(() => {
      setStudyProgress(58);
    }, 500);

    return () => {
      clearInterval(timer);
      clearTimeout(progressTimer);
    };
  }, []);

  const greeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  const upcomingTasks = [
    { title: "Neural Networks Assignment", subject: "CS", due: "2 hours", priority: "high" },
    { title: "Chemistry Lab Report", subject: "Chem", due: "Tomorrow", priority: "medium" },
    { title: "History Essay", subject: "Hist", due: "3 days", priority: "low" },
  ];

  const recentNotes = [
    { title: "Machine Learning Basics", subject: "CS", lastModified: "2 hours ago" },
    { title: "Organic Reactions", subject: "Chemistry", lastModified: "Yesterday" },
    { title: "WWII Timeline", subject: "History", lastModified: "2 days ago" },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Section */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">
            {greeting()}, Alex! 👋
          </h1>
          <p className="text-muted-foreground mt-1">
            Ready to make today productive? You're on a {mockDashboardStats.streak}-day streak!
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="secondary" className="bg-wellness/10 text-wellness border-wellness/20">
            <Heart className="w-3 h-3 mr-1" />
            Wellness: {mockDashboardStats.wellnessScore}%
          </Badge>
          <Button className="gradient-primary text-white">
            <Zap className="w-4 h-4 mr-2" />
            Start Focus Session
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="card-gradient">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Study Hours Today</CardTitle>
            <Clock className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              {mockDashboardStats.todaysStudyHours}h
            </div>
            <div className="flex items-center gap-2 mt-2">
              <Progress value={studyProgress} className="flex-1" />
              <span className="text-xs text-muted-foreground">{studyProgress}%</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Goal: 6h daily
            </p>
          </CardContent>
        </Card>

        <Card className="card-gradient">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Weekly Progress</CardTitle>
            <TrendingUp className="h-4 w-4 text-wellness" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-wellness">
              {mockDashboardStats.weeklyStudyHours}h
            </div>
            <p className="text-xs text-muted-foreground">
              +4h from last week
            </p>
            <div className="flex items-center gap-1 mt-2">
              <div className="w-2 h-2 rounded-full bg-wellness"></div>
              <span className="text-xs text-wellness font-medium">On track</span>
            </div>
          </CardContent>
        </Card>

        <Card className="card-gradient">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tasks</CardTitle>
            <Target className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-secondary">
              {mockDashboardStats.completedTasks}/{mockDashboardStats.completedTasks + mockDashboardStats.pendingTasks}
            </div>
            <p className="text-xs text-muted-foreground">
              {mockDashboardStats.pendingTasks} pending
            </p>
            <div className="flex gap-1 mt-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <div 
                  key={i}
                  className={`w-2 h-2 rounded-full ${
                    i < 3 ? 'bg-secondary' : 'bg-muted'
                  }`}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="card-gradient">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Streak</CardTitle>
            <Trophy className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">
              {mockDashboardStats.streak} days
            </div>
            <p className="text-xs text-muted-foreground">
              Personal best!
            </p>
            <div className="flex items-center gap-1 mt-2">
              <Trophy className="w-3 h-3 text-warning" />
              <span className="text-xs text-warning font-medium">New record</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Study vs Wellness Balance */}
        <Card className="card-gradient">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-primary" />
              Study vs Wellness Balance
            </CardTitle>
            <CardDescription>
              Track your daily balance between academic work and wellness activities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={studyAnalyticsData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="study" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                <Bar dataKey="wellness" fill="hsl(var(--wellness))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Subject Distribution */}
        <Card className="card-gradient">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-secondary" />
              Study Time by Subject
            </CardTitle>
            <CardDescription>
              How you're spending your study time across different subjects
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={subjectDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {subjectDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap gap-2 mt-4">
              {subjectDistribution.map((subject, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: subject.color }}
                  />
                  <span className="text-sm text-muted-foreground">
                    {subject.name} ({subject.value}%)
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions & Upcoming */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Upcoming Tasks */}
        <Card className="card-gradient">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              Upcoming Tasks
            </CardTitle>
            <CardDescription>Tasks due soon that need your attention</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {upcomingTasks.map((task, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-background/50 border">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-8 rounded-full ${
                    task.priority === 'high' ? 'bg-destructive' :
                    task.priority === 'medium' ? 'bg-warning' :
                    'bg-muted'
                  }`} />
                  <div>
                    <p className="font-medium text-sm">{task.title}</p>
                    <p className="text-xs text-muted-foreground">{task.subject}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{task.due}</p>
                  {task.priority === 'high' && (
                    <div className="flex items-center gap-1 text-destructive">
                      <AlertCircle className="w-3 h-3" />
                      <span className="text-xs">Urgent</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full">
              View All Tasks
            </Button>
          </CardContent>
        </Card>

        {/* Recent Notes */}
        <Card className="card-gradient">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-academic" />
              Recent Notes
            </CardTitle>
            <CardDescription>Your latest study materials and notes</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentNotes.map((note, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-background/50 border hover:bg-accent/50 transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg gradient-academic flex items-center justify-center">
                    <BookOpen className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{note.title}</p>
                    <p className="text-xs text-muted-foreground">{note.subject}</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">{note.lastModified}</p>
              </div>
            ))}
            <Button variant="outline" className="w-full">
              Browse All Notes
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* AI Insights Panel */}
      <Card className="card-gradient border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-primary" />
            AI Insights & Recommendations
          </CardTitle>
          <CardDescription>Personalized suggestions from Zenith AI</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-3 p-4 rounded-lg bg-primary/5 border border-primary/20">
            <Brain className="w-5 h-5 text-primary mt-0.5" />
            <div className="flex-1">
              <p className="font-medium text-sm mb-1">Study Pattern Analysis</p>
              <p className="text-sm text-muted-foreground">
                Your focus is strongest between 9-11 AM. Consider scheduling your most challenging subjects during this time.
                You've shown 40% better retention when taking 5-minute breaks every 25 minutes.
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3 p-4 rounded-lg bg-wellness/5 border border-wellness/20">
            <Heart className="w-5 h-5 text-wellness mt-0.5" />
            <div className="flex-1">
              <p className="font-medium text-sm mb-1">Wellness Reminder</p>
              <p className="text-sm text-muted-foreground">
                You haven't logged a wellness check-in today. Remember: a healthy mind supports better learning.
                Try a 10-minute meditation or quick walk before your next study session.
              </p>
            </div>
          </div>

          <Button className="gradient-primary text-white">
            <Brain className="w-4 h-4 mr-2" />
            Chat with Zenith AI
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}