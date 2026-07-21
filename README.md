# Viore New Hompage

Viore Inc.'s bilingual public website for `vioreai.com`. The application uses
Next.js App Router and is deployed to Vercel from GitHub.

## Requirements

- Node.js `>=22.13.0`
- npm

## Local development

```bash
npm install
npm run dev
```

The Korean canonical site is available at `/ko`; `/` permanently redirects to
that route.

## Verification

```bash
npm run lint
npm test
```

`npm test` performs a production Next.js build, starts that build on a local
port, and verifies the rendered pages, redirects, public API routes, crawler
files, metadata, and data contracts.

## Public data contracts

Company metrics, Knowledge papers, and the AlphaEvidence public snapshot are
read from bounded Supabase Data API views with a publishable key. The following
server-side environment variables are optional overrides for the checked-in
public endpoints and publishable key:

- `VIORE_COMPANY_METRICS_ENDPOINT`
- `VIORE_KNOWLEDGE_FEED_ENDPOINT`
- `VIORE_ALPHAEVIDENCE_SNAPSHOT_ENDPOINT`
- `VIORE_METRICS_SUPABASE_PUBLISHABLE_KEY`

Never configure a Supabase secret or service-role key for this public website.

## Deployment

The Vercel project is `viore-new-hompage` under the `vioreai` team. Feature
branches produce Preview deployments; the production branch deploys to
`vioreai.com` after verification.
