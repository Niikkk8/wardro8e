# Wardro8e Landing — Full Styling & Content Analysis

## 1. Tailwind CSS Configuration (`tailwind.config.ts`)

- **Dark Mode:** Uses class-based dark mode (`darkMode: ["class"]`).
- **Content Paths:** Scans for Tailwind classes in `pages`, `components`, `app`, and `src` directories for `.ts` and `.tsx` files.
- **Font Families:** 
  - `sans`: Uses Montserrat (via CSS variable).
  - `serif`: Uses Playfair Display (via CSS variable).
- **Theme Extensions:**
  - **Colors:** All major color roles (border, input, ring, background, foreground, primary, secondary, destructive, muted, accent, popover, card) are mapped to CSS variables using HSL for easy theming.
  - **Border Radius:** Uses CSS variables for large, medium, and small radii.
  - **Keyframes & Animations:** Custom keyframes for accordion open/close, mapped to `accordion-down` and `accordion-up` animations.
- **Plugins:** Uses `tailwindcss-animate` for animation utilities.

---

## 2. Global CSS (`app/globals.css`)

- **Font Variables:** 
  - `--font-montserrat` and `--font-playfair` for global font control.
- **Color Variables:** 
  - Accent, accent-hover, accent-light, background, foreground, card, card-border, accent-bg, muted-text.
  - **Light Theme:** Warmer, less harsh colors.
  - **Dark Theme:** Deeper backgrounds, lighter text, adjusted accent backgrounds.
- **Base Styles:**
  - Smooth scrolling, antialiased fonts, transition for background and text color.
  - `.font-serif` utility for Playfair Display.
- **Scrollbar Hiding:** 
  - `.scrollbar-hide` for all browsers.
- **Gradients:** 
  - `.bg-gradient-primary` for teal-to-blue backgrounds.
- **Animations:** 
  - `fadeIn`, `scroll`, `bounce-slow` for various UI elements.
- **Form Elements:** 
  - Custom radio button styling, focus outlines for accessibility.
- **Card & Section Styles:** 
  - `.theme-card`, `.section-bg`, `.section-alt` for themed containers.
- **Masonry Grid:** 
  - `.random-masonry` for grid layout, with hover and shadow effects.
- **Image & Link Effects:** 
  - `.img-hover`, `.hover-rise`, `.link-underline` for interactive feedback.
- **Responsive:** 
  - `.masonry-item` height is capped on mobile for better UX.

---

## 3. Component Library

### General Patterns
- All components are functional React components, many using the `useTheme` context for dark/light mode.
- Animations and transitions are heavily used for smooth, modern UI.
- Most sections/components are responsive and use Tailwind for layout and spacing.

### Key Components

- **Navbar.tsx**
  - Fixed, animated navbar with dark/light support.
  - Responsive: collapses to a mobile menu with animated open/close.
  - Theme toggle button (sun/moon icons).
  - Navigation scrolls to sections using `scrollToSection`.

- **Footer.tsx**
  - Themed footer with logo, description, navigation links, and social icon (Instagram).
  - Responsive, with copyright.

- **ThemeContext.tsx**
  - Provides `theme` and `toggleTheme` via React context.
  - Applies `.dark` class to `<body>` for dark mode.

- **scrollUtils.ts**
  - Utility for smooth scrolling to section IDs.

---

### Landing Page Sections

- **Hero.tsx**
  - Large, animated hero with status indicator, headline, subtext, and a "Get Started" button.
  - Diamond-shaped masonry image gallery (uses Next.js `Image` for optimization).
  - Responsive, with blur placeholders for images.

- **Features.tsx**
  - Section highlighting AI style profiling features.
  - Animated feature list with icons.
  - Includes a live masonry grid gallery.

- **ForShoppers.tsx**
  - Section for shoppers, with feature cards (personalized discovery, unique brands, style evolution).
  - Each card has an image, icon, and animated entry.
  - "Create Your Style Profile" button.

- **ForBrands.tsx**
  - Section for brands, with feature cards (analytics, targeted audience, sustainable growth).
  - Animated dashboard mockup and stat cards.
  - Responsive, with background gradients and blur effects.

- **HowItWorks.tsx**
  - Step-by-step process (style quiz, personalized feed, connect with brands).
  - Animated step navigation, with icons and images.
  - "Get Started Now" button.

