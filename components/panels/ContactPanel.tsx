"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import cv from "../../data/cv";

export default function ContactPanel() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent('Portfolio Contact');
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
    window.location.href = `mailto:${cv.email}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center space-y-2"
      >
        <h2 className="text-heading-2 font-bold">Contact</h2>
        <p className="text-body-small text-muted-foreground">Let&apos;s discuss systems and engineering</p>
      </motion.div>

      <div className="max-w-md mx-auto space-y-6">
        {/* Contact Info */}
        <motion.div
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.3 }}
          className="text-center space-y-4"
        >
          <div className="text-lg font-semibold text-foreground">{cv.name}</div>
          <div className="text-body-small text-muted-foreground">{cv.title}</div>
        </motion.div>

        {/* Contact Methods */}
        <motion.div
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.3 }}
          className="space-y-3"
        >
          <div className="flex items-center space-x-4 p-4 surface-card pixel-hover">
            <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
              <span className="text-accent">💌</span>
            </div>
            <div>
              <div className="text-sm font-medium text-foreground">Email</div>
              <div className="text-body-small text-muted-foreground">{cv.email}</div>
            </div>
          </div>

          <div className="flex items-center space-x-4 p-4 surface-card pixel-hover">
            <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
              <span className="text-accent">📱</span>
            </div>
            <div>
              <div className="text-sm font-medium text-foreground">Phone</div>
              <div className="text-body-small text-muted-foreground">{cv.phone}</div>
            </div>
          </div>
        </motion.div>

        {/* Topics */}
        <motion.div
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.3 }}
          className="surface-card p-6 pixel-hover"
        >
          <h3 className="text-lg font-semibold text-accent mb-4">Open to conversations about:</h3>
          <ul className="text-body text-muted-foreground space-y-2">
            {[
              "Infrastructure automation",
              "Identity & access management",
              "Platform operations",
              "Engineering growth"
            ].map((topic, index) => (
              <li key={index} className="flex items-center space-x-3">
                <div className="w-1.5 h-1.5 bg-accent rounded-full"></div>
                <span>{topic}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Contact Form */}
        <motion.form
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.3 }}
          onSubmit={handleSubmit}
          className="surface-card p-6 space-y-4 pixel-hover"
        >
          <h3 className="text-lg font-semibold text-accent mb-4">Send Message</h3>

          <div>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Your Name"
              required
              className="w-full px-4 py-3 bg-card border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 transition-all duration-200"
            />
          </div>

          <div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Your Email"
              required
              className="w-full px-4 py-3 bg-card border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 transition-all duration-200"
            />
          </div>

          <div>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Your Message"
              required
              rows={4}
              className="w-full px-4 py-3 bg-card border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 transition-all duration-200 resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 px-6 bg-accent text-accent-foreground rounded-lg font-medium hover:bg-accent/90 transition-colors focus-ring"
          >
            Send Message
          </button>
        </motion.form>
      </div>
    </div>
  );
}