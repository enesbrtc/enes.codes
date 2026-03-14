import { useState, useEffect, useRef } from "react";
import Avatar, { AvatarRef } from "./Avatar";

export default function AvatarShell() {
  const avatarRef = useRef<AvatarRef>(null);

  return (
    <Avatar ref={avatarRef} />
  );
}