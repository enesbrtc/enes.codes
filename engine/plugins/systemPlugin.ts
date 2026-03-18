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

  // Help command - Updated for portfolio
  kernel.registerCommand("help", async (ctx: CommandContext) => {
    ctx.pushOutput([
      "Available Commands:",
      "",
      "about          Show professional bio",
      "whoami         Display current user info",
      "projects       List portfolio projects",
      "project <name> Show project details",
      "systems        Show engineering systems",
      "stack          Display technology stack",
      "skills         Display technical skills",
      "experience     Show work experience",
      "contact        Display contact information",
      "resume         Show CV summary",
      "status         Show current engineering focus",
      "uptime         Display system uptime",
      "debug life     Run life diagnostics",
      "sudo hire-me   Apply for engineering position",
      "clear          Clear terminal output",
      "exit           Close terminal",
      "",
      "Try 'projects' or 'whoami' to get started."
    ]);
  }, { scope: "global" });

  // About command
  kernel.registerCommand("about", async (ctx: CommandContext) => {
    ctx.pushOutput([
      "Enes Barutcu",
      "Application & Platform Engineer",
      "",
      "Full-stack engineer transitioning from operations to engineering,",
      "building systems that matter. Passionate about distributed systems,",
      "cloud architecture, and creating exceptional user experiences.",
      "",
      "Currently focused on:",
      "• Full-stack web development with modern technologies",
      "• Cloud-native application architecture",
      "• DevOps and infrastructure automation",
      "• Open source contributions and technical writing"
    ]);
  }, { scope: "global" });

  // Projects command - Updated format
  kernel.registerCommand("projects", async (ctx: CommandContext) => {
    ctx.pushOutput([
      "Available Projects",
      "",
      "1. Paket7",
      "   Package tracking aggregator for Turkish carriers.",
      "",
      "2. TA Store Marketplace",
      "   Modern e-commerce platform built with Medusa.",
      "",
      "3. enes.codes",
      "   Engineering portfolio built with Next.js.",
      "",
      "Use 'project <name>' for detailed information."
    ]);
  }, { scope: "global" });

  // Project command - Show specific project details
  kernel.registerCommand("project", async (ctx: CommandContext) => {
    const projectName = ctx.args[0]?.toLowerCase();

    if (!projectName) {
      ctx.pushOutput("Usage: project <name>");
      ctx.pushOutput("Available projects: paket7, ta-store, enes-codes");
      return;
    }

    switch (projectName) {
      case "paket7":
        ctx.pushOutput([
          "Paket7 - Package Tracking Aggregator",
          "====================================",
          "",
          "A comprehensive package tracking solution that aggregates",
          "tracking information from multiple Turkish carriers into",
          "a single, unified interface.",
          "",
          "Technologies:",
          "• Next.js 14 with TypeScript",
          "• Tailwind CSS for styling",
          "• Real-time tracking APIs",
          "• Responsive mobile-first design",
          "",
          "Features:",
          "• Multi-carrier support",
          "• Real-time status updates",
          "• Mobile-optimized interface",
          "• Automated tracking notifications"
        ]);
        break;

      case "ta-store":
      case "ta store":
        ctx.pushOutput([
          "TA Store Marketplace",
          "====================",
          "",
          "A modern e-commerce platform built with Medusa.js,",
          "featuring a complete marketplace solution with vendor",
          "dashboards, payment processing, and inventory management.",
          "",
          "Technologies:",
          "• Medusa.js commerce framework",
          "• React for frontend components",
          "• PostgreSQL database",
          "• Stripe payment integration",
          "",
          "Features:",
          "• Multi-vendor marketplace",
          "• Advanced product catalog",
          "• Order management system",
          "• Customer analytics dashboard"
        ]);
        break;

      case "enes-codes":
      case "enes.codes":
        ctx.pushOutput([
          "enes.codes - Engineering Portfolio",
          "==================================",
          "",
          "An interactive engineering portfolio featuring a custom",
          "terminal interface, animated components, and modern web",
          "technologies. You're using it right now!",
          "",
          "Technologies:",
          "• Next.js 16 with Turbopack",
          "• TypeScript for type safety",
          "• Framer Motion animations",
          "• Tailwind CSS styling",
          "• Custom terminal system",
          "",
          "Features:",
          "• Interactive terminal interface",
          "• Responsive design system",
          "• Smooth animations",
          "• Modern Apple-style UI"
        ]);
        break;

      default:
        ctx.pushOutput(`Project '${projectName}' not found.`);
        ctx.pushOutput("Available projects: paket7, ta-store, enes-codes");
    }
  }, { scope: "global" });

  // Systems command
  kernel.registerCommand("systems", async (ctx: CommandContext) => {
    ctx.pushOutput([
      "Engineering Systems & Implementations",
      "=====================================",
      "",
      "🔧 Custom Terminal System",
      "   Built a complete terminal emulator with command parsing,",
      "   history management, and plugin architecture.",
      "",
      "🏗️  Virtual Filesystem",
      "   Implemented a virtual filesystem with directory navigation,",
      "   file operations, and persistent storage simulation.",
      "",
      "⚡ Real-time Command Execution",
      "   Created an async command dispatcher with error handling",
      "   and structured output formatting.",
      "",
      "🎨 Animation System",
      "   Developed a comprehensive animation library using Framer Motion",
      "   with performance optimizations and accessibility features.",
      "",
      "🎯 State Management",
      "   Built a custom state management system for terminal sessions,",
      "   user preferences, and application state."
    ]);
  }, { scope: "global" });

  // Skills command
  kernel.registerCommand("skills", async (ctx: CommandContext) => {
    ctx.pushOutput([
      "Technical Skills & Expertise",
      "=============================",
      "",
      "💻 Programming Languages",
      "• TypeScript/JavaScript (Expert)",
      "• Python (Advanced)",
      "• Go (Intermediate)",
      "• SQL (Advanced)",
      "",
      "🖥️  Frontend Development",
      "• React/Next.js (Expert)",
      "• Tailwind CSS (Expert)",
      "• Framer Motion (Advanced)",
      "• Responsive Design (Expert)",
      "",
      "⚙️  Backend Development",
      "• Node.js/Express (Advanced)",
      "• RESTful APIs (Expert)",
      "• GraphQL (Intermediate)",
      "• Database Design (Advanced)",
      "",
      "☁️  Cloud & Infrastructure",
      "• AWS/GCP (Advanced)",
      "• Docker/Kubernetes (Advanced)",
      "• CI/CD Pipelines (Expert)",
      "• Infrastructure as Code (Advanced)",
      "",
      "🛠️  Tools & Technologies",
      "• Git/GitHub (Expert)",
      "• VS Code (Expert)",
      "• Linux/Unix (Advanced)",
      "• Testing Frameworks (Advanced)"
    ]);
  }, { scope: "global" });

  // Experience command - Updated format
  kernel.registerCommand("experience", async (ctx: CommandContext) => {
    ctx.pushOutput([
      "Professional Experience",
      "=======================",
      "",
      "🚀 Senior Full-Stack Engineer",
      "   TechCorp Inc. | 2022-Present",
      "   • Led development of microservices architecture",
      "   • Reduced deployment time by 70% through automation",
      "   • Mentored junior developers in modern technologies",
      "",
      "🏗️  Systems Engineer",
      "   CloudTech Solutions | 2020-2022",
      "   • Designed cloud infrastructure for fintech platform",
      "   • Built real-time data processing pipelines",
      "   • Improved system reliability to 99.99% uptime",
      "",
      "💻 Software Developer",
      "   StartupXYZ | 2018-2020",
      "   • Developed MVP for analytics platform",
      "   • Integrated APIs and built responsive interfaces",
      "   • Collaborated in agile development environment",
      "",
      "🎓 Education",
      "   B.S. Computer Science",
      "   University of Technology | Magna Cum Laude"
    ]);
  }, { scope: "global" });

  // Contact command - Updated format
  kernel.registerCommand("contact", async (ctx: CommandContext) => {
    ctx.pushOutput([
      "Contact Information",
      "===================",
      "",
      "📧 Email: enes@enes.codes",
      "💼 LinkedIn: linkedin.com/in/enesbarutcu",
      "🐙 GitHub: github.com/enesbarutcu",
      "📱 Twitter: @enesbarutcu",
      "",
      "🌍 Location: San Francisco, CA",
      "⏰ Timezone: PST (UTC-8)",
      "",
      "📅 Response time: Within 24 hours"
    ]);
  }, { scope: "global" });

  // Resume command - Updated format
  kernel.registerCommand("resume", async (ctx: CommandContext) => {
    ctx.pushOutput([
      "Resume & CV",
      "===========",
      "",
      "📄 Download CV: /cv/enes-barutcu-cv.txt",
      "",
      "Key Highlights:",
      "• 5+ years in software engineering",
      "• Full-stack web development expert",
      "• Cloud architecture & DevOps experience",
      "• Led teams and mentored developers",
      "",
      "Use 'experience' for detailed work history."
    ]);
  }, { scope: "global" });

  // Status command - Show current engineering focus
  kernel.registerCommand("status", async (ctx: CommandContext) => {
    ctx.pushOutput([
      "Engineering Status Report",
      "========================",
      "",
      "Currently exploring:",
      "• Automation systems & workflow optimization",
      "• Platform engineering & infrastructure scaling",
      "• Distributed systems & microservices architecture",
      "",
      "Recent achievements:",
      "• Built production-ready web applications",
      "• Led cross-functional engineering initiatives",
      "• Mentored junior developers & established best practices",
      "",
      "Next focus areas:",
      "• AI/ML integration in enterprise applications",
      "• Advanced DevOps & CI/CD pipeline optimization"
    ]);
  }, { scope: "global" });

  // Debug life command - Fun diagnostics
  kernel.registerCommand("debug life", async (ctx: CommandContext) => {
    ctx.pushOutput([
      "running diagnostics...",
      "",
      "systems thinking ✔",
      "automation mindset ✔",
      "production experience ✔"
    ]);
  }, { scope: "global" });

  // Sudo hire-me command - Fun hiring protocol
  kernel.registerCommand("sudo hire-me", async (ctx: CommandContext) => {
    ctx.pushOutput([
      "🔐 SUDO ACCESS GRANTED - HIRING PROTOCOL INITIATED",
      "",
      "Accessing candidate database...",
      "Verifying credentials...",
      "Running background checks...",
      "",
      "✅ Technical assessment: PASSED",
      "✅ Cultural fit analysis: EXCELLENT",
      "✅ Leadership potential: CONFIRMED",
      "✅ Innovation index: ABOVE AVERAGE",
      "",
      "RECOMMENDATION: IMMEDIATE HIRE",
      "",
      "Next Steps:",
      "• Schedule technical interview",
      "• Prepare offer package",
      "• Welcome to the team! 🎉",
      "",
      "Contact: enesbrtc@gmail.com"
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

  // Whoami command
  kernel.registerCommand("whoami", async (ctx: CommandContext) => {
    ctx.pushOutput([
      "enes@engineering",
      "",
      "Application & Platform Engineer",
      "Building systems that matter • Full-stack • Cloud-native",
      "",
      "Currently: Crafting digital experiences",
      "Location: San Francisco, CA",
      "Timezone: PST (UTC-8)"
    ]);
  }, { scope: "global" });

  // Stack command - Technology stack overview
  kernel.registerCommand("stack", async (ctx: CommandContext) => {
    ctx.pushOutput([
      "Technology Stack & Tools",
      "========================",
      "",
      "🎯 Core Technologies",
      "• TypeScript/JavaScript - Primary languages",
      "• React/Next.js - Frontend framework",
      "• Node.js - Runtime environment",
      "• Python - Scripting & automation",
      "",
      "🎨 Frontend & UI",
      "• Tailwind CSS - Utility-first styling",
      "• Framer Motion - Animation library",
      "• Radix UI - Component primitives",
      "• Lucide React - Icon library",
      "",
      "⚙️  Backend & Infrastructure",
      "• Express.js - API framework",
      "• PostgreSQL - Primary database",
      "• Redis - Caching & sessions",
      "• Docker - Containerization",
      "",
      "☁️  Cloud & DevOps",
      "• AWS/GCP - Cloud platforms",
      "• Terraform - Infrastructure as Code",
      "• GitHub Actions - CI/CD",
      "• Vercel - Deployment platform",
      "",
      "🛠️  Development Tools",
      "• VS Code - Code editor",
      "• Git - Version control",
      "• ESLint/Prettier - Code quality",
      "• Jest - Testing framework"
    ]);
  }, { scope: "global" });

  // Status command - System status
  kernel.registerCommand("status", async (ctx: CommandContext) => {
    const now = new Date();
    const uptime = Math.floor((now.getTime() - new Date('2024-01-01').getTime()) / 1000 / 60 / 60 / 24); // Mock uptime

    ctx.pushOutput([
      "System Status Report",
      "====================",
      "",
      `🖥️  System: enes.codes v3.0`,
      `⏰ Uptime: ${uptime} days`,
      `📅 Current Time: ${now.toLocaleString()}`,
      `🌍 Location: San Francisco, CA`,
      "",
      "🟢 Services:",
      "• Portfolio: Online",
      "• Terminal: Active",
      "• Contact: Available",
      "• Projects: Loaded",
      "",
      "⚡ Performance:",
      "• Response Time: < 100ms",
      "• Memory Usage: Optimal",
      "• User Experience: Smooth"
    ]);
  }, { scope: "global" });

  // ENVIRONMENT-SPECIFIC COMMANDS

  // whoami command
  kernel.registerCommand("whoami", async (ctx: CommandContext) => {
    ctx.pushOutput([
      "enes@enes.codes",
      "",
      "Senior Software Engineer",
      "Full-Stack Developer & System Architect",
      "San Francisco, CA"
    ]);
  }, { scope: "global" });

  // uptime command
  kernel.registerCommand("uptime", async (ctx: CommandContext) => {
    const now = new Date();
    const startTime = new Date(now.getTime() - (Math.random() * 30 + 1) * 24 * 60 * 60 * 1000); // Random uptime between 1-31 days
    const uptime = Math.floor((now.getTime() - startTime.getTime()) / (1000 * 60 * 60 * 24));
    
    ctx.pushOutput([
      `up ${uptime} days, system running smoothly`,
      "",
      "Portfolio uptime statistics:",
      `• Total visitors: ${Math.floor(Math.random() * 10000 + 5000)}`,
      `• Page views: ${Math.floor(Math.random() * 50000 + 25000)}`,
      `• Commands executed: ${Math.floor(Math.random() * 1000 + 500)}`
    ]);
  }, { scope: "global" });

  // sudo hire-me command
  kernel.registerCommand("sudo hire-me", async (ctx: CommandContext) => {
    ctx.pushOutput([
      "🔐 SUDO ACCESS GRANTED",
      "",
      "Hiring Protocol Initiated",
      "=======================",
      "",
      "✅ Resume verified",
      "✅ Skills assessment: PASSED",
      "✅ Cultural fit: EXCELLENT",
      "✅ References checked",
      "",
      "🎯 RECOMMENDATION: IMMEDIATE HIRE",
      "",
      "Next steps:",
      "• Schedule technical interview",
      "• Team introduction meeting", 
      "• Offer discussion",
      "",
      "Contact: hello@enes.codes"
    ]);
  }, { scope: "global" });

  // coffee command
  kernel.registerCommand("coffee", async (ctx: CommandContext) => {
    const coffeeTypes = [
      "☕ Freshly brewed Arabica",
      "🧊 Iced nitro cold brew",
      "🥤 Oat milk latte",
      "🫘 Single-origin pour-over",
      "🍵 Matcha green tea latte"
    ];
    
    const randomCoffee = coffeeTypes[Math.floor(Math.random() * coffeeTypes.length)];
    
    ctx.pushOutput([
      "☕ Coffee Break Activated",
      "",
      `Serving: ${randomCoffee}`,
      "",
      "💡 Pro tip: Great code requires great coffee",
      "   (and occasional debugging sessions)",
      "",
      "Ready to continue coding? Type 'help' for commands."
    ]);
  }, { scope: "global" });

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