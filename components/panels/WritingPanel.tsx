"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function WritingPanel() {
  const [expandedPosts, setExpandedPosts] = useState<Set<string>>(new Set());

  const togglePost = (postId: string) => {
    const newExpanded = new Set(expandedPosts);
    if (newExpanded.has(postId)) {
      newExpanded.delete(postId);
    } else {
      newExpanded.add(postId);
    }
    setExpandedPosts(newExpanded);
  };

  const posts = [
    {
      id: "automation-mindset",
      title: "The Automation Mindset: From Manual to Autonomous",
      excerpt: "Why every operational task should be viewed through the lens of automation potential.",
      date: "2024-02-15",
      content: "Automation isn't about replacing humans—it's about freeing them to solve complex problems. Every manual process I encounter, I now instinctively ask: 'How can this be automated?' This mindset shift has transformed how I approach system design and operational efficiency."
    },
    {
      id: "incident-lessons",
      title: "Learning from Incidents: The Hidden Value in Failures",
      excerpt: "Every system failure contains lessons about design, monitoring, and human factors.",
      date: "2024-01-28",
      content: "Incidents aren't just problems to solve—they're opportunities to improve system resilience. I've learned that the most valuable post-mortems focus on systemic improvements rather than individual blame. Each failure reveals gaps in monitoring, alerting, or process design that, once addressed, make the entire system more robust."
    },
    {
      id: "identity-complexity",
      title: "The Hidden Complexity of Identity Management",
      excerpt: "Why user lifecycle management is more than just provisioning accounts.",
      date: "2024-01-10",
      content: "Identity management seems straightforward on the surface, but the complexity emerges in lifecycle management, access governance, and audit requirements. Modern enterprises need systems that can handle user onboarding, permission management, and offboarding while maintaining security and compliance. The challenge lies in balancing automation with human oversight."
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center space-y-2"
      >
        <h2 className="text-heading-2 font-bold">Writing</h2>
        <p className="text-body-small text-muted-foreground">Engineering insights and observations</p>
      </motion.div>

      {/* Writing Posts */}
      <div className="space-y-4">
        {posts.map((post, index) => {
          const isExpanded = expandedPosts.has(post.id);
          return (
            <motion.div
              key={post.id}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * index, duration: 0.3 }}
              className="surface-card overflow-hidden pixel-hover"
              whileHover={{ y: -1, scale: 1.002 }}
            >
              <motion.button
                whileHover={{ backgroundColor: 'rgba(76, 29, 149, 0.05)' }}
                onClick={() => togglePost(post.id)}
                className="w-full p-6 text-left"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-foreground mb-2">{post.title}</h3>
                    <p className="text-body text-muted-foreground mb-3">{post.excerpt}</p>
                    <div className="text-body-small text-muted-foreground">{post.date}</div>
                  </div>
                  <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-muted-foreground ml-4"
                  >
                    <ChevronDown className="w-5 h-5" />
                  </motion.div>
                </div>
              </motion.button>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-border"
                  >
                    <div className="p-6">
                      <div className="text-body text-muted-foreground leading-relaxed">
                        {post.content}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}