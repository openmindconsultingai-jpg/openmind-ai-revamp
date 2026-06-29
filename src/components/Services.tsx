import { memo, useState, useRef, useEffect } from 'react';
import { Video, Bot, GraduationCap, Globe, ChevronRight, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import serviceVideoCreative from '@/assets/service-video-creative.mp4';
import serviceVideoAutomation from '@/assets/service-video-automation.mp4';
import serviceVideoEducation from '@/assets/service-video-education.mp4';
import serviceVideoWeb from '@/assets/service-video-web.mp4';

import imgCreative from '@/assets/service-media.jpg';
import imgAutomation from '@/assets/service-development.jpg';
import imgEducation from '@/assets/service-academy.jpg';
import imgWeb from '@/assets/service-consulting.jpg';

gsap.registerPlugin(ScrollTrigger);

const SERVICE_IDS = ['creative', 'automation', 'education', 'web'] as const;
type ServiceId = typeof SERVICE_IDS[number];

const SERVICE_VIDEOS: Record<ServiceId, string> = {
  creative: serviceVideoCreative,
  automation: serviceVideoAutomation,
  education: serviceVideoEducation,
  web: serviceVideoWeb,
};

const SERVICE_IMAGES: Record<ServiceId, string> = {
  creative: imgCreative,
  automation: imgAutomation,
  education: imgEducation,
  web: imgWeb,
};

const SERVICE_ACCENT: Record<ServiceId, string> = {
  creative: 'text-rose-400 border-rose-500/40 bg-rose-500/10',
  automation: 'text-violet-400 border-violet-500/40 bg-violet-500/10',
  education: 'text-primary border-primary/40 bg-primary/10',
  web: 'text-emerald-400 border-emerald-500/40 bg-emerald-500/10',
};

const SERVICE_ICONS: Record<ServiceId, React.ReactNode> = {
  creative: <Video className="w-5 h-5" />,
  automation: <Bot className="w-5 h-5" />,
  education: <GraduationCap className="w-5 h-5" />,
  web: <Globe className="w-5 h-5" />,
};

/* ── Main component ── */

interface ServicesProps {
  serviceSlug?: string;
}

const Services = memo(({ serviceSlug }: ServicesProps) => {
  const { t } = useLanguage();
  const resolvedSlug = (serviceSlug && SERVICE_IDS.includes(serviceSlug as ServiceId)) ? serviceSlug as ServiceId : 'creative';
  const [activeTab, setActiveTab] = useState<ServiceId>(resolvedSlug);
  const [eduSubTab, setEduSubTab] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Sync with URL param
  useEffect(() => {
    if (serviceSlug && SERVICE_IDS.includes(serviceSlug as ServiceId)) {
      setActiveTab(serviceSlug as ServiceId);
      setEduSubTab(0);
    }
  }, [serviceSlug]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.service-tab-trigger',
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0,
          stagger: 0.1, duration: 0.6, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Animate content on tab change
  useEffect(() => {
    if (!contentRef.current) return;
    gsap.fromTo(
      contentRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
    );
  }, [activeTab]);

  const handleTabClick = (id: ServiceId) => {
    setActiveTab(id);
    setEduSubTab(0);
    navigate(`/services/${id}`, { replace: true });
  };

  // Build service data from translations
  const getItems = (id: ServiceId): string[] => {
    const keys = ['item1', 'item2', 'item3', 'item4', 'item5'];
    return keys.map(k => t(`services.tab.${id}.${k}`)).filter(v => v && !v.startsWith('services.tab.'));
  };

  const getSubTabs = () => [
    {
      label: t('services.tab.education.sub1.label'),
      items: [
        { title: t('services.tab.education.sub1.item1') },
        { title: t('services.tab.education.sub1.item2') },
        { title: t('services.tab.education.sub1.item3') },
        { title: t('services.tab.education.sub1.item4') },
      ],
    },
    {
      label: t('services.tab.education.sub2.label'),
      items: [
        { title: t('services.tab.education.sub2.item1') },
        { title: t('services.tab.education.sub2.item2') },
        { title: t('services.tab.education.sub2.item3') },
        { title: t('services.tab.education.sub2.item4') },
      ],
    },
    {
      label: t('services.tab.education.sub3.label'),
      accent: true,
      items: [
        { title: t('services.tab.education.sub3.item1'), junior: true },
        { title: t('services.tab.education.sub3.item2'), junior: true },
        { title: t('services.tab.education.sub3.item3'), junior: true },
      ],
    },
  ];

  return (
    <section ref={sectionRef} className="relative py-20 md:py-28 overflow-hidden">
      {/* Background orbs */}
      <div className="absolute top-20 -left-40 w-80 h-80 rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-20 -right-40 w-96 h-96 rounded-full bg-accent/5 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-14 md:mb-18">
          <h1 className="font-heading text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            <span className="text-foreground">{t('services.header.title1')}</span>{' '}
            <span className="text-gradient text-glow">{t('services.header.title2')}</span>
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto">
            {t('services.header.subtitle')}
          </p>
        </div>

        {/* Tab triggers */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 max-w-5xl mx-auto mb-6">
          {SERVICE_IDS.map((id) => {
            const isActive = activeTab === id;
            return (
              <button
                key={id}
                onClick={() => handleTabClick(id)}
                className={`service-tab-trigger group relative rounded-xl overflow-hidden aspect-[4/3] transition-all duration-300 border
                  ${isActive
                    ? 'border-primary/60 shadow-[0_0_30px_hsl(var(--primary)/0.2)] scale-[1.02]'
                    : 'border-border/30 hover:border-primary/30 hover:scale-[1.01]'
                  }`}
              >
                <img
                  src={SERVICE_IMAGES[id]}
                  alt={`${t(`services.tab.${id}.label`)} – usługi sztucznej inteligencji AI OpenMind`}
                  loading="lazy"
                  width="400"
                  height="300"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className={`absolute inset-0 transition-opacity duration-300 ${
                  isActive ? 'bg-background/70' : 'bg-background/80 group-hover:bg-background/65'
                }`} />
                <div className="relative z-10 flex flex-col items-center justify-center h-full p-4 text-center">
                  <h3 className={`font-heading text-sm md:text-base font-semibold transition-colors duration-300
                    ${isActive ? 'text-foreground' : 'text-foreground/70'}`}>
                    {t(`services.tab.${id}.label`)}
                  </h3>
                </div>
                {isActive && (
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-3 h-3 rotate-45 bg-background/90 border-b border-r border-primary/30 z-20" />
                )}
              </button>
            );
          })}
        </div>

        {/* Expanded content */}
        <div
          ref={contentRef}
          key={activeTab}
          className="relative max-w-5xl mx-auto rounded-2xl overflow-hidden border border-border/30"
        >
          {/* Video background */}
          <video
            key={SERVICE_VIDEOS[activeTab]}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            style={{ filter: 'blur(4px)', transform: 'scale(1.05)' }}
          >
            <source src={SERVICE_VIDEOS[activeTab]} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-background/85" />

          {/* Content */}
          <div className="relative z-10 p-6 md:p-10 lg:p-12">
            <div className="flex items-start gap-4 mb-6">
              <div className={`shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${SERVICE_ACCENT[activeTab]}`}>
                {SERVICE_ICONS[activeTab]}
              </div>
              <div>
                <h2 className="font-heading text-xl md:text-2xl lg:text-3xl font-bold text-gradient">
                  {t(`services.tab.${activeTab}.h2`)}
                </h2>
                <p className="text-muted-foreground mt-2 max-w-2xl">
                  {t(`services.tab.${activeTab}.description`)}
                </p>
              </div>
            </div>

            {/* Items (non-education) */}
            {activeTab !== 'education' && (
              <ul className="grid md:grid-cols-2 gap-3 mt-6">
                {getItems(activeTab).map((item, i) => (
                  <li key={i} className="flex items-start gap-3 group/item">
                    <ChevronRight className={`w-5 h-5 shrink-0 mt-0.5 transition-transform group-hover/item:translate-x-1 ${SERVICE_ACCENT[activeTab].split(' ')[0]}`} />
                    <span className="text-foreground/90 text-sm md:text-base">{item}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* Sub-tabs (Education) */}
            {activeTab === 'education' && (
              <div className="mt-6">
                <div className="flex gap-2 mb-6">
                  {getSubTabs().map((st, i) => (
                    <button
                      key={i}
                      onClick={() => setEduSubTab(i)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 border
                        ${st.accent && eduSubTab === i
                          ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-background border-amber-400/50'
                          : eduSubTab === i
                            ? 'bg-primary/20 text-primary border-primary/30'
                            : 'bg-secondary/30 text-muted-foreground border-border/30 hover:border-primary/20'
                        }`}
                    >
                      {st.label}
                    </button>
                  ))}
                </div>
                <div className="grid md:grid-cols-2 gap-3">
                  {getSubTabs()[eduSubTab].items.map((item, i) => (
                    <div
                      key={i}
                      className={`rounded-xl p-4 border transition-all duration-300 ${
                        item.junior
                          ? 'bg-gradient-to-br from-amber-500/10 to-orange-500/5 border-amber-500/20'
                          : 'bg-secondary/30 border-border/30'
                      }`}
                    >
                      <h3 className={`font-heading text-sm md:text-base font-medium ${
                        item.junior ? 'text-amber-300' : 'text-foreground'
                      }`}>
                        {item.title}
                      </h3>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CTA Button */}
            <div className="mt-10 flex justify-center">
              <Link
                to="/contact.html"
                className="group/cta relative inline-flex items-center gap-3 px-8 py-4 rounded-xl font-heading font-semibold text-base md:text-lg
                  bg-primary/10 border border-primary/40 text-primary backdrop-blur-sm
                  hover:bg-primary/20 hover:border-primary/60 hover:shadow-[0_0_40px_hsl(var(--primary)/0.2)]
                  transition-all duration-300"
              >
                {t('services.cta')}
                <ArrowRight className="w-5 h-5 transition-transform group-hover/cta:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

Services.displayName = 'Services';

export default Services;
