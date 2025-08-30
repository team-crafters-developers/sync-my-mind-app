import { useState, useEffect } from "react";
import { 
  Heart, Brain, Droplets, Moon, Dumbbell, 
  Plus, Calendar, TrendingUp, Award, Target,
  Zap, Clock, CheckCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadialBarChart, RadialBar } from 'recharts';
import { mockWellnessData } from "@/data/mockData";
import { WellnessCheckIn } from "@/types";

export default function Wellness() {
  const [wellnessData, setWellnessData] = useState<WellnessCheckIn[]>(mockWellnessData);
  const [isCheckInOpen, setIsCheckInOpen] = useState(false);
  const [todayCheckIn, setTodayCheckIn] = useState<Partial<WellnessCheckIn>>({
    mood: 3,
    sleepHours: 7,
    hydration: 4,
    exercise: false,
    stress: 3,
    notes: ""
  });

  const today = new Date().toDateString();
  const hasCheckedInToday = wellnessData.some(checkin => 
    checkin.date.toDateString() === today
  );

  const handleCheckIn = () => {
    const checkIn: WellnessCheckIn = {
      id: Date.now().toString(),
      date: new Date(),
      mood: todayCheckIn.mood!,
      sleepHours: todayCheckIn.sleepHours!,
      hydration: todayCheckIn.hydration!,
      exercise: todayCheckIn.exercise!,
      stress: todayCheckIn.stress!,
      notes: todayCheckIn.notes
    };
    
    setWellnessData([checkIn, ...wellnessData]);
    setIsCheckInOpen(false);
    setTodayCheckIn({
      mood: 3,
      sleepHours: 7,
      hydration: 4,
      exercise: false,
      stress: 3,
      notes: ""
    });
  };

  // Calculate wellness metrics
  const avgMood = wellnessData.reduce((sum, d) => sum + d.mood, 0) / wellnessData.length;
  const avgSleep = wellnessData.reduce((sum, d) => sum + d.sleepHours, 0) / wellnessData.length;
  const avgHydration = wellnessData.reduce((sum, d) => sum + d.hydration, 0) / wellnessData.length;
  const exerciseRate = (wellnessData.filter(d => d.exercise).length / wellnessData.length) * 100;
  const avgStress = wellnessData.reduce((sum, d) => sum + d.stress, 0) / wellnessData.length;

  const wellnessScore = Math.round(
    (avgMood / 5 * 25) + 
    (Math.min(avgSleep, 8) / 8 * 25) + 
    (Math.min(avgHydration, 8) / 8 * 25) + 
    (exerciseRate / 100 * 25)
  );

  const chartData = wellnessData.slice(0, 7).reverse().map(d => ({
    date: d.date.toLocaleDateString(),
    mood: d.mood,
    sleep: d.sleepHours,
    stress: 6 - d.stress, // Invert stress for better visualization
    hydration: d.hydration
  }));

  const radialData = [
    { name: 'Wellness Score', value: wellnessScore, fill: 'hsl(var(--wellness))' }
  ];

  const wellnessTips = [
    "Take a 10-minute walk between study sessions",
    "Practice deep breathing before exams",
    "Stay hydrated - aim for 8 glasses of water daily",
    "Get 7-9 hours of sleep for optimal cognitive function",
    "Try the 20-20-20 rule: every 20 minutes, look at something 20 feet away for 20 seconds"
  ];

  const [currentTip, setCurrentTip] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % wellnessTips.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Heart className="w-8 h-8 text-wellness" />
            Wellness Tracking
          </h1>
          <p className="text-muted-foreground mt-1">
            Monitor your mental and physical health for optimal learning
          </p>
        </div>
        
        <Dialog open={isCheckInOpen} onOpenChange={setIsCheckInOpen}>
          <DialogTrigger asChild>
            <Button 
              className="gradient-wellness text-white button-glow"
              disabled={hasCheckedInToday}
            >
              {hasCheckedInToday ? (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Checked In Today
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4 mr-2" />
                  Daily Check-In
                </>
              )}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Daily Wellness Check-In</DialogTitle>
              <DialogDescription>
                Take a moment to reflect on your well-being today
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6">
              {/* Mood */}
              <div>
                <Label className="text-sm font-medium">How's your mood today?</Label>
                <div className="mt-2">
                  <Slider
                    value={[todayCheckIn.mood!]}
                    onValueChange={(value) => setTodayCheckIn({ ...todayCheckIn, mood: value[0] as 1|2|3|4|5 })}
                    max={5}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>😢 Poor</span>
                    <span>😐 Fair</span>
                    <span>😊 Good</span>
                    <span>😄 Great</span>
                    <span>🤩 Excellent</span>
                  </div>
                </div>
              </div>

              {/* Sleep */}
              <div>
                <Label className="text-sm font-medium">Hours of sleep last night</Label>
                <div className="mt-2">
                  <Slider
                    value={[todayCheckIn.sleepHours!]}
                    onValueChange={(value) => setTodayCheckIn({ ...todayCheckIn, sleepHours: value[0] })}
                    max={12}
                    min={3}
                    step={0.5}
                    className="w-full"
                  />
                  <div className="text-center text-sm text-muted-foreground mt-1">
                    {todayCheckIn.sleepHours} hours
                  </div>
                </div>
              </div>

              {/* Hydration */}
              <div>
                <Label className="text-sm font-medium">Glasses of water today</Label>
                <div className="mt-2">
                  <Slider
                    value={[todayCheckIn.hydration!]}
                    onValueChange={(value) => setTodayCheckIn({ ...todayCheckIn, hydration: value[0] })}
                    max={12}
                    min={0}
                    step={1}
                    className="w-full"
                  />
                  <div className="text-center text-sm text-muted-foreground mt-1">
                    {todayCheckIn.hydration} glasses 💧
                  </div>
                </div>
              </div>

              {/* Exercise */}
              <div>
                <Label className="text-sm font-medium">Did you exercise today?</Label>
                <div className="flex gap-2 mt-2">
                  <Button
                    variant={todayCheckIn.exercise ? "default" : "outline"}
                    onClick={() => setTodayCheckIn({ ...todayCheckIn, exercise: true })}
                    className="flex-1"
                  >
                    <Dumbbell className="w-4 h-4 mr-2" />
                    Yes
                  </Button>
                  <Button
                    variant={!todayCheckIn.exercise ? "default" : "outline"}
                    onClick={() => setTodayCheckIn({ ...todayCheckIn, exercise: false })}
                    className="flex-1"
                  >
                    No
                  </Button>
                </div>
              </div>

              {/* Stress */}
              <div>
                <Label className="text-sm font-medium">Stress level</Label>
                <div className="mt-2">
                  <Slider
                    value={[todayCheckIn.stress!]}
                    onValueChange={(value) => setTodayCheckIn({ ...todayCheckIn, stress: value[0] as 1|2|3|4|5 })}
                    max={5}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>😌 Very Low</span>
                    <span>🙂 Low</span>
                    <span>😐 Medium</span>
                    <span>😟 High</span>
                    <span>😰 Very High</span>
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div>
                <Label htmlFor="notes" className="text-sm font-medium">Additional notes (optional)</Label>
                <Textarea
                  id="notes"
                  placeholder="How are you feeling? Any concerns or wins to share?"
                  value={todayCheckIn.notes}
                  onChange={(e) => setTodayCheckIn({ ...todayCheckIn, notes: e.target.value })}
                  className="mt-2"
                />
              </div>

              <div className="flex gap-2">
                <Button onClick={handleCheckIn} className="gradient-wellness text-white flex-1">
                  Complete Check-In
                </Button>
                <Button variant="outline" onClick={() => setIsCheckInOpen(false)} className="flex-1">
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Wellness Score & Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {/* Overall Wellness Score */}
        <Card className="md:col-span-2 card-gradient">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5 text-wellness" />
              Wellness Score
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={200}>
              <RadialBarChart data={radialData} innerRadius="60%" outerRadius="90%">
                <RadialBar dataKey="value" cornerRadius={10} />
                <text x="50%" y="50%" textAnchor="middle" dominantBaseline="central" className="fill-wellness">
                  <tspan fontSize="2rem" fontWeight="bold">{wellnessScore}</tspan>
                  <tspan fontSize="0.875rem" dy="1.5em" x="50%">/ 100</tspan>
                </text>
              </RadialBarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Individual Metrics */}
        <Card className="card-gradient">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Mood</CardTitle>
            <Heart className="h-4 w-4 text-wellness" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-wellness">
              {avgMood.toFixed(1)}/5
            </div>
            <Progress value={(avgMood / 5) * 100} className="mt-2" />
          </CardContent>
        </Card>

        <Card className="card-gradient">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sleep Quality</CardTitle>
            <Moon className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">
              {avgSleep.toFixed(1)}h
            </div>
            <p className="text-xs text-muted-foreground">
              Target: 7-9 hours
            </p>
          </CardContent>
        </Card>

        <Card className="card-gradient">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Exercise Rate</CardTitle>
            <Dumbbell className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-secondary">
              {exerciseRate.toFixed(0)}%
            </div>
            <p className="text-xs text-muted-foreground">
              This week
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Insights */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Wellness Trends */}
        <Card className="card-gradient">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Wellness Trends
            </CardTitle>
            <CardDescription>Your wellness metrics over the past week</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="mood" 
                  stroke="hsl(var(--wellness))" 
                  strokeWidth={2}
                  name="Mood"
                />
                <Line 
                  type="monotone" 
                  dataKey="sleep" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  name="Sleep Hours"
                />
                <Line 
                  type="monotone" 
                  dataKey="hydration" 
                  stroke="hsl(var(--secondary))" 
                  strokeWidth={2}
                  name="Hydration"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* AI Wellness Insights */}
        <Card className="card-gradient border-wellness/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-wellness" />
              AI Wellness Insights
            </CardTitle>
            <CardDescription>Personalized recommendations for you</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Dynamic Tip */}
            <div className="p-4 rounded-lg bg-wellness/5 border border-wellness/20">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-4 h-4 text-wellness" />
                <span className="font-medium text-sm">Daily Tip</span>
              </div>
              <p className="text-sm text-muted-foreground">
                {wellnessTips[currentTip]}
              </p>
            </div>

            {/* Personalized Insights */}
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 rounded-lg bg-background/50 border">
                <Target className="w-4 h-4 text-primary mt-1" />
                <div className="flex-1">
                  <p className="font-medium text-sm">Sleep Pattern Analysis</p>
                  <p className="text-xs text-muted-foreground">
                    Your sleep has been consistent at {avgSleep.toFixed(1)} hours. 
                    {avgSleep < 7 ? " Consider going to bed 30 minutes earlier." : " Great job maintaining healthy sleep!"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-lg bg-background/50 border">
                <Droplets className="w-4 h-4 text-secondary mt-1" />
                <div className="flex-1">
                  <p className="font-medium text-sm">Hydration Reminder</p>
                  <p className="text-xs text-muted-foreground">
                    You're averaging {avgHydration.toFixed(1)} glasses per day. 
                    {avgHydration < 6 ? " Try setting hourly water reminders." : " Excellent hydration habits!"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-lg bg-background/50 border">
                <Heart className="w-4 h-4 text-wellness mt-1" />
                <div className="flex-1">
                  <p className="font-medium text-sm">Mood & Stress Balance</p>
                  <p className="text-xs text-muted-foreground">
                    {avgStress > 3.5 
                      ? "Your stress levels seem elevated. Try meditation or short walks between study sessions."
                      : "Your mood and stress levels look healthy. Keep up the great work!"
                    }
                  </p>
                </div>
              </div>
            </div>

            <Button className="w-full gradient-wellness text-white">
              <Brain className="w-4 h-4 mr-2" />
              Get Personalized Wellness Plan
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Check-ins */}
      <Card className="card-gradient">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            Recent Check-ins
          </CardTitle>
          <CardDescription>Your wellness history</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {wellnessData.slice(0, 5).map((checkin) => (
              <div key={checkin.id} className="flex items-center justify-between p-3 rounded-lg bg-background/50 border">
                <div className="flex items-center gap-4">
                  <div className="text-sm font-medium">
                    {checkin.date.toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span>😊 {checkin.mood}/5</span>
                    <span>💤 {checkin.sleepHours}h</span>
                    <span>💧 {checkin.hydration}</span>
                    {checkin.exercise && <span>💪 Exercised</span>}
                  </div>
                </div>
                <Badge variant={checkin.stress <= 2 ? "secondary" : checkin.stress <= 3 ? "default" : "destructive"}>
                  Stress: {checkin.stress}/5
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}