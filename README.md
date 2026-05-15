# Rooted Renovations Website

Multi-page marketing site for Rooted Renovations, deployed on GitHub Pages.

## Pages
- `/` Home
- `/services.html`
- `/about.html`
- `/portfolio.html`
- `/faq.html`
- `/contact.html`
- `/locations/springfield-mo.html`
- `/locations/branson-mo.html`

## Lead Form (GitHub Pages compatible)
The contact form submits directly to Formspree:
- Endpoint: `https://formspree.io/f/xdabrwee`
- Submission is handled in `script.js` with real success/failure messages.
- No SMTP/Twilio secrets are exposed in frontend code.

## SEO / AI Search Features
- Structured data: Organization, Person, Service list, FAQPage, BreadcrumbList.
- Crawl files: `robots.txt` and `sitemap.xml`.
- Localized service pages and measurable portfolio outcomes.

## Backend quarantine
Legacy Node/Express notification code has been moved to:
- `backend-archive/server.js`

It is not used by the GitHub Pages deployment.