- **EarlyAccess.tsx**
  - Waitlist signup form with email validation, Google sign-in, and user type selection.
  - Animated entry, benefit list, and error handling.
  - Submits to `/api/waitlist`.

- **MasonryGrid.tsx**
  - Custom, animated masonry grid for images.
  - Supports infinite scroll, responsive columns, and lazy loading.

- **Faq.tsx**
  - Accordion-style FAQ with animated open/close.
  - Themed for dark/light mode.

---

## 4. Other Notable Details

- **Accessibility:** 
  - Focus outlines, accessible labels, and keyboard navigation are considered.
- **Animations:** 
  - Many elements animate on scroll or interaction for a lively feel.
- **Image Optimization:** 
  - Uses Next.js `Image` for all images, with blur placeholders and responsive sizing.
- **Section Navigation:** 
  - All navigation (navbar/footer/buttons) uses smooth scroll to anchor sections.
- **Branding:** 
  - Consistent use of the "wardro8e" logo, with a stylized "8" in teal.
- **Social:** 
  - Instagram icon in the footer, linking to the brand's page.

---

## 5. Design Philosophy

- **Modern, minimal, and elegant**: Soft backgrounds, accent colors, and subtle shadows.
- **Highly interactive**: Animations and transitions for all major UI elements.
- **Dark mode first**: Default theme is dark, with easy toggle.
- **Mobile-first**: Responsive layouts, touch-friendly controls, and mobile-optimized images.
- **Personalization**: AI-driven features, user type selection, and adaptive content.

---

## Content Details of the Landing Page

This section provides a detailed mapping of all the actual text and content used in the landing page. Use this as a reference for creating new pages or maintaining content consistency.

### Navbar
- **Logo:** `wardro8e` (with stylized "8" in teal)
- **Navigation Links:**
  - Features
  - For Shoppers
  - For Brands
  - How It Works
  - Get Started (button)
- **Theme Toggle:** Sun/Moon icon

### Hero Section
- **Status Indicator:** `Wardro8e Is Now Open for Everyone`
- **Headline:** `Discover Your
Wardrobe Vision With Us`
- **Subtext:** `Experience the future of fashion discovery where AI intelligence meets personal
style. Connect with brands that truly understand your aesthetic.`
- **Button:** `Get Started`

### Features Section
- **Section Title:** `AI Style Profiling`
- **Section Description:** `Our advanced AI creates a detailed style profile based on your
preferences and fashion choices.`
- **Feature List:**
  1. **Personal style DNA mapping**
     - `Our AI analyzes thousands of style attributes to create your unique fashion fingerprint.`
  2. **Personalized trend prediction**
     - `Get curated trend forecasts that align with your unique style preferences.`
  3. **Style evolution tracking**
     - `Our AI learns and evolves with you, continuously refining recommendations.`
- **Feed Card:**
  - `Your Style Feed`
  - Tabs: `All`, `Wishlist`

### For Shoppers Section
- **Section Title:** `For Shoppers`
- **Section Description:** `Discover fashion that truly resonates with your personal style,
curated by our advanced AI.`
- **Feature Cards:**
  1. **Personalized Discovery**
     - `Find pieces that match your unique style preferences without endless scrolling.`
     - Label: `Style Mapping`
     - Sublabel: `Personalized recommendations`
  2. **Discover Unique Brands**
     - `Connect with independent designers and brands that align with your aesthetic.`
     - Label: `Brand Matching`
     - Sublabel: `Find your style soulmates`
  3. **Style Evolution**
     - `Our AI learns and evolves with your preferences to refine your personal style.`
     - Label: `Adaptive Learning`
     - Sublabel: `Growing with your preferences`
- **Button:** `Create Your Style Profile`

### For Brands Section
- **Section Title:** `For Brands`
- **Section Description:** `Connect with shoppers who truly appreciate your aesthetic. Grow your
brand with our AI-powered platform.`
- **Feature Cards:**
  1. **Powerful Analytics**
     - `Gain deep insights into how shoppers interact with your products. Understand which items resonate with different customer segments and optimize your collections accordingly.`
  2. **Targeted Audience**
     - `Connect with shoppers whose style preferences align perfectly with your brand aesthetic. Our AI ensures your products are shown to the most relevant audience who truly appreciates your designs.`
  3. **Sustainable Growth**
     - `Build a loyal customer base that truly understands and values your vision. Create authentic connections and grow your brand organically through meaningful customer relationships.`
