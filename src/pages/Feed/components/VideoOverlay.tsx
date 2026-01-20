import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, MessageCircle, Bookmark, Sparkles } from "lucide-react";
import { compactNumber } from "@/lib/format";
import type { Video } from "@/features/videos/types";

type Props = {
  video: Video;
  onPredict: () => void;
};

export function VideoOverlay({ video, onPredict }: Props) {
  return (
    <div className="absolute inset-0 flex">
      {/* left info */}
      <div className="flex-1 flex flex-col justify-end p-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            {video.creator?.handle ? (
              <span className="text-sm font-semibold">@{video.creator.handle}</span>
            ) : (
              <span className="text-sm font-semibold">Fyplab</span>
            )}
            {video.isTrending ? <Badge variant="secondary">Trending</Badge> : null}
          </div>
          {video.title ? <p className="text-sm opacity-90 line-clamp-2">{video.title}</p> : null}
          <p className="text-xs opacity-70">
            {compactNumber(video.metrics.views)} views • {compactNumber(video.metrics.likes)} likes
          </p>
        </div>
      </div>

      {/* right actions */}
      <div className="w-16 flex flex-col justify-end items-center gap-3 p-3 pb-5">
        <Action icon={<Heart className="h-5 w-5" />} label={compactNumber(video.metrics.likes)} />
        <Action icon={<MessageCircle className="h-5 w-5" />} label={compactNumber(video.metrics.comments)} />
        <Action icon={<Bookmark className="h-5 w-5" />} label="Save" />

        <Button className="h-11 w-11 rounded-full" onClick={onPredict}>
          <Sparkles className="h-5 w-5" />
        </Button>
        <span className="text-[10px] opacity-80">Predict</span>
      </div>
    </div>
  );
}

function Action({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <Button variant="secondary" className="h-11 w-11 rounded-full">
        {icon}
      </Button>
      <span className="text-[10px] opacity-80">{label}</span>
    </div>
  );
}
