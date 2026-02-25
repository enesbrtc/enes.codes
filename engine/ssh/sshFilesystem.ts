// SSH Filesystem - Simulates remote server filesystem
interface FileNode {
  type: 'file' | 'directory';
  content?: string;
  children?: Map<string, FileNode>;
}

class SSHFilesystem {
  private root: FileNode;

  constructor() {
    this.root = this.createFilesystem();
  }

  private createFilesystem(): FileNode {
    const root: FileNode = {
      type: 'directory',
      children: new Map()
    };

    // Create home directory structure
    const home = this.createDirectory('home');
    const enes = this.createDirectory('enes');

    // Add some files
    enes.children!.set('.bashrc', {
      type: 'file',
      content: '# SSH Server .bashrc\n# Welcome to enes.codes SSH server\n\necho "Welcome to the remote server!"\nalias ll="ls -la"\n'
    });

    enes.children!.set('README.md', {
      type: 'file',
      content: 'Welcome to enes.codes SSH server!\n\nThis is a simulated remote environment.\nYou can explore the filesystem using standard commands.\n\n- ls: list directory contents\n- cd: change directory\n- cat: display file contents\n- pwd: print working directory\n- exit: disconnect from SSH\n'
    });

    enes.children!.set('README.txt', {
      type: 'file',
      content: 'Welcome to enes.codes SSH server!\n\nThis is a simulated remote environment.\nYou can explore the filesystem using standard commands.\n\n- ls: list directory contents\n- cd: change directory\n- cat: display file contents\n- pwd: print working directory\n- exit: disconnect from SSH\n'
    });

    enes.children!.set('projects', this.createDirectory('projects'));
    enes.children!.set('config', this.createDirectory('config'));

    // Add project files
    const projects = enes.children!.get('projects')!;
    projects.children!.set('portfolio.md', {
      type: 'file',
      content: '# Portfolio Project\n\nThis interactive terminal portfolio demonstrates:\n- Real-time command execution\n- Virtual filesystem navigation\n- SSH simulation\n- Engineering identity presentation\n\nBuilt with Next.js, TypeScript, and modern web technologies.\n'
    });

    projects.children!.set('api-gateway.md', {
      type: 'file',
      content: '# API Gateway Service\n\nA microservices orchestration layer built with Go and Kubernetes.\n\nFeatures:\n- Service discovery\n- Load balancing\n- Authentication\n- Rate limiting\n- Distributed tracing\n'
    });

    home.children!.set('enes', enes);
    root.children!.set('home', home);

    // Create some system directories
    root.children!.set('etc', this.createDirectory('etc'));
    root.children!.set('var', this.createDirectory('var'));
    root.children!.set('usr', this.createDirectory('usr'));

    return root;
  }

  private createDirectory(name: string): FileNode {
    return {
      type: 'directory',
      children: new Map()
    };
  }

  private resolvePath(cwd: string, path: string): string {
    if (path.startsWith('/')) {
      return path;
    }

    const parts = cwd.split('/').filter(p => p);
    const pathParts = path.split('/').filter(p => p);

    for (const part of pathParts) {
      if (part === '..') {
        parts.pop();
      } else if (part !== '.') {
        parts.push(part);
      }
    }

    return '/' + parts.join('/');
  }

  private getNode(path: string): FileNode | null {
    const parts = path.split('/').filter(p => p);
    let current = this.root;

    for (const part of parts) {
      if (current.type !== 'directory' || !current.children) {
        return null;
      }
      const next = current.children.get(part);
      if (!next) return null;
      current = next;
    }

    return current;
  }

  listDirectory(path: string): string[] {
    const node = this.getNode(path);
    if (!node || node.type !== 'directory' || !node.children) {
      return [`ls: ${path}: No such file or directory`];
    }

    const items: string[] = [];
    for (const [name, child] of Array.from(node.children)) {
      if (child.type === 'directory') {
        items.push(`${name}/`);
      } else {
        items.push(name);
      }
    }

    return items.sort();
  }

  changeDirectory(cwd: string, path: string): string | null {
    const targetPath = this.resolvePath(cwd, path);
    const node = this.getNode(targetPath);

    if (!node || node.type !== 'directory') {
      return null;
    }

    return targetPath;
  }

  readFile(cwd: string, filename: string): string[] | null {
    const targetPath = this.resolvePath(cwd, filename);
    const node = this.getNode(targetPath);

    if (!node || node.type !== 'file' || !node.content) {
      return null;
    }

    return node.content.split('\n');
  }
}

export const sshFilesystem = new SSHFilesystem();