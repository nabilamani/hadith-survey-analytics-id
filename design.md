# Design System Inspired by Wardah Beauty

## 1. Visual Theme & Atmosphere

Wardah Beauty's design system embodies a modern, inclusive, and aspirational aesthetic that celebrates beauty through a lens of cultural authenticity and everyday empowerment. The visual language combines soft, welcoming teal tones with warm neutrals to create an approachable luxury experience. The design prioritizes clarity, accessibility, and a sense of community, reflecting Wardah's position as Indonesia's leading cosmetics brand. Clean typography, generous whitespace, and thoughtful color transitions establish a contemporary feel that respects both minimalism and the richness of the brand's heritage.

**Key Characteristics**
- Modern, inclusive, and culturally grounded aesthetic
- Warm-cool teal palette paired with sophisticated neutrals
- Clean, approachable luxury positioning
- Strong emphasis on legibility and accessibility
- Community-focused imagery and messaging
- Generous whitespace and breathing room
- Contemporary geometry with soft transitions
- Confidence through simplicity

## 2. Color Palette & Roles

### Primary
- **Primary Teal** (`#67C7C6`): Main brand color used across interactive elements, buttons, links, and accent features. Communicates trust, freshness, and feminine empowerment.
- **Primary Dark Teal** (`#006F79`): Deep variant for emphasis, hover states, and visual hierarchy on primary elements.

### Accent Colors
- **Light Teal** (`#70CACB`): Softer alternative for secondary accent applications and gentle emphasis.
- **Medium Teal** (`#48B9C7`): Mid-tone accent for layered depth and secondary interactive states.

### Interactive
- **Dark Charcoal** (`#212529`): Primary text and interactive component backgrounds for maximum contrast and readability.
- **Deep Brown** (`#8B7F71`): Warm accent used for supporting text and tertiary interactive elements, adding sophistication.

### Neutral Scale
- **Light Gray** (`#8C8E90`): Primary neutral for secondary text, borders, and non-critical elements (most frequently used).
- **Medium Gray** (`#828282`): Mid-tone neutral for disabled states, secondary labels, and contextual information.
- **Dark Gray** (`#505050`): Deep neutral for primary body text on light backgrounds.
- **Subtle Gray** (`#98999B`): Very light neutral for tertiary text and subtle separators.
- **Charcoal** (`#545454`): Deep gray for emphasis within neutral contexts.
- **Pure Black** (`#000000`): Maximum contrast for primary headlines and critical text.
- **Off-White** (`#F8F9FA`): Soft white background for subtle section differentiation.

### Surface & Borders
- **Pure White** (`#FFFFFF`): Primary background, cards, containers, and overlay surfaces.
- **Gray Border** (`#E0E0E0`): Input and container borders for subtle definition without visual weight.

### Semantic / Status
- **Success Green** (`#00B233`): Positive actions, confirmations, and success messaging.
- **Warning Amber** (`#FFC107`): Alerts and cautionary messaging requiring user attention.
- **Error Red** (`#DC3545`): Error states, validation failures, and destructive actions.

## 3. Typography Rules

### Font Family
**Primary Font:** Montserrat (Google Fonts)
- Fallback stack: `Montserrat, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`
- Weights available: 200, 300, 400, 500, 600, 700, 800

**Secondary Font:** System stack for code and monospace contexts
- Fallback stack: `'Courier New', monospace`

### Hierarchy

