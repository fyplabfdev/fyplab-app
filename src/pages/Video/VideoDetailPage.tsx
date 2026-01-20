import { useParams } from "wouter";

export function VideoDetailPage() {
  const { id } = useParams<{ id: string }>();
  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold">Video</h1>
      <p className="text-sm opacity-70 mt-2">Video ID: {id}</p>
    </div>
  );
}
