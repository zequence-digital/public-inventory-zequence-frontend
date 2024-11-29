"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="flex items-center justify-center min-h-screen w-full">
      <div>
        <h2>
          {error.message} {error.digest}
        </h2>
        <button onClick={() => reset()}>Try again</button>
      </div>
    </section>
  );
}
