import { registerCommand, CommandContext } from "../kernel/terminalKernel";
import { Kernel } from "../kernel/kernel";

export function register(kernel: Kernel) {
  // Hello command
  kernel.registerCommand("hello", async (ctx: CommandContext) => {
    ctx.pushOutput(["Hi. Try 'help' to begin."]);
  }, { hidden: true });

  // Hi command
  kernel.registerCommand("hi", async (ctx: CommandContext) => {
    ctx.pushOutput(["Hello. Type 'help' to get started."]);
  }, { hidden: true });

  // Why command
  kernel.registerCommand("why", async (ctx: CommandContext) => {
    ctx.pushOutput([
      "Why build a terminal in a web portfolio?",
      "",
      "Because sometimes you need to show that you can build",
      "complex, interactive systems that feel real.",
      "",
      "Also, it's way more interesting than a static resume page.",
      "And who doesn't love a good terminal interface?"
    ]);
  }, { hidden: true });

  // Reboot command
  kernel.registerCommand("reboot", async (ctx: CommandContext) => {
    ctx.pushOutput([
      "System reboot initiated...",
      "Saving current session...",
      "Unmounting filesystems...",
      "",
      "Broadcast message from root@engineering.local:",
      "The system is going down for reboot NOW!"
    ]);

    // Simulate reboot by clearing and showing boot sequence
    setTimeout(() => {
      const { terminalBuffer } = require("../kernel/terminalBuffer");
      terminalBuffer.clear();
      terminalBuffer.push("Darwin Kernel Version 23.1.0: Mon Oct  9 21:28:12 PDT 2023; root:xnu-10002.41.9~6/RELEASE_X86_64");
      terminalBuffer.push("enes@engineering.local login: ");
    }, 2000);
  }, { hidden: true });

  // Whois command
  kernel.registerCommand("whois", async (ctx: CommandContext) => {
    const target = ctx.args[0];
    if (!target) {
      ctx.pushOutput("whois: missing operand");
      return;
    }

    if (target.toLowerCase() === "enes" || target.toLowerCase() === "barutcu") {
      ctx.pushOutput([
        "Domain Name: ENES.BARUTCU",
        "Registry Domain ID: ENGINEER-001",
        "Registrar: SELF-HOSTED",
        "Registrar IANA ID: 0000",
        "Creation Date: 1995-01-01",
        "Registry Expiry Date: NEVER",
        "",
        "Name Server: ENGINEERING.LOCAL",
        "Status: ACTIVE",
        "",
        ">>> Last update of WHOIS database: JUST NOW <<<",
        "",
        "For more information on this engineer, try: 'experience' or 'projects'"
      ]);
    } else {
      ctx.pushOutput(`whois: ${target}: domain not found`);
    }
  }, { hidden: true });

  // Legacy command
  kernel.registerCommand("legacy", async (ctx: CommandContext) => {
    ctx.pushOutput([
      "LEGACY SYSTEMS DETECTED",
      "=======================",
      "",
      "This portfolio was built with modern web technologies,",
      "but here's a nod to the classics:",
      "",
      "• HTML was invented in 1993",
      "• CSS in 1996",
      "• JavaScript in 1995",
      "• The first website went live in 1993",
      "",
      "The web has come a long way, but the fundamentals remain.",
      "Just like engineering - build on solid foundations."
    ]);
  }, { hidden: true });

  // 404 command
  kernel.registerCommand("404", async (ctx: CommandContext) => {
    ctx.pushOutput([
      "HTTP 404 - Command Not Found",
      "",
      "The command you are looking for might have been:",
      "• Moved to a different environment",
      "• Temporarily unavailable",
      "• Never existed in the first place",
      "",
      "Try 'help' to see available commands,",
      "or explore with 'ls' and 'cd' to discover more."
    ]);
  }, { hidden: true });

  // Konami code command - Hidden easter egg
  kernel.registerCommand("konami", async (ctx: CommandContext) => {
    ctx.pushOutput([
      "🕹️  KONAMI CODE ACTIVATED!",
      "",
      "↑ ↑ ↓ ↓ ← → ← → B A START",
      "",
      "Cheat mode enabled:",
      "• Instant code compilation ⚡",
      "• Bug-free deployments 🎯",
      "• Infinite patience with legacy code 🧘",
      "",
      "You are now 30% more productive!",
      "(This is not actually a cheat code, but wouldn't that be cool?)"
    ]);
  }, { hidden: true });

  // 42 command - Hitchhiker's Guide reference
  kernel.registerCommand("42", async (ctx: CommandContext) => {
    ctx.pushOutput([
      "The Answer to the Ultimate Question",
      "of Life, the Universe, and Everything",
      "",
      "42",
      "",
      "But what was the question again?",
      "",
      "In the meantime, here's what I do know:",
      "• Build great software",
      "• Solve interesting problems",
      "• Help teams succeed",
      "• Never stop learning",
      "",
      "The meaning of life might be 42,",
      "but the meaning of engineering is building something meaningful."
    ]);
  }, { hidden: true });

  // Matrix command - The Matrix reference
  kernel.registerCommand("matrix", async (ctx: CommandContext) => {
    ctx.pushOutput([
      "Wake up, Neo...",
      "",
      "The Matrix has you...",
      "",
      "Follow the white rabbit.",
      "",
      "Knock, knock, Neo.",
      "",
      "💊 Red pill: Choose the difficult path of engineering",
      "💊 Blue pill: Stick with the comfortable status quo",
      "",
      "You took the red pill. Welcome to the real world of:",
      "• Complex system design",
      "• Never-ending debugging",
      "• Production outages at 3 AM",
      "• The joy of a working deployment",
      "",
      "There is no spoon. There are only pull requests and code reviews."
    ]);
  }, { hidden: true });
}