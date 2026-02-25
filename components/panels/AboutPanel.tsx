"use client";

import { motion } from 'framer-motion';

export default function AboutPanel() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center space-y-2"
      >
        <h2 className="text-heading-2 font-bold">About</h2>
        <p className="text-body-small text-muted-foreground">Systems & Automation Engineering</p>
      </motion.div>

      <div className="space-y-6 max-w-3xl mx-auto">
        {/* What I Solve */}
        <motion.div
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.3 }}
          className="surface-card p-6 pixel-hover"
          whileHover={{ y: -1, scale: 1.002 }}
        >
          <h3 className="text-lg font-semibold text-accent mb-4 uppercase tracking-wide">Problems I Solve</h3>
          <div className="text-body text-muted-foreground space-y-3">
            <p>• Eliminate manual operational work through intelligent automation</p>
            <p>• Reduce incident response time with proactive monitoring and alerting</p>
            <p>• Streamline user lifecycle management across enterprise environments</p>
            <p>• Build self-service platforms that empower non-technical users</p>
            <p>• Containerize and deploy internal tools with reliability and scalability</p>
          </div>
        </motion.div>

        {/* Environments */}
        <motion.div
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.3 }}
          className="surface-card p-6 pixel-hover"
          whileHover={{ y: -1, scale: 1.002 }}
        >
          <h3 className="text-lg font-semibold text-accent mb-4 uppercase tracking-wide">Environments</h3>
          <div className="text-body text-muted-foreground space-y-3">
            <p>• Enterprise Active Directory & Microsoft 365 ecosystems</p>
            <p>• 24/7 NOC operations and critical infrastructure monitoring</p>
            <p>• Multi-location support teams and distributed operations</p>
            <p>• Containerized application deployments and CI/CD pipelines</p>
            <p>• Identity governance and compliance frameworks</p>
          </div>
        </motion.div>

        {/* Engineering Philosophy */}
        <motion.div
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.3 }}
          className="surface-card p-6 pixel-hover"
          whileHover={{ y: -1, scale: 1.002 }}
        >
          <h3 className="text-lg font-semibold text-accent mb-4 uppercase tracking-wide">Engineering Philosophy</h3>
          <div className="text-body text-muted-foreground space-y-3">
            <p><strong className="text-foreground">Automation First:</strong> Every manual process is an opportunity for automation. I design systems that work reliably without human intervention.</p>
            <p><strong className="text-foreground">Observability Matters:</strong> You can&apos;t improve what you can&apos;t measure. Every system I build includes comprehensive monitoring and alerting.</p>
            <p><strong className="text-foreground">Humans in the Loop:</strong> Automation should empower humans, not replace them. Complex decisions require human judgment and context.</p>
            <p><strong className="text-foreground">Start Simple:</strong> Begin with manual processes, then automate. Complexity should be added only when necessary.</p>
            <p><strong className="text-foreground">Security by Design:</strong> Every system considers security implications from the ground up, especially in identity and access management.</p>
          </div>
        </motion.div>

        {/* Technical Focus */}
        <motion.div
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.3 }}
          className="surface-card p-6 pixel-hover"
          whileHover={{ y: -1, scale: 1.002 }}
        >
          <h3 className="text-lg font-semibold text-accent mb-4 uppercase tracking-wide">Technical Focus</h3>
          <div className="text-body text-muted-foreground space-y-3">
            <p>• <strong className="text-foreground">Infrastructure as Code:</strong> Terraform, Ansible, and cloud-native tooling</p>
            <p>• <strong className="text-foreground">Identity & Access Management:</strong> Modern authentication and authorization patterns</p>
            <p>• <strong className="text-foreground">Observability Stack:</strong> Metrics, logs, and distributed tracing</p>
            <p>• <strong className="text-foreground">Container Orchestration:</strong> Kubernetes and microservices architecture</p>
            <p>• <strong className="text-foreground">API Design:</strong> RESTful services and GraphQL implementations</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}