| Role | Font | Size | Weight | Line Height | Letter Spacing | Notes |
|------|------|------|--------|-------------|-----------------|-------|
| Display | Montserrat | 40px | 300 | 48px | normal | Used for page titles and hero headlines |
| Heading 1 | Montserrat | 40px | 300 | 48px | normal | Page section headings |
| Heading 2 | Montserrat | 20px | 300 | 24px | normal | Subsection and card titles |
| Heading 3 | Montserrat | 16px | 300 | 25.6px | normal | Minor section titles |
| Heading 4 | Montserrat | 14px | 500 | 16.8px | normal | Strong labels and emphasis |
| Body | Montserrat | 14px | 300 | 20.02px | normal | Primary paragraph text |
| Body Strong | Montserrat | 16px | 400 | 24px | normal | Emphasized body content |
| Button | Montserrat | 20px | 400 | 20px | normal | Primary and secondary button text |
| Button Small | Montserrat | 16px | 400 | 24px | normal | Small button variants and tertiary actions |
| Button Tertiary | Montserrat | 14px | 400 | 21px | normal | Ghost and outline button text |
| Label | Montserrat | 22.8px | 700 | 34.2px | normal | Form labels and prominent callouts |
| Caption | Montserrat | 14px | 400 | 17.5px | normal | Secondary and tertiary information |
| Link | Montserrat | 20px | 400 | 30px | normal | Primary link text |
| Link Strong | Montserrat | 16px | 700 | 24px | normal | Emphasized link text |

### Principles
- **Montserrat-first approach:** Modern, geometric sans-serif creates confidence and approachability.
- **Hierarchy through weight and size:** Three-tier system (300/400/500/700 weights) establishes clear visual priority without requiring excessive size variation.
- **Generous line height:** 1.2x to 1.4x multipliers ensure readability and emotional breathing room, reflecting the brand's inclusive philosophy.
- **Contrast-driven:** Dark text (`#212529`, `#000000`) on light backgrounds (`#FFFFFF`, `#F8F9FA`) maintains WCAG AA+ accessibility.
- **Warmth through neutrals:** Gray (`#8C8E90`) secondary text softens the visual hierarchy while maintaining legibility.

## 4. Component Stylings

### Buttons

**Primary Button**
- Background: `#67C7C6`
- Text Color: `#FFFFFF`
- Font Size: `20px`
- Font Weight: `400`
- Font Family: `Montserrat`
- Padding: `8px 24px`
- Border Radius: `4px`
- Border: `0px none`
- Box Shadow: `none`
- Height: `40px`
- Line Height: `20px`
- Hover State: Background `#48B9C7`, Text `#FFFFFF`
- Active State: Background `#006F79`, Text `#FFFFFF`
- Disabled State: Background `#D9D9D9`, Text `#828282`

**Secondary Button**
- Background: `#FFFFFF`
- Text Color: `#006F79`
- Font Size: `14px`
- Font Weight: `400`
- Font Family: `Montserrat`
- Padding: `6px 12px`
- Border Radius: `4px`
- Border: `1px solid #006F79`
- Box Shadow: `none`
- Height: `auto`
- Line Height: `21px`
- Hover State: Background `#F0F8F8`, Text `#006F79`, Border `1px solid #006F79`
- Active State: Background `#E0F0F0`, Text `#006F79`, Border `1px solid #006F79`
- Disabled State: Background `#FFFFFF`, Text `#828282`, Border `1px solid #828282`

**Ghost Button**
- Background: `transparent`
- Text Color: `#212529`
- Font Size: `20px`
- Font Weight: `400`
- Font Family: `Montserrat`
- Padding: `0px`
- Border Radius: `0px`
- Border: `0px none`
- Box Shadow: `none`
- Height: `auto`
- Line Height: `20px`
- Hover State: Text Color `#67C7C6`
- Active State: Text Color `#006F79`

**Icon Button**
- Background: `transparent`
- Text Color: `#8C8E90`
- Font Size: `16px`
- Font Weight: `400`
- Font Family: `Montserrat`
- Padding: `0px`
- Border Radius: `0px`
- Border: `0px none`
- Box Shadow: `none`
- Height: `32px`
- Width: `32px`
- Line Height: `24px`
- Hover State: Text Color `#67C7C6`

### Cards & Containers

**Card Default**
- Background: `#FFFFFF`
- Border: `1px solid #E0E0E0`
- Border Radius: `4px`
- Padding: `24px`
- Box Shadow: `0px 2px 8px rgba(0, 0, 0, 0.08)`
- Hover State: Box Shadow `0px 4px 16px rgba(0, 0, 0, 0.12)`

**Card Elevated**
- Background: `#FFFFFF`
- Border: `0px none`
- Border Radius: `4px`
- Padding: `24px`
- Box Shadow: `0px 4px 16px rgba(0, 0, 0, 0.12)`
- Hover State: Box Shadow `0px 8px 24px rgba(0, 0, 0, 0.16)`

