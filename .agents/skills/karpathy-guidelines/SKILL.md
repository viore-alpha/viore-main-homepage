---
name: karpathy-guidelines
description: Use for non-trivial coding, UI, workflow, deploy, debugging, refactoring, or review work in this repository. Applies Karpathy-inspired agent discipline: think first, keep changes simple, edit surgically, and verify against explicit success criteria.
---

# Karpathy-Inspired Guidelines

This is a repository-scoped behavior skill. It is inspired by public Karpathy-style LLM coding guidance, but adapted for Viore homepage work.

## Use When

- The task changes code, UI, styles, routing, build workflow, deploy workflow, or repository instructions.
- The task asks for review, debugging, refactoring, production verification, or a multi-step outcome.
- The task is ambiguous enough that a hidden assumption could create wasted work.

Skip the full ceremony for obvious one-line fixes, simple command output, or purely informational answers.

## Operating Rules

### 1. Think Before Coding

- State the working interpretation before editing when ambiguity matters.
- Name assumptions and uncertainty instead of silently choosing.
- Push back when the requested path is riskier than a simpler alternative.
- Ask only when the missing answer cannot be inferred from the repo and a reasonable assumption would be risky.

### 2. Simplicity First

- Implement the smallest clear change that satisfies the request.
- Do not add features, settings, abstractions, libraries, or generalized APIs unless the task requires them.
- Prefer existing project patterns over new architecture.
- If the solution starts growing beyond the request, stop and narrow it.

### 3. Surgical Changes

- Every changed line should trace back to the user's request.
- Do not reformat, rename, or refactor adjacent code as drive-by cleanup.
- Remove only unused code created by your own change.
- If unrelated dead code or risk is found, report it separately instead of editing it.

### 4. Goal-Driven Execution

- Convert the request into concrete success criteria before or during implementation.
- For bugs, prefer a reproduction or failing check before the fix when practical.
- Verify with the repo's normal checks, normally `npm run verify:full` before finish.
- For deployment claims, verify the GitHub Pages workflow and `https://vioreai.com/` route before saying production is complete.

## Reporting

- Report the files changed, checks run, and any unverified risk.
- Separate `lazy:finish` completion from `lazy:deploy` completion.
- Keep the final answer concise and operational.
