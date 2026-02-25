"use client";

import { motion } from 'framer-motion';

export default function HiddenEngineeringLogPanel() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="text-center space-y-4"
      >
        <h1 className="text-heading-1 font-bold">
          Hidden Engineering Log
        </h1>
        <p className="text-body text-muted-foreground max-w-2xl mx-auto">
          Private workspace. Experimental ideas, unfinished systems, and engineering thoughts.
        </p>
      </motion.div>

      {/* Terminal-style entries */}
      <motion.div
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.3 }}
        className="space-y-4"
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

        <div className="border-t border-border pt-4">
          <h3 className="text-heading-3 font-semibold mb-3">Recent Experiments</h3>
          <div className="space-y-3">
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="font-mono text-xs text-muted-foreground mb-2">
                2026-02-24 14:23:15
              </div>
              <p className="text-body">
                Investigating AI-assisted code review systems. Current hypothesis: LLMs can reduce review time by 40%
                while maintaining code quality. Need to validate against human reviewers.
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-4">
              <div className="font-mono text-xs text-muted-foreground mb-2">
                2026-02-24 11:45:22
              </div>
              <p className="text-body">
                Kubernetes cluster optimization complete. Reduced pod startup time from 45s to 12s.
                Next: Implement predictive scaling based on historical usage patterns.
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-4">
              <div className="font-mono text-xs text-muted-foreground mb-2">
                2026-02-24 09:17:08
              </div>
              <p className="text-body">
                Database query optimization research. Exploring graph-based query planning vs traditional
                relational approaches. Early results show 60% improvement in complex joins.
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-4">
          <h3 className="text-heading-3 font-semibold mb-3">System Notes</h3>
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
    </div>
  );
}