import { VirtualFileSystem } from './virtualFileSystem';

export interface CommandExecutionResult {
  output: string[];
  clear?: boolean;
  editor?: {
    fileName: string;
    content: string[];
  };
}

export interface CompletionResult {
  value: string;
  suggestions?: string[];
}

const AVAILABLE_COMMANDS = [
  'help',
  'whoami',
  'about',
  'skills',
  'projects',
  'systems',
  'contact',
  'clear',
  'date',
  'echo',
  'git',
  'ls',
  'pwd',
  'cd',
  'cat',
  'nano',
  'ping',
] as const;

const DISCOVERY_HINTS = [
  'Tip: try running "git log"',
  'Hint: some commands are hidden.',
  'Curiosity unlocks features.',
  'Try opening a file with "nano about.txt"',
] as const;

const PROJECT_SUMMARY = [
  'portfolio project files:',
  '  paket7.md',
  '  ta-store.md',
  '  enes-codes.md',
  '',
  'try: cd projects && ls',
];

const SYSTEMS_SUMMARY = [
  'system notes available:',
  '  automation-platform.md',
  '  support-automation.md',
  '',
  'try: cd systems && ls',
];

const GIT_COMMITS = [
  {
    hash: 'f9c1a21',
    title: 'workflow automation platform',
    date: '2026-02-21',
    body: 'Implement workflow automation platform architecture',
    details: [
      'Added event-driven workflow engine with approval pipelines and audit logging.',
      '',
      'Files changed:',
      'workflow-engine.ts',
      'automation-controller.ts',
    ],
  },
  {
    hash: '8b7c4e3',
    title: 'support automation system',
    date: '2026-02-14',
    body: 'Build internal support automation system',
    details: [
      'Introduced internal support orchestration with triage shortcuts and operator tooling.',
      '',
      'Files changed:',
      'support-automation.ts',
      'ticket-routing.ts',
    ],
  },
  {
    hash: '4d3e119',
    title: 'identity lifecycle automation',
    date: '2026-02-02',
    body: 'Add identity lifecycle management automation',
    details: [
      'Shipped identity provisioning flows and lifecycle orchestration for internal systems.',
      '',
      'Files changed:',
      'identity-lifecycle.ts',
      'provisioning-jobs.ts',
    ],
  },
] as const;

const FORTUNES = [
  '"Programs must be written for people to read."',
  '"Simplicity is prerequisite for reliability."',
  '"Automation applied to an efficient operation magnifies the efficiency."',
  '"Debugging is detective work with better keyboards."',
] as const;

type InteractiveMode = 'none' | 'debug';

export class CommandParser {
  private readonly vfs: VirtualFileSystem;
  private commandCount = 0;
  private interactiveMode: InteractiveMode = 'none';

  constructor(vfs = new VirtualFileSystem()) {
    this.vfs = vfs;
  }

  reset() {
    this.vfs.reset();
    this.commandCount = 0;
    this.interactiveMode = 'none';
  }

  getPrompt(): string {
    return `enes@portfolio:${this.vfs.getDisplayPath()}$`;
  }

  getAvailableCommands(): string[] {
    return [...AVAILABLE_COMMANDS];
  }

  autocomplete(input: string): CompletionResult {
    const trimmed = input.trimStart();
    const tokens = this.tokenize(trimmed);
    const endsWithSpace = /\s$/.test(input);

    if (tokens.length === 0) {
      return { value: input, suggestions: this.getAvailableCommands() };
    }

    if (tokens.length === 1 && !endsWithSpace) {
      const matches = this.getAvailableCommands().filter((command) => command.startsWith(tokens[0]));
      if (matches.length === 1) {
        return { value: matches[0] };
      }
      return { value: input, suggestions: matches };
    }

    const command = tokens[0];
    const targetToken = endsWithSpace ? '' : tokens[tokens.length - 1];
    const supportsPathCompletion = command === 'cd' || command === 'cat' || command === 'ls' || command === 'nano';

    if (!supportsPathCompletion) {
      return { value: input, suggestions: [] };
    }

    const matches = this.vfs.completePath(targetToken, {
      directoriesOnly: command === 'cd',
    });

    if (matches.length === 1) {
      const nextTokens = [...tokens];
      if (endsWithSpace) {
        nextTokens.push(matches[0]);
      } else {
        nextTokens[nextTokens.length - 1] = matches[0];
      }
      return { value: nextTokens.join(' ') };
    }

    return { value: input, suggestions: matches };
  }

