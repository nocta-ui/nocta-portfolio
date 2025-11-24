# Nocta Portfolio Template

A modern, free portfolio template built on **Nocta UI** – showcasing how to create production-ready applications with our component library. Combines server-side rendering with smooth animations and an optional video showcase. Built for creatives who want a professional online presence without starting from scratch.

## What You Get

This template demonstrates the full potential of **Nocta UI** in a real-world application. Everything works out of the box—SSR for fast initial loads, smooth page transitions, and animated sections. The blog is ready for technical writing, and the contact form actually sends emails.

**Core capabilities:**
- Server-side rendering with client hydration for optimal performance
- Smooth scrolling and GSAP-powered animations that feel polished
- Blog with MDX support for technical articles and case studies
- Working contact form with email delivery
- Dark/light theme with persistent user preferences
- Mobile-responsive throughout

All UI components are powered by **Nocta UI** – our accessible, production-ready component library built on Ariakit with Tailwind styling.

## Technology Choices

We picked technologies that balance developer experience with production reliability:

- **Nocta UI** – our accessible component library providing buttons, forms, cards, and more out of the box
- **React 19 + TanStack Start** – modern React with SSR that actually works
- **File-based routing** – add a file, get a route, no configuration needed
- **GSAP + Lenis** – professional-grade animation and smooth scrolling
- **React Three Fiber** – GPU-accelerated hero backgrounds without fighting raw Three.js APIs
- **Tailwind CSS v4** – utility-first styling with CSS variables for theming
- **MDX + Content Collections** – write blog posts in Markdown with React components mixed in, with type-safe content management
- **TypeScript** – catch errors before your users do

The contact form uses Zod validation, Resend for email delivery, and React Email for templates.

## About Nocta UI

**Nocta UI** is our comprehensive component library that powers this template. Built on top of Ariakit for accessibility and Tailwind CSS for styling, it provides production-ready components that follow best practices:

- **Accessible by default** – ARIA patterns, keyboard navigation, screen reader support
- **Composable primitives** – build complex UIs from simple, reusable pieces
- **Type-safe** – full TypeScript support with intelligent autocompletion
- **Customizable** – extend and override styles without fighting the system

This template serves as a comprehensive example of what you can build with Nocta UI, from simple buttons and forms to complex layouts and interactions.

### Adding More Components

The template includes core Nocta UI components needed for a portfolio, but you can easily add more from the registry. **All components install with design tokens that match the portfolio's aesthetic** – colors, spacing, typography, and animations stay consistent automatically.

```bash
# Browse available components
npx @nocta-ui/cli list

# Add components that fit your needs
npx @nocta-ui/cli add dialog tabs dropdown-menu
```

The CLI copies component source directly into your project, so you have full control to customize further if needed. No package updates, no version conflicts – just React components that integrate seamlessly with the existing design system.

## Project Structure

```
src/
 ├─ routes/              File-based pages (/, /blog/$slug)
 ├─ sections/            Landing page sections (hero, services, works, etc.)
 ├─ components/          Reusable UI components and layout elements
 │   └─ ui/              Nocta UI components with custom styling
 ├─ content/posts/       Your blog posts in MDX format
 ├─ lib/                 Utilities, animation helpers, theme logic
 └─ styles.css           Theme variables and Tailwind config
```

Each landing section lives in its own folder with components and data separated. Need to update your services or testimonials? Edit the constants file. Want to add a new section? Copy an existing one and modify it.

## Getting Started

**Requirements:**
- Node.js 20 or newer
- pnpm 9+

**Setup:**
```bash
pnpm install
pnpm dev
```

Your site runs at `http://localhost:3000`. Changes appear instantly thanks to Vite's fast refresh.

**Environment variables** (create `.env`):
```
RESEND_API_KEY=your_key_here
RESEND_TO_EMAIL=your@email.com
RESEND_FROM_EMAIL=Portfolio Contact <hello@yourdomain.com>
```

You'll need a Resend account for the contact form. It's free for reasonable volume and handles email deliverability better than DIY SMTP.

## Customization

**Content updates** are straightforward:
- Blog posts go in `src/content/posts/` as MDX files with frontmatter
- Landing sections pull content from `_constants` files in each section folder
- Theme colors live in `src/styles.css` as CSS variables
- Fonts are in `src/assets/` (uses local files, no external requests)

