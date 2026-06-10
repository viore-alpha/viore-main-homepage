Behavioral guidelines to reduce common LLM coding mistakes.
Merge with project-specific instructions as needed.

## Viore Homepage Workflow

This repo is `viore-alpha/viore-main-homepage`. It deploys through GitHub Pages from `main` using `.github/workflows/deploy-pages.yml`.

### Karpathy-inspired agent discipline

For non-trivial code, UI, workflow, deploy, or review work, apply the repository skill at `.agents/skills/karpathy-guidelines/SKILL.md`.

- Think before coding: surface assumptions, uncertainty, tradeoffs, and pushback before making changes.
- Simplicity first: solve the requested problem with the smallest clear change; avoid speculative features and abstractions.
- Surgical changes: touch only files required by the task; mention unrelated cleanup instead of doing it.
- Goal-driven execution: define success criteria, verify them with the repo's normal checks, and report what was or was not verified.

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

### Repo workflow scripts

The `lazy:*` npm commands are local scripts in this repository, not a dependency on external LazyCodex/OMO tooling.

- Use the existing repo workflow commands for branch, finish, and deploy automation.

### Keep out of git

Do not commit `.env*`, `out`, `dist`, `node_modules`, `.vite`, or local tool state.