**Section Container**
- Background: `#F8F9FA`
- Border: `0px none`
- Border Radius: `0px`
- Padding: `48px 40px`
- Box Shadow: `none`

### Inputs & Forms

**Text Input Default**
- Background: `#FFFFFF`
- Text Color: `#212529`
- Font Size: `16px`
- Font Weight: `400`
- Font Family: `Montserrat`
- Padding: `6px 0px`
- Border Radius: `0px`
- Border: `0px solid #E0E0E0`
- Border Bottom: `1px solid #E0E0E0`
- Box Shadow: `none`
- Height: `auto`
- Width: `100%`
- Line Height: `24px`
- Focus State: Border Bottom `2px solid #67C7C6`
- Placeholder Color: `#8C8E90`

**Text Input Error**
- Background: `#FFFFFF`
- Text Color: `#DC3545`
- Font Size: `16px`
- Font Weight: `400`
- Font Family: `Montserrat`
- Padding: `6px 0px`
- Border Radius: `0px`
- Border Bottom: `2px solid #DC3545`
- Box Shadow: `none`
- Height: `auto`
- Line Height: `24px`

**Form Label**
- Color: `#212529`
- Font Size: `22.8px`
- Font Weight: `700`
- Font Family: `Montserrat`
- Line Height: `34.2px`
- Margin Bottom: `8px`

**Form Hint / Helper Text**
- Color: `#8C8E90`
- Font Size: `14px`
- Font Weight: `300`
- Font Family: `Montserrat`
- Line Height: `20.02px`
- Margin Top: `4px`

### Navigation

**Navigation Link Default**
- Background: `transparent`
- Text Color: `#8C8E90`
- Font Size: `16px`
- Font Weight: `400`
- Font Family: `Montserrat`
- Padding: `0px`
- Border Radius: `0px`
- Border: `0px none`
- Box Shadow: `none`
- Height: `40px`
- Line Height: `24px`
- Hover State: Text Color `#67C7C6`
- Active State: Text Color `#006F79`, Border Bottom `2px solid #006F79`

**Navigation Link Strong**
- Background: `transparent`
- Text Color: `#FFFFFF`
- Font Size: `16px`
- Font Weight: `700`
- Font Family: `Montserrat`
- Padding: `8px 5.6px`
- Border Radius: `0px`
- Border: `0px none`
- Height: `40px`
- Line Height: `24px`
- Hover State: Text Color `#70CACB`

### Links

**Primary Link**
- Color: `#67C7C6`
- Font Size: `20px`
- Font Weight: `400`
- Font Family: `Montserrat`
- Text Decoration: `none`
- Padding Bottom: `5px`
- Border Bottom: `1px solid transparent`
- Line Height: `30px`
- Hover State: Color `#48B9C7`, Border Bottom `1px solid #48B9C7`
- Active State: Color `#006F79`, Border Bottom `1px solid #006F79`

**Secondary Link**
- Color: `#FFFFFF`
- Font Size: `16px`
- Font Weight: `400`
- Font Family: `Montserrat`
- Text Decoration: `none`
- Padding: `8px 5.6px`
- Border Bottom: `0px`
- Line Height: `24px`
- Hover State: Color `#70CACB`

### Badge

**Badge Default**
- Background: `#67C7C6`
- Text Color: `#FFFFFF`
- Font Size: `14px`
- Font Weight: `500`
- Font Family: `Montserrat`
- Padding: `4px 12px`
- Border Radius: `12px`
- Border: `0px none`
- Line Height: `16.8px`

**Badge Secondary**
- Background: `#F8F9FA`
- Text Color: `#006F79`
- Font Size: `14px`
- Font Weight: `500`
- Font Family: `Montserrat`
- Padding: `4px 12px`
- Border Radius: `12px`
- Border: `1px solid #006F79`
- Line Height: `16.8px`

**Badge Status Success**
- Background: `#00B233`
- Text Color: `#FFFFFF`
- Font Size: `14px`
- Font Weight: `500`
- Font Family: `Montserrat`
- Padding: `4px 12px`
- Border Radius: `12px`

