# DESIGN_RULES.md - enes.codes Visual Identity Lock

## Design Philosophy

### Minimal
Clean, functional design without decorative elements. Every visual element serves a purpose. No gradients, shadows, or ornamental features.

### Compact
Dense information layout maximizing content visibility. No oversized sections or excessive whitespace. Content-focused presentation.

### Pixel-Inspired Engineering Interface
Technical aesthetic with pixel grid background. Near-black purple accent color. Clean, precise, engineering workstation feel.

## Layout Rules

### Compact Spacing
- `space-y-6` for section separation
- `max-w-3xl mx-auto` for content containers
- No large margins or padding
- Dense, information-rich layouts

### Grid Alignment
- 20px × 20px pixel grid background
- Consistent alignment across components
- Technical precision in spacing

### Section Constraints
- No oversized hero sections
- Compact card layouts
- Minimal vertical space usage
- Content density prioritized

## Navbar Principles

### Floating
Appears on scroll, disappears at page top. Does not consume permanent vertical space.

### Minimal
Clean, functional design. No heavy borders or backgrounds. Subtle presence.

### Non-Dominant
Secondary to content. Does not compete for attention. Functional navigation only.

## Color System

### Near-Black Purple Identity
Primary accent: #4c1d95 (near-black purple)
- Dark theme: #4c1d95 on #0f0f0f background
- Light theme: #4c1d95 on #ffffff background
- Consistent across all themes

### Unified Palette Only
No random colors. All colors from CSS custom properties:
- `--background`, `--foreground`
- `--muted`, `--muted-foreground`
- `--border`, `--card`
- `--accent`, `--accent-foreground`

### No Color Variations
Single accent color. No color gradients. No tinted variations.

## Dark Mode

### Primary Experience
Optimized for dark mode first. Default theme state.

### Color Values
- Background: #0f0f0f (near-black)
- Foreground: #f8fafc (off-white)
- Muted: #9ca3af (medium gray)
- Border: #374151 (dark gray)
- Card: #1a1a1a (dark gray)
- Accent: #4c1d95 (purple)

## Light Mode

### Clean Neutral Surfaces
Light backgrounds with clear contrast.

### No Dark Containers
No dark cards or sections in light mode. All surfaces use light colors.

### Color Values
- Background: #ffffff (white)
- Foreground: #0f0f0f (black)
- Muted: #6b7280 (gray)
- Border: #e5e7eb (light gray)
- Card: #ffffff (white)
- Accent: #4c1d95 (purple)

## Typography Rules

### Clear Hierarchy
- `text-display` for main headings
- `text-heading-1/2/3` for section headers
- `text-body` for content
- `text-body-small` for captions

### Readable Density
Compact line heights. No oversized text. Technical readability.

### No Oversized Hero Text
No massive headings. Clamp() functions prevent excessive scaling.

## Animation Style

### Precise
Exact timing and easing. No random motion.

### Fast
Quick transitions. 0.3s maximum duration.

### Subtle
Minimal movement. Engineering precision.

### Mechanical Feeling
Technical, controlled motion. No organic or bouncy animations.

## Allowed Animations

### Transform Properties
- `translateX`, `translateY`, `scale`
- `whileHover={{ y: -1, scale: 1.002 }}`
- `whileInView={{ opacity: 1, y: 0 }}`

### Opacity Changes
- Fade in/out transitions
- Loading states
- Panel transitions

## Forbidden Animations

### Layout Animations
- No `width`, `height` changes
- No `top`, `left`, `right` positioning
- No layout-triggering properties

### Heavy Motion
- No parallax effects
- No complex keyframe sequences
- No multi-property animations

### Performance-Killing
- No `box-shadow` animations
- No `background-color` transitions
- No filter effects

## UI Anti-Patterns

### Never Introduce
- Large hero sections with massive text
- Dark cards in light mode
- Heavy borders or shadows
- Gradient backgrounds
- Rounded corners on cards (use square)
- Oversized spacing
- Decorative icons or illustrations
- Color variations outside the palette
- Layout animations
- Parallax scrolling
- Modal overlays
- Toast notifications
- Loading spinners (except minimal)
- Form validation UI
- Error states with heavy styling