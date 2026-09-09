---
name: Lanchonete Esfiha Mobile System
colors:
  surface: '#fff8f2'
  surface-dim: '#f2d6a6'
  surface-bright: '#fff8f2'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#fff2e0'
  surface-container: '#ffebcd'
  surface-container-high: '#ffe5b9'
  surface-container-highest: '#fbdfae'
  on-surface: '#261900'
  on-surface-variant: '#524533'
  inverse-surface: '#3e2e0c'
  inverse-on-surface: '#ffefd6'
  outline: '#857560'
  outline-variant: '#d7c3ac'
  surface-tint: '#815500'
  primary: '#815500'
  on-primary: '#ffffff'
  primary-container: '#faa901'
  on-primary-container: '#664200'
  inverse-primary: '#ffb94c'
  secondary: '#7b5818'
  on-secondary: '#ffffff'
  secondary-container: '#fdcd82'
  on-secondary-container: '#785515'
  tertiary: '#5f6049'
  on-tertiary: '#ffffff'
  tertiary-container: '#bbbba0'
  on-tertiary-container: '#4a4b35'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffddb2'
  primary-fixed-dim: '#ffb94c'
  on-primary-fixed: '#291800'
  on-primary-fixed-variant: '#624000'
  secondary-fixed: '#ffdeae'
  secondary-fixed-dim: '#eebf75'
  on-secondary-fixed: '#281800'
  on-secondary-fixed-variant: '#604100'
  tertiary-fixed: '#e5e4c7'
  tertiary-fixed-dim: '#c8c8ac'
  on-tertiary-fixed: '#1c1d0b'
  on-tertiary-fixed-variant: '#474833'
  background: '#fff8f2'
  on-background: '#261900'
  surface-variant: '#fbdfae'
typography:
  display-lg:
    fontFamily: Montserrat
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 38px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Montserrat
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 30px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Montserrat
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 26px
  headline-sm:
    fontFamily: Montserrat
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Open Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Open Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Open Sans
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  label-lg:
    fontFamily: Open Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 18px
  label-md:
    fontFamily: Open Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
  label-sm:
    fontFamily: Open Sans
    fontSize: 10px
    fontWeight: '700'
    lineHeight: 14px
    letterSpacing: 0.04em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  spacing-2xs: 0.25rem
  spacing-xs: 0.5rem
  spacing-sm: 0.75rem
  spacing-md: 1rem
  spacing-lg: 1.25rem
  spacing-xl: 1.5rem
  spacing-2xl: 2rem
  touch-target-min: 2.75rem
  screen-gutter: 1rem
---

## Brand & Style

The design system establishes a warm, artisanal, yet fast-paced mobile-first delivery interface for Lanchonete Esfiha. It merges the warmth of freshly baked dough and traditional golden spices with a streamlined modern fast-casual application flow. 

### Target Audience & Emotional Tone
Designed for hungry urban patrons ordering lunch or dinner on their smartphones. The interface evokes appetite, comfort, speed, and culinary reliability. Touch patterns prioritize one-handed thumb navigation ("Thumb Zone" architecture), minimizing ordering friction while displaying appetizing product displays.

### Design Style & Philosophy
A clean, food-centric light aesthetic combining warm tonal layering with crisp visual hierarchy. The design avoids cluttered neon elements or artificial skeuomorphism in favor of clear content cards, warm contrast badges, and tactile interactive elements. Crucially, the system strictly enforces a zero-emoji visual language, substituting structured vector icons (Material Symbols Rounded) to preserve brand maturity and crisp visual rendering across high-density mobile screens.

## Colors

The color palette is strictly rooted in the culinary tones of traditional artisanal baking—golden crusts, toasted spices, and rich baked dough:

- **Primary (`#FAA901` - Golden Saffron / Warm Amber):** The key call-to-action color. Used for primary checkout buttons, active selection badges, cart indicators, and focus rings. High-energy and appetizing.
- **Secondary (`#694807` - Toasted Brown):** Represents craft and authenticity. Used for secondary navigation, category outlines, icons, and subtle section dividers.
- **Tertiary (`#FFFEE0` - Cream Dough):** Soft contrast background. Used for highlighted card fills, special promotion containers, dietary tags, and warm notification surfaces.
- **Neutral Dark (`#322303` - Deep Roast Brown):** Replaces standard harsh blacks. Governs high-contrast typography, heavy icon lines, active bottom bar icons, and critical price tags. Provides softer warmth while maintaining AAA contrast against white and cream backgrounds.
- **Base Background (`#FFFFFF`):** Minimalist pure canvas ensuring the food imagery and golden amber elements stand out cleanly.

## Typography

Typography pairs the structural, confident geometry of Montserrat for product titles, price tags, and banners with the highly legible, humanist readability of Open Sans for descriptions, nutritional specs, item modifiers, and legal copy.

### Hierarchy & Mobile Readability
- **Headlines (Montserrat):** Set with tight letter-spacing to present punchy, bold culinary names (e.g., "Esfiha de Carne Temperada", "Combo Família"). Prices on cards use `headline-sm` or `headline-md` in bold Montserrat for quick scanning.
- **Body & Labels (Open Sans):** Optimized for low-stress reading on 5" to 6.7" smartphone viewports. Generous line heights (1.4 - 1.5x) prevent misreads in multi-line ingredient lists and delivery instructions.
- **No Emojis Policy:** Emojis are strictly banned in notification banners, product names, category chips, and statuses. Material Symbols Rounded (e.g., `local_pizza`, `schedule`, `shopping_bag`, `star`, `eco`) must be used exclusively to guarantee crisp, uniform alignment.

