# PS Store E-Commerce - Design Guidelines

## Design Approach
**Reference-Based:** Drawing inspiration from modern e-commerce leaders (Shopify, Nike, Apple Store) with emphasis on clean product showcasing, intuitive navigation, and conversion-optimized layouts. The design will reflect the premium aesthetic suggested by the PS Store brand identity.

## Typography System

**Primary Font:** Inter (Google Fonts) - Clean, modern sans-serif for UI elements
**Secondary Font:** Poppins (Google Fonts) - Bold, attention-grabbing for headings

**Hierarchy:**
- Hero Headlines: text-5xl to text-6xl, font-bold (Poppins)
- Section Headers: text-3xl to text-4xl, font-semibold (Poppins)
- Product Titles: text-xl, font-semibold (Inter)
- Body Text: text-base, font-normal (Inter)
- Prices: text-2xl, font-bold (Inter)
- Buttons/CTAs: text-sm to text-base, font-medium, uppercase tracking-wide
- Captions/Meta: text-sm, font-normal

## Layout System

**Spacing Units:** Consistent use of Tailwind spacing: 4, 6, 8, 12, 16, 24
- Component padding: p-6 to p-8
- Section spacing: py-12 to py-24
- Grid gaps: gap-6 to gap-8
- Container max-width: max-w-7xl

**Grid Systems:**
- Product Grid: grid-cols-1 md:grid-cols-3 lg:grid-cols-4
- Featured Products: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Cart Items: Single column stack with clear dividers
- Admin Dashboard: grid-cols-1 lg:grid-cols-4 (sidebar + content)

## Component Library

### Navigation
**Header:** Sticky top navigation with logo left, search bar center, cart/login right. Height: h-16 to h-20. Include product category dropdown menu.

### Hero Section
Full-width hero banner (h-96 to h-screen) featuring hero product or seasonal promotion. Large headline, compelling subtext, and prominent CTA button. Hero image should showcase premium products with subtle overlay for text readability.

### Product Cards
- Card style: Rounded corners (rounded-lg), subtle shadow (shadow-md hover:shadow-xl)
- Image: Aspect ratio 4:3, object-cover, rounded-t-lg
- Layout: Image top, product name, price, "Add to Cart" button
- Hover state: Lift effect (transform scale-105 transition)
- Include quick view icon overlay on image hover

### Shopping Cart
**Cart Badge:** Absolute positioned circle with item count on cart icon
**Cart Sidebar:** Slide-in panel from right (w-96), fixed overlay, with:
- Cart items list with thumbnail, name, quantity controls, price
- Subtotal calculation
- Checkout button (large, full-width, sticky bottom)
- Empty cart state with illustration

### Admin Panel
**Sidebar Navigation:** Fixed left sidebar (w-64) with:
- Dashboard overview
- Products management
- Orders list
- Settings

**Main Content Area:** Clean white canvas with data tables, forms, and action buttons. Use cards (rounded-xl, shadow-lg) for grouping related information.

### Forms
- Input fields: h-12, rounded-lg borders, focus ring treatment
- Labels: text-sm, font-medium, positioned above inputs
- Primary buttons: h-12, rounded-lg, full-width on mobile
- File upload: Drag-and-drop zone with preview thumbnails

### Product Detail Page
Two-column layout (image gallery left, product info right):
- Image Gallery: Large main image with thumbnail strip below
- Product Info: Title, price, description, quantity selector, Add to Cart
- Tabs section: Description, Specifications, Reviews

## Interactions

**Minimal Animations:**
- Add to cart: Brief scale pulse on cart icon
- Product cards: Smooth hover lift (200ms ease)
- Page transitions: Simple fade-in content
- Loading states: Skeleton screens, not spinners
- Modal overlays: Fade background, slide content

## Images

**Hero Section:** Large banner image (1920x800px) showcasing featured products or promotional campaign. Position at top of homepage with text overlay (use backdrop-blur-sm on button backgrounds).

**Product Images:** High-quality product photography (800x800px minimum), white or neutral backgrounds. Each product requires 3-5 images for gallery view.

**Category Headers:** Banner images for each product category (1400x400px).

**Admin Panel:** Product upload interface requires placeholder for drag-drop zone.

**Empty States:** Include friendly illustrations for empty cart, no products found, no orders yet.

## Page Layouts

**Homepage:**
1. Hero section with featured promotion
2. Category grid (3-4 columns)
3. Featured products section (8-12 products)
4. Promotional banner (full-width)
5. New arrivals section
6. Footer with newsletter signup

**Product Listing:**
- Filter sidebar (categories, price range)
- Sort dropdown (top right)
- Product grid with pagination

**Checkout:**
- Multi-step process indicator
- Form sections in single column
- Order summary sticky sidebar (desktop)

**Admin Dashboard:**
- Stats cards grid (4 columns)
- Recent orders table
- Quick action buttons

This design creates a modern, conversion-focused e-commerce experience optimized for both customer shopping and owner management.