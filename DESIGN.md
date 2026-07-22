---
name: Pastel Modernism
colors:
  surface: '#f6f9ff'
  surface-dim: '#bbdefc'
  surface-bright: '#f6f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#ebf5ff'
  surface-container: '#e0f0ff'
  surface-container-high: '#d5ebff'
  surface-container-highest: '#cae6ff'
  on-surface: '#001e2f'
  on-surface-variant: '#414753'
  inverse-surface: '#0c334b'
  inverse-on-surface: '#e6f2ff'
  outline: '#717785'
  outline-variant: '#c1c6d5'
  surface-tint: '#6b5779'
  primary: '#695476'
  on-primary: '#ffffff'
  primary-container: '#826c90'
  on-primary-container: '#fffbff'
  inverse-primary: '#d7bde5'
  secondary: '#7c5264'
  on-secondary: '#ffffff'
  secondary-container: '#ffc8dd'
  on-secondary-container: '#7b5163'
  tertiary: '#874861'
  on-tertiary: '#ffffff'
  tertiary-container: '#a4607a'
  on-tertiary-container: '#fffbff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#f3daff'
  primary-fixed-dim: '#d7bde5'
  on-primary-fixed: '#251432'
  on-primary-fixed-variant: '#533f60'
  secondary-fixed: '#ffd8e6'
  secondary-fixed-dim: '#edb8cc'
  on-secondary-fixed: '#301020'
  on-secondary-fixed-variant: '#623b4c'
  tertiary-fixed: '#ffd9e4'
  tertiary-fixed-dim: '#ffb0cd'
  on-tertiary-fixed: '#390720'
  on-tertiary-fixed-variant: '#6e334c'
  background: '#f6f9ff'
  on-background: '#001e2f'
  surface-variant: '#cae6ff'
typography:
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  gutter: 16px
  margin: 24px
---

# Pastel Modernism Design System

## Brand & Style
Pastel Modernism is a design language that blends the clarity of modern functionalism with a soft, ethereal color palette. It aims to evoke a sense of calm, approachability, and digital lightness. The target audience values a playful yet professional aesthetic that prioritizes legibility and gentle visual cues over aggressive high-contrast elements.

The style is characterized by:
- **Soft Modernism:** Utilizing the clean structures of modern UI while softening the edges and color tones.
- **Airy Composition:** Generous use of whitespace and a "breathable" layout to reduce cognitive load.
- **Gentle Hierarchy:** Using subtle shifts in pastel tones rather than harsh shadows or deep blacks to establish visual order.

## Colors
The palette is built on a series of harmonious pastel shades that provide a whimsical yet structured feel.

*   **Primary (#cdb4db):** A soft lavender-purple used for primary actions, active states, and brand recognition.
*   **Secondary (#ffc8dd):** A delicate candy-pink used for supportive accents and highlighting secondary interactive elements.
*   **Tertiary (#ffafcc):** A slightly more vibrant pink for decorative elements or tertiary call-outs.
*   **Neutral (#bde0fe):** A light sky-blue used for surfaces, backgrounds, and borders to maintain a cool, cohesive atmosphere.

The color mode is strictly **light**, emphasizing the "airy" and "cloud-like" nature of the brand.

## Typography
The system uses **Inter** for all typographic roles to ensure maximum legibility and a contemporary feel. The typeface’s neutral character allows the pastel colors and rounded shapes to take center stage.

*   **Headlines:** Use Bold or Semi-Bold weights to provide clear structure against the soft background colors.
*   **Body Text:** Standardized on Inter Regular for high readability across long-form content.
*   **Labels:** Medium weight is used for small UI labels to maintain clarity at reduced scales.
*   **Scaling:** Headlines scale down for mobile devices to prevent excessive line wrapping while maintaining a distinct visual weight.

## Layout & Spacing
The layout follows a fluid grid system that prioritizes generous margins and a 16px gutter. 

*   **Grid:** A 12-column layout for desktop, transitioning to 4 columns for mobile.
*   **Rhythm:** An 8px base unit (spacing = 2) governs all padding and margins, creating a predictable vertical and horizontal rhythm.
*   **Density:** The layout is intentionally spacious, avoiding cramped elements to support the calm brand personality.

## Elevation & Depth
Depth is communicated through **Tonal Layers** rather than heavy shadows. 

*   **Surface Tiers:** Different levels of depth are created by layering the Neutral blue and Primary/Secondary pastels. 
*   **Soft Shadows:** Where elevation is necessary (like on floating action buttons or cards), use extremely diffused, low-opacity shadows with a hint of the neutral blue tint to prevent them from looking "dirty."
*   **Focus:** No harsh black outlines; focus states should use a subtle glow or a 2px stroke of the Primary lavender color.

## Shapes
The shape language is defined by a **Rounded** aesthetic.

*   **Standard Components:** Buttons and input fields feature a 0.5rem (8px) corner radius.
*   **Larger Elements:** Cards and containers use `rounded-lg` (1rem / 16px) or `rounded-xl` (1.5rem / 24px) to emphasize the soft, friendly nature of the UI.
*   **Consistency:** Avoid sharp corners entirely to maintain the approachable visual tone.

## Components
*   **Buttons:** 8px radius. Use the Primary lavender for main actions and Secondary pink for alternative accents. 
*   **Cards:** Use light Neutral blue backgrounds with a 16px corner radius. Border strokes should be 1px wide and slightly darker than the background.
*   **Inputs:** Soft background fills using the Neutral tint, with 8px rounded corners.
*   **Chips/Labels:** Use pill-shaped (fully rounded) containers with light pastel fills and darker text of the same hue.