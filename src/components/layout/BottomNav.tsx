import { Link, useLocation } from "wouter";
import { Home, Flame, PlusSquare, Trophy, User } from "lucide-react";

const items = [
  { href: "/", label: "Feed", icon: Home },
  { href: "/trending", label: "Trending", icon: Flame },
  { href: "/submit", label: "Submit", icon: PlusSquare },
  { href: "/leaderboard", label: "Top", icon: Trophy },
  { href: "/profile/me", label: "Me", icon: User },
];

export function BottomNav() {
  const [loc] = useLocation();
  return (
    <nav className="fixed bottom-0 left-0 right-0">
      <div className="mx-auto max-w-md border-t border-border bg-background/90 backdrop-blur">
        <div className="flex items-center justify-between px-3 py-2">
          {items.map(({ href, label, icon: Icon }) => {
            const active = loc === href;
            return (
              <Link key={href} href={href}>
                <a className={`flex flex-col items-center gap-1 text-xs ${active ? "font-semibold" : "opacity-70"}`}>
                  <Icon className="h-5 w-5" />
                  <span>{label}</span>
                </a>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
