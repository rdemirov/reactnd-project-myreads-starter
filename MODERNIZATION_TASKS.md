# MyReads Modernization Tasks

Goal: replace the deprecated Create React App 3 toolchain with Vite, upgrade to
React 19 and react-router-dom 7, and refactor all class components to function
components with hooks. Behavior stays identical; the Udacity backend API is unchanged.

## Tasks

- [x] Remove `react-scripts` (deprecated) and upgrade deps:
  - `react` / `react-dom` -> `^19.3.1`
  - `react-router-dom` -> `^7.18.4`
  - `prop-types` -> `^15.8.1`
  - add devDeps: `vite`, `@vitejs/plugin-react`, `vitest`, `jsdom`, `@testing-library/react`
- [x] Update npm scripts: `start`/`dev` -> `vite`, `build` -> `vite build`, `preview`, `test` -> `vitest run`
- [x] Move `public/index.html` to project root and adapt for Vite (absolute asset paths, module entry script)
- [x] Rename all JSX-bearing `.js` files to `.jsx` (Vite 8 / rolldown only applies the JSX loader to `.jsx`/`.tsx`)
- [x] Add `vite.config.js` with React plugin and Vitest (`jsdom`, globals) config
- [x] Update `src/index.jsx` to use `createRoot` from `react-dom/client`
- [x] Refactor `src/App.jsx` (`BooksApp`) to a function component with `useState`/`useEffect`
- [x] Replace react-router v5 `<Switch>`/`render` props with v7 `<Routes>`/`element`
- [x] Refactor `src/components/SearchBooks.jsx` to a function component (`useEffect`, `useNavigate`)
- [x] Refactor `src/components/MyReads.jsx` to a function component
- [x] Refactor `src/components/Book.jsx` to a function component
- [x] Rewrite `src/App.test.jsx` for Vitest + Testing Library wrapped in `MemoryRouter`
- [x] Update `.gitignore` for Vite `dist/` output
- [x] Update `AGENTS.md` and README to reflect the new toolchain and commands
- [x] Verify: `npm install`, `npm run build`, `npm test`, smoke-test `npm run dev`

## Verification targets

- Build succeeds on Node 24 **without** `NODE_OPTIONS=--openssl-legacy-provider`
- Tests pass non-interactively
- Dev server renders shelves at `/` and search works at `/search`

## Notes / incidental fixes

- `SearchBooks` propTypes previously declared `onSearchBooks` as `object`; corrected to `func`.
- `Book`'s "None" shelf option rendered stray literal parentheses in JSX; removed.
- Skipped the requested counter HTML page and the removed `allowedSearchTerms.js` reference, per direction.
