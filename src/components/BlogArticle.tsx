import { Card } from '@/components/ui/card';
import { Calendar, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

interface BlogArticleProps {
  titleKey: string;
  dateKey: string;
  contentKey: string;
  articleId: number;
  onBack: () => void;
}

const BlogArticle = ({ titleKey, dateKey, contentKey, articleId, onBack }: BlogArticleProps) => {
  const { t } = useLanguage();
  
  // Split content by newlines and handle markdown-like formatting
  const formatContent = (content: string) => {
    const paragraphs = content.split('\n\n');
    
    return paragraphs.map((paragraph, index) => {
      // Handle headers (lines starting with **)
      if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
        const text = paragraph.replace(/\*\*/g, '');
        return (
          <h3 key={index} className="text-xl font-bold mt-6 mb-3 text-foreground">
            {text}
          </h3>
        );
      }
      
      // Handle list items (lines starting with -)
      if (paragraph.includes('\n-')) {
        const lines = paragraph.split('\n');
        const title = lines[0];
        const items = lines.slice(1).filter(line => line.trim().startsWith('-'));
        
        return (
          <div key={index} className="mb-4">
            {title && <p className="text-muted-foreground mb-2">{title}</p>}
            <ul className="list-disc list-inside space-y-2 ml-4">
              {items.map((item, i) => {
                const text = item.replace(/^-\s*/, '').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
                return (
                  <li key={i} className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: text }} />
                );
              })}
            </ul>
          </div>
        );
      }
      
      // Handle numbered lists
      if (/^\d+\./.test(paragraph)) {
        const lines = paragraph.split('\n').filter(line => /^\d+\./.test(line.trim()));
        return (
          <ol key={index} className="list-decimal list-inside space-y-2 ml-4 mb-4">
            {lines.map((item, i) => {
              const text = item.replace(/^\d+\.\s*/, '').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
              return (
                <li key={i} className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: text }} />
              );
            })}
          </ol>
        );
      }
      
      // Regular paragraphs with bold text support
      const formattedText = paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      return (
        <p key={index} className="text-muted-foreground mb-4 leading-relaxed" dangerouslySetInnerHTML={{ __html: formattedText }} />
      );
    });
  };

  return (
    <div id={`article-${articleId}`} className="max-w-4xl mx-auto">
      <Button 
        onClick={onBack}
        variant="ghost" 
        className="mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Powrót do listy artykułów
      </Button>
      
      <Card className="p-8">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <Calendar className="w-4 h-4" />
          <span>{t(dateKey)}</span>
        </div>
        
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
          {t(titleKey)}
        </h1>
        
        <div className="prose prose-lg max-w-none">
          {formatContent(t(contentKey))}
        </div>
      </Card>
    </div>
  );
};

export default BlogArticle;
