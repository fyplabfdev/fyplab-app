import { Route, Switch } from "wouter";
import { FeedPage } from "../pages/Feed/FeedPage";
import { TrendingPage } from "../pages/Trending/TrendingPage";
import { LeaderboardPage } from "../pages/Leaderboard/LeaderboardPage";
import { SubmitPage } from "../pages/Submit/SubmitPage";
import { ProfilePage } from "../pages/Profile/ProfilePage";
import { VideoDetailPage } from "../pages/Video/VideoDetailPage";
import { SettingsPage } from "../pages/Settings/SettingsPage";
import { ConnectPage } from "../pages/Auth/ConnectPage";
import { NotFound } from "../pages/NotFound";

export function AppRouter() {
  return (
    <Switch>
      <Route path="/" component={FeedPage} />
      <Route path="/trending" component={TrendingPage} />
      <Route path="/leaderboard" component={LeaderboardPage} />
      <Route path="/submit" component={SubmitPage} />
      <Route path="/profile/:handle" component={ProfilePage} />
      <Route path="/video/:id" component={VideoDetailPage} />
      <Route path="/settings" component={SettingsPage} />
      <Route path="/connect" component={ConnectPage} />
      <Route component={NotFound} />
    </Switch>
  );
}
