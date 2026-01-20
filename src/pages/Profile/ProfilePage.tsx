import { useParams } from "wouter";

export function ProfilePage() {
  const { handle } = useParams<{ handle: string }>();
  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold">Profile</h1>
      <p className="text-sm opacity-70 mt-2">Handle: {handle}</p>
    </div>
  );
}
