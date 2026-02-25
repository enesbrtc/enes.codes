import React, { useState, useEffect, useRef, useCallback } from "react";
import { getContext, setContext } from "../engine/shell/shellContext";
import { getSession, subscribeSession } from "../engine/session/sessionManager";
import { getKernel } from "../engine/kernel/kernel";
import { terminalBuffer, TerminalLine } from "../engine/kernel/terminalBuffer";
import { historyManager } from "../engine/kernel/history";
import { setMachineState } from "../engine/system/systemState";
import { getShell, setShell } from "../engine/shell/shellController";
import { sshKernel } from "../engine/ssh/sshKernel";
import { dispatchInput } from "../engine/terminal/commandDispatcher";

interface ShellProps {
  open: boolean;
  onClose: () => void;
  isBooting?: boolean;
}

const VISIBLE_LINE_BUFFER = 100; // Render 100 lines above/below viewport for smooth scrolling
const MAX_RENDERED_LINES = 200; // Maximum lines to render at once

const TerminalOutput = React.memo(({ lines, scrollRef }: { lines: TerminalLine[], scrollRef: React.RefObject<HTMLDivElement> }) => {
  const shouldAutoScroll = useRef(true);

  useEffect(() => {
    if (shouldAutoScroll.current && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines]);

  const handleScroll = useCallback(() => {
    if (!scrollRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
    const isAtBottom = scrollTop + clientHeight >= scrollHeight - 10;

    shouldAutoScroll.current = isAtBottom;
  }, []);

  return (
    <div
      ref={scrollRef}
      className="flex-1 overflow-y-auto font-mono text-sm text-green-400 leading-tight"
      style={{
        fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace',
        fontSize: '13px',
        lineHeight: '1.2',
        display: 'block',
        textAlign: 'left',
        paddingLeft: '16px'
      }}
      onScroll={handleScroll}
    >
      {lines.map((line) => (
        <div key={line.id} className={line.content === "" ? "h-3" : "mb-0"}>
          {line.content}
        </div>
      ))}
    </div>
  );
});

// Command descriptions used for tab suggestions
const getCommandDescription = (command: string): string => {
  const descriptions: Record<string, string> = {
    'help': 'Show available commands and usage',
    'ls': 'List directory contents',
    'cd': 'Change current directory',
    'cat': 'Display file contents',
    'pwd': 'Print working directory',
    'ssh': 'Connect to remote SSH server',
    'clear': 'Clear the terminal screen',
    'exit': 'Exit current session',
    'deploy': 'Unlock engineer mode',
    'whoami': 'Display current user information',
    'date': 'Show current date and time',
    'uptime': 'Show system uptime',
    'projects': 'View engineering projects',
    'stack': 'Show technology stack',
    'experience': 'View work experience',
    'contact': 'Show contact information',
    'resume': 'Download resume',
    'status': 'Show system status'
  };
  return descriptions[command] || 'Execute command';
};

const TerminalInput = React.memo(({
  buffer,
  setBuffer,
  onSubmit,
  getPrompt,
  isDisabled = false,
  passwordMode = false,
  onInterrupt,
  onClearScreen
}: {
  buffer: string;
  setBuffer: React.Dispatch<React.SetStateAction<string>>;
  onSubmit: (command: string) => void;
  getPrompt: () => string;
  isDisabled?: boolean;
  passwordMode?: boolean;
  onInterrupt?: () => void;
  onClearScreen?: () => void;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [showCursor, setShowCursor] = useState(true);
  const [cursorIndex, setCursorIndex] = useState(0);

  useEffect(() => {
    if (inputRef.current && !isDisabled) {
      inputRef.current.focus();
    }
  }, [isDisabled]);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  // Reset cursor when buffer changes externally
  useEffect(() => {
    setCursorIndex(buffer.length);
  }, [buffer]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (isDisabled) return;

    // Handle Ctrl combinations first
    if (e.ctrlKey) {
      switch (e.key.toLowerCase()) {
        case 'c':
          e.preventDefault();
          if (onInterrupt) {
            onInterrupt();
          }
          return;
        case 'l':
          e.preventDefault();
          if (onClearScreen) {
            onClearScreen();
          }
          return;
      }
      return;
    }

    switch (e.key) {
      case 'Enter':
        e.preventDefault();
        const command = buffer.trim();
        if (command) {
          historyManager.push(command);
        }
        historyManager.reset();
        setBuffer('');
        setCursorIndex(0);
        onSubmit(command);
        break;

      case 'Backspace':
        e.preventDefault();
        if (cursorIndex > 0) {
          const newBuffer = buffer.slice(0, cursorIndex - 1) + buffer.slice(cursorIndex);
          setBuffer(newBuffer);
          setCursorIndex(cursorIndex - 1);
        }
        break;

      case 'Delete':
        e.preventDefault();
        if (cursorIndex < buffer.length) {
          const newBuffer = buffer.slice(0, cursorIndex) + buffer.slice(cursorIndex + 1);
          setBuffer(newBuffer);
          // cursorIndex stays the same
        }
        break;

      case 'Tab':
        e.preventDefault();
        if (!passwordMode && buffer.length > 0) {
          const kernel = getKernel();
          const commands = kernel.listCommands().filter(cmd => !cmd.hidden);
          const matches = commands.filter(cmd => cmd.name.startsWith(buffer));

          if (matches.length === 1) {
            // Auto-complete single match
            setBuffer(matches[0].name);
            setCursorIndex(matches[0].name.length);
          } else if (matches.length > 1) {
            // Show possible completions with descriptions
            terminalBuffer.push("");
            terminalBuffer.push("Available commands:");
            matches.forEach(cmd => {
              const description = getCommandDescription(cmd.name);
              terminalBuffer.push(`  ${cmd.name.padEnd(12)} - ${description}`);
            });
            terminalBuffer.push("");
          } else if (matches.length === 0) {
            // No matches, show general help
            const allCommands = commands.slice(0, 5).map(cmd => cmd.name);
            terminalBuffer.push("");
            terminalBuffer.push(`No commands starting with "${buffer}". Try: ${allCommands.join(', ')}`);
            terminalBuffer.push("");
          }
        } else if (!passwordMode && buffer.length === 0) {
          // Show common commands when tab is pressed with empty buffer
          terminalBuffer.push("");
          terminalBuffer.push("Common commands:");
          terminalBuffer.push("  help        - Show available commands");
          terminalBuffer.push("  ls          - List directory contents");
          terminalBuffer.push("  cd          - Change directory");
          terminalBuffer.push("  cat         - Display file contents");
          terminalBuffer.push("  ssh         - Connect to remote server");
          terminalBuffer.push("");
        }
        break;

      case 'ArrowUp':
        e.preventDefault();
        if (!passwordMode) {
          const prevCommand = historyManager.previous();
          if (prevCommand !== null) {
            setBuffer(prevCommand);
            setCursorIndex(prevCommand.length);
          }
        }
        break;

      case 'ArrowDown':
        e.preventDefault();
        if (!passwordMode) {
          const nextCommand = historyManager.next();
          if (nextCommand !== null) {
            setBuffer(nextCommand);
            setCursorIndex(nextCommand.length);
          }
        }
        break;

      case 'ArrowLeft':
        e.preventDefault();
        setCursorIndex(Math.max(0, cursorIndex - 1));
        break;

      case 'ArrowRight':
        e.preventDefault();
        setCursorIndex(Math.min(buffer.length, cursorIndex + 1));
        break;

      case 'Home':
        e.preventDefault();
        setCursorIndex(0);
        break;

      case 'End':
        e.preventDefault();
        setCursorIndex(buffer.length);
        break;

      default:
        // Allow printable characters
        if (e.key.length === 1 && !e.metaKey && !e.altKey) {
          const newBuffer = buffer.slice(0, cursorIndex) + e.key + buffer.slice(cursorIndex);
          setBuffer(newBuffer);
          setCursorIndex(cursorIndex + 1);
        }
        break;
    }
  }, [buffer, setBuffer, onSubmit, cursorIndex, setCursorIndex, isDisabled, passwordMode, onInterrupt, onClearScreen]);

  const handleTerminalClick = useCallback(() => {
    if (inputRef.current && !isDisabled) {
      inputRef.current.focus();
    }
  }, [isDisabled]);

  const renderBuffer = () => {
    if (passwordMode) {
      const masked = "*".repeat(buffer.length);
      return {
        before: masked.slice(0, cursorIndex),
        after: masked.slice(cursorIndex)
      };
    }
    return {
      before: buffer.slice(0, cursorIndex),
      after: buffer.slice(cursorIndex)
    };
  };

  const { before, after } = renderBuffer();

  return (
    <>
      {/* Hidden input for keyboard capture */}
      <input
        ref={inputRef}
        type="text"
        value=""
        onChange={() => {}} // Controlled by keydown
        onKeyDown={handleKeyDown}
        style={{
          position: 'absolute',
          width: 0,
          height: 0,
          opacity: 0,
          caretColor: 'transparent',
          fontSize: '16px' // Prevent mobile zoom
        }}
        autoComplete="off"
        spellCheck="false"
        disabled={isDisabled}
      />

      {/* Visible terminal input line */}
      <div
        className="cursor-text select-none"
        onClick={handleTerminalClick}
        style={{
          display: 'block',
          textAlign: 'left',
          paddingLeft: '16px',
          paddingRight: '16px',
          paddingTop: '4px',
          paddingBottom: '4px',
          whiteSpace: 'pre',
          fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace',
          fontSize: '13px',
          lineHeight: '1.4',
          letterSpacing: 0
        }}
      >
        <span
          className="text-green-400"
          style={{
            flex: '0 0 auto',
            marginRight: '0.25em'
          }}
        >
          {passwordMode ? "password: " : getPrompt()}
        </span>
        <span
          className="text-green-400"
          style={{
            flex: '0 0 auto'
          }}
        >
          {before}
        </span>
        {!isDisabled && showCursor && (
          <span
            style={{
              display: 'inline-block',
              width: '0.5em',
              height: '1.4em',
              backgroundColor: '#4ade80',
              animation: 'blink 1s steps(2, start) infinite',
              flex: '0 0 auto'
            }}
          />
        )}
        <span
          className="text-green-400"
          style={{
            flex: '0 0 auto'
          }}
        >
          {after}
        </span>
      </div>

      <style jsx>{`
        @keyframes blink {
          50% { opacity: 0; }
        }
      `}</style>
    </>
  );
});

TerminalInput.displayName = "TerminalInput";

export default function Shell({ open, onClose, isBooting = false }: ShellProps) {
  const [buffer, setBuffer] = useState("");
  const [passwordMode, setPasswordMode] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [bufferLines, setBufferLines] = useState<TerminalLine[]>([]);
  const [, rerender] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Subscribe to buffer changes
  useEffect(() => {
    const unsubscribe = terminalBuffer.subscribe((lines) => {
      setBufferLines([...lines]);
    });

    return unsubscribe;
  }, []);

  // Subscribe to session changes
  useEffect(() => {
    const unsubscribe = subscribeSession(() => {
      rerender(x => x + 1);
    });

    return unsubscribe;
  }, []);

  const initializeTerminal = useCallback(async () => {
    setIsInitialized(true);
    // Kernel initialization and plugin loading happens automatically in getKernel()
    getKernel();

    // Boot help message - show only on first ever open
    if (!localStorage.getItem("boot_seen")) {
      terminalBuffer.push("Welcome to enes.codes engineering workstation.");
      terminalBuffer.push("");
      terminalBuffer.push("Type 'help' to begin.");
      terminalBuffer.push("");
      localStorage.setItem("boot_seen", "true");
    }

    // Check for first visit
    const hasVisited = localStorage.getItem('terminal-visited');
    if (!hasVisited) {
      localStorage.setItem('terminal-visited', 'true');
      // Add greeting after boot sequence
      setTimeout(() => {
        terminalBuffer.push("");
        terminalBuffer.push("System ready.");
        terminalBuffer.push("");
        terminalBuffer.push("Tip:");
        terminalBuffer.push("Type 'help' if this is your first visit.");
        terminalBuffer.push("");
      }, 500);
    }

    // Minimal boot sequence
    terminalBuffer.push("Darwin Kernel Version 23.1.0: Mon Oct  9 21:28:12 PDT 2023; root:xnu-10002.41.9~6/RELEASE_X86_64");
    terminalBuffer.push("enes@engineering.local login: ");
  }, []);

  useEffect(() => {
    if (open && !isInitialized) {
      initializeTerminal();
    }
  }, [open, isInitialized]);

  useEffect(() => {
    if (open) {
      setMachineState("idle");
      setBuffer("");
      setPasswordMode(false);

      // Clear buffer on open only after initial boot help has been shown
      if (localStorage.getItem("boot_seen")) {
        terminalBuffer.clear();
      }

      // Try to restore SSH session on open
      // TODO: Implement session persistence with new session manager
      setShell("local");
      setContext("local");
    }
  }, [open]);

  // ESC key handler
  useEffect(() => {
    if (!open) return;

    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();

        // Exit interactive mode first if active
        const kernel = getKernel();
        const activeMode = kernel.getActiveInteractiveMode();
        if (activeMode) {
          kernel.resetKernel();
          terminalBuffer.push("");
          terminalBuffer.push("Interactive mode exited. Press ESC again to close terminal.");
          return;
        }

        // Close terminal
        setMachineState("idle");
        onClose();
      }

    }

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  const getPrompt = useCallback((): string => {
    const session = getSession();

    if (session.type === "ssh") {
      if (session.state === "shell") {
        return `${session.username}@${session.host}:${session.cwd}$ `;
      }
      if (session.state === "username") {
        return "login: ";
      }
      if (session.state === "password") {
        return "password: ";
      }
      return "";
    }

    const context = getContext();
    switch (context) {
      case "engineer":
        return "enes@engineer:~$ ";
      default:
        return "enes@local:~$ ";
    }
  }, []);

  const handleClearScreen = useCallback(() => {
    terminalBuffer.clear();
  }, []);

  const handleSubmit = useCallback(async (command: string) => {
    const result = await dispatchInput(command);

    if (result?.type === 'auth_username') {
      // After username accepted, prompt for password
      setPasswordMode(true);
      setBuffer('');
    } else if (result?.type === 'auth_password' || result?.type === 'auth_completed') {
      // SSH session entered shell
      setShell('ssh');
      setContext('ssh');
      setMachineState('ssh-connected');
      terminalBuffer.push('Last login: Thu Oct 12 14:30:42 on ttys000');
      terminalBuffer.push('');
      setPasswordMode(false);
      setBuffer('');
    }
  }, [setBuffer, setPasswordMode]);

  const handleInterrupt = useCallback(() => {
    terminalBuffer.push('^C');
    terminalBuffer.push('');
    setBuffer('');
  }, [setBuffer]);


  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black flex flex-col z-[100]">
      <div className="text-green-300 text-xs px-2 py-1 border-b border-green-700 select-none" style={{
        fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace'
      }}>
        enes@engineering: ~
      </div>

      <TerminalOutput lines={bufferLines} scrollRef={scrollRef} />

      <TerminalInput
        buffer={buffer}
        setBuffer={setBuffer}
        onSubmit={handleSubmit}
        getPrompt={getPrompt}
        isDisabled={isBooting}
        passwordMode={passwordMode}
        onInterrupt={handleInterrupt}
        onClearScreen={handleClearScreen}
      />
    </div>
  );
}