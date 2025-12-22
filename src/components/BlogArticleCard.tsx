import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface BlogArticleCardProps {
  titleKey: string;
  excerptKey: string;
  articleId: number;
  publishDate?: Date;
}

const BlogArticleCard = ({ titleKey, excerptKey, articleId, publishDate }: BlogArticleCardProps) => {
  const { t, language } = useLanguage();

  const formatDate = (date: Date) => {
    return date.toLocaleDateString(language === 'pl' ? 'pl-PL' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Card className="p-6 hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10">
      {publishDate && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
          <Calendar className="w-4 h-4" />
          <span>{formatDate(publishDate)}</span>
        </div>
      )}
      
      <h3 className="text-2xl font-bold mb-4 text-foreground">
        {t(titleKey)}
      </h3>
      
      <p className="text-muted-foreground mb-6 line-clamp-3">
        {t(excerptKey)}
      </p>
      
      <Button 
        variant="outline" 
        className="w-full group"
      >
        {t('blog.readMore')}
      </Button>
    </Card>
  );
};

export default BlogArticleCard;
