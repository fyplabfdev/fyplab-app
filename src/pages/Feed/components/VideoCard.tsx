import type { Video } from "@/features/videos/types";
import { useVideoPlayback } from "../hooks/useVideoPlayback";
import { VideoOverlay } from "./VideoOverlay";

type Props = {
  video: Video;
  onPredict: (video: Video) => void;
};

export function VideoCard({ video, onPredict }: Props) {
  const videoRef = useVideoPlayback();

  return (
    <section className="relative h-[calc(100vh-64px)] w-full snap-start overflow-hidden bg-black">
      <video
        ref={videoRef}
        className="h-full w-full object-cover"
        src={video.src}
        poster={video.poster}
        muted
        playsInline
        loop
        preload="metadata"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/40" />
      <VideoOverlay video={video} onPredict={() => onPredict(video)} />
    </section>
  );
}
