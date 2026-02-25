export interface FileNode {
  type: "file" | "directory";
  name: string;
  content?: string;
  children?: Map<string, FileNode>;
  permissions?: string;
  size?: number;
  modified?: Date;
}

class VirtualFilesystem {
  private root: FileNode;
  private currentPath: string[] = [];

  constructor() {
    this.root = this.createInitialStructure();
  }

  private createInitialStructure(): FileNode {
    const root: FileNode = {
      type: "directory",
      name: "",
      children: new Map()
    };

    // Create basic directory structure
    const home = this.createDirectory("home");
    const enes = this.createDirectory("enes");

    // Add user directories
    enes.children!.set("projects", this.createDirectory("projects"));
    enes.children!.set("about", this.createDirectory("about"));
    enes.children!.set("notes", this.createDirectory("notes"));

    // Add some files
    enes.children!.set("README.md", this.createFile("README.md", `# Enes Barutcu

Full-stack engineer specializing in distributed systems and cloud architecture.

## Current Focus
- Building scalable web applications
- Exploring AI/ML integration
- Open source contributions

## Tech Stack
- Languages: TypeScript, Python, Go
- Frameworks: React, Next.js, Node.js
- Cloud: AWS, GCP, Kubernetes
- Databases: PostgreSQL, Redis, MongoDB
`));

    enes.children!.set(".bashrc", this.createFile(".bashrc", `# Personal bash configuration
export PS1="\\u@\\h:\\w\\$ "
export EDITOR=vim
export PATH="$HOME/bin:$PATH"

# Aliases
alias ll='ls -alF'
alias la='ls -A'
alias l='ls -CF'
alias ..='cd ..'
alias ...='cd ../..'
`));

    // Projects directory
    const projects = enes.children!.get("projects")!;
    projects.children!.set("portfolio", this.createDirectory("portfolio"));
    projects.children!.set("api-gateway", this.createDirectory("api-gateway"));
    projects.children!.set("monitoring", this.createDirectory("monitoring"));

    projects.children!.set("portfolio", this.createFile("portfolio/README.md", `# Portfolio Website

A modern, responsive portfolio built with Next.js 14 and TypeScript.

## Features
- Terminal-based interface
- Real-time command execution
- SSH simulation
- Responsive design
- Dark theme

## Tech Stack
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
`));

    home.children!.set("enes", enes);
    root.children!.set("home", home);

    // Add some system directories
    root.children!.set("etc", this.createDirectory("etc"));
    root.children!.set("var", this.createDirectory("var"));
    root.children!.set("usr", this.createDirectory("usr"));

    return root;
  }

  private createDirectory(name: string): FileNode {
    return {
      type: "directory",
      name,
      children: new Map(),
      permissions: "drwxr-xr-x",
      modified: new Date()
    };
  }

  private createFile(name: string, content: string = ""): FileNode {
    return {
      type: "file",
      name,
      content,
      permissions: "-rw-r--r--",
      size: content.length,
      modified: new Date()
    };
  }

  getCurrentDirectory(): FileNode {
    let current = this.root;
    for (const dir of this.currentPath) {
      if (current.children && current.children.has(dir)) {
        current = current.children.get(dir)!;
      } else {
        break;
      }
    }
    return current;
  }

  getCurrentPath(): string {
    return "/" + this.currentPath.join("/");
  }

  listDirectory(path?: string): FileNode[] {
    let targetDir = this.getCurrentDirectory();

    if (path) {
      const resolved = this.resolvePath(path);
      if (!resolved || resolved.type !== "directory") {
        throw new Error(`ls: ${path}: No such file or directory`);
      }
      targetDir = resolved;
    }

    if (!targetDir.children) return [];

    return Array.from(targetDir.children.values()).sort((a, b) => {
      // Directories first, then files, alphabetical
      if (a.type !== b.type) {
        return a.type === "directory" ? -1 : 1;
      }
      return a.name.localeCompare(b.name);
    });
  }

  changeDirectory(path: string): void {
    if (!path || path === "~") {
      this.currentPath = ["home", "enes"];
      return;
    }

    if (path === "/") {
      this.currentPath = [];
      return;
    }

    if (path === "..") {
      this.currentPath.pop();
      return;
    }

    if (path.startsWith("/")) {
      // Absolute path
      const parts = path.split("/").filter(p => p);
      let current = this.root;

      for (const part of parts) {
        if (part === "..") {
          // Go up one level
          if (current !== this.root) {
            // This is simplified - in a real filesystem we'd track parent pointers
            throw new Error("cd: .. not supported in absolute paths");
          }
        } else if (current.children && current.children.has(part)) {
          current = current.children.get(part)!;
          if (current.type !== "directory") {
            throw new Error(`cd: ${part}: Not a directory`);
          }
        } else {
          throw new Error(`cd: ${path}: No such file or directory`);
        }
      }

      this.currentPath = parts;
    } else {
      // Relative path
      const parts = path.split("/").filter(p => p);
      let current = this.getCurrentDirectory();

      for (const part of parts) {
        if (part === "..") {
          if (this.currentPath.length > 0) {
            this.currentPath.pop();
            current = this.getCurrentDirectory();
          }
        } else if (current.children && current.children.has(part)) {
          const next = current.children.get(part)!;
          if (next.type === "directory") {
            this.currentPath.push(part);
            current = next;
          } else {
            throw new Error(`cd: ${part}: Not a directory`);
          }
        } else {
          throw new Error(`cd: ${path}: No such file or directory`);
        }
      }
    }
  }

  readFile(path: string): string {
    const file = this.resolvePath(path);
    if (!file) {
      throw new Error(`cat: ${path}: No such file or directory`);
    }
    if (file.type !== "file") {
      throw new Error(`cat: ${path}: Is a directory`);
    }
    return file.content || "";
  }

  private resolvePath(path: string): FileNode | null {
    if (!path) return this.getCurrentDirectory();

    let parts: string[];
    let startDir: FileNode;

    if (path.startsWith("/")) {
      // Absolute path
      parts = path.split("/").filter(p => p);
      startDir = this.root;
    } else {
      // Relative path
      parts = path.split("/").filter(p => p);
      startDir = this.getCurrentDirectory();
    }

    let current = startDir;
    for (const part of parts) {
      if (part === "..") {
        // Simplified - just go to root for now
        current = this.root;
      } else if (part === ".") {
        continue;
      } else if (current.children && current.children.has(part)) {
        current = current.children.get(part)!;
      } else {
        return null;
      }
    }

    return current;
  }
}

export const virtualFilesystem = new VirtualFilesystem();