**Adding pages:**
Create a file in `src/routes/` and the router picks it up automatically. Want an about page? Add `src/routes/about.tsx`.

**Extending functionality:**
All UI components in `src/components/ui/` are built with **Nocta UI**. The library provides consistent patterns and composable primitives—copy one component to create similar variants, or import directly from Nocta UI for standard implementations. Every component follows accessibility best practices and supports full keyboard navigation.

**Adding more Nocta UI components:**
Need additional components for your portfolio? The Nocta UI CLI makes it simple:

```bash
# Discover what's available
npx @nocta-ui/cli list

# Install components that match your existing design
npx @nocta-ui/cli add dialog tabs dropdown-menu
```

Components install as source files in `src/components/ui/` with design tokens that automatically inherit the portfolio's theme. Colors, spacing, typography, and animation timing stay consistent – no manual style adjustments needed. You get full control over the code while maintaining design coherence across your entire site.

### SEO & Metadata

Robust metadata is configured in `src/lib/seo.ts`. The helpers exported there feed TanStack Router's `head` option for both the root layout (`getRootSeo`) and blog posts (`getBlogPostSeo`). Update titles, descriptions, keywords, or social links in one place and the canonical URLs, Open Graph/Twitter cards, and JSON-LD schema instantly stay in sync across the entire site. Each blog post automatically exposes article-specific structured data (publish dates, tags, reading time) pulled from frontmatter, so search engines and social previews reflect the actual content without extra manual work.

## Deployment

```bash
pnpm build    # Generates production bundle
pnpm serve    # Test the build locally
```

The build produces optimized SSR output that works on any Node.js hosting (Vercel, Netlify, your own server). Nitro handles the server runtime, so you get flexibility without lock-in.

Static assets are fingerprinted and cached. The router prefetches pages on hover for instant navigation. View transitions make page changes feel smooth.

## Why This Stack

**Nocta UI foundation:** Built on a battle-tested component library that handles accessibility, composability, and theming. Focus on your content, not reinventing UI patterns.

**Performance:** SSR means search engines and users see content immediately. Client-side hydration adds interactivity without a second full render.

**Developer experience:** File-based routing, auto-generated types, fast refresh, and a component library that doesn't fight you. Less config, more building.

**Production-ready:** Form validation, email delivery, proper error handling, and accessibility baked in. Not a toy project that needs six months of work to ship.

**Maintainable:** Modern standards (ES modules, TypeScript strict mode), clear separation of concerns, and popular tools with good documentation. Future you will thank present you.

## Scripts Reference

```bash
pnpm dev        # Development server with hot reload
pnpm build      # Production build
pnpm serve      # Preview production build locally
pnpm lint       # Check code with Biome
pnpm format     # Format code with Biome
pnpm check      # Combined lint + format check
```

## What's Included

**Landing sections:**
- Hero with animated text and shader background
- Services grid
- Works/portfolio showcase
- Showcase/video reel section with looping video integration
- Testimonials carousels
- FAQ accordion
- Blog preview with latest posts
- Contact form with validation

**Technical features:**
- Server Side Rendering
- View transitions between routes
- Smooth scroll with anchor handling
- Theme persistence via cookies
- MDX with Content Collections for type-safe posts
- Syntax highlighting
- Reading time calculation
- Responsive images
- SEO meta tags

Everything is modular. Don't need the Showcase section? Delete the folder. Want different landing sections? Mix and match from the existing Nocta UI components.

## Learn More About Nocta UI

This template is just one example of what you can build with **Nocta UI**. The library provides dozens more components and patterns for building modern web applications. Check out the [Nocta UI documentation](https://www.nocta-ui.com/) to explore the full component library and see how it can accelerate your next project.

## Support & Development

Built with TypeScript 5.9. Linted and formatted with Biome for consistent code style.

The router regenerates automatically during development—no manual route registration. MDX posts are managed by Content Collections, which provides type-safe content queries and validates frontmatter at build time. Animations use GSAP's CustomEase and ScrollTrigger for smooth, performant motion.

This template gets out of your way so you can focus on your actual portfolio content. No fighting the framework, no surprise limitations, no vendor lock-in. Just **Nocta UI** components and modern React patterns working together smoothly.

---

**Built with Nocta UI** – Accessible, composable components for modern React applications.
