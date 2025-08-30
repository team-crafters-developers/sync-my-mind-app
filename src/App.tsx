import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "./components/layout/AppLayout";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Notes from "./pages/Notes";
import Wellness from "./pages/Wellness";
import AIAssistant from "./pages/AIAssistant";
import Tests from "./pages/Tests";
import Premium from "./pages/Premium";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<AppLayout><Dashboard /></AppLayout>} />
          <Route path="/notes" element={<AppLayout><Notes /></AppLayout>} />
          <Route path="/wellness" element={<AppLayout><Wellness /></AppLayout>} />
          <Route path="/ai-assistant" element={<AppLayout><AIAssistant /></AppLayout>} />
          <Route path="/tests" element={<AppLayout><Tests /></AppLayout>} />
          <Route path="/premium" element={<AppLayout><Premium /></AppLayout>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
