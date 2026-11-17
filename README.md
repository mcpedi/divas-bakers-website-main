# Divas Bakers

**Freshly Baked · Beautifully Served**

A responsive, single-page bakery website for Divas Bakers. This repository contains the website source; pushing to GitHub does not publish the live site.

## Requirements

- Node.js 20 or newer.
- No third-party Node packages are required. The local server uses Node’s built-in modules.

## Run locally

```bash
git clone https://github.com/mcpedi/divas-bakers-website.git
cd divas-bakers-website
npm start
```

Open [http://localhost:3000](http://localhost:3000). For the equivalent development script, run `npm run dev`. Set the optional `PORT` environment variable to use a different local port; the default is `3000`. There is no dependency-install or compilation step.

You can check the JavaScript syntax with:

```bash
node --check server.mjs
node --check public/script.js
```

## Project structure

| Path | Purpose |
| --- | --- |
| `public/index.html` | Homepage content, menu placeholders, opening-hours slots, contact details, gallery, and WhatsApp inquiry links |
| `public/styles.css` | Responsive site styles |
| `public/script.js` | Navigation, menu filters, and custom-cake inquiry message behavior |
| `public/manus-routes.json` | The site’s single-page route declaration |
| `server.mjs` | Dependency-free local HTTP server for files in `public/` |
| `package.json` | Node version and `start` / `dev` scripts |
| `app.config.ts` | Manus project branding metadata; it is not the site’s image store |

## Edit the bakery information

The current site is static and has no owner dashboard, database, or online content-management system. Edit the relevant text and placeholders in `public/index.html`, then commit and push your changes. Menu prices are intended to be entered in Kenyan shillings (`KSh`). The custom-cake form builds a WhatsApp message in the browser; visitors review and send the message themselves.

Update `public/styles.css` for visual changes and `public/script.js` for interactive behavior. The route manifest should remain synchronized if page routes are added or changed.

## Images and portability

The logo and gallery images are currently referenced through Manus-managed `/manus-storage/` paths and are **not bundled in this GitHub repository**. These paths are handled by Manus project hosting; a direct local run or a non-Manus static host may not be able to load them. The logo URL in `app.config.ts` is separate platform metadata and does not copy the logo into this repository.

Before deploying somewhere other than Manus, add the image files to the repository (for example, under `public/images/`) or to a public image host, then replace the `/manus-storage/` references in `public/index.html` with the new stable image URLs. Check the favicon, header and footer logo, and gallery images after moving them.

## Deploy

### Manus Webdev

The current Manus project is configured for static output: build command `true`, output directory `public/`, with no application server or database. Publish through the Manus Webdev project after connecting or importing the source as needed. Auto-publishing is off, so pushing this GitHub repository alone does not publish a site.

### Another static host

Configure the host to deploy branch `main`, use `public/` as the publish directory, and use no build step (or `true` if a command is required). Serve the site at the domain root: its asset and page links use root-relative paths. Before relying on the deployment, migrate the Manus-managed images as described above and verify that those image URLs load on the new host.

This repository does not include a GitHub Pages workflow or a platform-specific deployment pipeline.
