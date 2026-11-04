import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/types';

export type NewsRow = Tables<'news'>;

export interface LocalizedNews {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  imageUrl: string | null;
  publishedAt: string | null;
}

const pick = (en: string | null | undefined, pl: string | null | undefined, language: string) =>
  language === 'en' && en && en.trim() ? en : pl ?? '';

export const localizeNews = (row: NewsRow, language: string): LocalizedNews => ({
  id: row.id,
  slug: row.slug,
  title: pick(row.title_en, row.title_pl, language),
  excerpt: pick(row.excerpt_en, row.excerpt_pl, language),
  content: pick(row.content_en, row.content_pl, language),
  category: row.category,
  imageUrl: row.image_url,
  publishedAt: row.published_at ?? row.created_at,
});

export const formatNewsDate = (iso: string | null, language: string) =>
  iso
    ? new Date(iso).toLocaleDateString(language === 'en' ? 'en-GB' : 'pl-PL', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : '';

export const useNewsList = (limit?: number) =>
  useQuery({
    queryKey: ['news', 'list', limit ?? 'all'],
    queryFn: async () => {
      let query = supabase
        .from('news')
        .select('*')
        .eq('published', true)
        .order('published_at', { ascending: false, nullsFirst: false })
        .order('created_at', { ascending: false });
      if (limit) query = query.limit(limit);
      const { data, error } = await query;
      if (error) throw error;
      return data ?? [];
    },
    staleTime: 5 * 60 * 1000,
  });

export const useNewsItem = (slug: string | undefined) =>
  useQuery({
    queryKey: ['news', 'item', slug],
    enabled: !!slug,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .eq('slug', slug!)
        .eq('published', true)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
    staleTime: 5 * 60 * 1000,
  });
