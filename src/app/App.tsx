import { Providers } from "./providers";
import { AppLayout } from "../components/layout/AppLayout";
import { AppRouter } from "./router";

export function App() {
  return (
    <Providers>
      <AppLayout>
        <AppRouter />
      </AppLayout>
    </Providers>
  );
}
