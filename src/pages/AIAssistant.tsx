import { useState, useRef, useEffect } from "react";
import { 
  Brain, Send, BookOpen, Heart, Lightbulb, 
  Clock, Sparkles, User, Bot, Copy, ThumbsUp,
  MessageCircle, Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { mockAIMessages } from "@/data/mockData";
import { AIMessage } from "@/types";

export default function AIAssistant() {
  const [messages, setMessages] = useState<AIMessage[]>(mockAIMessages);
  const [currentMessage, setCurrentMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickPrompts = [
    { text: "Help me create a study schedule", icon: Clock, type: "academic" as const },
    { text: "I'm feeling overwhelmed with exams", icon: Heart, type: "wellness" as const },
    { text: "Explain neural networks simply", icon: Brain, type: "academic" as const },
    { text: "Tips for better focus", icon: Lightbulb, type: "general" as const },
  ];

  const mockResponses: Record<string, string> = {
    "help me create a study schedule": "I'd be happy to help you create an effective study schedule! Here's a personalized approach based on your current courses:\n\n📚 **Study Schedule Framework:**\n\n**Morning (9-11 AM)** - Your peak focus hours\n• Computer Science (most challenging material)\n• Neural networks, algorithms\n\n**Afternoon (2-4 PM)** - Good retention period\n• Chemistry (lab work, problem solving)\n• Organic reactions, calculations\n\n**Evening (7-9 PM)** - Review and lighter topics\n• History (reading, note review)\n• Language arts\n\n**💡 Pro Tips:**\n• Use 25-minute Pomodoro sessions with 5-minute breaks\n• Review yesterday's material for 10 minutes before starting new content\n• Take a 15-minute walk between subjects\n• Plan your most difficult subjects when you're most alert\n\nWould you like me to create a detailed weekly schedule for your specific courses?",
    
    "i'm feeling overwhelmed with exams": "I understand that exam pressure can feel overwhelming - you're not alone in feeling this way! Here are some strategies to help you manage:\n\n🧘 **Immediate Relief:**\n• Take 5 deep breaths (4 seconds in, 6 seconds out)\n• Step outside for 10 minutes of fresh air\n• Do a quick body scan to release tension\n\n📋 **Organization Strategy:**\n• Write down all your exams and deadlines\n• Break each subject into smaller, manageable chunks\n• Prioritize based on date and difficulty\n• Celebrate small wins along the way\n\n⚖️ **Balance Approach:**\n• Maintain regular sleep (7-8 hours)\n• Take study breaks every 45-60 minutes\n• Stay hydrated and eat nutritious meals\n• Connect with friends or family for support\n\n🎯 **Perspective Shift:**\n• Remember: exams test knowledge, not your worth as a person\n• Focus on progress, not perfection\n• You've overcome challenges before - you can do this too!\n\nWhat specific aspect of exam prep is causing you the most stress? I can provide more targeted advice.",
    
    "explain neural networks simply": "Great question! Let me break down neural networks in simple terms:\n\n🧠 **Think of it like your brain:**\nYour brain has billions of neurons that pass messages to each other. Artificial neural networks copy this idea with computer \"neurons\" called nodes.\n\n🔗 **The Basic Structure:**\n• **Input Layer:** Receives information (like pixels in an image)\n• **Hidden Layers:** Process and analyze the information\n• **Output Layer:** Makes the final decision or prediction\n\n⚡ **How it learns:**\n1. **Forward Pass:** Information flows from input to output\n2. **Make a guess:** The network predicts an answer\n3. **Check the answer:** Compare with the correct result\n4. **Backpropagation:** Adjust connections to improve next time\n5. **Repeat:** Do this millions of times with different examples\n\n🎯 **Real Example:**\nRecognizing cats in photos:\n• Input: Image pixels\n• Hidden layers: Detect edges → shapes → features → patterns\n• Output: \"This is a cat\" (with confidence %)\n\n💡 **Key Insight:**\nNeural networks learn patterns from examples, just like how you learned to recognize faces by seeing many faces throughout your life!\n\nWant me to dive deeper into any specific part?",
    
    "tips for better focus": "Excellent question! Here are proven strategies to boost your focus and concentration:\n\n🎯 **Environment Setup:**\n• Remove distractions (phone, social media, clutter)\n• Use noise-canceling headphones or focus music\n• Ensure good lighting and comfortable temperature\n• Have a dedicated study space\n\n⏰ **Time Management:**\n• **Pomodoro Technique:** 25 min focused work + 5 min break\n• **Time blocking:** Assign specific times for specific subjects\n• **Deep work blocks:** 90-120 minutes for challenging tasks\n• Identify your peak energy hours and use them wisely\n\n🧠 **Cognitive Strategies:**\n• **Single-tasking:** Focus on one thing at a time\n• **Active recall:** Test yourself instead of just re-reading\n• **Spaced repetition:** Review material at increasing intervals\n• **Mind mapping:** Visualize connections between concepts\n\n💪 **Physical Optimization:**\n• Stay hydrated (dehydration reduces focus by 10-15%)\n• Take movement breaks every hour\n• Eat brain-friendly foods (nuts, berries, fish)\n• Get adequate sleep (7-9 hours)\n\n🎵 **Focus Tools:**\n• Binaural beats or brown noise\n• Forest app for phone blocking\n• Website blockers during study time\n• Meditation apps for mental training\n\nWhich area would you like to focus on improving first?"
  };

  const handleSendMessage = () => {
    if (!currentMessage.trim()) return;

    const userMessage: AIMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: currentMessage,
      timestamp: new Date(),
      type: 'general'
    };

    setMessages(prev => [...prev, userMessage]);
    setCurrentMessage("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const responseKey = currentMessage.toLowerCase();
      const response = mockResponses[responseKey] || 
        `I understand you're asking about "${currentMessage}". While I'm currently in demo mode with pre-configured responses, in the full version I would provide detailed, personalized guidance on this topic. I can help with academic questions, study strategies, wellness advice, and motivation. Try one of the quick prompts below for a full demo response!`;

      const aiMessage: AIMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date(),
        type: 'general'
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000);
  };

  const handleQuickPrompt = (prompt: string) => {
    setCurrentMessage(prompt);
    inputRef.current?.focus();
  };

  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  return (
    <div className="p-6 h-[calc(100vh-2rem)] flex flex-col">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Brain className="w-8 h-8 text-primary" />
            Zenith AI Assistant
          </h1>
          <p className="text-muted-foreground mt-1">
            Your intelligent study companion for academic and wellness support
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Badge className="bg-primary/10 text-primary border-primary/20">
            <Sparkles className="w-3 h-3 mr-1" />
            AI-Powered
          </Badge>
          <Badge variant="secondary">
            <Zap className="w-3 h-3 mr-1" />
            Always Learning
          </Badge>
        </div>
      </div>

      {/* Chat Interface */}
      <div className="flex-1 flex flex-col lg:flex-row gap-6">
        {/* Main Chat */}
        <Card className="flex-1 card-gradient flex flex-col">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <MessageCircle className="w-5 h-5" />
              Chat with Zenith
            </CardTitle>
            <CardDescription>
              Ask me anything about studying, wellness, or academic topics
            </CardDescription>
          </CardHeader>
          
          <CardContent className="flex-1 flex flex-col p-0">
            {/* Messages */}
            <ScrollArea className="flex-1 px-6">
              <div className="space-y-4 pb-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${
                      message.role === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    {message.role === 'assistant' && (
                      <Avatar className="w-8 h-8 mt-1">
                        <AvatarFallback className="gradient-primary text-white text-sm">
                          AI
                        </AvatarFallback>
                      </Avatar>
                    )}
                    
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.role === 'user'
                          ? 'bg-primary text-primary-foreground ml-12'
                          : 'bg-muted mr-12'
                      }`}
                    >
                      <div className="whitespace-pre-wrap text-sm">
                        {message.content}
                      </div>
                      <div className="flex items-center justify-between mt-2 text-xs opacity-70">
                        <span>{message.timestamp.toLocaleTimeString()}</span>
                        {message.role === 'assistant' && (
                          <div className="flex gap-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0"
                              onClick={() => copyMessage(message.content)}
                            >
                              <Copy className="w-3 h-3" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0"
                            >
                              <ThumbsUp className="w-3 h-3" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {message.role === 'user' && (
                      <Avatar className="w-8 h-8 mt-1">
                        <AvatarFallback>
                          <User className="w-4 h-4" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex gap-3 justify-start">
                    <Avatar className="w-8 h-8 mt-1">
                      <AvatarFallback className="gradient-primary text-white text-sm">
                        <Bot className="w-4 h-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="bg-muted rounded-lg p-3">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div ref={messagesEndRef} />
            </ScrollArea>
            
            {/* Input */}
            <div className="p-6 border-t">
              <div className="flex gap-2">
                <Input
                  ref={inputRef}
                  placeholder="Ask me about studying, wellness, or any academic topic..."
                  value={currentMessage}
                  onChange={(e) => setCurrentMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1"
                />
                <Button 
                  onClick={handleSendMessage}
                  disabled={!currentMessage.trim() || isTyping}
                  className="gradient-primary text-white"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sidebar */}
        <div className="w-full lg:w-80 space-y-6">
          {/* Quick Prompts */}
          <Card className="card-gradient">
            <CardHeader>
              <CardTitle className="text-lg">Quick Prompts</CardTitle>
              <CardDescription>Try these common questions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {quickPrompts.map((prompt, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full justify-start text-left h-auto p-3"
                  onClick={() => handleQuickPrompt(prompt.text)}
                >
                  <prompt.icon className={`w-4 h-4 mr-2 ${
                    prompt.type === 'academic' ? 'text-primary' :
                    prompt.type === 'wellness' ? 'text-wellness' :
                    'text-secondary'
                  }`} />
                  <span className="text-sm">{prompt.text}</span>
                </Button>
              ))}
            </CardContent>
          </Card>

          {/* AI Capabilities */}
          <Card className="card-gradient border-primary/20">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                What I Can Help With
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-3 p-3 rounded-lg bg-primary/5 border border-primary/20">
                <BookOpen className="w-4 h-4 text-primary mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Academic Support</p>
                  <p className="text-xs text-muted-foreground">
                    Study strategies, concept explanations, exam prep
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-3 rounded-lg bg-wellness/5 border border-wellness/20">
                <Heart className="w-4 h-4 text-wellness mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Wellness Guidance</p>
                  <p className="text-xs text-muted-foreground">
                    Stress management, motivation, work-life balance
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-3 rounded-lg bg-secondary/5 border border-secondary/20">
                <Brain className="w-4 h-4 text-secondary mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Learning Optimization</p>
                  <p className="text-xs text-muted-foreground">
                    Memory techniques, focus improvement, productivity
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Usage Stats */}
          <Card className="card-gradient">
            <CardHeader>
              <CardTitle className="text-lg">Today's Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Questions Asked</span>
                <span className="font-medium">{messages.filter(m => m.role === 'user').length}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Academic Topics</span>
                <span className="font-medium">{messages.filter(m => m.type === 'academic').length}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Wellness Support</span>
                <span className="font-medium">{messages.filter(m => m.type === 'wellness').length}</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2 mt-3">
                <div className="gradient-primary h-2 rounded-full" style={{ width: '65%' }}></div>
              </div>
              <p className="text-xs text-muted-foreground text-center">
                65% of daily AI limit used
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}