import { createPortfolioFileContents } from './portfolioContent';

type FileType = 'file' | 'directory';

export interface FileSystemNode {
	name: string;
	type: FileType;
	content?: string;
	children?: Record<string, FileSystemNode>;
}

interface CompletionOptions {
	directoriesOnly?: boolean;
}

export class VirtualFileSystem {
	private readonly root: FileSystemNode;
	private currentPath: string[] = ['home', 'enes'];

	constructor() {
		this.root = this.createStructure();
	}

	reset() {
		this.currentPath = ['home', 'enes'];
	}

	getCurrentPath(): string {
		return `/${this.currentPath.join('/')}`;
	}

	getDisplayPath(): string {
		if (this.currentPath.length === 2 && this.currentPath[0] === 'home' && this.currentPath[1] === 'enes') {
			return '~';
		}

		if (this.currentPath[0] === 'home' && this.currentPath[1] === 'enes') {
			return `~/${this.currentPath.slice(2).join('/')}`;
		}

		return this.getCurrentPath();
	}

	list(target = '.'): FileSystemNode[] {
		const node = this.resolvePath(target);
		if (!node) {
			throw new Error(`ls: cannot access '${target}': No such file or directory`);
		}
		if (node.type !== 'directory') {
			return [node];
		}

		return Object.values(node.children ?? {}).sort((left, right) => {
			if (left.type !== right.type) {
				return left.type === 'directory' ? -1 : 1;
			}
			return left.name.localeCompare(right.name);
		});
	}

	changeDirectory(target = '~') {
		const node = this.resolvePath(target);
		if (!node) {
			throw new Error(`cd: ${target}: No such file or directory`);
		}
		if (node.type !== 'directory') {
			throw new Error(`cd: ${target}: Not a directory`);
		}

		this.currentPath = this.resolveSegments(target);
	}

	readFile(target: string): string {
		const node = this.resolvePath(target);
		if (!node) {
			throw new Error(`cat: ${target}: No such file or directory`);
		}
		if (node.type !== 'file') {
			throw new Error(`cat: ${target}: Is a directory`);
		}

		return node.content ?? '';
	}

	completePath(fragment: string, options: CompletionOptions = {}): string[] {
		const { basePath, partial } = this.splitCompletionFragment(fragment);
		const directory = this.resolvePath(basePath || '.');

		if (!directory || directory.type !== 'directory') {
			return [];
		}

		const matches = Object.values(directory.children ?? {})
			.filter((entry) => entry.name.startsWith(partial))
			.filter((entry) => !options.directoriesOnly || entry.type === 'directory')
			.sort((left, right) => left.name.localeCompare(right.name))
			.map((entry) => {
				const prefix = basePath && basePath !== '.' ? `${basePath.replace(/\/$/, '')}/` : '';
				return `${prefix}${entry.name}${entry.type === 'directory' ? '/' : ''}`;
			});

		return matches;
	}

