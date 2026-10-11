# Project guide

## Commands

- Install: `npm ci`
- Develop: `npm run dev`
- Test: `npm test`
- Lint: `npm run lint`
- Build: `npm run build`
- Full check: `npm run check`
- Advisory quality report: `npm run report`

## Structure

- `apps/api` — Fastify API; public routes use the `/api` prefix.
- `apps/web` — React, Vite and Mantine frontend.
- `product` — product research and business requirements.
- `.github/workflows` — CI, releases and the protected Hexlet check.

## Rules

- Use Node.js 24, npm, strict TypeScript and ESM.
- Run `npm run check` before every commit.
- Quality reports in `reports/` are advisory and do not gate CI.
- Use Conventional Commits: `feat:`, `fix:`, `docs:`, `test:`,
  `refactor:`, `chore:` or `ci:`.
- Do not edit `.github/workflows/hexlet-check.yml` unless explicitly asked.
- Keep this scaffold infrastructure-only until a feature is requested.
