import { useEffect, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import BlogArticleCard from './BlogArticleCard';
import VideoSectionBackground from '@/components/VideoSectionBackground';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Blog = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  // Generowanie dat: artykuły 31-60 (z drugiej bazy) = 27.11-22.12, artykuły 1-30 (z pierwszej bazy) = 1.09-26.11
  const generatePublishDate = (articleId: number) => {
    if (articleId >= 31 && articleId <= 60) {
      // Artykuły 31-60: daty od 27 listopada do 22 grudnia 2025 (najnowsze)
      const startDate = new Date('2025-11-27');
      const endDate = new Date('2025-12-22');
      const totalDays = Math.floor((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
      const dayStep = totalDays / 29; // 30 artykułów, 29 przerw
      const index = articleId - 31; // 0-29
      const publishDate = new Date(startDate);
      publishDate.setDate(publishDate.getDate() + Math.floor(index * dayStep));
      return publishDate;
    } else {
      // Artykuły 1-30: daty od 1 września do 26 listopada 2025 (starsze)
      const startDate = new Date('2025-09-01');
      const endDate = new Date('2025-11-26');
      const totalDays = Math.floor((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
      const dayStep = totalDays / 29; // 30 artykułów, 29 przerw
      const index = articleId - 1; // 0-29
      const publishDate = new Date(startDate);
      publishDate.setDate(publishDate.getDate() + Math.floor(index * dayStep));
      return publishDate;
    }
  };

  const formatDate = (date: Date, lang: string) => {
    return date.toLocaleDateString(lang === 'pl' ? 'pl-PL' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const articles = Array.from({ length: 60 }, (_, i) => ({
    id: i + 1,
    titleKey: `blog.article${i + 1}.title`,
    excerptKey: `blog.article${i + 1}.excerpt`,
    contentKey: `blog.article${i + 1}.content`,
    publishDate: generatePublishDate(i + 1),
  })).sort((a, b) => b.publishDate.getTime() - a.publishDate.getTime());

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Cards stagger animation
      gsap.fromTo(
        '.blog-card',
        { opacity: 0, y: 80, rotateX: 10 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="pt-20 md:pt-24 pb-20 px-4 relative overflow-hidden">
      <VideoSectionBackground opacity={0.6} blurPx={3} overlayOpacity={0.45} />

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute w-[600px] h-[600px] rounded-full opacity-10"
          style={{
            background: 'radial-gradient(circle, hsl(176 100% 43% / 0.3) 0%, transparent 70%)',
            left: '-10%',
            top: '20%',
          }}
        />
        <div 
          className="absolute w-[500px] h-[500px] rounded-full opacity-10"
          style={{
            background: 'radial-gradient(circle, hsl(190 100% 50% / 0.3) 0%, transparent 70%)',
            right: '-5%',
            bottom: '10%',
          }}
        />
      </div>

      <div className="container mx-auto max-w-6xl relative">
        <div ref={headerRef} className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-gradient text-glow">{t('nav.blog')}</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('blog.subtitle')}
          </p>
        </div>

        <div ref={cardsRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" style={{ perspective: '1000px' }}>
          {articles.map((article) => (
            <div 
              key={article.id} 
              onClick={() => navigate(`/blog/${article.id}`)} 
              className="blog-card cursor-pointer transition-transform duration-300 hover:-translate-y-2"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <BlogArticleCard
                titleKey={article.titleKey}
                excerptKey={article.excerptKey}
                articleId={article.id}
                publishDate={article.publishDate}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
