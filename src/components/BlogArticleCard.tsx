import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface BlogArticleCardProps {
  titleKey: string;
  dateKey: string;
  excerptKey: string;
  articleId: number;
}

const BlogArticleCard = ({ titleKey, dateKey, excerptKey, articleId }: BlogArticleCardProps) => {
  const { t } = useLanguage();

  const handleReadMore = () => {
    // Scroll to article content (will be implemented with full article view)
    const element = document.getElementById(`article-${articleId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Card className="p-6 hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10">
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
        <Calendar className="w-4 h-4" />
        <span>{t(dateKey)}</span>
      </div>
      
      <h3 className="text-2xl font-bold mb-4 text-foreground">
        {t(titleKey)}
      </h3>
      
      <p className="text-muted-foreground mb-6 line-clamp-3">
        {t(excerptKey)}
      </p>
      
      <Button 
        onClick={handleReadMore}
        variant="outline" 
        className="w-full group"
      >
        {t('blog.readMore')}
      </Button>
    </Card>
  );
};

export default BlogArticleCard;
