"use client";

import { motion } from 'framer-motion';

export default function AboutPanel() {
  return (
    <section className="mx-auto mt-16 max-w-[1200px] px-6">
      {/* Header */}
      <motion.div
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-8 space-y-1 text-left"
      >
        <h2 className="text-lg font-semibold tracking-tight text-foreground">about</h2>
        <p className="text-sm text-white/60">Systems & Automation Engineering</p>
      </motion.div>

      <div className="w-full">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Column 1: About Summary & Current Role */}
          <div className="space-y-6">
            {/* Current Role - Professional Experience */}
            <motion.div
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05, duration: 0.3 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-1 h-4 bg-accent rounded-full"></div>
                <h3 className="text-lg font-semibold text-accent uppercase tracking-wide">Current Role</h3>
              </div>
              <div className="surface-card p-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xl font-bold text-foreground">Application Support Engineer</h4>
                    <div className="px-3 py-1 bg-accent/10 text-accent text-sm rounded-full font-medium">
                      Current
                    </div>
                  </div>
                  <div className="text-lg text-muted-foreground font-medium">
                    Adesso — Lidl Schwarz Project
                  </div>
                  <p className="text-body text-muted-foreground">
                    Providing technical support and engineering solutions for enterprise-scale operations,
                    focusing on infrastructure automation and system reliability.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Problems I Solve */}
            <motion.div
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.3 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-1 h-4 bg-accent rounded-full"></div>
                <h3 className="text-lg font-semibold text-accent uppercase tracking-wide">Problems I Solve</h3>
              </div>
              <div className="surface-card p-6">
                <div className="text-body text-muted-foreground space-y-3">
                  <p>• Eliminate manual operational work through intelligent automation</p>
                  <p>• Reduce incident response time with proactive monitoring and alerting</p>
                  <p>• Streamline user lifecycle management across enterprise environments</p>
                  <p>• Build self-service platforms that empower non-technical users</p>
                  <p>• Containerize and deploy internal tools with reliability and scalability</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Column 2: Environments & Technical Focus */}
          <div className="space-y-6">
            {/* Environments */}
            <motion.div
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15, duration: 0.3 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-1 h-4 bg-accent rounded-full"></div>
                <h3 className="text-lg font-semibold text-accent uppercase tracking-wide">Environments</h3>
              </div>
              <div className="surface-card p-6">
                <div className="text-body text-muted-foreground space-y-3">
                  <p>• Enterprise Active Directory & Microsoft 365 ecosystems</p>
                  <p>• 24/7 NOC operations and critical infrastructure monitoring</p>
                  <p>• Multi-location support teams and distributed operations</p>
                  <p>• Containerized application deployments and CI/CD pipelines</p>
                  <p>• Identity governance and compliance frameworks</p>
                </div>
              </div>
            </motion.div>

            {/* Technical Focus */}
            <motion.div
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.3 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-1 h-4 bg-accent rounded-full"></div>
                <h3 className="text-lg font-semibold text-accent uppercase tracking-wide">Technical Focus</h3>
              </div>
              <div className="surface-card p-6">
                <div className="text-body text-muted-foreground space-y-3">
                  <p>• <strong className="text-foreground">Infrastructure as Code:</strong> Terraform, Ansible, and cloud-native tooling</p>
                  <p>• <strong className="text-foreground">Identity & Access Management:</strong> Modern authentication and authorization patterns</p>
                  <p>• <strong className="text-foreground">Observability Stack:</strong> Metrics, logs, and distributed tracing</p>
                  <p>• <strong className="text-foreground">Container Orchestration:</strong> Kubernetes and microservices architecture</p>
                  <p>• <strong className="text-foreground">API Design:</strong> RESTful services and GraphQL implementations</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Engineering Philosophy - Full Width */}
        <motion.div
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25, duration: 0.3 }}
          className="mt-8"
        >
          <div className="flex items-center gap-3">
            <div className="w-1 h-4 bg-accent rounded-full"></div>
            <h3 className="text-lg font-semibold text-accent uppercase tracking-wide">Engineering Philosophy</h3>
          </div>
          <div className="surface-card p-6 mt-4">
            <div className="text-body text-muted-foreground space-y-3">
              <p><strong className="text-foreground">Automation First:</strong> Every manual process is an opportunity for automation. I design systems that work reliably without human intervention.</p>
              <p><strong className="text-foreground">Observability Matters:</strong> You can&apos;t improve what you can&apos;t measure. Every system I build includes comprehensive monitoring and alerting.</p>
              <p><strong className="text-foreground">Humans in the Loop:</strong> Automation should empower humans, not replace them. Complex decisions require human judgment and context.</p>
              <p><strong className="text-foreground">Start Simple:</strong> Begin with manual processes, then automate. Complexity should be added only when necessary.</p>
              <p><strong className="text-foreground">Security by Design:</strong> Every system considers security implications from the ground up, especially in identity and access management.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}