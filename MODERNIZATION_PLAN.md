# react-double-marquee Modernization Plan

## Overview

This plan covers modernizing the react-double-marquee library from its current state (React 16 class component, Travis CI, Enzyme tests, Rollup 1.x) to a modern stack (React 18+, GitHub Actions, React Testing Library, TypeScript, Rollup 4.x). It also addresses all open issues and stale PRs.

## Current State

- **Component**: React 16 class component using `requestAnimationFrame` for smooth scrolling
- **Build**: Rollup 1.x with Babel 7.9
- **Tests**: Jest 24 + Enzyme (deprecated)
- **Lint**: ESLint 5 with airbnb config, `babel-eslint` parser
- **CI/CD**: Travis CI (broken/defunct) with Coveralls for coverage
- **Release**: semantic-release with Commitizen
- **No TypeScript, no GitHub Actions**

### Open Issues

| Issue | Title | Status |
|-------|-------|--------|
| #44 | `scrollWhen="overflow"` bug — hidden span prevents centering | Open |
| #22 | Add loop prop (control number of loops) | Open |
| #19 | Text does not scroll on a wide screen | Open |
| #14 | Pause on hover | Open |
| #9 | Add npm link to example page | Open |

### Open PRs

| PR | Title | Status |
|----|-------|--------|
| #28 | Prevent position reset when props change (community) | Stale, merge conflicts |
| #35–#43 | 8 Dependabot security bump PRs | Superseded by full upgrade |

---

## Phase 1: Housekeeping — Close Stale PRs & Triage Issues

- **Close all 8 Dependabot PRs** (#35–#43) with a comment that they are superseded by a full dependency upgrade.
- **Close PR #28** (has merge conflicts, stale since Jan 2021). Cherry-pick the useful idea (`resetOnPropsChange`) as a future feature consideration.
- **Triage issues**:
  - #9 (add npm link to example page) — address as part of docs refresh in Phase 5.
  - #14 (pause on hover) — address in Phase 4.
  - #19 (text doesn't scroll on wide screen) — address in Phase 4.
  - #22 (loop prop) — address in Phase 4.
  - #44 (scrollWhen overflow centering bug) — address in Phase 4.

---

## Phase 2: Modernize Tooling & Dependencies

1. **Upgrade React peer dependency** — widen to `>=16.8.0` to support React 16, 17, and 18+.
2. **Convert source to TypeScript** — rename `src/index.jsx` to `src/index.tsx`, replace PropTypes with TypeScript interfaces, export types.
3. **Upgrade Rollup** from 1.x to 4.x, replace deprecated plugins:
   - `rollup-plugin-babel` → `@rollup/plugin-babel`
   - `rollup-plugin-commonjs` → `@rollup/plugin-commonjs`
   - `rollup-plugin-node-resolve` → `@rollup/plugin-node-resolve`
   - `rollup-plugin-json` → `@rollup/plugin-json`
   - `rollup-plugin-replace` → `@rollup/plugin-replace`
   - Add `@rollup/plugin-typescript`
4. **Upgrade ESLint** from 5 to 9 (flat config), replace `babel-eslint` with `@typescript-eslint/parser`, replace airbnb config with modern TS-aware setup.
5. **Upgrade Jest** from 24 to 29, replace Enzyme with React Testing Library.
6. **Update Babel** — drop `@babel/plugin-proposal-class-properties` (now standard), add `@babel/preset-typescript`.
7. **Fix dependency classification**:
   - Move `react`, `react-dom`, `react-json-pretty`, `react-jss` out of `dependencies` into `devDependencies`.
   - Keep only `prop-types` and `react` as `peerDependencies` (drop `prop-types` once on TS).
8. **Remove `coveralls`** dependency (replaced by GitHub Actions coverage in Phase 3).
9. **Delete legacy config files** (`.babelrc`, `.eslintrc.js`) — replaced by new configs.
10. **Update `package.json`** — add `"module"` field for ESM entry, add `"types"` field for TS declarations.

---

## Phase 3: CI/CD — Travis CI to GitHub Actions

1. **Delete `.travis.yml`**.
2. **Create `.github/workflows/ci.yml`**:
   - Trigger on push to `main`/`develop` and all PRs.
   - Matrix: Node 18, 20.
   - Steps: install, lint, build, test with coverage.
   - Upload coverage to Codecov (replaces Coveralls).
3. **Create `.github/workflows/release.yml`**:
   - Trigger on push to `main` only.
   - Run `semantic-release` with `NPM_TOKEN` and `GITHUB_TOKEN` secrets.
   - Replaces Travis deploy step.
4. **Update `release.config.js`** for new branch name (`main` vs `master`) if needed.
5. **Rename default branch** from `master` to `main` if desired.

---

## Phase 4: Rewrite Component as Modern React

1. **Convert class component to functional component with hooks**:
   - `useRef` for container/inner element refs.
   - `useEffect` for mount/unmount/update lifecycle.
   - `useCallback` for animation tick.
   - `useState` for scroll state.
2. **Fix existing bugs**:
   - **#44**: When `scrollWhen="overflow"` and content doesn't overflow, use `display: none` instead of `visibility: hidden` for the duplicate span (or conditionally skip rendering it).
   - **#19**: Handle case where content is shorter than container width — ensure scrolling still works by repeating content enough times to fill.
3. **Add new features**:
   - **#14 — Pause on hover**: Add `pauseOnHover` boolean prop. Pause animation on `mouseenter`, resume on `mouseleave`.
   - **#22 — Loop control**: Add `loop` prop (`number | Infinity`) to control how many times the marquee cycles before stopping.
4. **Backward compatibility** — all new props are optional with sensible defaults matching current behavior.

---

## Phase 5: Tests, Docs & Example Page

1. **Rewrite tests** with React Testing Library — test rendered output and behavior rather than class instance methods.
2. **Update README.md**:
   - New props table (including `pauseOnHover`, `loop`).
   - TypeScript usage examples.
   - Updated badges (GitHub Actions CI, npm, Codecov — remove Travis/Coveralls badges).
   - Add npm link prominently (closes #9).
3. **Update example/docs page** (`docs/` and `playground/`):
   - Modernize to use current React.
   - Showcase new features (pause on hover, loop, scrollWhen).
4. Let semantic-release manage CHANGELOG generation.

---

## Phase 6: Release

1. **Bump to v2.0.0** — breaking changes: TypeScript rewrite, class to hooks conversion, React 18 recommended.
2. Ensure semantic-release is configured for the new main branch.
3. Verify CI pipeline runs green.
4. Publish to npm.
5. Close remaining issues (#14, #19, #22, #44, #9) referencing the release.

---

## What We're NOT Doing

- **Not dropping React 16/17 support** — peer deps will be widened, not restricted.
- **Not adding SSR/Next.js specific handling** — out of scope.
- **Not adding CSS-based animation** — keeping `requestAnimationFrame` for smooth, controllable animation.
- **Not migrating to a monorepo or Storybook** — overkill for a single-component library.
