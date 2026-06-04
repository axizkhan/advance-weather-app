"use client";

export default function Error({ error }: { error: Error }) {
  return (
    <div className="flex min-h-screen items-center justify-center">
      {error.message}
    </div>
  );
}
