import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface VideoFile {
  name: string;
  url: string;
}

interface VideoContextValue {
  videos: VideoFile[];
  isLoading: boolean;
  getVideoForSection: (sectionId: string) => VideoFile | null;
}

const VideoContext = createContext<VideoContextValue | null>(null);

export const VideoProvider = ({ children }: { children: ReactNode }) => {
  const [videos, setVideos] = useState<VideoFile[]>([]);
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

        // Shuffle videos randomly on load
        const shuffled = [...videoFiles].sort(() => Math.random() - 0.5);
        setVideos(shuffled);
      } catch (err) {
        console.error('Error fetching videos:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVideos();
  }, []);

  // Deterministic selection based on section ID
  const getVideoForSection = (sectionId: string): VideoFile | null => {
    if (videos.length === 0) return null;
    
    let hash = 0;
    for (let i = 0; i < sectionId.length; i++) {
      hash = (hash << 5) - hash + sectionId.charCodeAt(i);
      hash |= 0;
    }
    const idx = Math.abs(hash) % videos.length;
    return videos[idx];
  };

  return (
    <VideoContext.Provider value={{ videos, isLoading, getVideoForSection }}>
      {children}
    </VideoContext.Provider>
  );
};

export const useVideoContext = () => {
  const context = useContext(VideoContext);
  if (!context) {
    throw new Error('useVideoContext must be used within VideoProvider');
  }
  return context;
};

// For hero - returns first video and cycling capability
export const useHeroVideos = () => {
  const { videos, isLoading } = useVideoContext();
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentVideo = videos.length > 0 ? videos[currentIndex] : null;

  const getNextVideo = () => {
    if (videos.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % videos.length);
  };

  return { videos, currentVideo, isLoading, getNextVideo };
};
