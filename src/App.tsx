import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { VideoProvider } from "@/contexts/VideoContext";
import ScrollToTop from "@/components/ScrollToTop";
import Home from "./pages/Home";
import ServicesPage from "./pages/Services";
import AboutPage from "./pages/About";
import BlogPage from "./pages/Blog";
import ContactPage from "./pages/Contact";
import PrivacyPage from "./pages/Privacy";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <VideoProvider>
        <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <div 
            className="fixed bottom-4 left-4 z-40 md:bottom-6 md:left-auto md:right-32" 
            dangerouslySetInnerHTML={{ __html: '<elevenlabs-convai agent-id="agent_8601k9t05zq8f5tbghtehtcvpr3n"></elevenlabs-convai>' }} 
          />
        </BrowserRouter>
      </TooltipProvider>
      </VideoProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
