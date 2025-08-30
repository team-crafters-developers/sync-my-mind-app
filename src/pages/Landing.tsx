import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Brain, BookOpen, Heart, Zap, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Landing() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock authentication - in real app, would validate credentials
    if (email && password) {
      navigate("/dashboard");
    }
  };

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Learning",
      description: "Zenith AI adapts to your learning style and provides personalized study guidance."
    },
    {
      icon: BookOpen,
      title: "Smart Note Organization",
      description: "Automatically categorize and generate quiz questions from your study notes."
    },
    {
      icon: Heart,
      title: "Wellness Tracking",
      description: "Monitor your mental and physical health with intelligent reminders and insights."
    },
    {
      icon: Zap,
      title: "Productivity Analytics",
      description: "Track your study patterns and optimize your learning efficiency."
    }
  ];

  const benefits = [
    "AI-powered study recommendations",
    "Automated note categorization",
    "Wellness and productivity tracking",
    "Personalized learning paths",
    "Smart break reminders",
    "Progress analytics"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-8">
        {/* Navigation */}
        <nav className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl gradient-primary">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                MindSync
              </h1>
              <p className="text-xs text-muted-foreground">AI-Powered Learning Platform</p>
            </div>
          </div>
          <Badge variant="secondary" className="bg-wellness/10 text-wellness border-wellness/20">
            Beta Version
          </Badge>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Hero Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Balance Your
                <span className="block bg-gradient-to-r from-primary via-secondary to-wellness bg-clip-text text-transparent">
                  Academic Success
                </span>
                with Wellness
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                MindSync helps students achieve peak performance by seamlessly integrating 
                AI-powered learning tools with comprehensive wellness tracking.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button size="lg" className="gradient-primary text-white button-glow" onClick={() => setIsLogin(false)}>
                Get Started Free
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button variant="outline" size="lg">
                Watch Demo
              </Button>
            </div>

            {/* Benefits List */}
            <div className="grid sm:grid-cols-2 gap-3">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-wellness" />
                  <span className="text-sm text-muted-foreground">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Auth Form */}
          <div className="flex justify-center">
            <Card className="w-full max-w-md card-gradient">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">
                  {isLogin ? "Welcome Back" : "Join MindSync"}
                </CardTitle>
                <CardDescription>
                  {isLogin 
                    ? "Sign in to continue your learning journey" 
                    : "Start your AI-powered learning journey today"
                  }
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@student.edu"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full gradient-primary text-white button-glow"
                    size="lg"
                  >
                    {isLogin ? "Sign In" : "Create Account"}
                  </Button>

                  <div className="text-center">
                    <button
                      type="button"
                      onClick={() => setIsLogin(!isLogin)}
                      className="text-sm text-primary hover:underline"
                    >
                      {isLogin 
                        ? "Need an account? Sign up" 
                        : "Already have an account? Sign in"
                      }
                    </button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Everything You Need to Excel
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our comprehensive platform combines cutting-edge AI with proven wellness practices 
              to help you achieve your academic goals.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="text-center card-gradient hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      index === 0 ? 'gradient-primary' :
                      index === 1 ? 'gradient-academic' :
                      index === 2 ? 'gradient-wellness' :
                      'bg-secondary'
                    }`}>
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}