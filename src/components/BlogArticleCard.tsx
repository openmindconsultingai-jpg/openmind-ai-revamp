import { memo } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface BlogArticleCardProps {
  titleKey: string;
  excerptKey: string;
  articleId: number;
  publishDate?: Date;
  category?: string;
}

const BlogArticleCard = memo(({ titleKey, excerptKey, articleId, publishDate, category }: BlogArticleCardProps) => {
  const { t, language } = useLanguage();

  const formatDate = (date: Date) => {
    return date.toLocaleDateString(language === 'pl' ? 'pl-PL' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Card className="p-6 h-full flex flex-col hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10">
      <div className="flex items-center justify-between gap-2 text-sm text-muted-foreground mb-3">
        {publishDate && (
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(publishDate)}</span>
          </div>
        )}
        {category && (
          <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
            {category}
          </span>
        )}
      </div>
      
      <h3 className="text-xl font-bold mb-4 text-foreground line-clamp-2">
        {t(titleKey)}
      </h3>
      
      <p className="text-muted-foreground mb-6 line-clamp-3 flex-grow">
        {t(excerptKey)}
      </p>
      
      <Button 
        variant="outline" 
        className="w-full"
      >
        {t('blog.readMore')}
      </Button>
    </Card>
  );
});

BlogArticleCard.displayName = 'BlogArticleCard';

export default BlogArticleCard;