## Layout & Spacing

The layout is strictly optimized for handheld smartphone devices, following a fluid mobile grid model with fixed screen gutters.

### Mobile Grid & Layout Principles
- **Screen Margins:** Fixed `16px` (`1rem`) edge gutters ensuring consistent alignment against modern bezel-less screens.
- **Touch Targets:** Strict adherence to minimum `44px` (`2.75rem`) and preferred `48px` tappable heights for all interactive elements (steppers, category tabs, primary CTA buttons, add-to-bag triggers).
- **Thumb Zone Architecture:** 
  - Primary checkout triggers and persistent cart summaries are locked to a sticky bottom floating container.
  - Horizontal scrolling category carousels sit within easy thumb reach right below sticky filter bars.
  - Modifiers and item customization bottom-sheets occupy the lower 60% of the viewport.
- **Density:** Tight vertical padding (`8px` to `12px`) within menu lists enables users to view at least 2.5 items per screenfold without excessive scrolling.

## Elevation & Depth

Visual hierarchy leverages soft, warm ambient drop shadows rather than cool gray blurs, reinforcing the fresh-baked, friendly atmosphere.

### Depth Levels
- **Level 0 (Flat / Canvas):** Pure `#FFFFFF` background for standard screens, or `#FFFEE0` for subtle promotional containers and selected item cards.
- **Level 1 (Cards & Chips):** `box-shadow: 0px 2px 8px rgba(50, 35, 3, 0.06);` with a hairline border `1px solid rgba(105, 72, 7, 0.08)`. Used on menu item cards, delivery tracking modules, and inactive filter pills.
- **Level 2 (Sticky Nav & Floating Headers):** `box-shadow: 0px 4px 14px rgba(50, 35, 3, 0.10)`. Used on top app bars and secondary category bars upon scroll.
- **Level 3 (Bottom Sheet & Modal):** `box-shadow: 0px -6px 24px rgba(50, 35, 3, 0.14)`. Applied to interactive product detail drawers and order configuration panels, paired with a backdrop overlay of `rgba(50, 35, 3, 0.45)`.
- **Level 4 (Floating CTAs & Floating Action Badges):** `box-shadow: 0px 6px 16px rgba(250, 169, 1, 0.35)`. Ambient golden glow beneath the primary `#FAA901` ordering buttons.

## Shapes

The design system employs a balanced `roundedness: 2` scale (base border-radius of `8px` / `0.5rem`).

### Corner Radius System
- **Base Components (`rounded` / `8px`):** Input fields, quantity counter steppers, order summary tables, and thumbnail image frames.
- **Surface Cards (`rounded-lg` / `16px`):** Esfiha menu cards, deal banners, delivery status trackers, and voucher containers.
- **Floating Surfaces & Sheets (`rounded-xl` / `24px`):** Top corners of mobile bottom sheets, promotional modal cards, and sticky checkout summaries.
- **Interactive Controls (`rounded-full` / `9999px`):** Category filter chips, icon buttons, add-to-cart circular stepper toggles, and status badges.

## Components

### Buttons
- **Primary Action (Add to Cart / Checkout):** Background `#FAA901`, text `#322303` (`label-lg`, Montserrat 700), radius `12px` or `rounded-full`, height `50px`. Features a warm golden drop shadow. Focused states add an outer halo in `#FFFEE0`.
- **Secondary Action:** Outlined with `1.5px` border in `#694807`, transparent fill, text `#694807`.
- **Quantity Stepper:** Compact pill widget with `#FFFEE0` background, `#322303` typography, and `#FAA901` circular plus/minus icons (`40px` tap zone).

### Category Chips & Filters
- **Active State:** Background `#FAA901`, text `#322303`, weight 600, paired with an inline Material Symbol (e.g., `local_fire_department`, `star`).
- **Inactive State:** Background `#FFFFFF`, border `1px solid rgba(105, 72, 7, 0.15)`, text `#694807`. Pill-shaped (`rounded-full`), height `36px`, content padding `8px 16px`.

### Product Cards (Esfiha Item)
- Compact horizontal row for mobile lists: Square image (`88px` x `88px`) on the left with `12px` radius. Middle area holds the item title (Montserrat `headline-sm`, `#322303`), description (Open Sans `body-sm`, max 2 lines, `#694807`), and price (`label-lg` in `#322303`). Right area houses a circular `+` button in `#FAA901`.
- Featured/Combo cards: Full-width vertical cards with `#FFFEE0` warm background, `16px` rounded corners, and a top badge for specials.

### Input Fields
- Background `#FFFFFF`, border `1px solid rgba(105, 72, 7, 0.2)`. Focus border shifts to `2px solid #FAA901`. Text `#322303`, placeholder `#694807` at 60% opacity. Minimum height `48px` with clear Material Symbols icons (e.g., `search`, `location_on`).

### Bottom Navigation & Sticky Order Bar
- Persistent bottom bar in `#FFFFFF` with top border `1px solid rgba(105, 72, 7, 0.08)`. Active icons are tinted `#FAA901` with a small dot indicator; inactive icons are `#694807`.
- Floating cart bar: Anchored above bottom navigation with `#322303` dark background, `#FFFEE0` counter pill, and `#FAA901` "Ver Sacola" button.