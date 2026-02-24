"use client";

import InteractionLayer from "./InteractionLayer";
import KeyboardNav from "./KeyboardNav";

export default function AppProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <InteractionLayer />
      <KeyboardNav />
      {children}
    </>
  );
}