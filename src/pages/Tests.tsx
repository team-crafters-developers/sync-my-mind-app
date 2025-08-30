import { useState } from "react";
import { 
  TestTube, Brain, Play, Trophy, Clock, 
  Target, Zap, CheckCircle, X, RotateCcw,
  BookOpen, Award, TrendingUp, Star
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { mockTests } from "@/data/mockData";
import { Test, Question } from "@/types";

interface TestResult {
  score: number;
  totalQuestions: number;
  timeSpent: number;
  correctAnswers: number[];
  userAnswers: number[];
}

export default function Tests() {
  const [tests] = useState<Test[]>(mockTests);
  const [activeTest, setActiveTest] = useState<Test | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [testResult, setTestResult] = useState<TestResult | null>(null);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [isTestComplete, setIsTestComplete] = useState(false);

  const startTest = (test: Test) => {
    setActiveTest(test);
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setSelectedAnswer(null);
    setTestResult(null);
    setIsTestComplete(false);
    setStartTime(new Date());
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer !== null) {
      const newAnswers = [...userAnswers, selectedAnswer];
      setUserAnswers(newAnswers);
      setSelectedAnswer(null);

      if (currentQuestionIndex + 1 < activeTest!.questions.length) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        // Test complete
        completeTest(newAnswers);
      }
    }
  };

  const completeTest = (answers: number[]) => {
    if (!activeTest || !startTime) return;

    const correctAnswers = activeTest.questions.map(q => q.correctAnswer);
    const score = answers.reduce((acc, answer, index) => {
      return acc + (answer === correctAnswers[index] ? 1 : 0);
    }, 0);

    const timeSpent = Math.round((Date.now() - startTime.getTime()) / 1000);

    const result: TestResult = {
      score: Math.round((score / activeTest.questions.length) * 100),
      totalQuestions: activeTest.questions.length,
      timeSpent,
      correctAnswers,
      userAnswers: answers
    };

    setTestResult(result);
    setIsTestComplete(true);
  };

  const resetTest = () => {
    setActiveTest(null);
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setSelectedAnswer(null);
    setTestResult(null);
    setIsTestComplete(false);
    setStartTime(null);
  };

  const generateNewTest = (subject: string) => {
    // Mock test generation
    alert(`🎯 AI Test Generated!\n\nCreated a new ${subject} test with:\n\n• 10 adaptive questions\n• Difficulty adjusted to your level\n• Mix of multiple choice and conceptual questions\n• Estimated completion time: 25 minutes\n\n(This is a mock feature - in production, this would use AI to generate personalized questions)`);
  };

  const testStats = {
    totalTaken: 12,
    averageScore: 87,
    streak: 5,
    subjects: ['Computer Science', 'Chemistry', 'History']
  };

  if (activeTest && !isTestComplete) {
    const currentQuestion = activeTest.questions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / activeTest.questions.length) * 100;

    return (
      <div className="p-6 max-w-4xl mx-auto">
        {/* Test Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold">{activeTest.title}</h1>
              <p className="text-muted-foreground">{activeTest.subject}</p>
            </div>
            <Button variant="outline" onClick={resetTest}>
              <X className="w-4 h-4 mr-2" />
              Exit Test
            </Button>
          </div>
          
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary" />
              <span className="text-sm text-muted-foreground">
                Question {currentQuestionIndex + 1} of {activeTest.questions.length}
              </span>
            </div>
            <Badge variant={activeTest.difficulty === 'easy' ? 'secondary' : activeTest.difficulty === 'medium' ? 'default' : 'destructive'}>
              {activeTest.difficulty}
            </Badge>
          </div>
          
          <Progress value={progress} className="w-full" />
        </div>

        {/* Question */}
        <Card className="card-gradient">
          <CardHeader>
            <CardTitle className="text-xl">
              {currentQuestion.text}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <RadioGroup
              value={selectedAnswer?.toString()}
              onValueChange={(value) => handleAnswerSelect(parseInt(value))}
            >
              {currentQuestion.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-accent/50 transition-colors">
                  <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>

            <div className="pt-4 flex justify-between">
              <Button
                variant="outline"
                onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
                disabled={currentQuestionIndex === 0}
              >
                Previous
              </Button>
              <Button
                onClick={handleNextQuestion}
                disabled={selectedAnswer === null}
                className="gradient-primary text-white"
              >
                {currentQuestionIndex + 1 === activeTest.questions.length ? 'Finish Test' : 'Next Question'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isTestComplete && testResult) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        {/* Results Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full gradient-primary flex items-center justify-center">
            <Trophy className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Test Complete!</h1>
          <p className="text-muted-foreground">
            You've finished the {activeTest?.title}
          </p>
        </div>

        {/* Score Card */}
        <Card className="card-gradient mb-8">
          <CardContent className="p-8 text-center">
            <div className="text-6xl font-bold text-primary mb-4">
              {testResult.score}%
            </div>
            <div className="grid grid-cols-3 gap-6 mt-6">
              <div>
                <div className="text-2xl font-bold text-wellness">
                  {testResult.correctAnswers.filter((correct, i) => testResult.userAnswers[i] === correct).length}
                </div>
                <p className="text-sm text-muted-foreground">Correct</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-secondary">
                  {Math.floor(testResult.timeSpent / 60)}:{(testResult.timeSpent % 60).toString().padStart(2, '0')}
                </div>
                <p className="text-sm text-muted-foreground">Time</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">
                  {testResult.totalQuestions}
                </div>
                <p className="text-sm text-muted-foreground">Questions</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Question Review */}
        <Card className="card-gradient mb-6">
          <CardHeader>
            <CardTitle>Question Review</CardTitle>
            <CardDescription>See how you performed on each question</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {activeTest?.questions.map((question, index) => {
              const isCorrect = testResult.userAnswers[index] === testResult.correctAnswers[index];
              return (
                <div key={index} className="p-4 rounded-lg border">
                  <div className="flex items-start gap-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center mt-1 ${
                      isCorrect ? 'bg-wellness text-white' : 'bg-destructive text-white'
                    }`}>
                      {isCorrect ? <CheckCircle className="w-4 h-4" /> : <X className="w-4 h-4" />}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium mb-2">{question.text}</p>
                      <p className="text-sm text-muted-foreground mb-2">
                        Your answer: {question.options[testResult.userAnswers[index]]}
                      </p>
                      {!isCorrect && (
                        <p className="text-sm text-wellness">
                          Correct answer: {question.options[testResult.correctAnswers[index]]}
                        </p>
                      )}
                      {question.explanation && (
                        <p className="text-sm text-muted-foreground mt-2 p-2 bg-muted/50 rounded">
                          {question.explanation}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex gap-4 justify-center">
          <Button onClick={resetTest} variant="outline">
            <RotateCcw className="w-4 h-4 mr-2" />
            Take Another Test
          </Button>
          <Button onClick={() => generateNewTest(activeTest?.subject || 'General')} className="gradient-primary text-white">
            <Brain className="w-4 h-4 mr-2" />
            Generate Similar Test
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <TestTube className="w-8 h-8 text-primary" />
            Tests & Challenges
          </h1>
          <p className="text-muted-foreground mt-1">
            Practice with AI-generated tests and track your progress
          </p>
        </div>
        
        <Button className="gradient-primary text-white button-glow">
          <Brain className="w-4 h-4 mr-2" />
          Generate New Test
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="card-gradient">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tests Taken</CardTitle>
            <TestTube className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{testStats.totalTaken}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card className="card-gradient">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Score</CardTitle>
            <Target className="h-4 w-4 text-wellness" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-wellness">{testStats.averageScore}%</div>
            <p className="text-xs text-muted-foreground">+5% from last week</p>
          </CardContent>
        </Card>

        <Card className="card-gradient">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
            <Trophy className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">{testStats.streak}</div>
            <p className="text-xs text-muted-foreground">Days in a row</p>
          </CardContent>
        </Card>

        <Card className="card-gradient">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Subjects</CardTitle>
            <BookOpen className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-secondary">{testStats.subjects.length}</div>
            <p className="text-xs text-muted-foreground">Active subjects</p>
          </CardContent>
        </Card>
      </div>

      {/* Test Modes */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Practice Tests */}
        <Card className="card-gradient">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" />
              Practice Tests
            </CardTitle>
            <CardDescription>Test your knowledge with curated questions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {tests.map((test) => (
              <div key={test.id} className="flex items-center justify-between p-4 rounded-lg border hover:bg-accent/50 transition-colors">
                <div className="flex-1">
                  <h3 className="font-medium">{test.title}</h3>
                  <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                    <span>{test.subject}</span>
                    <Badge variant={test.difficulty === 'easy' ? 'secondary' : test.difficulty === 'medium' ? 'default' : 'destructive'} className="text-xs">
                      {test.difficulty}
                    </Badge>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {test.duration}min
                    </span>
                    <span>{test.questions.length} questions</span>
                  </div>
                </div>
                <Button
                  onClick={() => startTest(test)}
                  className="gradient-primary text-white"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Start
                </Button>
              </div>
            ))}
            
            <Button
              variant="outline"
              className="w-full"
              onClick={() => generateNewTest('Computer Science')}
            >
              <Brain className="w-4 h-4 mr-2" />
              Generate AI Test from Notes
            </Button>
          </CardContent>
        </Card>

        {/* Challenge Mode */}
        <Card className="card-gradient border-secondary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-secondary" />
              Challenge Mode
            </CardTitle>
            <CardDescription>Gamified learning with rewards and achievements</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 rounded-lg bg-secondary/5 border border-secondary/20">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium">Daily Challenge</h3>
                <Badge className="bg-secondary/10 text-secondary border-secondary/20">
                  <Star className="w-3 h-3 mr-1" />
                  50 XP
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Complete 5 questions in under 10 minutes
              </p>
              <Progress value={60} className="mb-2" />
              <p className="text-xs text-muted-foreground">3/5 questions completed</p>
              <Button className="w-full mt-3 gradient-academic text-white" disabled>
                <CheckCircle className="w-4 h-4 mr-2" />
                60% Complete
              </Button>
            </div>

            <div className="p-4 rounded-lg bg-wellness/5 border border-wellness/20">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium">Weekly Challenge</h3>
                <Badge className="bg-wellness/10 text-wellness border-wellness/20">
                  <Trophy className="w-3 h-3 mr-1" />
                  200 XP
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Achieve 85%+ average across all tests
              </p>
              <Progress value={87} className="mb-2" />
              <p className="text-xs text-muted-foreground">Current average: 87%</p>
              <Button className="w-full mt-3 gradient-wellness text-white">
                <Award className="w-4 h-4 mr-2" />
                Claim Reward
              </Button>
            </div>

            <div className="p-4 rounded-lg bg-warning/5 border border-warning/20">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium">Speed Round</h3>
                <Badge className="bg-warning/10 text-warning border-warning/20">
                  <Zap className="w-3 h-3 mr-1" />
                  Quick
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Answer 10 rapid-fire questions
              </p>
              <Button className="w-full" variant="outline">
                <Clock className="w-4 h-4 mr-2" />
                Start Speed Round
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Performance */}
      <Card className="card-gradient">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            Recent Performance
          </CardTitle>
          <CardDescription>Your latest test results and trends</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { subject: 'Neural Networks Quiz', score: 92, date: '2 hours ago', questions: 5 },
              { subject: 'Organic Chemistry Test', score: 78, date: 'Yesterday', questions: 8 },
              { subject: 'WWII Timeline', score: 95, date: '2 days ago', questions: 6 },
              { subject: 'Calculus Practice', score: 84, date: '3 days ago', questions: 10 },
            ].map((result, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-background/50 border">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    result.score >= 90 ? 'bg-wellness text-white' :
                    result.score >= 80 ? 'bg-secondary text-white' :
                    result.score >= 70 ? 'bg-warning text-white' :
                    'bg-destructive text-white'
                  }`}>
                    {result.score}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{result.subject}</p>
                    <p className="text-xs text-muted-foreground">{result.questions} questions • {result.date}</p>
                  </div>
                </div>
                <Badge variant="outline" className="text-xs">
                  {result.score}%
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}