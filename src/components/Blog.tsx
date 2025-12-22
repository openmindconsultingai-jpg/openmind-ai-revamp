import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import BlogArticleCard from './BlogArticleCard';
import BlogArticle from './BlogArticle';
import VideoSectionBackground from '@/components/VideoSectionBackground';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Blog = () => {
  const { t } = useLanguage();
  const [selectedArticle, setSelectedArticle] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const articles = Array.from({ length: 30 }, (_, i) => ({
    id: i + 1,
    titleKey: `blog.article${i + 1}.title`,
    excerptKey: `blog.article${i + 1}.excerpt`,
    contentKey: `blog.article${i + 1}.content`,
  }));

  useEffect(() => {
    if (selectedArticle !== null) return;

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
  }, [selectedArticle]);

  if (selectedArticle !== null) {
    const article = articles.find(a => a.id === selectedArticle);
    if (article) {
      return (
        <section className="pt-32 pb-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <BlogArticle
              titleKey={article.titleKey}
              contentKey={article.contentKey}
              articleId={article.id}
              onBack={() => setSelectedArticle(null)}
            />
          </div>
        </section>
      );
    }
  }

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
              onClick={() => setSelectedArticle(article.id)} 
              className="blog-card cursor-pointer transition-transform duration-300 hover:-translate-y-2"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <BlogArticleCard
                titleKey={article.titleKey}
                excerptKey={article.excerptKey}
                articleId={article.id}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
