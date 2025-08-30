import { useState, useEffect } from "react";
import { Home, BookOpen, Heart, MessageCircle, TestTube, Crown, User, Settings, Brain, Target, TrendingUp } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarHeader, SidebarFooter, useSidebar } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { mockUser } from "@/data/mockData";
const navigationItems = [{
  title: "Dashboard",
  url: "/dashboard",
  icon: Home,
  badge: null
}, {
  title: "Notes",
  url: "/notes",
  icon: BookOpen,
  badge: "AI"
}, {
  title: "Wellness",
  url: "/wellness",
  icon: Heart,
  badge: null
}, {
  title: "AI Assistant",
  url: "/ai-assistant",
  icon: MessageCircle,
  badge: "Zenith"
}, {
  title: "Tests",
  url: "/tests",
  icon: TestTube,
  badge: "New"
}, {
  title: "Premium Hub",
  url: "/premium",
  icon: Crown,
  badge: "Pro"
}];
const bottomItems = [{
  title: "Profile",
  url: "/profile",
  icon: User
}, {
  title: "Settings",
  url: "/settings",
  icon: Settings
}];
export function AppSidebar() {
  const {
    state
  } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const [wellnessScore, setWellnessScore] = useState(85);
  const isCollapsed = state === "collapsed";
  const isActive = (path: string) => currentPath === path;
  const getNavClass = ({
    isActive
  }: {
    isActive: boolean;
  }) => isActive ? "bg-primary text-primary-foreground font-medium shadow-md" : "hover:bg-accent hover:text-accent-foreground transition-colors";

  // Wellness score animation
  useEffect(() => {
    const interval = setInterval(() => {
      setWellnessScore(prev => Math.min(prev + 1, 100));
    }, 2000);
    return () => clearInterval(interval);
  }, []);
  return <Sidebar className={isCollapsed ? "w-16" : "w-72"} collapsible="icon">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl gradient-primary">
            <Brain className="w-6 h-6 text-white" />
          </div>
          {!isCollapsed && <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                MindSync
              </h1>
              <p className="text-xs text-muted-foreground">AI-Powered Learning</p>
            </div>}
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2">
        {/* User Profile Section */}
        <div className="p-3 mb-4 rounded-lg card-gradient">
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10">
              <AvatarImage src={mockUser.avatar} alt={mockUser.name} />
              <AvatarFallback>AC</AvatarFallback>
            </Avatar>
            {!isCollapsed && <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{mockUser.name}</p>
                <p className="text-xs text-muted-foreground truncate">{mockUser.email}</p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-wellness"></div>
                    <span className="text-xs font-medium text-wellness">{wellnessScore}% Wellness</span>
                  </div>
                  <Badge variant="secondary" className="text-xs px-1">
                    7-day streak
                  </Badge>
                </div>
              </div>}
          </div>
        </div>

        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map(item => <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="h-11">
                    <NavLink to={item.url} className={getNavClass}>
                      <item.icon className="w-5 h-5" />
                      {!isCollapsed && <div className="flex items-center justify-between flex-1">
                          <span className="font-medium text-zinc-950">{item.title}</span>
                          {item.badge && <Badge variant={item.badge === "Pro" ? "default" : "secondary"} className={`text-xs px-2 ${item.badge === "Pro" ? "gradient-primary text-white" : ""} ${item.badge === "AI" ? "bg-academic text-academic-foreground" : ""}`}>
                              {item.badge}
                            </Badge>}
                        </div>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Study Stats Mini Widget */}
        {!isCollapsed && <div className="mt-4 p-3 rounded-lg bg-gradient-to-br from-academic/10 to-wellness/10 border border-primary/20">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Today's Progress</span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Study Goal</span>
                <span className="font-medium">3.5h / 6h</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="gradient-academic h-2 rounded-full transition-all duration-500" style={{
              width: '58%'
            }}></div>
              </div>
              <div className="flex items-center gap-1 text-xs text-wellness">
                <TrendingUp className="w-3 h-3" />
                <span>On track for weekly goal!</span>
              </div>
            </div>
          </div>}
      </SidebarContent>

      <SidebarFooter className="p-2">
        <SidebarMenu>
          {bottomItems.map(item => <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <NavLink to={item.url} className={getNavClass}>
                  <item.icon className="w-5 h-5" />
                  {!isCollapsed && <span>{item.title}</span>}
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>)}
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>;
}