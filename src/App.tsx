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

const Home = lazy(() => import("./pages/Home"));
const ServicesHubPage = lazy(() => import("./pages/ServicesHubPage"));
const ServiceLandingPage = lazy(() => import("./pages/ServiceLandingPage"));
const AboutPage = lazy(() => import("./pages/About"));
const BlogPage = lazy(() => import("./pages/Blog"));
const BlogArticlePage = lazy(() => import("./pages/BlogArticle"));
const ContactPage = lazy(() => import("./pages/Contact"));
const PrivacyPage = lazy(() => import("./pages/Privacy"));
const AIAdvisorPage = lazy(() => import("./pages/AIAdvisor"));
const VoivodeshipDetail = lazy(() => import("./pages/VoivodeshipDetail"));
const CityDetail = lazy(() => import("./pages/CityDetail"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const PageLoader = () => (
  <div className="min-h-screen bg-background flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

// Flat service slugs — each gets `/slug` and `/slug.html` route.
// 9 core services + 9 industry-specific training landing pages.
const SERVICE_SLUGS = [
  'automatyzacja-ai',
  'szkolenia-ai',
  'szkolenia-ai-stacjonarne',
  'szkolenia-ai-online',
  'szkolenia-ai-indywidualne',
  'ai-dla-szkol',
  'teledyski-ai',
  'strony-www-branding',
  'konsultacje-ai',
  'zakladanie-firmy-z-ai',
  // Industry-specific training pages
  'szkolenia-ai-dla-lekarzy',
  'szkolenia-ai-dla-prawnikow',
  'szkolenia-ai-dla-jdg',
  'szkolenia-ai-dla-msp',
  'szkolenia-ai-dla-korporacji',
  'szkolenia-ai-dla-marketingu',
  'szkolenia-ai-dla-ksiegowych',
  'szkolenia-ai-dla-hr',
  'szkolenia-ai-dla-urzedow',
  'szkolenia-microsoft-copilot',
  'szkolenia-ai-dla-nieruchomosci',
  'szkolenia-ai-dla-ecommerce',
  'szkolenia-ai-dla-gastronomii-hotelarstwa',
  'szkolenia-ai-dla-budownictwa',
  'szkolenia-ai-dla-logistyki',
  'szkolenia-ai-dla-produkcji',
  'szkolenia-ai-dla-beauty-wellness',
  'szkolenia-ai-dla-rolnictwa',
  'szkolenia-ai-dla-ngo',
  'szkolenia-ai-dla-turystyki',
  'szkolenia-ai-dla-programistow',
  'szkolenia-ai-dla-psychologow',
  'szkolenia-ai-dla-fizjoterapeutow',
  'szkolenia-ai-dla-weterynarzy',
  'szkolenia-ai-dla-fotografow',
  'szkolenia-ai-dla-muzykow',
  'szkolenia-ai-dla-ubezpieczen',
  'szkolenia-ai-dla-motoryzacji',
  'szkolenia-ai-dla-szkol-jezykowych',
  'szkolenia-ai-dla-coachow',
] as const;

const wrap = (el: React.ReactNode) => <Suspense fallback={<PageLoader />}>{el}</Suspense>;

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
            <Route path="/" element={wrap(<Home />)} />

            {/* Services hub */}
            <Route path="/services" element={wrap(<ServicesHubPage />)} />
            <Route path="/services.html" element={wrap(<ServicesHubPage />)} />

            {/* 9 flat SEO landing pages (each with .html variant) */}
            {SERVICE_SLUGS.map((slug) => (
              <Route
                key={slug}
                path={`/${slug}`}
                element={wrap(<ServiceLandingPage slugOverride={slug} />)}
              />
            ))}
            {SERVICE_SLUGS.map((slug) => (
              <Route
                key={`${slug}-html`}
                path={`/${slug}.html`}
                element={wrap(<ServiceLandingPage slugOverride={slug} />)}
              />
            ))}

            {/* Legacy service URLs → redirect to new flat structure */}
            <Route path="/services/:serviceSlug" element={<RedirectWithSeo to="/services.html" />} />
            <Route path="/szkolenia-ai/dla-firm" element={<RedirectWithSeo to="/szkolenia-ai-stacjonarne.html" />} />
            <Route path="/szkolenia-ai/dla-firm.html" element={<RedirectWithSeo to="/szkolenia-ai-stacjonarne.html" />} />
            <Route path="/szkolenia-ai/dla-szkol" element={<RedirectWithSeo to="/ai-dla-szkol.html" />} />
            <Route path="/szkolenia-ai/dla-szkol.html" element={<RedirectWithSeo to="/ai-dla-szkol.html" />} />
            <Route path="/szkolenia-ai/chatgpt" element={<RedirectWithSeo to="/szkolenia-ai-online.html" />} />
            <Route path="/szkolenia-ai/chatgpt.html" element={<RedirectWithSeo to="/szkolenia-ai-online.html" />} />

            <Route path="/about" element={wrap(<AboutPage />)} />
            <Route path="/about.html" element={wrap(<AboutPage />)} />
            <Route path="/blog" element={wrap(<BlogPage />)} />
            <Route path="/blog.html" element={wrap(<BlogPage />)} />
            <Route path="/blog/:id" element={wrap(<BlogArticlePage />)} />
            <Route path="/contact" element={wrap(<ContactPage />)} />
            <Route path="/contact.html" element={wrap(<ContactPage />)} />
            <Route path="/privacy" element={wrap(<PrivacyPage />)} />
            <Route path="/privacy.html" element={wrap(<PrivacyPage />)} />

            {/* Legacy PL/EN redirects */}
            <Route path="/polityka-prywatnosci-i-bezpieczenstwo-danych" element={<RedirectWithSeo to="/privacy.html" />} />
            <Route path="/polityka-prywatnosci-i-bezpieczenstwa-danych" element={<RedirectWithSeo to="/privacy.html" />} />
            <Route path="/o-nas" element={<RedirectWithSeo to="/about.html" />} />
            <Route path="/kontakt" element={<RedirectWithSeo to="/contact.html" />} />
            <Route path="/oferta" element={<RedirectWithSeo to="/services.html" />} />
            <Route path="/en/o-nas-en" element={<RedirectWithSeo to="/about.html" />} />
            <Route path="/en/kontakt-en" element={<RedirectWithSeo to="/contact.html" />} />
            <Route path="/en/oferta-en" element={<RedirectWithSeo to="/services.html" />} />

            <Route path="/ai-advisor" element={wrap(<AIAdvisorPage />)} />
            <Route path="/ai-advisor.html" element={wrap(<AIAdvisorPage />)} />
            <Route path="/gdzie-dzialamy/:slug" element={wrap(<VoivodeshipDetail />)} />
            <Route path="/gdzie-dzialamy/:slug.html" element={wrap(<VoivodeshipDetail />)} />
            <Route path="/gdzie-dzialamy/:slug/:citySlug" element={wrap(<CityDetail />)} />
            <Route path="/gdzie-dzialamy/:slug/:citySlug.html" element={wrap(<CityDetail />)} />

            <Route path="*" element={wrap(<NotFound />)} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
      </VideoProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
