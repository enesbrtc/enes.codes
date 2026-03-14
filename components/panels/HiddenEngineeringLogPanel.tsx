"use client";

import { motion } from 'framer-motion';

const DATE_FORMATTER = new Intl.DateTimeFormat('en-CA', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  timeZone: 'UTC',
});

function createExperimentDates() {
  const today = new Date();
  const start = Date.UTC(2024, 0, 1);
  const end = Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate());
  const range = end - start;

  return [0.18, 0.47, 0.73].map((seed) => DATE_FORMATTER.format(new Date(start + Math.floor(range * seed))));
}

export default function HiddenEngineeringLogPanel() {
  const experimentDates = createExperimentDates();

  return (
    <section className="mx-auto mt-16 max-w-[1200px] px-6">
      {/* Header */}
      <motion.div
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="mb-6 space-y-1 text-left"
      >
        <h2 className="text-lg font-semibold tracking-tight text-foreground">eng. log</h2>
        <p className="text-sm text-white/60">
          Private workspace. Experimental ideas, unfinished systems, and engineering thoughts.
        </p>
      </motion.div>

      {/* Terminal-style entries */}
      <motion.div
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.3 }}
        className="space-y-6"
      >
        <div className="font-mono text-sm space-y-2">
          <div className="text-muted-foreground">
            <span className="text-accent">$</span> ls -la /engineering/workspace
          </div>
          <div className="text-foreground pl-4">
            drwxr-xr-x  engineer 2026-02-24  experimental-ai-integration/<br/>
            drwxr-xr-x  engineer 2026-02-24  quantum-computing-prototypes/<br/>
            drwxr-xr-x  engineer 2026-02-24  neural-network-optimization/<br/>
            -rw-r--r--  engineer 2026-02-24  system-architecture-blueprint.md<br/>
            -rw-r--r--  engineer 2026-02-24  incident-response-automation.py<br/>
          </div>
        </div>

        <div className="mt-6 border-t border-border pt-4">
          <h3 className="mb-5 text-heading-3 font-semibold">Recent Experiments</h3>
          <div className="space-y-5">
            <div className="surface-card p-4">
              <div className="font-mono text-xs text-muted-foreground mb-2">
                {experimentDates[0]}
              </div>
              <p className="text-body">
                Investigating AI-assisted code review systems. Current hypothesis: LLMs can reduce review time by 40%
                while maintaining code quality. Need to validate against human reviewers.
              </p>
            </div>

            <div className="surface-card p-4">
              <div className="font-mono text-xs text-muted-foreground mb-2">
                {experimentDates[1]}
              </div>
              <p className="text-body">
                Kubernetes cluster optimization complete. Reduced pod startup time from 45s to 12s.
                Next: Implement predictive scaling based on historical usage patterns.
              </p>
            </div>

            <div className="surface-card p-4">
              <div className="font-mono text-xs text-muted-foreground mb-2">
                {experimentDates[2]}
              </div>
              <p className="text-body">
                Database query optimization research. Exploring graph-based query planning vs traditional
                relational approaches. Early results show 60% improvement in complex joins.
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-4">
          <h3 className="mb-3 text-heading-3 font-semibold">System Notes</h3>
          <div className="font-mono text-sm space-y-1">
            <div className="text-muted-foreground">
              <span className="text-accent">{'>'}</span> TODO: Implement automated dependency vulnerability scanning
            </div>
            <div className="text-muted-foreground">
              <span className="text-accent">{'>'}</span> Research: Edge computing for real-time data processing
            </div>
            <div className="text-muted-foreground">
              <span className="text-accent">{'>'}</span> Prototype: Self-healing infrastructure components
            </div>
            <div className="text-muted-foreground">
              <span className="text-accent">{'>'}</span> Investigate: Quantum-resistant encryption algorithms
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}