**Badge Status Error**
- Background: `#DC3545`
- Text Color: `#FFFFFF`
- Font Size: `14px`
- Font Weight: `500`
- Font Family: `Montserrat`
- Padding: `4px 12px`
- Border Radius: `12px`

## 5. Layout Principles

### Spacing System

**Base Unit:** `8px`

**Spacing Scale:**
- `4px` — Micro spacing for tight component padding and small gaps
- `8px` — Small spacing for button padding, icon margins, and compact sections
- `12px` — Medium-small spacing for form elements and grouped components
- `16px` — Primary spacing for internal component padding and moderate gaps
- `20px` — Secondary spacing for flexible vertical rhythm
- `24px` — Large spacing for card padding and section separation
- `28px` — Extra-large spacing for visual breathing room
- `32px` — Generous spacing for major component sections
- `40px` — Extra-generous spacing for horizontal padding and large containers
- `48px` — Massive spacing for section vertical padding and layout breaks
- `60px` — Maximum spacing for hero sections and major layout divisions

**Usage Context:**
- Buttons: `8px` (vertical) × `24px` (horizontal)
- Cards: `24px` padding all sides
- Sections: `48px` vertical, `40px` horizontal
- Text blocks: `16px` bottom margin
- Form groups: `20px` gap between fields
- Hero sections: `60px` top/bottom

### Grid & Container

**Max Width:** `1200px` for primary content container

**Column Strategy:** 12-column fluid grid system
- Desktop (1200px+): 12 columns, `12px` gutter
- Tablet (768px–1199px): 8 columns, `12px` gutter
- Mobile (320px–767px): 4 columns, `8px` gutter

**Section Patterns:**
- Hero: Full-width background with centered max-width content
- Content: Centered max-width container with balanced padding
- Grid: 4-column card layout on desktop, 2-column on tablet, 1-column on mobile
- Sidebar: Two-column layout (main content + 300px sidebar)

### Whitespace Philosophy

Wardah's design prioritizes emotional breathing room and reduced cognitive load. Generous vertical spacing between sections (48px–60px) creates visual rest and emphasizes content hierarchy. Horizontal padding (40px on desktop, 24px on mobile) prevents text from edge-to-edge tension. Internal component padding (16px–24px) ensures text and elements don't feel cramped. The brand avoids dense layouts; empty space is treated as a design element that communicates luxury and thoughtfulness.

### Border Radius Scale

- `0px` — Hard edges for navigation, inputs, and structural elements emphasizing clarity
- `4px` — Subtle rounding for buttons, cards, and containers, maintaining modern geometry
- `4.8px` — Modal dialogs and overlay surfaces for gentle definition
- `12px` — Badge and chip elements for distinctive, approachable styling
- `50%` — Perfect circles for avatars, image overlays, and brand icons

## 6. Depth & Elevation

| Level | Treatment | Use |
|-------|-----------|-----|
| Flat (0) | No shadow | Primary backgrounds, sections, non-interactive surfaces |
| Raised (1) | `0px 2px 8px rgba(0, 0, 0, 0.08)` | Cards at rest, subtle depth emphasis |
| Elevated (2) | `0px 4px 16px rgba(0, 0, 0, 0.12)` | Cards on hover, buttons, component focus states |
| Floating (3) | `0px 8px 24px rgba(0, 0, 0, 0.16)` | Modals, dropdowns, popovers, overlays |
| Peak (4) | `0px 12px 32px rgba(0, 0, 0, 0.20)` | Top-level modals, critical overlays, emergency notifications |

**Shadow Philosophy:**

Wardah employs a subtle, modern shadow system based on soft, semi-transparent black layers. Shadows never feel harsh or cartoonish; instead, they communicate spatial depth through delicate opacity shifts. The approach mirrors real-world lighting: elevation increases correspond to higher y-axis offsets and increased blur. This creates a cohesive 3D sense of visual hierarchy without aesthetic distraction. Shadows are used sparingly—primarily for interactive surfaces, containers receiving user focus, and modal overlays—allowing whitespace and color to carry the visual design.

