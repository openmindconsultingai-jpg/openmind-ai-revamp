import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface VideoFile {
  name: string;
  url: string;
}

interface VideoContextValue {
  videos: VideoFile[];
  currentVideo: VideoFile | null;
  isLoading: boolean;
  nextVideo: () => void;
}

const VideoContext = createContext<VideoContextValue | null>(null);

// Fisher-Yates shuffle
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const VideoProvider = ({ children }: { children: ReactNode }) => {
  const [allVideos, setAllVideos] = useState<VideoFile[]>([]);
  const [playlist, setPlaylist] = useState<VideoFile[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [hasFetched, setHasFetched] = useState(false);

  // Defer video fetching - don't block initial render
  useEffect(() => {
    // Wait for initial paint before fetching videos
    const timeoutId = setTimeout(() => {
      if (hasFetched) return;
      
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

          setAllVideos(videoFiles);
          
          // Create initial shuffled playlist
          const shuffled = shuffleArray(videoFiles);
          setPlaylist(shuffled);
          setHasFetched(true);
          
          console.log(`Loaded ${videoFiles.length} videos, shuffled playlist created`);
        } catch (err) {
          console.error('Error fetching videos:', err);
        } finally {
          setIsLoading(false);
        }
      };

      fetchVideos();
    }, 500); // 500ms delay to allow FCP first
    
    return () => clearTimeout(timeoutId);
  }, [hasFetched]);

  // Move to next video in playlist, reshuffle when complete
  const nextVideo = useCallback(() => {
    if (playlist.length === 0) return;
    
    const nextIndex = currentIndex + 1;
    
    if (nextIndex >= playlist.length) {
      // Reshuffle playlist and start from beginning
      const reshuffled = shuffleArray(allVideos);
      setPlaylist(reshuffled);
      setCurrentIndex(0);
      console.log('Playlist complete, reshuffled for new sequence');
    } else {
      setCurrentIndex(nextIndex);
    }
  }, [currentIndex, playlist.length, allVideos]);

  const currentVideo = playlist.length > 0 ? playlist[currentIndex] : null;

  return (
    <VideoContext.Provider value={{ 
      videos: playlist, 
      currentVideo, 
      isLoading, 
      nextVideo 
    }}>
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

// Legacy hook for compatibility
export const useHeroVideos = () => {
  const { videos, currentVideo, isLoading, nextVideo } = useVideoContext();
  return { 
    videos, 
    currentVideo, 
    isLoading, 
    getNextVideo: nextVideo 
  };
};
