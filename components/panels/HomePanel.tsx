"use client";

import { motion } from 'framer-motion';
import { Code2, Server, Rocket } from 'lucide-react';
import AvatarShell from '../AvatarShell';

export default function HomePanel() {
  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <motion.div
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="text-center space-y-6"
      >
        {/* Avatar */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex justify-center"
        >
          <AvatarShell />
        </motion.div>

        {/* Name and Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="space-y-4"
        >
          <h1 className="text-display font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            Enes Barutcu
          </h1>
          <p className="text-heading-3 font-medium text-muted-foreground">
            Application & Platform Engineer
          </p>
          <p className="text-body text-muted-foreground max-w-2xl mx-auto">
            Transitioning from operations to engineering, building systems that matter.
          </p>
        </motion.div>

        {/* Key Achievements */}
        <motion.div
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.3 }}
          className="flex flex-wrap justify-center gap-3"
        >
          {[
            { icon: Rocket, label: "Shipped Product", color: "text-green-400" },
            { icon: Server, label: "Operations Experience", color: "text-blue-400" },
            { icon: Code2, label: "Building Systems", color: "text-purple-400" }
          ].map((item, index) => (
            <motion.div
              key={item.label}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + index * 0.1, duration: 0.2 }}
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center space-x-2 px-3 py-2 bg-card border border-border rounded-lg hover:border-accent/30 transition-all duration-200 pixel-hover"
            >
              <item.icon className={`w-4 h-4 ${item.color}`} />
              <span className="text-tech">{item.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        {[
          { label: "Years Experience", value: "5+", description: "In tech operations & engineering" },
          { label: "Projects Shipped", value: "1", description: "Production web application" },
          { label: "Systems Built", value: "10+", description: "Automation & infrastructure" }
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 + index * 0.1, duration: 0.2 }}
            whileHover={{ y: -2, scale: 1.01 }}
            className="surface-card p-4 text-center pixel-hover"
          >
            <div className="text-2xl font-bold text-accent mb-1">{stat.value}</div>
            <div className="text-sm font-medium text-foreground mb-1">{stat.label}</div>
            <div className="text-xs text-muted-foreground">{stat.description}</div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}