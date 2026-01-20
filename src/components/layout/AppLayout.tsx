import { PropsWithChildren } from "react";
import { BottomNav } from "./BottomNav";

export function AppLayout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-md min-h-screen border-x border-border">
        <main className="pb-16">{children}</main>
        <BottomNav />
      </div>
    </div>
  );
}
