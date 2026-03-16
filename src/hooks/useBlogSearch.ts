import { useState, useMemo, useCallback } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { digestArticles } from '@/data/blogArticlesDigest';

interface Article {
  id: number;
  titleKey: string;
  excerptKey: string;
  contentKey: string;
  publishDate: Date;
  category?: string;
}

// Kategorie artykułów 1-60 oparte na ID
const getArticleCategory = (id: number, lang: 'pl' | 'en'): string => {
  // Articles 61-110 use digestArticles
  const digestArticle = digestArticles.find(a => a.id === id);
  if (digestArticle) {
    return lang === 'pl' ? digestArticle.category.pl : digestArticle.category.en;
  }

  const categories: Record<string, [number, number][]> = {
    'Wideo AI': [[31, 45]],
    'Video AI': [[31, 45]],
    'Obrazy AI': [[46, 55]],
    'Image AI': [[46, 55]],
    'Biznes': [[1, 10], [56, 60]],
    'Business': [[1, 10], [56, 60]],
    'Automatyzacja': [[11, 20]],
    'Automation': [[11, 20]],
    'Edukacja': [[21, 30]],
    'Education': [[21, 30]],
  };

  const langCategories = lang === 'pl' 
    ? ['Wideo AI', 'Obrazy AI', 'Biznes', 'Automatyzacja', 'Edukacja']
    : ['Video AI', 'Image AI', 'Business', 'Automation', 'Education'];

  for (const cat of langCategories) {
    const ranges = categories[cat];
    if (ranges) {
      for (const [start, end] of ranges) {
        if (id >= start && id <= end) {
          return cat;
        }
      }
    }
  }
  
  return lang === 'pl' ? 'Inne' : 'Other';
};

export const useBlogSearch = () => {
  const { t, language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Generowanie dat dla artykułów 1-60
  const generatePublishDate = useCallback((articleId: number) => {
    if (articleId >= 31 && articleId <= 60) {
      const startDate = new Date('2025-11-27');
      const dayStep = 25 / 29;
      const index = articleId - 31;
      const publishDate = new Date(startDate);
      publishDate.setDate(publishDate.getDate() + Math.floor(index * dayStep));
      return publishDate;
    } else {
      const startDate = new Date('2025-09-01');
      const dayStep = 86 / 29;
      const index = articleId - 1;
      const publishDate = new Date(startDate);
      publishDate.setDate(publishDate.getDate() + Math.floor(index * dayStep));
      return publishDate;
    }
  }, []);

  // Wszystkie artykuły (1-60 + 61-110)
  const allArticles = useMemo(() => {
    const oldArticles = Array.from({ length: 60 }, (_, i) => ({
      id: i + 1,
      titleKey: `blog.article${i + 1}.title`,
      excerptKey: `blog.article${i + 1}.excerpt`,
      contentKey: `blog.article${i + 1}.content`,
      publishDate: generatePublishDate(i + 1),
      category: getArticleCategory(i + 1, language),
    }));

    const newArticles = digestArticles.map(da => ({
      id: da.id,
      titleKey: `blog.article${da.id}.title`,
      excerptKey: `blog.article${da.id}.excerpt`,
      contentKey: `blog.article${da.id}.content`,
      publishDate: new Date(da.date),
      category: language === 'pl' ? da.category.pl : da.category.en,
    }));

    return [...oldArticles, ...newArticles]
      .sort((a, b) => b.publishDate.getTime() - a.publishDate.getTime());
  }, [generatePublishDate, language]);

  // Kategorie — include new ones from digest
  const categories = useMemo(() => {
    return language === 'pl'
      ? ['Wideo AI', 'Obrazy AI', 'Biznes', 'Automatyzacja', 'Edukacja', 'LLM', 'Hardware', 'Agenci AI', 'Regulacje', 'Inwestycje', 'Audio', 'Badania', 'Zastosowania']
      : ['Video AI', 'Image AI', 'Business', 'Automation', 'Education', 'LLM', 'Hardware', 'AI Agents', 'Regulations', 'Investments', 'Audio', 'Research', 'Applications'];
  }, [language]);

  // Filtrowane artykuły
  const filteredArticles = useMemo(() => {
    let result = allArticles;

    if (selectedCategory) {
      result = result.filter(article => article.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(article => {
        const title = t(article.titleKey).toLowerCase();
        const excerpt = t(article.excerptKey).toLowerCase();
        return title.includes(query) || excerpt.includes(query);
      });
    }

    return result;
  }, [allArticles, selectedCategory, searchQuery, t]);

  const handleSearchChange = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const handleCategoryChange = useCallback((category: string | null) => {
    setSelectedCategory(category);
  }, []);

  return {
    searchQuery,
    selectedCategory,
    categories,
    filteredArticles,
    handleSearchChange,
    handleCategoryChange,
  };
};
