# Layout Mapping - Existing HTML to React Components

This document maps the existing HTML/CSS/JS structure to React components.

## Structure Mapping

### Header → `Header.jsx`
- ✅ Updated to match exact structure:
  - `header-top` with helpline box, logo, buttons
  - `header-bottom` with social links, navbar, Book Now button
  - Mobile nav overlay
  - Sticky header behavior

### Hero → `Hero.jsx`  
- ✅ Updated to match structure:
  - Background image/pattern
  - h1 hero-title
  - hero-text paragraph
  - btn-group with buttons

### Tour Search → `MemoryCalendar.jsx`
- **Needs Update:** Should match `.tour-search` section structure:
  - Background: `var(--bright-navy-blue)` 
  - Form layout (but adapt for calendar)
  - Two-column layout on desktop

### Popular Destination → `OurDates.jsx`
- **Needs Update:** Should match `.popular` section structure:
  - Section header (subtitle, title, text)
  - `.popular-list` grid
  - `.popular-card` structure with:
    - `.card-img`
    - `.card-content` (absolute positioned)
    - `.card-rating` (absolute positioned badge)

### Package → `OurSong.jsx`
- **Needs Update:** Should match `.package` section structure:
  - `.package-card` grid layout:
    - `.card-banner` (image)
    - `.card-content` (text + meta)
    - `.card-price` (side panel with rating/price)
  - Three-column grid on desktop

### Gallery → `GalleryAlbums.jsx`
- **Needs Update:** Should match `.gallery` section structure:
  - `.gallery-list` grid (2 columns, special 3rd item spans 2 rows)
  - `.gallery-image` with images

### CTA → `FinalCTA.jsx`
- **Needs Update:** Should match `.cta` section structure:
  - Background: `var(--bright-navy-blue)`
  - `.cta-content` with subtitle, title, text
  - Button on the side (flex layout on desktop)

### Footer → `Footer.jsx`
- **Needs Update:** Should match exact footer structure:
  - `.footer-top`:
    - `.footer-brand` (logo + text)
    - `.footer-contact` (title + contact items)
    - `.footer-form` (newsletter form)
  - `.footer-bottom`:
    - `.copyright`
    - `.footer-bottom-list` (links)

### Go Top → `GoTop.jsx`
- ✅ Created to match structure

## CSS Class Usage

All components should use these existing classes:
- `.container` - wrapper with responsive max-width
- `.section-subtitle` - blue uppercase text
- `.section-title` - h2 heading
- `.section-text` - descriptive text
- `.btn`, `.btn-primary`, `.btn-secondary` - buttons
- `.h1`, `.h2`, `.h3` - typography headings

## Color Variables to Use

From existing CSS:
- `--bright-navy-blue` - Primary blue
- `--united-nations-blue` - Lighter blue
- `--gunmetal` - Dark text/background
- `--white`, `--black` - Base colors
- `--black-coral` - Gray text

Can add pink accent:
- `--pink-accent: #ff69b4`
- `--pastel-bg: #fff8f8`

## Responsive Breakpoints

- 580px - Tablet
- 768px - Desktop
- 992px - Large desktop  
- 1200px - Extra large

