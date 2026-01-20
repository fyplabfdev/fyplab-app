import { env } from "../../config/env";

export function SubmitPage() {
  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold">Submit</h1>
      {!env.ENABLE_UPLOAD ? (
        <p className="text-sm opacity-70 mt-2">Upload is disabled.</p>
      ) : (
        <p className="text-sm opacity-70 mt-2">Upload flow goes here.</p>
      )}
    </div>
  );
}