- **Dashboard Card:**
  - `Brand Dashboard`
  - `Performance Overview`
  - Tabs: `This Month`, `All Time`
  - Stat Cards: `Profile Views`, `Product Clicks`, `Conversion Rate`
  - Engagement by Style Category: `Casual`, `Formal`, `Minimalist`, `Vintage`, `Streetwear`, `Bohemian`

### How It Works Section
- **Section Title:** `How Wardro8e Works`
- **Section Description:** `Your personal style journey in three simple steps`
- **Steps:**
  1. **Express Your Style**
     - `Take our fun style quiz that helps our AI understand your unique preferences and fashion inspirations.`
  2. **Discover Your Fashion Universe**
     - `Explore your personalized feed featuring brands and pieces that align with your unique style DNA.`
  3. **Connect With Style Soulmates**
     - `Engage with brands that match your aesthetic. Save favorites and create collection boards that evolve with your style.`
- **Button:** `Get Started Now`

### Early Access / Waitlist Section
- **Section Title:** `Join the Fashion Revolution`
- **Section Description:** `Be among the first to experience the future of personalized
fashion discovery. Sign up for early access and help shape the
platform that will transform how you discover and connect with fashion.`
- **Benefit List:**
  1. `AI-powered style recommendations tailored just for you`
  2. `Discover independent brands that match your aesthetic`
  3. `Early adopter perks and exclusive limited collections`
- **Form:**
  - Email input with validation (error messages for typos, disposable emails, etc.)
  - User type selection: `shopper` or `brand`
  - Google sign-in option
  - Button: `Get Early Access`
  - Success message after submission

### FAQ Section
- **Section Title:** `Frequently Asked Questions`
- **Section Description:** `Everything you need to know about Wardro8e and how it works.`
- **Questions & Answers:**
  1. **How does Wardro8e's AI styling work?**
     - `Our AI analyzes thousands of style attributes and your interactions with the platform to understand your unique preferences. It creates a personalized style profile that continually evolves as you engage with more content, ensuring increasingly accurate recommendations that reflect your personal taste.`
  2. **Is Wardro8e free for shoppers?**
     - `Yes, Wardro8e is completely free for shoppers. We believe in making personalized fashion discovery accessible to everyone. Our revenue comes from partnerships with brands and retailers featured on our platform.`
  3. **How do brands join the Wardro8e platform?**
     - `Brands can apply through our partner portal. After a brief review process to ensure quality and authenticity, approved brands can upload their collections and gain access to our analytics dashboard to connect with shoppers who truly appreciate their aesthetic.`
  4. **Can I save items for later?**
     - `Absolutely! You can save items to your personal collection boards, organized by categories or occasions of your choice. This helps our AI further understand your preferences while giving you easy access to your favorite discoveries.`
  5. **How is Wardro8e different from other fashion platforms?**
     - `Unlike traditional fashion marketplaces that show the same products to everyone, Wardro8e uses advanced AI to create a truly personalized experience. We focus on connecting shoppers with unique, independent brands that match their specific style preferences rather than promoting mass-market products.`
  6. **Will my style profile be shared with third parties?**
     - `Your privacy is important to us. Your style profile is only used within our platform to improve your recommendations and connect you with relevant brands. We never sell your personal data to third parties, and you have complete control over your privacy settings.`

### Footer
- **Description:** `AI-powered fashion discovery connecting unique brands with
style-conscious shoppers. Elevate your personal style journey with
intelligent recommendations.`
- **Social:** Instagram icon linking to `https://instagram.com/wardro8e_`
- **Copyright:** `© [current year] Wardro8e. All rights reserved.`
- **Developer Credit:** `Developed by Niket Shah` (link: https://niket.dev/)

---

## How to Use This Documentation

- Use this as a reference for **styling conventions**, **component usage**, and **theming** in the main `@/wardro8e` app.
- For new features, follow the **theme variable** and **component structure** patterns outlined here.
- For design changes, update both the Tailwind config and global CSS to maintain consistency.
- For content, use the above section to maintain consistency in tone, structure, and messaging across new pages.

---

**This documentation was auto-generated for maximum detail and accuracy.**  
For further details, inspect the source files in `@/wardro8e-landing/components` and `@/wardro8e-landing/app/globals.css`.