## 7. Do's and Don'ts

### Do

- **Use Montserrat across all text contexts.** The typeface is integral to Wardah's modern, confident identity and ensures visual coherence.
- **Prioritize generous spacing.** Wardah's luxury positioning demands breathing room; default to larger gaps than feels comfortable.
- **Employ the primary teal (`#67C7C6`) for all primary interactive elements.** Buttons, primary links, and key CTAs must use this color for instant recognition.
- **Maintain high contrast.** Text on light backgrounds should be `#212529` or `#000000`; text on dark backgrounds must be `#FFFFFF`.
- **Use weight variation for hierarchy.** Switch between 300 and 500+ weights to establish visual priority without relying solely on color or size.
- **Apply subtle shadows only to interactive surfaces.** Cards, buttons on hover, and modals; avoid shadowing plain containers or backgrounds.
- **Group related form fields with 20px vertical gaps.** Clusters of inputs need breathing room for scannability.
- **Center align headlines and key messaging.** Wardah's aesthetic embraces centered, emphatic typography for emotional impact.
- **Leverage teal accent colors for secondary emphasis.** Use `#48B9C7` or `#70CACB` for supporting elements without overwhelming primary focus.

### Don't

- **Avoid serif fonts or script typefaces.** Montserrat's geometric clarity is non-negotiable for brand consistency.
- **Don't use colors outside the defined palette.** Introducing arbitrary hues fractures the cohesive color story.
- **Never apply shadows to text.** Text should rely on color and weight contrast, not depth rendering.
- **Don't exceed `1200px` max-width on desktop.** Stretching content weakens the sense of luxury containment.
- **Avoid padding below `8px` inside components.** Cramped spacing contradicts the brand's inclusive, spacious aesthetic.
- **Never use color as the sole indicator of interactive state.** Combine color change with border, shadow, or scale adjustments for accessibility.
- **Don't mix font weights carelessly.** Stick to 300/400/500/700; arbitrary weight choices erode visual hierarchy.
- **Avoid orange, bright greens, or warm reds in primary elements.** These contradict the cool-teal primary and dilute brand recognition.
- **Never reduce line height below 1.2x.** Text feels suffocated and conflicts with accessibility standards.
- **Don't apply border radius above `12px` on cards or containers.** Excessive rounding softens the modern, geometric aesthetic.

## 8. Responsive Behavior

### Breakpoints

| Breakpoint Name | Width | Key Changes |
|-----------------|-------|-------------|
| Mobile | 320px–767px | Single-column layout, 4-column grid, 24px horizontal padding, 16px spacing, large touch targets |
| Tablet | 768px–1199px | Two-column layout, 8-column grid, 32px horizontal padding, 24px spacing, medium touch targets |
| Desktop | 1200px+ | Multi-column layout, 12-column grid, 40px horizontal padding, 48px spacing, standard touch targets |
| Large Desktop | 1440px+ | Expanded max-width to 1320px, increased section padding to 60px, optional sidebar layouts |

### Touch Targets

- **Minimum Size:** `44px` × `44px` for all interactive elements (buttons, links, inputs).
- **Button Padding:** `12px` vertical, `24px` horizontal on mobile; increase to `8px` × `24px` on desktop for consistency.
- **Link Spacing:** Ensure inline links have at least `8px` spacing on all sides to prevent accidental adjacent-link taps.
- **Icon Buttons:** Maintain `32px` × `32px` minimum; if smaller, surround with transparent padding to reach `44px` touch target.
- **Form Input Height:** `40px` minimum on touch devices; accept taller if improving legibility.

### Collapsing Strategy

**Header & Navigation:**
- Desktop: Horizontal menu bar (40px height), search visible, account icon.
- Tablet: Horizontal menu bar (40px), search collapses to icon, account visible.
- Mobile: Menu collapses to hamburger toggle, search as icon, account as icon.

**Cards & Grids:**
- Desktop: 4-column card grid (290px cards), full product details inline.
- Tablet: 2-column card grid (360px cards), reduced description text.
- Mobile: 1-column stacked cards (100% width), condensed metadata.

