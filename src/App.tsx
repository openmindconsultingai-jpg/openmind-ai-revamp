import { lazy, Suspense } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { VideoProvider } from "@/contexts/VideoContext";
import ScrollToTop from "@/components/ScrollToTop";

// Critical: Home page loaded immediately
import Home from "./pages/Home";

// Lazy load all other pages for code splitting
const ServicesPage = lazy(() => import("./pages/Services"));
const AboutPage = lazy(() => import("./pages/About"));
const BlogPage = lazy(() => import("./pages/Blog"));
const BlogArticlePage = lazy(() => import("./pages/BlogArticle"));
const ContactPage = lazy(() => import("./pages/Contact"));
const PrivacyPage = lazy(() => import("./pages/Privacy"));
const AIAdvisorPage = lazy(() => import("./pages/AIAdvisor"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

// Minimal loading fallback
const PageLoader = () => (
  <div className="min-h-screen bg-background flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

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
            <Route path="/services" element={<Suspense fallback={<PageLoader />}><ServicesPage /></Suspense>} />
            <Route path="/about" element={<Suspense fallback={<PageLoader />}><AboutPage /></Suspense>} />
            <Route path="/blog" element={<Suspense fallback={<PageLoader />}><BlogPage /></Suspense>} />
            <Route path="/blog/:id" element={<Suspense fallback={<PageLoader />}><BlogArticlePage /></Suspense>} />
            <Route path="/contact" element={<Suspense fallback={<PageLoader />}><ContactPage /></Suspense>} />
            <Route path="/privacy" element={<Suspense fallback={<PageLoader />}><PrivacyPage /></Suspense>} />
            <Route path="/ai-advisor" element={<Suspense fallback={<PageLoader />}><AIAdvisorPage /></Suspense>} />
            <Route path="*" element={<Suspense fallback={<PageLoader />}><NotFound /></Suspense>} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
      </VideoProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