  execute(rawInput: string): CommandExecutionResult {
    const trimmed = rawInput.trim();
    if (!trimmed) {
      return { output: [] };
    }

    if (this.interactiveMode === 'debug') {
      return this.handleDebugChoice(trimmed);
    }

    const [command, ...args] = this.tokenize(trimmed);
    this.commandCount += 1;

    switch (command) {
      case 'help':
        return {
          output: this.withHint([
            'available commands',
            '',
            ...AVAILABLE_COMMANDS,
          ], 'help'),
        };
      case 'whoami':
        return {
          output: this.withHint([
            'Application Support Engineer',
            'Automation and platform systems engineer',
            'Specializing in backend tooling and workflow automation.',
          ], 'whoami'),
        };
      case 'about':
        return { output: this.withHint(this.readTextFile('about.txt'), 'about') };
      case 'skills':
        return { output: this.withHint(this.readTextFile('skills.txt'), 'skills') };
      case 'projects':
        return { output: this.withHint(PROJECT_SUMMARY, 'projects') };
      case 'systems':
        return { output: this.withHint(SYSTEMS_SUMMARY, 'systems') };
      case 'contact':
        return { output: this.withHint(this.readTextFile('contact.txt'), 'contact') };
      case 'clear':
        return { output: [], clear: true };
      case 'date':
        return { output: [new Date().toString()] };
      case 'echo':
        return { output: [args.join(' ')] };
      case 'git':
        return this.handleGit(args);
      case 'ls':
        return this.handleLs(args[0]);
      case 'pwd':
        return { output: [this.vfs.getCurrentPath()] };
      case 'cd':
        return this.handleCd(args[0]);
      case 'cat':
        return this.handleCat(args[0]);
      case 'nano':
        return this.handleNano(args[0]);
      case 'ping':
        return this.handlePing(args[0]);
      case 'sudo':
        return this.handleSudo(args);
      case 'matrix':
        return {
          output: [
            '0101010101010101',
            'SYSTEM INITIALIZING',
            'WELCOME ENGINEER',
          ],
        };
      case '42':
        return { output: ['Answer to life, the universe, and debugging.'] };
      case 'hack':
        return {
          output: [
            'Accessing mainframe...',
            '',
            'Just kidding. Nice try.',
          ],
        };
      case 'konami':
        return {
          output: [
            '↑ ↑ ↓ ↓ ← → ← → B A',
            '',
            'Developer cheat code activated.',
          ],
        };
      case 'fortune':
        return { output: [FORTUNES[Math.floor(Math.random() * FORTUNES.length)]] };
      case 'debug':
        return this.handleDebugStart();
      case 'unlock':
        return {
          output: [
            'Developer mode unlocked.',
            '',
            'Hidden commands discovered:',
            'matrix',
            'fortune',
            'debug',
          ],
        };
      default:
        return {
          output: [
            `${command}: command not found`,
            "run 'help' to see available commands.",
          ],
        };
    }
  }

  private handleLs(target?: string): CommandExecutionResult {
    try {
      const entries = this.vfs.list(target);
      return {
        output: this.withHint(
          entries.map((entry) => (entry.type === 'directory' ? `${entry.name}/` : entry.name)),
          'ls'
        ),
      };
    } catch (error) {
      return { output: [error instanceof Error ? error.message : String(error)] };
    }
  }

  private handleCd(target?: string): CommandExecutionResult {
    try {
      this.vfs.changeDirectory(target ?? '~');
      return { output: [] };
    } catch (error) {
      return { output: [error instanceof Error ? error.message : String(error)] };
    }
  }

