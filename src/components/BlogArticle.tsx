import { Card } from '@/components/ui/card';
import { User, ArrowLeft, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import DOMPurify from 'dompurify';

interface BlogArticleProps {
  titleKey: string;
  contentKey: string;
  articleId: number;
  onBack: () => void;
  publishDate?: Date;
}

const BlogArticle = ({ titleKey, contentKey, articleId, onBack, publishDate }: BlogArticleProps) => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();

  const formatDate = (date: Date) => {
    return date.toLocaleDateString(language === 'pl' ? 'pl-PL' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Sanitize HTML content to prevent XSS attacks
  const sanitizeHtml = (html: string): string => {
    return DOMPurify.sanitize(html, {
      ALLOWED_TAGS: ['strong', 'em', 'b', 'i', 'br'],
      ALLOWED_ATTR: []
    });
  };
  
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
                const sanitizedText = sanitizeHtml(text);
                return (
                  <li key={i} className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: sanitizedText }} />
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
              const sanitizedText = sanitizeHtml(text);
              return (
                <li key={i} className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: sanitizedText }} />
              );
            })}
          </ol>
        );
      }
      
      // Regular paragraphs with bold text support
      const formattedText = paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      const sanitizedText = sanitizeHtml(formattedText);
      return (
        <p key={index} className="text-muted-foreground mb-4 leading-relaxed" dangerouslySetInnerHTML={{ __html: sanitizedText }} />
      );
    });
  };

  const handleBack = () => {
    navigate('/blog');
  };

  return (
    <div id={`article-${articleId}`} className="max-w-4xl mx-auto">
      <Button 
        onClick={handleBack}
        variant="ghost" 
        className="mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        {language === 'pl' ? 'Powrót do listy artykułów' : 'Back to articles'}
      </Button>
      
      <Card className="p-8">
        {publishDate && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(publishDate)}</span>
          </div>
        )}
        
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
          {t(titleKey)}
        </h1>
        
        <div className="prose prose-lg max-w-none">
          {formatContent(t(contentKey))}
        </div>

        {/* Author signature at the bottom */}
        <div className="mt-12 pt-6 border-t border-border">
          <div className="flex items-center gap-3">
            <User className="w-5 h-5 text-primary" />
            <span className="text-foreground font-medium">Łukasz Czarnecki</span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default BlogArticle;
