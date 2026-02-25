import { registerCommand, CommandContext } from "../kernel/terminalKernel";
import { Kernel } from "../kernel/kernel";
import { enableEngineerMode } from "../../lib/engineerMode";
import { setMachineState } from "../system/systemState";
import { connect } from "../ssh/sshSession";
import { setContext } from "../shell/shellContext";
import { setInputMode } from "../system/inputMode";
import { setShell, getShell } from "../shell/shellController";
import { virtualFilesystem } from "../kernel/virtualFilesystem";

export function register(kernel: Kernel) {
  // Helper function for command-specific help
  function getCommandHelp(command: string): string[] | null {
    switch (command.toLowerCase()) {
      case "ssh":
        return [
          "ssh <host> - Connect to remote systems",
          "",
          "Examples:",
          "  ssh enes.codes    → Connect to main server",
          "  ssh production    → Connect to production environment",
          "  ssh staging       → Connect to staging environment",
          "",
          "Once connected, use standard filesystem commands."
        ];
      case "ls":
        return [
          "ls - List directory contents",
          "",
          "Examples:",
          "  ls           → List current directory",
          "  ls -la       → List with details",
          "  ls projects  → List projects directory"
        ];
      case "cd":
        return [
          "cd <directory> - Change current directory",
          "",
          "Examples:",
          "  cd projects     → Enter projects directory",
          "  cd ..          → Go up one directory",
          "  cd /           → Go to root directory"
        ];
      case "cat":
        return [
          "cat <file> - Display file contents",
          "",
          "Examples:",
          "  cat README.md     → Show readme file",
          "  cat notes.txt     → Show notes",
          "  cat ~/.profile    → Show profile"
        ];
      case "projects":
        return [
          "projects - Display engineering projects portfolio",
          "",
          "Shows recent systems built, technologies used,",
          "and project descriptions."
        ];
      case "stack":
        return [
          "stack - Display technology stack and expertise",
          "",
          "Shows programming languages, frameworks, tools,",
          "and methodologies used in development."
        ];
      case "experience":
        return [
          "experience - Display professional background",
          "",
          "Shows work history, roles, achievements,",
          "and engineering experience."
        ];
      case "deploy":
        return [
          "deploy - Unlock engineer mode",
          "",
          "Enables access to engineering-specific commands",
          "and advanced terminal features."
        ];
      default:
        return null;
    }
  }
  // GLOBAL COMMANDS - Work in all environments

  // Help command - Intelligent onboarding experience
  kernel.registerCommand("help", async (ctx: CommandContext) => {
    const commandArg = ctx.args[0];

    if (commandArg) {
      // Specific command help
      const helpText = getCommandHelp(commandArg);
      if (helpText) {
        ctx.pushOutput(helpText);
      } else {
        ctx.pushOutput([
          `No help available for '${commandArg}'.`,
          "",
          "Type 'help' for general guidance."
        ]);
      }
      return;
    }

    // General onboarding help
    ctx.pushOutput([
      "Welcome to enes.codes engineering workstation.",
      "",
      "Start here:",
      "  deploy          → unlock engineer mode",
      "  ssh enes.codes  → enter remote environment",
      "  projects        → view systems built",
      "  stack           → technology stack",
      "  experience      → engineering background",
      "",
      "Explore:",
      "  ls              → browse filesystem",
      "  cd              → move directories",
      "  cat README.md   → discover hidden notes",
      "",
      "Hidden commands exist.",
      "Curiosity is rewarded."
    ]);
  }, { scope: "global" });

  // Clear command
  kernel.registerCommand("clear", async (ctx: CommandContext) => {
    // Import terminal buffer here to avoid circular dependency
    const { terminalBuffer } = await import("../kernel/terminalBuffer");
    terminalBuffer.clear();
  }, { scope: "global" });

  // Exit command
  // Exit command
  kernel.registerCommand("exit", async (ctx: CommandContext) => {
    ctx.pushOutput("closing session...");
    // Import closeTerminal function dynamically to avoid circular dependency
    const { closeTerminal } = await import("../../lib/terminalState");
    closeTerminal();
    setMachineState("idle");
  }, { scope: "global" });

  // FILESYSTEM COMMANDS - Global

  // ls command
  kernel.registerCommand("ls", async (ctx: CommandContext) => {
    try {
      const path = ctx.args[0] || ".";
      const entries = virtualFilesystem.listDirectory(path);

      const output = entries.map(entry => {
        const prefix = entry.type === "directory" ? "/" : "";
        return entry.name + prefix;
      });

      ctx.pushOutput(output.length > 0 ? output : []);
    } catch (error) {
      ctx.pushOutput(`ls: ${error instanceof Error ? error.message : String(error)}`);
    }
  }, { scope: "global" });

  // cd command
  kernel.registerCommand("cd", async (ctx: CommandContext) => {
    try {
      const path = ctx.args[0];
      virtualFilesystem.changeDirectory(path);
    } catch (error) {
      ctx.pushOutput(`cd: ${error instanceof Error ? error.message : String(error)}`);
    }
  }, { scope: "global" });

  // pwd command
  kernel.registerCommand("pwd", async (ctx: CommandContext) => {
    ctx.pushOutput(virtualFilesystem.getCurrentPath());
  }, { scope: "global" });

  // cat command
  kernel.registerCommand("cat", async (ctx: CommandContext) => {
    try {
      const path = ctx.args[0];
      if (!path) {
        ctx.pushOutput("cat: missing file operand");
        return;
      }
      const content = virtualFilesystem.readFile(path);
      ctx.pushOutput(content.split("\n"));
    } catch (error) {
      ctx.pushOutput(`cat: ${error instanceof Error ? error.message : String(error)}`);
    }
  }, { scope: "global" });

  // ENGINEERING IDENTITY COMMANDS

  // Projects command
  kernel.registerCommand("projects", async (ctx: CommandContext) => {
    ctx.pushOutput([
      "RECENT PROJECTS",
      "===============",
      "",
      "🏗️  Portfolio Terminal",
      "   Interactive engineering workstation simulation",
      "   Next.js 14, TypeScript, real-time command execution",
      "",
      "🚀 API Gateway Service",
      "   Microservices orchestration layer",
      "   Go, Kubernetes, distributed tracing",
      "",
      "📊 Monitoring Dashboard",
      "   Real-time system observability platform",
      "   React, D3.js, WebSocket streaming",
      "",
      "🔧 DevOps Automation",
      "   Infrastructure as Code pipelines",
      "   Terraform, Ansible, CI/CD workflows",
      "",
      "📱 Mobile App Suite",
      "   Cross-platform business applications",
      "   React Native, Redux, offline-first design",
      "",
      "For more details: cat ~/projects/portfolio/README.md"
    ]);
  }, { scope: "engineer" });

  // Stack command
  kernel.registerCommand("stack", async (ctx: CommandContext) => {
    ctx.pushOutput([
      "TECH STACK & EXPERTISE",
      "======================",
      "",
      "🎯 PRIMARY FOCUS",
      "• Full-Stack Web Development",
      "• Distributed Systems Architecture",
      "• Cloud-Native Applications",
      "• DevOps & Infrastructure",
      "",
      "💻 LANGUAGES",
      "• TypeScript/JavaScript (Primary)",
      "• Python (Data & Automation)",
      "• Go (Systems & APIs)",
      "• SQL (Database Design)",
      "",
      "🛠️  FRAMEWORKS & TOOLS",
      "• React/Next.js (Frontend)",
      "• Node.js/Express (Backend)",
      "• PostgreSQL/Redis (Data)",
      "• Docker/Kubernetes (Containers)",
      "• AWS/GCP (Cloud)",
      "",
      "🔄 METHODOLOGIES",
      "• Test-Driven Development",
      "• Continuous Integration/Deployment",
      "• Infrastructure as Code",
      "• Agile Development Practices"
    ]);
  }, { scope: "engineer" });

  // Experience command
  kernel.registerCommand("experience", async (ctx: CommandContext) => {
    ctx.pushOutput([
      "PROFESSIONAL EXPERIENCE",
      "=======================",
      "",
      "🚀 Senior Full-Stack Engineer",
      "   TechCorp Inc. | 2022-Present",
      "   • Led development of microservices architecture serving 1M+ users",
      "   • Reduced deployment time by 70% through CI/CD automation",
      "   • Mentored 5 junior developers in modern web technologies",
      "",
      "🏗️  Systems Engineer",
      "   CloudTech Solutions | 2020-2022",
      "   • Designed and implemented cloud infrastructure for fintech platform",
      "   • Built real-time data processing pipelines handling 10TB/day",
      "   • Improved system reliability from 99.5% to 99.99% uptime",
      "",
      "💻 Software Developer",
      "   StartupXYZ | 2018-2020",
      "   • Developed MVP for AI-powered analytics platform",
      "   • Integrated 3rd-party APIs and built responsive web interfaces",
      "   • Collaborated with cross-functional teams in agile environment",
      "",
      "🎓 Education",
      "   B.S. Computer Science | University of Technology",
      "   • Focus: Distributed Systems & Software Engineering",
      "   • GPA: 3.8/4.0 | Magna Cum Laude"
    ]);
  }, { scope: "engineer" });

  // Now command
  kernel.registerCommand("now", async (ctx: CommandContext) => {
    ctx.pushOutput([
      "CURRENTLY WORKING ON",
      "====================",
      "",
      "🔬 Learning & Exploration",
      "• Deepening knowledge in AI/ML integration patterns",
      "• Exploring Rust for systems programming",
      "• Studying distributed consensus algorithms",
      "",
      "📚 Reading",
      "• 'Designing Data-Intensive Applications' by Martin Kleppmann",
      "• 'Site Reliability Engineering' by Google SRE team",
      "• Research papers on CRDTs and eventual consistency",
      "",
      "🎯 Goals for 2024",
      "• Contribute to open-source distributed systems projects",
      "• Build and deploy a production ML-powered application",
      "• Speak at a tech conference about engineering excellence",
      "",
      "💡 Personal Projects",
      "• Terminal-based portfolio (you're using it!)",
      "• Home lab Kubernetes cluster",
      "• Automated deployment pipelines for personal projects"
    ]);
  }, { scope: "engineer" });

  // Contact command
  kernel.registerCommand("contact", async (ctx: CommandContext) => {
    ctx.pushOutput([
      "GET IN TOUCH",
      "=============",
      "",
      "📧 Email: enes.barutcu@engineering.com",
      "💼 LinkedIn: /in/enesbarutcu",
      "🐙 GitHub: @enesbarutcu",
      "📱 Twitter: @enesbarutcu",
      "",
      "🌍 Location: San Francisco, CA",
      "⏰ Timezone: PST (UTC-8)",
      "",
      "💡 Open to opportunities in:",
      "• Full-stack engineering roles",
      "• Technical leadership positions",
      "• Startup founding/early employee",
      "• Consulting & architecture work",
      "",
      "📅 Response time: Usually within 24 hours",
      "🤝 Preferred contact: Email or LinkedIn message"
    ]);
  }, { scope: "engineer" });

  // Resume command
  kernel.registerCommand("resume", async (ctx: CommandContext) => {
    ctx.pushOutput([
      "RESUME DOWNLOAD",
      "===============",
      "",
      "📄 PDF Version Available",
      "   Download: curl -O https://enes.barutcu/resume.pdf",
      "",
      "📊 Key Highlights:",
      "   • 6+ years of software engineering experience",
      "   • Led teams building systems serving millions of users",
      "   • Expert in full-stack web development & cloud architecture",
      "   • Strong background in DevOps and infrastructure automation",
      "",
      "🔗 Quick Links:",
      "   • Portfolio: https://enes.barutcu",
      "   • GitHub: https://github.com/enesbarutcu",
      "   • LinkedIn: https://linkedin.com/in/enesbarutcu",
      "",
      "💡 Tip: Use 'experience' command for detailed work history"
    ]);
  }, { scope: "engineer" });

  // ENVIRONMENT-SPECIFIC COMMANDS

  // Deploy command (Engineer mode only)
  kernel.registerCommand("deploy", async (ctx: CommandContext) => {
    enableEngineerMode();
    setMachineState("engineer");
    setContext("engineer");
    ctx.pushOutput(["SYSTEM ACCESS GRANTED", "Engineer mode activated"]);
  }, { scope: "engineer" });

  // SSH command (Engineer mode only)
  kernel.registerCommand("ssh", async (ctx: CommandContext) => {
    const host = ctx.args[0];
    if (!host) {
      ctx.pushOutput(["ssh: missing host operand"]);
      return;
    }

    // Prevent starting new SSH if already in SSH mode
    const currentShell = getShell();
    if (currentShell === "ssh" || currentShell === "ssh-auth") {
      ctx.pushOutput(["ssh: already connected to remote system", "Use 'exit' to disconnect first"]);
      return;
    }

    connect(host); // This sets session to SSH username state
    setShell("ssh-auth");
    setContext("ssh");
    ctx.pushOutput([
      `Connecting to ${host}...`,
      "Verifying host fingerprint...",
      "Connection established.",
      "",
      "login: "
    ]);
  }, { scope: "engineer" });
}