	private createStructure(): FileSystemNode {
		const fileContents = createPortfolioFileContents();

		const projects: Record<string, FileSystemNode> = {
			'paket7.md': this.file('paket7.md', [
				'# paket7',
				'',
				'Package tracking aggregator for Turkish carriers.',
				'Built to unify shipment visibility behind one streamlined interface.',
				'',
				'stack: Next.js, TypeScript, API integrations',
			].join('\n')),
			'ta-store.md': this.file('ta-store.md', [
				'# ta-store',
				'',
				'Modern commerce platform and internal operations surface.',
				'Focused on backend extensibility, store tooling, and clean UX.',
				'',
				'stack: Medusa, Next.js, PostgreSQL',
			].join('\n')),
			'enes-codes.md': this.file('enes-codes.md', [
				'# enes.codes',
				'',
				'Interactive portfolio dashboard with terminal-driven exploration.',
				'Designed to communicate engineering capability with product-grade UI.',
				'',
				'stack: Next.js, TypeScript, Framer Motion',
			].join('\n')),
		};

		const systems: Record<string, FileSystemNode> = {
			'automation-platform.md': this.file('automation-platform.md', [
				'# automation-platform',
				'',
				'Workflow automation for approvals, provisioning, and support operations.',
				'Designed around reliability, auditability, and reduced manual work.',
			].join('\n')),
			'support-automation.md': this.file('support-automation.md', [
				'# support-automation',
				'',
				'Internal operations tooling for repetitive IT workflows and ticket reduction.',
				'Focused on scripting, orchestration, and operator efficiency.',
			].join('\n')),
		};

		const docs: Record<string, FileSystemNode> = {
			'resume.md': this.file('resume.md', [
				'# resume snapshot',
				'',
				'Application Support Engineer with strong automation, identity, and tooling focus.',
				'Ships internal systems that improve reliability, speed, and operator clarity.',
			].join('\n')),
			'now.md': this.file('now.md', [
				'# now',
				'',
				'Currently focused on automation systems, platform engineering, and workflow tooling.',
			].join('\n')),
		};

		const research: Record<string, FileSystemNode> = {
			'llm-code-review.md': this.file('llm-code-review.md', [
				'# llm-code-review',
				'',
				'Notes on AI-assisted review workflows, confidence thresholds, and human-in-the-loop approval.',
			].join('\n')),
			'query-optimization-notes.md': this.file('query-optimization-notes.md', [
				'# query-optimization-notes',
				'',
				'Research notes on indexing strategy, cache-aware queries, and operational database tuning.',
			].join('\n')),
		};

		const homeEnesChildren: Record<string, FileSystemNode> = {
			'about.txt': this.file('about.txt', fileContents.about),
			'skills.txt': this.file('skills.txt', fileContents.skills),
			'contact.txt': this.file('contact.txt', fileContents.contact),
			'resume.md': this.file('resume.md', [
				'# resume',
				'',
				'Application Support Engineer',
				'Automation, identity systems, platform engineering, developer tooling',
			].join('\n')),
			projects: this.directory('projects', projects),
			systems: this.directory('systems', systems),
			research: this.directory('research', research),
			docs: this.directory('docs', docs),
		};

		return this.directory('', {
			home: this.directory('home', {
				enes: this.directory('enes', homeEnesChildren),
			}),
			projects: this.directory('projects', projects),
			systems: this.directory('systems', systems),
			research: this.directory('research', research),
			docs: this.directory('docs', docs),
		});
	}

	private directory(name: string, children: Record<string, FileSystemNode> = {}): FileSystemNode {
		return { name, type: 'directory', children };
	}

	private file(name: string, content: string): FileSystemNode {
		return { name, type: 'file', content };
	}

	private resolvePath(target: string): FileSystemNode | null {
		const segments = this.resolveSegments(target);
		let current: FileSystemNode = this.root;

		for (const segment of segments) {
			if (current.type !== 'directory') {
				return null;
			}

			const next = current.children?.[segment];
			if (!next) {
				return null;
			}
			current = next;
		}

		return current;
	}

	private resolveSegments(target: string): string[] {
		if (!target || target === '.') {
			return [...this.currentPath];
		}

		const startsAtHome = target === '~' || target.startsWith('~/');
		const startsAbsolute = target.startsWith('/');

		const rawSegments = target
			.replace(/^~\/?/, 'home/enes/')
			.split('/')
			.filter(Boolean);

		const resolved = startsAbsolute
			? []
			: startsAtHome
				? []
				: [...this.currentPath];

		for (const segment of rawSegments) {
			if (segment === '.') {
				continue;
			}

			if (segment === '..') {
				resolved.pop();
				continue;
			}

			resolved.push(segment);
		}

		return resolved;
	}

	private splitCompletionFragment(fragment: string): { basePath: string; partial: string } {
		if (!fragment) {
			return { basePath: '.', partial: '' };
		}

		const clean = fragment.replace(/\/$/, '');
		const lastSlashIndex = clean.lastIndexOf('/');

		if (lastSlashIndex === -1) {
			return { basePath: '.', partial: clean };
		}

		const basePath = clean.slice(0, lastSlashIndex + 1);
		const partial = clean.slice(lastSlashIndex + 1);
		return { basePath, partial };
	}
}
