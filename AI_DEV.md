# AI_DEV.md - enes.codes AI Development Guide

## Project Purpose

This is a personal engineering portfolio for Enes Barutcu, showcasing his transition from NOC/IT operations to Application & Platform Engineering. The site demonstrates engineering capabilities through real systems implementations, automation projects, and technical writing.

## Engineer Background Context

Enes has 5+ years in enterprise IT operations (Active Directory, Microsoft 365, NOC) and is transitioning into engineering. The portfolio emphasizes:
- Automation-first solutions
- Systems thinking over individual features
- Operational efficiency improvements
- Enterprise-scale implementations

## Project Structure

```
app/
├── layout.tsx          # Root layout with theme setup
├── page.tsx            # Main page with panel routing
├── globals.css         # Theme variables and pixel styling
└── [other pages]/

components/
├── Navigation.tsx      # Floating navbar with theme toggle
├── Layout.tsx          # Page wrapper with pixel grid
├── panels/             # Content sections (dynamically imported)
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

## Tech Stack

- **Framework**: Next.js 16.1.6 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 with CSS custom properties
- **Animations**: Framer Motion (transform/opacity only)
- **Icons**: Lucide React
- **Deployment**: Vercel

## Development Workflow

### Adding New Features
1. Create component in appropriate folder
2. Use TypeScript interfaces for props
3. Follow existing naming patterns
4. Test animations with 60fps requirement
5. Ensure theme compatibility

### Architectural Decisions
- Single-page application with client-side routing
- Dynamic imports for all panels (performance)
- CSS custom properties for theming
- Minimal state management (local component state)
- Lazy loading for heavy components

## Sections Meaning

### Projects
Showcases development work and products built. Currently includes:
- Paket7 (live production e-commerce tracking)
- TA Store Marketplace (in development)
- This portfolio site

### Systems
Demonstrates engineering implementations and automation systems. Focuses on:
- Enterprise-scale solutions
- Operational efficiency improvements
- Technical architecture decisions

### Engineering Log
Problem-solving journal showing engineering thought process:
- Technical decisions and trade-offs
- Incident investigations and lessons
- System design evolution

### Writing
Technical philosophy and insights:
- Automation mindset
- Engineering principles
- Industry observations

### About
Engineering focus areas and capabilities:
- Problems solved
- Technical environments
- Engineering approach

### Contact
Professional contact with CV integration.

## Project Philosophy

### Performance-First
- 60fps animations mandatory
- Minimal bundle size
- GPU-accelerated animations only
- Lazy loading for performance

### Compact UI
- Dense information layout
- No wasted whitespace
- Content-focused design
- Minimal visual decoration

### Minimal Navigation
- Floating navbar that doesn't dominate
- Keyboard shortcuts available
- Clean, functional design

### Engineering-Focused Design
- Technical aesthetic (pixel-inspired)
- Systems thinking emphasis
- Real implementations over demos
- Professional engineering showcase

## Safe Development Rules

### Never Break These
1. **60fps Performance**: Only transform/opacity animations
2. **Theme System**: Always use CSS custom properties
3. **Compact Layout**: Maintain dense information design
4. **Dynamic Imports**: Keep panels lazily loaded
5. **TypeScript**: Full type safety required

### Code Quality Standards
- Functional components with TypeScript interfaces
- Named exports for all components
- Consistent naming patterns
- Minimal dependencies

## Common Tasks Guide

### Adding New Project
1. Add to `projects` array in `ProjectsPanel.tsx`
2. Include: title, status, problem, solution, impact, tech, links
3. Use existing icon from Lucide React
4. Follow expandable card pattern

### Adding New Section
1. Create component in `components/panels/`
2. Add dynamic import to `app/page.tsx`
3. Add to ViewType union and panels object
4. Add navigation item to `Navigation.tsx`
5. Follow existing panel structure

### UI Improvement
1. Check DESIGN_RULES.md for visual constraints
2. Use existing CSS custom properties
3. Test on both light/dark themes
4. Ensure mobile responsiveness
5. Verify 60fps performance

### Animation Safely
1. Use only `transform` and `opacity` properties
2. Test with `will-change` if needed
3. Keep durations under 0.5s
4. Use `whileInView` for entrance animations
5. Avoid layout-triggering animations