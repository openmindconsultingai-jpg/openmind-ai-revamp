import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface VideoFile {
  name: string;
  url: string;
}

export const useHeroVideos = () => {
  const [videos, setVideos] = useState<VideoFile[]>([]);
  const [currentVideo, setCurrentVideo] = useState<VideoFile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const { data, error } = await supabase.storage
          .from('hero')
          .list('', { limit: 100 });

        if (error) throw error;

        const videoFiles = data
          .filter(file => file.name.endsWith('.mp4'))
          .map(file => ({
            name: file.name,
            url: supabase.storage.from('hero').getPublicUrl(file.name).data.publicUrl
          }));

        // Shuffle videos randomly
        const shuffled = [...videoFiles].sort(() => Math.random() - 0.5);
        setVideos(shuffled);
        
        if (shuffled.length > 0) {
          setCurrentVideo(shuffled[0]);
        }
      } catch (err) {
        console.error('Error fetching videos:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVideos();
  }, []);

  const getNextVideo = () => {
    if (videos.length === 0) return;
    
    const currentIndex = videos.findIndex(v => v.url === currentVideo?.url);
    const nextIndex = (currentIndex + 1) % videos.length;
    setCurrentVideo(videos[nextIndex]);
  };

  return { videos, currentVideo, isLoading, getNextVideo };
};