  private handleCat(target?: string): CommandExecutionResult {
    if (!target) {
      return { output: ['cat: missing file operand'] };
    }

    try {
      return { output: this.vfs.readFile(target).split('\n') };
    } catch (error) {
      return { output: [error instanceof Error ? error.message : String(error)] };
    }
  }

  private handleNano(target?: string): CommandExecutionResult {
    if (!target) {
      return { output: ['nano: missing file name'] };
    }

    try {
      const content = this.vfs.readFile(target).split('\n');
      const fileName = target.split('/').filter(Boolean).pop() ?? target;

      return {
        output: [],
        editor: {
          fileName,
          content,
        },
      };
    } catch (error) {
      return { output: [error instanceof Error ? error.message : String(error)] };
    }
  }

  private handleGit(args: string[]): CommandExecutionResult {
    if (args[0] === 'log' && args[1] === '--oneline') {
      return {
        output: GIT_COMMITS.map((commit) => `${commit.hash} ${commit.title}`),
      };
    }

    if (args[0] === 'log') {
      return {
        output: GIT_COMMITS.flatMap((commit) => [
          `commit ${commit.hash}`,
          'Author: Enes Barutcu',
          `Date: ${commit.date}`,
          '',
          commit.body,
          '',
        ]),
      };
    }

    if (args[0] === 'show' && args[1]) {
      const commit = GIT_COMMITS.find((entry) => entry.hash === args[1]);
      if (!commit) {
        return { output: [`git show: unknown revision '${args[1]}'`] };
      }

      return {
        output: [
          `commit ${commit.hash}`,
          'Author: Enes Barutcu',
          '',
          ...commit.details,
        ],
      };
    }

    return {
      output: [
        'git: supported commands',
        '  git log',
        '  git log --oneline',
        '  git show <commit>',
      ],
    };
  }

  private handlePing(target?: string): CommandExecutionResult {
    if (!target) {
      return { output: ['ping: missing host operand'] };
    }

    return {
      output: [
        `PING ${target} server...`,
        '',
        '64 bytes from prod: latency 3ms',
        '',
        'System stable.',
      ],
    };
  }

  private handleSudo(args: string[]): CommandExecutionResult {
    return { output: ['Permission denied: nice try.'] };
  }

  private handleDebugStart(): CommandExecutionResult {
    this.interactiveMode = 'debug';
    return {
      output: [
        'Simulating production incident...',
        '',
        'Memory leak detected.',
        '',
        'Choose action:',
        '1 restart service',
        '2 inspect logs',
        '3 blame DNS',
      ],
    };
  }

  private handleDebugChoice(choice: string): CommandExecutionResult {
    if (choice === '1') {
      this.interactiveMode = 'none';
      return {
        output: [
          'Restarting service...',
          'Leak paused, pager still angry.',
        ],
      };
    }

    if (choice === '2') {
      this.interactiveMode = 'none';
      return {
        output: [
          'Inspecting logs...',
          'Found 17 warnings, 1 clue, and a TODO from six months ago.',
        ],
      };
    }

    if (choice === '3') {
      this.interactiveMode = 'none';
      return {
        output: [
          'Blaming DNS...',
          'Morale improved. Root cause unchanged.',
        ],
      };
    }

    return {
      output: [
        'Invalid option.',
        'Choose 1, 2, or 3.',
      ],
    };
  }

  private readTextFile(fileName: string): string[] {
    try {
      return this.vfs.readFile(`~/${fileName}`).split('\n');
    } catch {
      return [fileName];
    }
  }

  private tokenize(input: string): string[] {
    const matches = input.match(/"([^"]*)"|'([^']*)'|\S+/g) ?? [];
    return matches.map((token) => token.replace(/^['"]|['"]$/g, ''));
  }

  private withHint(lines: string[], command: string): string[] {
    if (command === 'help') {
      return [...lines, '', 'Some commands are hidden. Curiosity is rewarded.'];
    }

    if (this.commandCount % 3 !== 0 || lines.length === 0) {
      return lines;
    }

    const hint = DISCOVERY_HINTS[(this.commandCount / 3 - 1) % DISCOVERY_HINTS.length];
    return [...lines, '', hint];
  }
}