**Sections & Spacing:**
- Desktop: `48px` vertical gaps, `40px` horizontal padding.
- Tablet: `32px` vertical gaps, `32px` horizontal padding.
- Mobile: `24px` vertical gaps, `24px` horizontal padding.

**Typography Scaling:**
- Desktop: Full sizes as defined (H1 40px, body 14px).
- Tablet: H1 32px, body 14px, slightly reduced line-height.
- Mobile: H1 28px, body 14px, maintained line-height for legibility.

**Hero Images & Hero Sections:**
- Desktop: Full aspect ratio, background image with text overlay.
- Tablet: Slightly compressed aspect ratio, larger text overlay.
- Mobile: Vertical aspect ratio, centered text, image fills viewport height.

## 9. Agent Prompt Guide

### Quick Color Reference

- **Primary CTA:** Primary Teal (`#67C7C6`)
- **Secondary CTA:** Primary Dark Teal (`#006F79`)
- **Background:** Pure White (`#FFFFFF`)
- **Body Text:** Dark Charcoal (`#212529`)
- **Secondary Text:** Light Gray (`#8C8E90`)
- **Headings:** Pure Black (`#000000`)
- **Borders:** Gray Border (`#E0E0E0`)
- **Success State:** Success Green (`#00B233`)
- **Error State:** Error Red (`#DC3545`)
- **Warning State:** Warning Amber (`#FFC107`)
- **Accent Text:** Deep Brown (`#8B7F71`)
- **Light Background:** Off-White (`#F8F9FA`)

### Iteration Guide

1. **Font-First Foundation:** All text uses Montserrat; weights are 300 (light), 400 (regular), 500 (medium), 700 (bold). Line heights are 1.2x–1.4x multipliers. Never use serif or script fonts.

2. **Spacing by Function:** Buttons are `8px` vertical × `24px` horizontal. Cards are `24px` padding all sides. Sections are `48px` vertical × `40px` horizontal on desktop, proportionally reduced on mobile. Form fields gap `20px` vertically.

3. **Elevation Hierarchy:** Flat backgrounds (no shadow) for non-interactive surfaces. Raised shadow (`0px 2px 8px rgba(0, 0, 0, 0.08)`) for cards at rest. Elevated shadow (`0px 4px 16px rgba(0, 0, 0, 0.12)`) for interactive surfaces and hover states. Floating shadow (`0px 8px 24px rgba(0, 0, 0, 0.16)`) for modals and dropdowns.

4. **Color by Role:** Primary teal (`#67C7C6`) for primary buttons and links. Dark teal (`#006F79`) for secondary actions and dark backgrounds. Neutrals (`#8C8E90` primary, `#212529` text) for supporting content. Status colors only for validation states (green, red, amber).

5. **Border Radius Consistency:** `0px` for hard-edged navigation and inputs. `4px` for buttons, cards, and containers (maintaining modern geometry). `12px` for badges and chips (friendly, approachable). `50%` for avatars and circular elements only.

6. **Responsive Pattern:** Max-width `1200px` desktop container. Desktop: 12-column, 40px padding. Tablet: 8-column, 32px padding. Mobile: 4-column, 24px padding. Touch targets minimum `44px` × `44px`.

7. **Typography Hierarchy:** Display/H1 40px weight 300. H2 20px weight 300. Body 14px weight 300. Buttons 20px weight 400. Labels 22.8px weight 700. All line heights 1.2x–1.4x multipliers.

8. **Interactive States:** Hover changes color and shadow. Focus adds border and shadow. Active deepens color. Disabled grays out (text `#828282`, background `#D9D9D9`). Never rely on color alone for state indication.

9. **Contrast & Accessibility:** Dark text (`#212529` or `#000000`) on light backgrounds. White text on teal or dark backgrounds. Minimum 4.5:1 ratio for body text. WCAG AA+ compliance required across all text and interactive elements.

10. **Component Patterns:** Primary button background `#67C7C6` white text. Secondary button white background, `#006F79` text, `1px solid #006F79` border. Ghost button transparent background, `#212529` text, no border. Input underline only (no box), `1px solid #E0E0E0` default, `2px solid #67C7C6` on focus.