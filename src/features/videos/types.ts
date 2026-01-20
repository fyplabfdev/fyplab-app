export type Video = {
  id: string;
  src: string;            // mp4 url
  poster?: string;        // optional poster
  title?: string;
  creator?: { handle: string; avatarUrl?: string };

  metrics: {
    views: number;
    likes: number;
    comments: number;
    shares: number;
  };

  // optional UI helpers
  isTrending?: boolean;
};
