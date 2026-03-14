"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { CommandParser } from '../../engine/terminal/commandParser';

interface TerminalUIProps {
  open: boolean;
  onClose: () => void;
  isBooting?: boolean;
}

type TerminalEntry = {
  id: string;
  type: 'system' | 'command' | 'output';
  prompt?: string;
  content: string[];
};

type EditorState = {
  fileName: string;
  content: string[];
};

const MONO_FONT = 'var(--font-mono)';

function createId(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function createWelcomeEntries(): TerminalEntry[] {
  return [
    {
      id: createId('system'),
      type: 'system',
      content: [
        '|  ****|               |  _ \\',
        '| |** _ __   ___  ___  | |*) | ___  ___',
        "|  **| '* \\ / _ / __| |  _ < / _ / __|",
        '| |  | | | |  **/_* \\ | |*) | (*) _* \\',
        '|*|  |*| |_|_**||***/ |****/ _**/|*__/ ',
        '',
        'Developer Console Ready',
      ],
    },
    {
      id: createId('boot'),
      type: 'system',
      content: [
        'Portfolio environment initialized.',
        '',
        'Type "help" to see available commands.',
        '',
        'Some commands are hidden. Curiosity is rewarded.',
      ],
    },
  ];
}

export default function TerminalUI({ open, onClose, isBooting = false }: TerminalUIProps) {
  const parserRef = useRef<CommandParser | null>(null);
  const initializedRef = useRef(false);
  const outputRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [entries, setEntries] = useState<TerminalEntry[]>([]);
  const [editorState, setEditorState] = useState<EditorState | null>(null);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);

  if (!parserRef.current) {
    parserRef.current = new CommandParser();
  }

  const parser = parserRef.current;
  const prompt = useMemo(() => parser.getPrompt(), [parser, entries]);

  useEffect(() => {
    if (!open) return;
    if (!initializedRef.current) {
      initializedRef.current = true;
      parser.reset();
      setEntries(createWelcomeEntries());
      setEditorState(null);
      setInput('');
      setHistoryIndex(null);
    }
  }, [open, parser]);

  useEffect(() => {
    if (!open) return;
    if (editorState) return;
    inputRef.current?.focus();
  }, [editorState, open]);

  useEffect(() => {
    if (!outputRef.current) return;
    outputRef.current.scrollTop = outputRef.current.scrollHeight;
  }, [entries]);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }

      if (editorState && event.ctrlKey && event.key.toLowerCase() === 'x') {
        event.preventDefault();
        setEditorState(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [editorState, open, onClose]);

  const appendEntry = useCallback((entry: TerminalEntry) => {
    setEntries((current) => [...current, entry]);
  }, []);

  const handleSubmit = useCallback(() => {
    const command = input.trim();

    appendEntry({
      id: createId('command'),
      type: 'command',
      prompt: parser.getPrompt(),
      content: [command],
    });

    if (command) {
      setHistory((current) => [...current, command]);
    }
    setHistoryIndex(null);

    const result = parser.execute(command);

    if (result.clear) {
      setEntries([]);
    } else if (result.editor) {
      setEditorState(result.editor);
    } else if (result.output.length > 0) {
      appendEntry({
        id: createId('output'),
        type: 'output',
        content: result.output,
      });
    }

    setInput('');
  }, [appendEntry, input, parser]);

  const handleAutocomplete = useCallback(() => {
    const result = parser.autocomplete(input);
    if (result.value !== input) {
      setInput(result.value);
      return;
    }

    if (result.suggestions && result.suggestions.length > 0) {
      appendEntry({
        id: createId('output'),
        type: 'output',
        content: [result.suggestions.join('    ')],
      });
    }
  }, [appendEntry, input, parser]);

  const handleHistory = useCallback((direction: 'up' | 'down') => {
    if (history.length === 0) return;

    if (direction === 'up') {
      const nextIndex = historyIndex === null ? history.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInput(history[nextIndex] ?? '');
      return;
    }

    if (historyIndex === null) return;

    const nextIndex = historyIndex + 1;
    if (nextIndex >= history.length) {
      setHistoryIndex(null);
      setInput('');
      return;
    }

    setHistoryIndex(nextIndex);
    setInput(history[nextIndex] ?? '');
  }, [history, historyIndex]);

  const handleInputKeyDown = useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSubmit();
      return;
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      handleHistory('up');
      return;
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      handleHistory('down');
      return;
    }

    if (event.key === 'Tab') {
      event.preventDefault();
      handleAutocomplete();
      return;
    }

    if (event.ctrlKey && event.key.toLowerCase() === 'l') {
      event.preventDefault();
      setEntries([]);
      return;
    }
  }, [handleAutocomplete, handleHistory, handleSubmit]);

  if (!open) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97, y: 16 }}
      transition={{ type: 'spring', damping: 24, stiffness: 260 }}
      className="terminal-ui-root fixed inset-0 z-[100] flex flex-col bg-[rgba(4,6,12,0.84)] backdrop-blur-sm"
    >
      <div className="mx-auto flex h-full w-full max-w-[1400px] flex-col px-4 py-4 sm:px-6">
        <div className="flex h-full min-h-0 flex-col overflow-hidden rounded-[22px] border border-white/6 bg-[rgba(14,18,28,0.7)] shadow-[0_30px_80px_rgba(0,0,0,0.45)] backdrop-blur-[16px]">
          <div
            className="flex items-center justify-between border-b border-white/6 px-5 py-3"
            style={{ fontFamily: MONO_FONT }}
          >
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
              </div>
              <div className="text-sm text-white/72">{prompt}</div>
            </div>

            <button
              onClick={onClose}
              className="rounded-lg p-1.5 text-white/45 transition-colors duration-150 hover:bg-white/[0.04] hover:text-white/88"
              aria-label="Close terminal"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div ref={outputRef} className="flex-1 overflow-y-auto px-5 py-5">
            {editorState ? (
              <div className="flex h-full min-h-0 flex-col rounded-2xl border border-white/6 bg-[rgba(10,14,22,0.46)] backdrop-blur-sm">
                <div className="flex items-center justify-between border-b border-white/6 px-4 py-2 text-[13px] text-white/72">
                  <span>{`GNU nano 7.0    ${editorState.fileName}`}</span>
                  <span className="text-white/35">read only</span>
                </div>
                <div className="flex-1 overflow-y-auto px-4 py-4 text-[13px] leading-6 text-[#d6deef]">
                  {editorState.content.map((line, index) => (
                    <div key={`${editorState.fileName}-${index}`} className={line === '' ? 'h-4' : undefined}>
                      {line}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-3" style={{ fontFamily: MONO_FONT }}>
                {entries.map((entry) => (
                  <div key={entry.id} className="whitespace-pre-wrap text-[13px] leading-6">
                    {entry.type === 'command' ? (
                      <div className="flex flex-wrap items-start gap-2">
                        <span className="text-[#6ea8ff]">{entry.prompt}</span>
                        <span className="text-[#e6ebf5]">{entry.content[0] || ''}</span>
                      </div>
                    ) : (
                      <div className={entry.type === 'system' ? 'text-white/56' : 'text-[#cfd8ea]'}>
                        {entry.content.map((line, index) => (
                          <div key={`${entry.id}-${index}`} className={line === '' ? 'h-4' : undefined}>
                            {line}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="border-t border-white/6 bg-white/[0.02] px-5 py-4" style={{ fontFamily: MONO_FONT }}>
            {editorState ? (
              <div className="flex items-center justify-between text-[13px] text-white/58">
                <span>^X Exit</span>
                <span>^O Save</span>
                <span>^W Search</span>
              </div>
            ) : (
              <label className="flex items-center gap-2 text-[13px] leading-6">
                <span className="shrink-0 text-[#6ea8ff]">{prompt}</span>
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  onKeyDown={handleInputKeyDown}
                  autoCapitalize="none"
                  autoCorrect="off"
                  spellCheck={false}
                  disabled={isBooting}
                  className="flex-1 bg-transparent text-[#e6ebf5] outline-none placeholder:text-white/20"
                  placeholder="type a command"
                  style={{ fontFamily: MONO_FONT }}
                />
              </label>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
