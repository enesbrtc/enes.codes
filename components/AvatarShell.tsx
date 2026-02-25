import { useState, useEffect, useRef } from "react";
import Avatar, { AvatarRef } from "./Avatar";
import Shell from "./Shell";
import { setTerminalCloseCallback, setTerminalOpen } from "../lib/terminalState";
import { enableFocusMode, disableFocusMode } from "../engine/system/focusMode";

export default function AvatarShell() {
  const [shellOpen, setShellOpen] = useState(false);
  const [isBooting, setIsBooting] = useState(false);
  const avatarRef = useRef<AvatarRef>(null);

  const runBootSequence = async () => {
    setIsBooting(true);

    const bootMessages = [
      "booting enes.codes workstation...",
      "initializing kernel...",
      "loading engineer profile...",
      "restoring environment...",
      "system ready."
    ];

    // Import terminal buffer dynamically to avoid circular dependency
    const { terminalBuffer } = await import("../engine/kernel/terminalBuffer");

    for (const message of bootMessages) {
      terminalBuffer.push(message);
      await new Promise(resolve => setTimeout(resolve, 120));
    }

    // Mark boot as completed
    localStorage.setItem("machine_boot_completed", "true");
    setIsBooting(false);
  };

  const handleAvatarClick = async () => {
    setShellOpen(true);
    setTerminalOpen(true);
    enableFocusMode();

    // Check if this is first boot
    const bootCompleted = localStorage.getItem("machine_boot_completed");
    if (!bootCompleted) {
      await runBootSequence();
    }
  };

  const handleShellClose = () => {
    setShellOpen(false);
    setTerminalOpen(false);
    disableFocusMode();
    // Return focus to avatar after terminal closes
    setTimeout(() => {
      avatarRef.current?.focus();
    }, 200); // Small delay to ensure terminal is fully closed
  };

  // Register the close callback globally so commands can close the terminal
  useEffect(() => {
    setTerminalCloseCallback(handleShellClose);
  }, []);

  return (
    <>
      <Avatar ref={avatarRef} onClick={handleAvatarClick} />
      <Shell open={shellOpen} onClose={handleShellClose} isBooting={isBooting} />
    </>
  );
}