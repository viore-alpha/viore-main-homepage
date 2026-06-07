Behavioral guidelines to reduce common LLM coding mistakes.
Merge with project-specific instructions as needed.

## Viore Homepage Workflow

This repo is `viore-alpha/viore-main-homepage`. It deploys through GitHub Pages from `main` using `.github/workflows/deploy-pages.yml`.

### Natural language triggers

When the user says the following, run the matching command without asking again.

| User phrase | Command |
| --- | --- |
| `작업 시작`, `좋아 작업 시작`, `레이지야 작업 시작` | `npm run lazy:start` |
| `작업 종료`, `작업 끝` | `npm run lazy:finish -- "<appropriate commit message>"` |
| `배포`, `배포해` | `npm run lazy:deploy` |
| `작업 종료 및 배포`, `작업 끝내고 배포` | `npm run lazy:finish -- "<appropriate commit message>"`, then `npm run lazy:deploy` |

Commit messages should reflect the actual diff in conventional style, for example `fix: adjust homepage routing`.

### First setup on a new computer

Run:

```bash
npm run lazy:setup
```

This syncs Git branches, installs dependencies, installs the local protected-branch hook, and checks GitHub CLI authentication.

### Branch rules

- Daily work happens on `daily/YYYYMMDD`.
- `develop` is the integration branch.
- `production` mirrors the deploy-ready state.
- `main` triggers GitHub Pages deployment.
- Do not edit directly on `main`, `production`, or `develop`; the workflow scripts fast-forward these branches.

### Verification

Before finishing work, run:

```bash
npm run verify:full
```

`lazy:finish` runs this automatically before committing and publishing.

### Deploy rules

`npm run lazy:deploy` verifies the repo, fast-forwards `develop -> production -> main`, pushes `main`, waits for the GitHub Pages workflow, and checks `https://vioreai.com/`.

Do not claim deployment is complete unless the GitHub Pages workflow succeeded or clearly report what blocked verification.

### LazyCodex / OMO

LazyCodex is installed globally into Codex as `omo@sisyphuslabs`.

- Use the existing repo workflow commands for branch, finish, and deploy automation.
- Use LazyCodex/OMO for complex planning, review, code intelligence, and verified long-running work.
- Useful installed commands include `omo --help`, `$ulw-plan`, `$start-work`, `$ulw-loop`, and `/init-deep`.
- On this Windows machine the command shims live in `C:\Users\gossa\.local\bin`.

### Keep out of git

Do not commit `.env*`, `out`, `dist`, `node_modules`, `.vite`, or local tool state.
