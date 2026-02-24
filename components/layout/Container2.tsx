import React from "react";

export default function Container({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-4 py-1 sm:py-2">
      {children}
    </div>
  );
}