"use client";

import { useState } from 'react';
import cv from "../../data/cv";

interface ContactPanelProps {
  language: 'en' | 'tr';
}

export default function ContactPanel({ language }: ContactPanelProps) {
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
  const content = {
    en: {
      title: "Contact",
      subtitle: "Let's discuss systems and engineering",
      email: "Email",
      phone: "Phone",
      conversations: "Open to conversations about:",
      sendMessage: "Send Message",
      yourName: "Your Name",
      yourEmail: "Your Email",
      yourMessage: "Your Message"
    },
    tr: {
      title: "İletişim",
      subtitle: "Sistemler ve mühendislik hakkında konuşalım",
      email: "E-posta",
      phone: "Telefon",
      conversations: "Şu konular hakkında konuşmaya açığım:",
      sendMessage: "Mesaj Gönder",
      yourName: "Adınız",
      yourEmail: "E-posta Adresiniz",
      yourMessage: "Mesajınız"
    }
  };
  return (
    <div className="space-y-4 p-4">
      <div className="text-center">
        <h2 className="text-xl font-bold neon-text glitch-text mb-1">{content[language].title}</h2>
        <p className="text-xs text-neutral-400">{content[language].subtitle}</p>
      </div>

      <div className="max-w-sm mx-auto space-y-5">
        <div className="text-center space-y-3">
          <div className="text-base text-neutral-200 font-medium">{cv.name}</div>
          <div className="text-xs text-neutral-400">{cv.title}</div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-lg border border-blue-500/20 hover:border-blue-400/40 transition-all duration-300">
            <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center shadow-lg">
              <span className="text-blue-400 text-sm">💌</span>
            </div>
            <div>
              <div className="text-xs font-medium text-neutral-200">{content[language].email}</div>
              <div className="text-xs text-neutral-300">{cv.email}</div>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-lg border border-green-500/20 hover:border-green-400/40 transition-all duration-300">
            <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center shadow-lg">
              <span className="text-green-400 text-sm">📱</span>
            </div>
            <div>
              <div className="text-xs font-medium text-neutral-200">{content[language].phone}</div>
              <div className="text-xs text-neutral-300">{cv.phone}</div>
            </div>
          </div>
        </div>

        <div className="p-3 bg-gradient-to-br from-neutral-950/50 to-neutral-900/30 rounded-lg border border-neutral-700/30">
          <h3 className="text-xs font-semibold text-neutral-200 mb-2">{content[language].conversations}</h3>
          <ul className="text-xs text-neutral-400 space-y-1">
            <li className="flex items-center space-x-2">
              <span className="w-1 h-1 bg-cyan-400 rounded-full"></span>
              <span>Infrastructure automation</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="w-1 h-1 bg-cyan-400 rounded-full"></span>
              <span>Identity & access management</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="w-1 h-1 bg-cyan-400 rounded-full"></span>
              <span>Platform operations</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="w-1 h-1 bg-cyan-400 rounded-full"></span>
              <span>Engineering growth</span>
            </li>
          </ul>
        </div>

        <form onSubmit={handleSubmit} className="p-3 bg-gradient-to-br from-neutral-950/50 to-neutral-900/30 rounded-lg border border-neutral-700/30 space-y-3">
          <h3 className="text-xs font-semibold text-neutral-200 mb-3">{content[language].sendMessage}</h3>

          <div>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder={content[language].yourName}
              required
              className="w-full px-3 py-2 bg-neutral-800/50 border border-neutral-600 rounded-md text-xs text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/20 transition-all duration-200"
            />
          </div>

          <div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder={content[language].yourEmail}
              required
              className="w-full px-3 py-2 bg-neutral-800/50 border border-neutral-600 rounded-md text-xs text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/20 transition-all duration-200"
            />
          </div>

          <div>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder={content[language].yourMessage}
              required
              rows={3}
              className="w-full px-3 py-2 bg-neutral-800/50 border border-neutral-600 rounded-md text-xs text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/20 transition-all duration-200 resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white text-xs font-medium rounded-md transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
          >
            {content[language].sendMessage}
          </button>
        </form>
      </div>
    </div>
  );
}