import { memo, useMemo } from 'react';
import { Search, X, Tag } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';

interface BlogSearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
  categories: string[];
  resultCount: number;
}

const BlogSearch = memo(({ 
  searchQuery, 
  onSearchChange, 
  selectedCategory, 
  onCategoryChange,
  categories,
  resultCount
}: BlogSearchProps) => {
  const { language } = useLanguage();
  
  const placeholderText = language === 'pl' 
    ? 'Szukaj artykułów...' 
    : 'Search articles...';
  
  const allText = language === 'pl' ? 'Wszystkie' : 'All';
  const resultsText = language === 'pl' 
    ? `${resultCount} ${resultCount === 1 ? 'artykuł' : resultCount < 5 ? 'artykuły' : 'artykułów'}`
    : `${resultCount} ${resultCount === 1 ? 'article' : 'articles'}`;

  return (
    <div className="mb-10 space-y-6">
      {/* Search Input */}
      <div className="relative max-w-xl mx-auto">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          type="text"
          placeholder={placeholderText}
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-12 pr-12 h-14 text-lg bg-background/50 border-border/50 focus:border-primary/50 transition-colors"
        />
        {searchQuery && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
            onClick={() => onSearchChange('')}
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>

      {/* Categories */}
      <div className="flex flex-wrap justify-center gap-2">
        <Badge
          variant={selectedCategory === null ? "default" : "outline"}
          className="cursor-pointer px-4 py-2 text-sm transition-all hover:scale-105"
          onClick={() => onCategoryChange(null)}
        >
          <Tag className="w-3 h-3 mr-1.5" />
          {allText}
        </Badge>
        {categories.map((category) => (
          <Badge
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            className="cursor-pointer px-4 py-2 text-sm transition-all hover:scale-105"
            onClick={() => onCategoryChange(category)}
          >
            {category}
          </Badge>
        ))}
      </div>

      {/* Results count */}
      <p className="text-center text-sm text-muted-foreground">
        {resultsText}
      </p>
    </div>
  );
});

BlogSearch.displayName = 'BlogSearch';

export default BlogSearch;
