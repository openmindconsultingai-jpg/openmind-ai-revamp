import { lazy, Suspense } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { VideoProvider } from "@/contexts/VideoContext";
import ScrollToTop from "@/components/ScrollToTop";
import RedirectWithSeo from "@/components/RedirectWithSeo";

// Home page also lazy-loaded for code splitting (was eager)
const Home = lazy(() => import("./pages/Home"));

// Lazy load all other pages for code splitting
const ServicesPage = lazy(() => import("./pages/Services"));
const AboutPage = lazy(() => import("./pages/About"));
const BlogPage = lazy(() => import("./pages/Blog"));
const BlogArticlePage = lazy(() => import("./pages/BlogArticle"));
const ContactPage = lazy(() => import("./pages/Contact"));
const PrivacyPage = lazy(() => import("./pages/Privacy"));
const AIAdvisorPage = lazy(() => import("./pages/AIAdvisor"));
const VoivodeshipDetail = lazy(() => import("./pages/VoivodeshipDetail"));
const CityDetail = lazy(() => import("./pages/CityDetail"));
const NotFound = lazy(() => import("./pages/NotFound"));
const TrainingPage = lazy(() => import("./pages/TrainingPage"));

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
            <Route path="/" element={<Suspense fallback={<PageLoader />}><Home /></Suspense>} />
            <Route path="/services" element={<Suspense fallback={<PageLoader />}><ServicesPage /></Suspense>} />
            <Route path="/services.html" element={<Suspense fallback={<PageLoader />}><ServicesPage /></Suspense>} />
            <Route path="/services/:serviceSlug" element={<Suspense fallback={<PageLoader />}><ServicesPage /></Suspense>} />
            <Route path="/about" element={<Suspense fallback={<PageLoader />}><AboutPage /></Suspense>} />
            <Route path="/about.html" element={<Suspense fallback={<PageLoader />}><AboutPage /></Suspense>} />
            <Route path="/blog" element={<Suspense fallback={<PageLoader />}><BlogPage /></Suspense>} />
            <Route path="/blog.html" element={<Suspense fallback={<PageLoader />}><BlogPage /></Suspense>} />
            <Route path="/blog/:id" element={<Suspense fallback={<PageLoader />}><BlogArticlePage /></Suspense>} />
            <Route path="/contact" element={<Suspense fallback={<PageLoader />}><ContactPage /></Suspense>} />
            <Route path="/contact.html" element={<Suspense fallback={<PageLoader />}><ContactPage /></Suspense>} />
            <Route path="/privacy" element={<Suspense fallback={<PageLoader />}><PrivacyPage /></Suspense>} />
            <Route path="/privacy.html" element={<Suspense fallback={<PageLoader />}><PrivacyPage /></Suspense>} />
            {/* 301-style redirects from legacy URLs — RedirectWithSeo sets noindex + canonical for crawlers */}
            <Route path="/polityka-prywatnosci-i-bezpieczenstwo-danych" element={<RedirectWithSeo to="/privacy.html" />} />
            <Route path="/polityka-prywatnosci-i-bezpieczenstwa-danych" element={<RedirectWithSeo to="/privacy.html" />} />
            <Route path="/o-nas" element={<RedirectWithSeo to="/about.html" />} />
            <Route path="/kontakt" element={<RedirectWithSeo to="/contact.html" />} />
            <Route path="/oferta" element={<RedirectWithSeo to="/services.html" />} />
            <Route path="/en/o-nas-en" element={<RedirectWithSeo to="/about.html" />} />
            <Route path="/en/kontakt-en" element={<RedirectWithSeo to="/contact.html" />} />
            <Route path="/en/oferta-en" element={<RedirectWithSeo to="/services.html" />} />
            <Route path="/ai-advisor" element={<Suspense fallback={<PageLoader />}><AIAdvisorPage /></Suspense>} />
            <Route path="/ai-advisor.html" element={<Suspense fallback={<PageLoader />}><AIAdvisorPage /></Suspense>} />
            <Route path="/gdzie-dzialamy/:slug" element={<Suspense fallback={<PageLoader />}><VoivodeshipDetail /></Suspense>} />
            <Route path="/gdzie-dzialamy/:slug.html" element={<Suspense fallback={<PageLoader />}><VoivodeshipDetail /></Suspense>} />
            <Route path="/gdzie-dzialamy/:slug/:citySlug" element={<Suspense fallback={<PageLoader />}><CityDetail /></Suspense>} />
            <Route path="/gdzie-dzialamy/:slug/:citySlug.html" element={<Suspense fallback={<PageLoader />}><CityDetail /></Suspense>} />
            {/* Szkolenia AI — SEO landing pages */}
            <Route path="/szkolenia-ai" element={<Suspense fallback={<PageLoader />}><TrainingPage slugOverride="szkolenia-ai" /></Suspense>} />
            <Route path="/szkolenia-ai.html" element={<Suspense fallback={<PageLoader />}><TrainingPage slugOverride="szkolenia-ai" /></Suspense>} />
            <Route path="/szkolenia-ai/dla-firm" element={<Suspense fallback={<PageLoader />}><TrainingPage slugOverride="szkolenia-ai-dla-firm" /></Suspense>} />
            <Route path="/szkolenia-ai/dla-firm.html" element={<Suspense fallback={<PageLoader />}><TrainingPage slugOverride="szkolenia-ai-dla-firm" /></Suspense>} />
            <Route path="/szkolenia-ai/dla-szkol" element={<Suspense fallback={<PageLoader />}><TrainingPage slugOverride="szkolenia-ai-dla-szkol" /></Suspense>} />
            <Route path="/szkolenia-ai/dla-szkol.html" element={<Suspense fallback={<PageLoader />}><TrainingPage slugOverride="szkolenia-ai-dla-szkol" /></Suspense>} />
            <Route path="/szkolenia-ai/chatgpt" element={<Suspense fallback={<PageLoader />}><TrainingPage slugOverride="szkolenia-chatgpt" /></Suspense>} />
            <Route path="/szkolenia-ai/chatgpt.html" element={<Suspense fallback={<PageLoader />}><TrainingPage slugOverride="szkolenia-chatgpt" /></Suspense>} />
            <Route path="*" element={<Suspense fallback={<PageLoader />}><NotFound /></Suspense>} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
      </VideoProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
