"use client";

import InteractionLayer from "./InteractionLayer";

export default function AppProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <InteractionLayer />
      {children}
    </>
  );
}