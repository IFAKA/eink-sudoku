"use client";

interface ErrorDisplayProps {
  errors: string[];
}

export function ErrorDisplay({ errors }: ErrorDisplayProps) {
  if (errors.length === 0) {
    return <div className="h-10" />; // Placeholder height
  }

  return (
    <div className="h-10 flex items-center justify-center">
      <p className="text-sm text-black font-medium text-center">
        {errors.slice(0, 2).join(" • ")}
        {errors.length > 2 && ` (+${errors.length - 2} more)`}
      </p>
    </div>
  );
}
