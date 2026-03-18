# Rooted Renovations Website

Multi-page marketing site and lead-capture backend for Rooted Renovations.

## Pages
- `/` Home
- `/services.html`
- `/about.html`
- `/portfolio.html`
- `/faq.html`
- `/contact.html`
- `/locations/springfield-mo.html`
- `/locations/branson-mo.html`

## SEO / AI Search Features
- Structured data: Organization, Person, Service list, FAQPage, BreadcrumbList.
- Crawl files: `robots.txt` and `sitemap.xml`.
- Localized service pages and measurable portfolio outcomes.

## Run locally
1. `npm install`
2. Copy `.env.example` to `.env` and set SMTP values.
3. `npm start`
4. Visit `http://localhost:3000`

## Real lead email delivery
Form submissions post to `POST /api/lead` and are emailed via SMTP.
Required vars:
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASS`
- `SMTP_FROM`
- `LEAD_TO_EMAIL`
