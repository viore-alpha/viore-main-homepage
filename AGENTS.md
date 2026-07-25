# AGENTS.md

## Cursor Cloud specific instructions

Single Next.js 16 (App Router, React 19) app — the Viore bilingual marketing
site. There is no local database, cache, or auxiliary service to start. Standard
commands live in `package.json` (`dev`, `build`, `start`, `lint`, `test`) and are
documented in `README.md`.

### Running

- Dev server: `npm run dev` (serves on `http://localhost:3000`; `/` 308-redirects to `/ko`, English is at `/en`).
- Public data (company metrics, Knowledge paper feed, AlphaEvidence snapshot) is
  read live from a public Supabase Data API using a checked-in publishable key,
  with in-repo snapshot fallbacks. No env vars are required to run; outbound
  network to Supabase is optional. The `VIORE_*` overrides in `README.md` are optional.

### Testing gotchas

- `npm test` runs a full `next build`, then starts `next start` on an ephemeral
  port and runs `node --test`. The test files directly `import` `.ts` source
  files, which requires **Node >= 22.18** (unflagged TypeScript type-stripping).
- The default `node` on `PATH` in a bare (non-login) shell can be
  `/exec-daemon/node` v22.14.0, which fails these tests with
  `ERR_UNKNOWN_FILE_EXTENSION` for `.ts`. Run tests from a **login shell**
  (e.g. a tmux session started with `bash -l`, or `bash -lc 'npm test'`), where
  nvm's default (v22.22.2, satisfies >= 22.18) is first on `PATH`.
- Test `serves domestic Knowledge pages ...` depends on the **live** Supabase
  feed containing `scope=domestic` (Korean) papers. The Knowledge paged API
  (`/api/knowledge/papers`) has no snapshot fallback, so when the remote view
  currently has zero domestic papers this single test fails (0 vs 12 items).
  This is a live-data condition, not a code/env problem; the other 22 tests pass.

### Lint

- `npm run lint` passes with only `@next/next/no-img-element` warnings (0 errors).
