# enes.codes - AI Onboarding Instructions

## Project Overview

This is a personal portfolio website for Enes Barutcu, an Application & Platform Engineer. The site showcases his transition from NOC/IT operations to engineering, highlighting automation systems, identity management solutions, and operational tooling. The portfolio serves as both a professional showcase and a demonstration of engineering capabilities in building systems that matter.

## Engineering Identity

Enes positions himself as a hybrid engineer bridging operations and development. His background includes:
- 5+ years in enterprise IT operations (Active Directory, Microsoft 365, NOC)
- Transition to automation-first engineering approach
- Focus on systems that eliminate manual work and improve operational efficiency
- Experience with identity lifecycle management, incident response, and infrastructure automation

## Tech Stack

- **Framework**: Next.js 16.1.6 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 with CSS custom properties
- **Animations**: Framer Motion (transform/opacity only for 60fps performance)
- **Icons**: Lucide React
- **Deployment**: Vercel (implied by project structure)

## Architecture Overview

### Project Structure
```
app/
├── layout.tsx          # Root layout with theme setup
├── page.tsx            # Main page with panel routing
├── globals.css         # Theme variables and pixel styling
└── [other pages]/

components/
├── Navigation.tsx      # Floating navbar with theme toggle
├── Layout.tsx          # Page wrapper with pixel grid
├── panels/             # Content sections
│   ├── HomePanel.tsx
│   ├── ProjectsPanel.tsx
│   ├── SystemsPanel.tsx
│   ├── EngineeringLogPanel.tsx
│   ├── WritingPanel.tsx
│   ├── AboutPanel.tsx
│   └── ContactPanel.tsx
└── [utilities]/

data/
├── cv.ts              # Professional experience data
├── skills.ts          # Skills assessment
└── presence.ts        # Current status/learning
```

### Routing Logic
- Single-page application with client-side panel switching
- Dynamic imports for performance (all panels loaded lazily)
- AnimatePresence for smooth transitions between sections
- 300ms transition delay to prevent rapid switching

## Design Philosophy

### Compact UI Approach
- Minimal, dense information layout
- No wasted whitespace or decorative elements
- Content-focused design that prioritizes information density
- Floating navbar that doesn't consume vertical space

### Performance-First Design
- 60fps animations mandatory (transform/opacity only)
- Lazy loading for all panel components
- Minimal bundle size through dynamic imports
- CSS custom properties for efficient theme switching

