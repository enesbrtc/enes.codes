# PERFORMANCE_RULES.md - enes.codes Performance Protection

## Performance Philosophy

Speed over decoration. Every feature decision must consider performance impact. 60fps minimum requirement. Technical precision over visual flair.

## Hard Performance Rules

### Maintain 60fps Minimum
- Animations must never drop below 60fps
- Only GPU-accelerated properties allowed
- Test all animations on low-end devices
- Remove any animation causing frame drops

### Avoid Unnecessary Dependencies
- Minimal package count
- No large UI frameworks
- Remove unused imports immediately
- Bundle size monitoring required

### Avoid Heavy Animation Libraries
- Framer Motion only (lightweight usage)
- No GSAP, Anime.js, or similar
- No Three.js or WebGL libraries
- No particle systems

## Rendering Rules

### Prevent Unnecessary Re-renders
- Use React.memo for expensive components
- Avoid inline functions in render
- Stable object references
- Minimal prop drilling

### Prefer Memoization Where Needed
- React.memo for panel components
- useMemo for expensive calculations
- useCallback for event handlers
- Only when profiling shows benefit

### Lazy Load Heavy Components
- All panels dynamically imported
- No synchronous loading of large components
- Code splitting at panel level
- Suspense boundaries where needed

## Animation Performance

### Only GPU-Friendly Animations
Allowed properties:
- `transform` (translate, scale, rotate)
- `opacity`

Forbidden properties:
- `width`, `height`
- `top`, `left`, `right`, `bottom`
- `margin`, `padding`
- `box-shadow`
- `background-color`
- `color`
- `font-size`

### Animation Constraints
- Maximum duration: 0.5 seconds
- Easing: `easeOut` or `easeInOut`
- No spring animations
- No bounce effects

### Performance Testing
- Use browser dev tools performance tab
- Test on 60Hz displays minimum
- Profile memory usage
- Monitor bundle size changes

## Bundle Size Discipline

### Package Restrictions
No large frameworks:
- No Material UI, Ant Design, Chakra UI
- No Bootstrap, Foundation
- No heavy icon libraries (Lucide React only)
- No chart libraries
- No date pickers
- No rich text editors

### Size Monitoring
- Track bundle size changes
- Remove unused dependencies
- Prefer tree-shakable imports
- Code splitting for large features

## Responsiveness Rules

### Mobile-First Behavior
- Design for mobile first
- Progressive enhancement for larger screens
- Touch-friendly interaction areas
- Readable text on small screens

### No Layout Shifts
- Fixed dimensions where possible
- No dynamic content causing reflow
- Stable element positioning
- Predictable component sizes

### Performance on Mobile
- Optimized for slower networks
- Minimal JavaScript execution
- Fast initial page load
- Smooth scrolling

## Performance Anti-Patterns

### Never Introduce These
- Large background images
- Unoptimized images
- Heavy font files
- Synchronous API calls on render
- Memory leaks
- Infinite re-render loops
- Large inline scripts
- Blocking CSS/JS
- Unused CSS classes
- Heavy web fonts
- Multiple animation libraries
- Complex CSS selectors
- Deep component trees
- Excessive DOM manipulation
- Memory-intensive operations
- Long-running JavaScript
- Synchronous localStorage access
- Heavy event listeners
- Inefficient algorithms
- Large data processing on client
- Real-time updates without throttling
- Multiple API calls on mount
- Unnecessary polyfills
- Legacy browser support
- Heavy build tools
- Development-only code in production