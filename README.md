# Aqua Monkeys Aquatic Rentals Website

Single-page, mobile-first marketing website for **Aqua Monkeys Aquatic Rentals** (Grand Lake, Oklahoma).

## Tech Stack
- Static `index.html`
- `styles.css`
- `script.js`
- Optional backend-free form handling via Formspree

## File Guide
- `index.html` → All page sections/content
- `styles.css` → Design system, layout, responsive behavior
- `script.js` → Mobile nav toggle, footer year, booking form status handling
- `robots.txt` / `sitemap.xml` → Search engine crawl hints (update with your live domain)

## Pre-Launch Checklist
1. **Set your live form endpoint**
   - In `index.html`, replace `https://formspree.io/f/FORM_ENDPOINT` with your real Formspree endpoint.
2. **Replace placeholder images**
   - Update hero, rental cards, and gallery image URLs in `index.html` and `styles.css`.
3. **Set your production domain**
   - Update `sitemap.xml` URL(s) to your real domain.
   - Update `robots.txt` sitemap line with your real domain.
   - If using GitHub Pages custom domain, create/update `CNAME` in the repo root.
4. **Final content QA**
   - Confirm pricing, policies, service area wording, and contact info.

## GitHub Pages Deploy
1. Push this repo to GitHub.
2. In GitHub: **Settings → Pages**.
3. Source: `Deploy from a branch`.
4. Branch: `main` (or your deploy branch), folder `/ (root)`.
5. Save and wait for deploy URL.

## Local Preview
Because this is a static site, you can open `index.html` directly, or run any static server:

```bash
python3 -m http.server 8080
```

Then open: `http://localhost:8080`.
