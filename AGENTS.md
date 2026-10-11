# Project guide

## Commands

- Install: `npm ci`
- Develop: `npm run dev`
- Test: `npm test`
- Format: `npm run format`; check only: `npm run format:check`
- Lint: `npm run lint`; auto-fix: `npm run lint:fix`
- Build: `npm run build`
- Build Docker image: `npm run docker:build`
- Run Docker image: `npm run docker:run`
- Full check: `npm run check`
- All advisory reports: `npm run report`
- Type-aware ESLint/SonarJS: `npm run report:eslint`
- Unused code and dependencies: `npm run report:dead-code`
- Duplication: `npm run report:duplicates`
- Coverage: `npm run test:coverage`

## Structure

- `apps/api` — Fastify API; public routes use the `/api` prefix.
- `apps/web` — React, Vite and Mantine frontend.
- `product` — product research and business requirements.
- `.github/workflows` — CI, releases and the protected Hexlet check.

## Rules

- Use Node.js 24, npm, strict TypeScript and ESM.
- During implementation, format changed code and run `npm run lint:fix`, then
  rerun the relevant tests after each meaningful change.
- Before every commit, run both `npm run check` and `npm run report`.
- Read `reports/README.md` after `npm run report`. Fix new SonarJS/type-aware
  ESLint findings, unused code, and duplication introduced by the change; do not
  reduce coverage without explaining why. Existing unrelated findings are not
  blockers.
- Quality reports remain advisory and do not gate CI; a tool failure must still
  be investigated and must not be hidden by the report-only exit code.
- Rebuild and smoke-test the Docker image when changing dependencies, build
  configuration, server startup, static delivery, or container files.
- The production Docker image must serve both the web app and API on port 3000.
- Use Conventional Commits: `feat:`, `fix:`, `docs:`, `test:`,
  `refactor:`, `chore:` or `ci:`.
- Do not edit `.github/workflows/hexlet-check.yml` unless explicitly asked.
- Keep this scaffold infrastructure-only until a feature is requested.
