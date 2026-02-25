class HistoryManager {
  private history: string[] = [];
  private index: number = -1;

  push(command: string): void {
    if (command.trim() && command !== this.history[this.history.length - 1]) {
      this.history.push(command);
      this.index = this.history.length;
    }
  }

  previous(): string | null {
    if (this.history.length === 0) return null;
    this.index = Math.max(0, this.index - 1);
    return this.history[this.index] || "";
  }

  next(): string | null {
    if (this.history.length === 0) return null;
    this.index = Math.min(this.history.length, this.index + 1);
    return this.index === this.history.length ? "" : this.history[this.index];
  }

  reset(): void {
    this.index = this.history.length;
  }

  getHistory(): string[] {
    return [...this.history];
  }
}

export const historyManager = new HistoryManager();