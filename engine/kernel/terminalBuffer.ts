export interface TerminalLine {
  id: string;
  content: string;
  timestamp: number;
}

export class TerminalBuffer {
  private lines: TerminalLine[] = [];
  private maxLines = 2000;
  private listeners: ((lines: TerminalLine[]) => void)[] = [];

  constructor() {
    // Initialize with empty state
  }

  push(content: string): void {
    const line: TerminalLine = {
      id: `line_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      content,
      timestamp: Date.now()
    };

    this.lines.push(line);

    // Enforce max lines limit
    if (this.lines.length > this.maxLines) {
      this.lines = this.lines.slice(-this.maxLines);
    }

    this.notifyListeners();
  }

  pushMultiple(contents: string[]): void {
    const newLines: TerminalLine[] = contents.map(content => ({
      id: `line_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      content,
      timestamp: Date.now()
    }));

    this.lines.push(...newLines);

    // Enforce max lines limit
    if (this.lines.length > this.maxLines) {
      this.lines = this.lines.slice(-this.maxLines);
    }

    this.notifyListeners();
  }

  clear(): void {
    this.lines = [];
    this.notifyListeners();
  }

  getAllLines(): TerminalLine[] {
    return [...this.lines];
  }

  getVisibleLines(start: number, end: number): TerminalLine[] {
    return this.lines.slice(start, end);
  }

  getLineCount(): number {
    return this.lines.length;
  }

  subscribe(listener: (lines: TerminalLine[]) => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notifyListeners(): void {
    this.listeners.forEach(listener => listener([...this.lines]));
  }
}

// Singleton instance
export const terminalBuffer = new TerminalBuffer();