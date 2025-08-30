import { Crown, BookOpen, Headphones, Video, Sparkles, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export default function Premium() {
  return (
    <div className="p-6 space-y-6">
      <div className="text-center mb-8">
        <div className="w-20 h-20 mx-auto mb-4 rounded-full gradient-primary flex items-center justify-center">
          <Crown className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-3xl font-bold">Premium Hub</h1>
        <p className="text-muted-foreground">Advanced study tools and AI-powered features</p>
      </div>

      {/* Discount Progress */}
      <Card className="card-gradient border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            Your Discount Progress: 30%
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Progress value={30} className="mb-2" />
          <p className="text-sm text-muted-foreground">Complete 7 more study sessions to unlock 50% discount!</p>
        </CardContent>
      </Card>

      {/* Premium Features */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="card-gradient">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-academic" />
              Digital Library
            </CardTitle>
            <CardDescription>Access thousands of academic resources</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 rounded-lg bg-academic/5 border border-academic/20">
              <h3 className="font-medium mb-2">50,000+ Books & Papers</h3>
              <p className="text-sm text-muted-foreground">Comprehensive academic database</p>
            </div>
            <Button className="w-full gradient-academic text-white">
              <Sparkles className="w-4 h-4 mr-2" />
              Explore Library (Premium)
            </Button>
          </CardContent>
        </Card>

        <Card className="card-gradient">
          <CardHeader>
            <CardTitle>Advanced Study Tools</CardTitle>
            <CardDescription>AI-powered learning enhancement</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-background/50 border">
                <Headphones className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium text-sm">Notes to Podcast</p>
                  <p className="text-xs text-muted-foreground">Convert study notes to audio</p>
                </div>
                <Badge>Pro</Badge>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-background/50 border">
                <Video className="w-5 h-5 text-secondary" />
                <div>
                  <p className="font-medium text-sm">Video Explanations</p>
                  <p className="text-xs text-muted-foreground">AI-generated video content</p>
                </div>
                <Badge>Pro</Badge>
              </div>
            </div>
            <Button className="w-full gradient-primary text-white">
              <Crown className="w-4 h-4 mr-2" />
              Upgrade to Premium
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}