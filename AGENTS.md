# AGENTS.md

## What this is

Udacity React ND "MyReads" starter, modernized. Vite 8 + React 19 + react-router-dom 7, function components with hooks. Single package, no monorepo. `src/App.jsx` (function `BooksApp`) owns all state; `src/components/*` are presentational and receive callbacks via props.

## Commands

```sh
npm install
npm start          # alias for `dev` — Vite dev server at http://localhost:5173
npm run dev
npm run build      # outputs to dist/ (not build/)
npm run preview    # serve the production build locally
npm test           # vitest run — single non-interactive pass
npm run test:watch # vitest watch mode
```

## Conventions that differ from CRA defaults

- **JSX files must use the `.jsx` extension.** Vite 8 (rolldown/esbuild) only applies the JSX loader to `.jsx`/`.tsx`, not `.js`. All JSX-bearing components are named `*.jsx`; extensionless imports (`./App`, `./Book`) resolve fine.
- `index.html` lives at the **project root** (not `public/`), and points at the entry via `<script type="module" src="/src/index.jsx">`. `public/` is only for static assets served as-is (favicon).
- Vite serves on port **5173**, not 3000. No `%PUBLIC_URL%` placeholder — use root-absolute paths (`/favicon.ico`).
- `package.json` has `"type": "module"`, so all `.js`/`.jsx` config and source use ESM `import`.

## Testing

- Vitest + Testing Library + jsdom, configured in `vite.config.js` (`test` block). Setup file: `src/setupTests.js` (imports `@testing-library/jest-dom/vitest`).
- `src/App.test.jsx` mocks `src/utils/BooksAPI` with `vi.mock` so tests are hermetic (no network). Wrap the app in `<MemoryRouter>` when rendering.
- No lint/typecheck config exists. Vite's build does not run ESLint.

## Backend / runtime

- Data comes from the remote Udacity API `https://reactnd-books-api.udacity.com` (`src/utils/BooksAPI.js`). A random auth token is generated into `localStorage` on first load. No env vars or API keys needed; dev and tests that don't mock the API need network access to this host.
- Search accepts any query; the backend returns `{ error: 'empty query' }` for no matches, which `App.jsx` maps to a user-facing error string. `SEARCH_TERMS.md` documents backend-supported terms but nothing is enforced client-side.

## Gotchas

- `src/utils/BooksAPI.js` is plain `.js` (no JSX) — keep it `.js`.
- react-router-dom v7: use `<Routes>`/`<Route element={...}>` (no `<Switch>`, no `render` prop); `useNavigate()` replaces `history.push`.
- The old CRA/OpenSSL `ERR_OSSL_EVP_UNSUPPORTED` workaround is **no longer needed** — Vite removed the webpack-4 issue entirely.
- `MODERNIZATION_TASKS.md` tracks the completed CRA→Vite migration.
