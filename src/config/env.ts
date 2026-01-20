export const env = {
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL as string | undefined,
  APP_ENV: (import.meta.env.VITE_APP_ENV as string | undefined) ?? "development",
  ENABLE_UPLOAD: String(import.meta.env.VITE_ENABLE_UPLOAD ?? "true") === "true",
  ENABLE_SHARE: String(import.meta.env.VITE_ENABLE_SHARE ?? "false") === "true",
};

if (!env.API_BASE_URL) {
  // keep it strict for production, flexible for dev
  console.warn("VITE_API_BASE_URL is not set. API calls may fail.");
}
