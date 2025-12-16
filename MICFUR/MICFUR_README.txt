MICFUR

MICFUR is a modern, static furniture storefront website (HTML/CSS/JS) focused on a clean UI and a dense, desktop-like experience on mobile devices (compact typography, reduced spacing, and side-by-side product grids).

MAIN VISION (TOP PRIORITY): 3D PRODUCT EXPERIENCE WITH FULL CONTROL

The most important future of MICFUR is to turn every product into an interactive 3D experience where users have full control.

What “full control” means in MICFUR:

- Rotate / pan / zoom (Orbit controls)
- Fullscreen viewer + reset camera
- Smooth loading, mobile-friendly performance
- Material + color variants (change fabrics/wood/metal)
- Lighting controls / environment presets
- Hotspots (click points to explain details)
- Measurements / dimensions overlay
- Optional AR mode (where supported)

KEY FEATURES

- Responsive layout tuned so mobile feels like a scaled-down desktop view
- Denser product layouts (more items per screen, less vertical scrolling)
- Improved mobile navbar toggle visibility
- Multi-page structure ready to evolve into a full e-commerce experience

PAGES & OPTIONS

This repository currently includes the following pages:

- index.html (Home)
  - Hero + introduction area
  - Featured product grid
  - Sections like Why Choose Us / Testimonials / Footer content (depending on template layout)

- shop.html (Shop)
  - Main product listing grid
  - Product preview interactions (image/lightbox patterns)
  - 3D model preview path (foundation): the lightbox logic is designed to try loading 3D models from models/<product-name>.glb (and fall back to images if a model is missing)
  - Designed to be extended with filtering, sorting, categories, and search

- services.html (Services)
  - Services/features cards
  - Product highlights
  - Testimonials

PROJECT STRUCTURE

- css/ — Stylesheets (main styling is in css/style.css)
- js/ — JavaScript
- images/ — Images/assets

HOW TO RUN

This project is a static website. You can open the HTML files directly, but running a local server is recommended.

Python HTTP server

From the project folder:

python -m http.server 8000 --bind 0.0.0.0

Then open:

- PC: http://localhost:8000/index.html
- Phone (same network): http://<YOUR_PC_IP>:8000/index.html

ROADMAP / FUTURE

The most important future direction for MICFUR is showing products as real 3D models with full user control.

3D MODELING + 3D VIEWER ROADMAP (HIGHEST PRIORITY)

- Create accurate, high-quality 3D models per product (GLB/GLTF)
- Add a full-control 3D viewer in the product experience:
  - Rotate / pan / zoom (Orbit)
  - Fullscreen + reset view
  - Auto-rotate toggle
  - Camera presets (Front / Side / Back / Top)
- Add materials & variants:
  - Fabric/wood/metal swaps
  - Color variants and texture sets
  - Variant-specific pricing/images
- Add lighting & environment:
  - HDR environments
  - Shadow quality controls
  - Studio / Living room / Outdoor presets
- Add product details inside 3D:
  - Hotspots + info panels
  - Measurements / size overlay
  - Exploded view (optional)
- Optimize for performance:
  - Draco / meshopt compression
  - Lazy-loading and progressive loading
  - LODs (level-of-detail)
- Optional AR mode (where supported)

Additional future improvements:

- Real backend (products, cart, checkout) with a database
- Authentication + user profiles (orders, saved items)
- Payment integration (Stripe/PayPal)
- Product filtering, sorting, categories, and search
- Admin dashboard to manage products and orders
- SEO, performance, and accessibility improvements

DEVELOPER & OWNER

Developed and owned by Michael.
