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
import HtmlUrlRedirect from "@/components/HtmlUrlRedirect";

const Home = lazy(() => import("./pages/Home"));
const HomeTower = lazy(() => import("./pages/HomeTower"));
const ServicesHubPage = lazy(() => import("./pages/ServicesHubPage"));
const ServiceLandingPage = lazy(() => import("./pages/ServiceLandingPage"));
const AboutPage = lazy(() => import("./pages/About"));
const BlogPage = lazy(() => import("./pages/Blog"));
const BlogArticlePage = lazy(() => import("./pages/BlogArticle"));
const NewsPage = lazy(() => import("./pages/News"));
const NewsArticlePage = lazy(() => import("./pages/NewsArticle"));
const ContactPage = lazy(() => import("./pages/Contact"));
const PrivacyPage = lazy(() => import("./pages/Privacy"));
const AIAdvisorPage = lazy(() => import("./pages/AIAdvisor"));
const VoivodeshipDetail = lazy(() => import("./pages/VoivodeshipDetail"));
const CityDetail = lazy(() => import("./pages/CityDetail"));
const LocationsPage = lazy(() => import("./pages/Locations"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const PageLoader = () => (
  <div className="min-h-screen bg-background flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

// Public flat service routes; HTML aliases are handled by HtmlUrlRedirect.
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
          <HtmlUrlRedirect><Routes>
            <Route path="/" element={wrap(<Home />)} />
            <Route path="/wariant-tower" element={wrap(<HomeTower />)} />

            {/* Services hub */}
            <Route path="/services" element={wrap(<ServicesHubPage />)} />

            {/* 9 flat SEO landing pages (clean URLs) */}
            {SERVICE_SLUGS.map((slug) => (
              <Route
                key={slug}
                path={`/${slug}`}
                element={wrap(<ServiceLandingPage slugOverride={slug} />)}
              />
            ))}

            {/* Legacy service URLs → redirect to new flat structure */}
            <Route path="/services/konsulting-ai" element={wrap(<ServiceLandingPage slugOverride="konsultacje-ai" />)} />
            <Route path="/services/szkolenia-ai" element={wrap(<ServiceLandingPage slugOverride="szkolenia-ai" />)} />
            <Route path="/services/automatyzacja-ai" element={wrap(<ServiceLandingPage slugOverride="automatyzacja-ai" />)} />
            <Route path="/services/agencja-kreatywna-ai" element={wrap(<ServiceLandingPage slugOverride="teledyski-ai" />)} />
            <Route path="/services/ai-dla-szkol" element={wrap(<ServiceLandingPage slugOverride="ai-dla-szkol" />)} />
            <Route path="/services/tworzenie-stron-www" element={wrap(<ServiceLandingPage slugOverride="strony-www-branding" />)} />
            <Route path="/services/:serviceSlug" element={<RedirectWithSeo to="/services" />} />
            <Route path="/szkolenia-ai/dla-firm" element={<RedirectWithSeo to="/szkolenia-ai-stacjonarne" />} />
            <Route path="/szkolenia-ai/dla-szkol" element={<RedirectWithSeo to="/ai-dla-szkol" />} />
            <Route path="/szkolenia-ai/chatgpt" element={<RedirectWithSeo to="/szkolenia-ai-online" />} />

            <Route path="/about" element={wrap(<AboutPage />)} />
            <Route path="/blog" element={wrap(<BlogPage />)} />
            <Route path="/blog/:id" element={wrap(<BlogArticlePage />)} />
            <Route path="/aktualnosci" element={wrap(<NewsPage />)} />
            <Route path="/aktualnosci/:slug" element={wrap(<NewsArticlePage />)} />
            <Route path="/contact" element={wrap(<ContactPage />)} />
            <Route path="/privacy" element={wrap(<PrivacyPage />)} />

            {/* Legacy PL/EN redirects */}
            <Route path="/polityka-prywatnosci-i-bezpieczenstwo-danych" element={<RedirectWithSeo to="/privacy" />} />
            <Route path="/polityka-prywatnosci-i-bezpieczenstwa-danych" element={<RedirectWithSeo to="/privacy" />} />
            <Route path="/o-nas" element={<RedirectWithSeo to="/about" />} />
            <Route path="/kontakt" element={<RedirectWithSeo to="/contact" />} />
            <Route path="/oferta" element={<RedirectWithSeo to="/services" />} />
            <Route path="/en/o-nas-en" element={<RedirectWithSeo to="/about" />} />
            <Route path="/en/kontakt-en" element={<RedirectWithSeo to="/contact" />} />
            <Route path="/en/oferta-en" element={<RedirectWithSeo to="/services" />} />

            <Route path="/ai-advisor" element={wrap(<AIAdvisorPage />)} />
            <Route path="/gdzie-dzialamy/:slug" element={wrap(<VoivodeshipDetail />)} />
            <Route path="/gdzie-dzialamy/:slug/:citySlug" element={wrap(<CityDetail />)} />
            <Route path="/lokalizacje" element={wrap(<LocationsPage />)} />

            <Route path="*" element={wrap(<NotFound />)} />
          </Routes></HtmlUrlRedirect>
        </BrowserRouter>
      </TooltipProvider>
      </VideoProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