### Pixel-Inspired Aesthetic
- 20px × 20px grid background pattern
- Near-black purple accent color (#4c1d95)
- Clean, technical appearance
- Subtle pixel hover effects

### Minimal Navigation Philosophy
- Floating navbar that appears/disappears based on scroll
- No persistent sidebar or footer navigation
- Keyboard shortcuts (g=projects, h=home, l=lab, n=notes)
- Mobile-responsive with collapsible menu

## Performance Principles

### Hard Rules (Never Break)
1. **60fps Animations**: Only use `transform` and `opacity` properties
2. **No Heavy Animations**: Avoid `width`, `height`, `top`, `left` changes
3. **Minimal Dependencies**: Keep bundle size under control
4. **Lazy Loading**: All panels must be dynamically imported

### Animation Constraints
- `motion.div` with `whileHover={{ y: -1, scale: 1.002 }}` for cards
- `whileInView` for entrance animations
- `AnimatePresence` for panel transitions
- Staggered delays (0.1s increments) for sequential reveals

## Theme System

### Color Philosophy
- **Primary Identity**: Near-black purple (#4c1d95)
- **Dark Priority**: Optimized for dark mode first
- **High Contrast**: Foreground (#f8fafc) on dark background (#0f0f0f)
- **Subtle Accents**: Muted grays for secondary content

### CSS Custom Properties
```css
:root {
  --background: #ffffff;
  --foreground: #0f0f0f;
  --muted: #6b7280;
  --muted-foreground: #4b5563;
  --border: #e5e7eb;
  --card: #ffffff;
  --accent: #4c1d95;
  --accent-foreground: #ffffff;
}

.dark {
  --background: #0f0f0f;
  --foreground: #f8fafc;
  --muted: #9ca3af;
  --muted-foreground: #6b7280;
  --border: #374151;
  --card: #1a1a1a;
  --accent: #4c1d95;
  --accent-foreground: #ffffff;
}
```

### Theme Implementation
- CSS custom properties integrated with Tailwind v4
- Automatic dark/light mode detection
- Theme toggle in navbar
- All components use semantic color tokens

## Navbar System

### Design Goals
- **Minimal**: Compact, non-distracting presence
- **Floating**: Appears on scroll, disappears when at top
- **Functional**: Theme toggle, GitHub link, contact access
- **Responsive**: Collapsible mobile menu

### Navigation Items
- Projects (Briefcase icon)
- Systems (Settings icon)
- Engineering Log (FileText icon)
- About (User icon)
- Contact (Mail icon - in mobile menu)

### Technical Implementation
- Scroll detection with `useEffect`
- Active state indicators with smooth transitions
- Mobile menu with backdrop blur
- Theme persistence in localStorage

## Animation Guidelines

### Motion Philosophy
- **Purposeful**: Every animation serves user experience
- **Subtle**: Enhances without distracting
- **Consistent**: Standardized timing and easing
- **Performance**: GPU-accelerated properties only

### Animation Patterns
```tsx
// Card hover effects
whileHover={{ y: -1, scale: 1.002 }}

// Entrance animations
whileInView={{ opacity: 1, y: 0 }}
transition={{ delay: 0.1 * index, duration: 0.3 }}

// Panel transitions
<motion.div
  initial={{ opacity: 0, y: 12, scale: 0.98 }}
  animate={{ opacity: 1, y: 0, scale: 1 }}
  exit={{ opacity: 0, y: -12, scale: 0.98 }}
  transition={{ duration: 0.3, ease: "easeOut" }}
/>
```

## Project Sections

### Projects
Showcases development work and products:
- **Paket7**: Turkish package tracking aggregator (Next.js, live production)
- **TA Store Marketplace**: E-commerce platform (Medusa, in development)
- **Portfolio Site**: This website (Next.js, pixel design)

### Systems
Demonstrates engineering implementations:
- **Automated User Lifecycle Management**: 1200+ user identity automation
- **Self-Service Support Automation**: Internal IT platform
- **Internal Tools Containerization**: Docker/Kubernetes deployment

### Engineering Log
Problem-solving journal entries:
- Container adoption decisions
- API rate limiting solutions
- Alert fatigue remediation
- Lessons learned from incidents

### Writing
Technical philosophy and insights:
- Automation mindset
- Incident learning
- Identity management complexity

### About
Engineering focus and capabilities:
- Problems solved (automation, monitoring, self-service)
- Environments (enterprise AD, NOC, containers)
- Technical approach (systems thinking, automation-first)

### Contact
Professional contact form with CV data integration.

## Projects Summary

### Paket7 (Live Production)
- **Problem**: Turkish e-commerce lacked unified package tracking
- **Solution**: Web app aggregating multiple carriers (Aras, Yurtiçi, MNG, PTT, Sürat)
- **Tech**: Next.js, TypeScript, Tailwind CSS, Vercel
- **Impact**: Successfully deployed production application

### TA Store Marketplace (Development)
- **Problem**: Modern e-commerce platform needed for TA products
- **Solution**: Full-stack marketplace using Medusa commerce
- **Status**: Active development with advanced workflows

### Portfolio (enes.codes)
- **Problem**: Need professional showcase of engineering transition
- **Solution**: Pixel-inspired portfolio with systems focus
- **Tech**: Next.js 16, TypeScript, Framer Motion, Tailwind v4

## Coding Conventions

### Component Style
- Functional components with TypeScript interfaces
- `use client` directive for client components
- Named exports for all components
- Props interfaces defined at component level

### Naming Patterns
- PascalCase for components (`HomePanel`, `Navigation`)
- camelCase for functions and variables
- kebab-case for CSS classes and data attributes
- Descriptive names (`toggleProjectExpansion`, `handleViewChange`)

### Layout Expectations
- `space-y-6` for section spacing
- `max-w-3xl mx-auto` for content containers
- `surface-card p-6` for card components
- `pixel-hover` for interactive elements

### State Management
- `useState` for local component state
- `useEffect` for side effects (scroll, keyboard)
- Minimal state lifting (panel switching handled at page level)

## Future Development Rules

### Priority Guidelines
1. **Maintain Performance**: Never compromise 60fps animations
2. **Preserve Design**: Keep pixel aesthetic and compact layout
3. **Scale Systems**: Add more engineering examples, not decorative content
4. **Enhance Automation**: Focus on demonstrating technical capabilities

### Quality Standards
- All new components must support both themes
- Animations must be GPU-accelerated
- Bundle size impact must be measured
- Mobile responsiveness required

## What NOT To Do

### Anti-Patterns to Avoid
- **Heavy UI Frameworks**: No Material UI, Ant Design, or similar
- **Large Animations**: No full-screen transitions or complex sequences
- **Visual Clutter**: No gradients, shadows, or decorative elements
- **Layout Breaking**: No changes that increase vertical space usage
- **Performance Compromises**: No JavaScript-heavy interactions
- **Theme Conflicts**: No hardcoded colors, always use CSS custom properties

### Design Restrictions
- Navbar must remain floating and minimal
- Pixel grid background is permanent
- Dark theme priority cannot change
- Compact information density must be maintained

## Roadmap Ideas

### Near-Term (3-6 months)
- Add more engineering case studies
- Implement blog functionality for technical writing
- Add project filtering/search capabilities
- Enhance mobile experience

### Medium-Term (6-12 months)
- Add interactive demos for automation systems
- Implement contact form with backend integration
- Add analytics and performance monitoring
- Create printable CV generation

### Long-Term (1+ years)
- Add case study deep-dives with technical details
- Implement project contribution tracking
- Add skill development visualization
- Create mentorship/consulting inquiry system

---

## Final Notes

This portfolio represents a transition from operations to engineering. Every design decision serves the goal of showcasing technical capabilities and systems thinking. The pixel aesthetic and performance constraints reflect the engineer's focus on efficiency and technical precision.

When contributing or modifying, always ask: "Does this demonstrate engineering capability?" and "Does this maintain the performance and design standards?"