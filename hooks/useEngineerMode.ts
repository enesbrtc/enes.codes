"use client";

import { useState, useEffect } from "react";
import { getEngineerMode, subscribeEngineerMode } from "@/lib/engineerMode";

export function useEngineerMode() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(getEngineerMode());
    subscribeEngineerMode(setEnabled);
  }, []);

  return enabled;
}