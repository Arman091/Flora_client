# AGENTS.md

## Stack

- React 18 (Create React App via `react-scripts`) — **not** Vite, not Next.js
- Pure JavaScript (no TypeScript)
- Redux Toolkit + React Redux
- Material UI v5
- React Router v6
- React Hook Form + Zod
- Axios with JWT auth + refresh-token interceptor
- Firebase Cloud Messaging (FCM)

## Commands

```bash
npm start          # dev server (default port 3000)
npm run build      # production build to /build/
npm test           # run Jest tests (react-scripts test)
```

## Local development

**To point at local backend**, edit `src/lib/config.js:1-2`: uncomment the `localhost:3001` line and comment the production URL. The production URL is the default.

## Architecture

### Provider nesting (src/index.js)
```
Redux <Provider> → <AuthProvider> → <BrowserRouter> → <React.StrictMode> → <App>
```

Inside `<App>`: `<FcmProvider>` → `<DataProvider>` → header + routes.

### Routes
| Path | Component |
|---|---|
| `/` | Home (product listing) |
| `/product/:id` | ProductDetail |
| `/cart` | Cart |

### Redux store (src/redux/store.js)
Three slices under `configureStore`:
- `getAllProducts` — product list
- `getProductDetail` — single product
- `cart` — cart items

### API layer (src/service/)

- `axios-base.js` — Axios instance with `baseURL` from config, 15s timeout, `Content-Type: application/json`. Attaches `Bearer` token from `localStorage.getItem('accessToken')` on every request. On 401, reads `refreshToken` from localStorage, sends `POST /refresh-token` with `{ refreshToken }` in body, stores new `accessToken` and `refreshToken` from the response, retries the original request. On refresh failure, clears tokens and redirects to `/login`.
- `api-methods.js` — generic `api.get/post/patch/delete` wrappers. Errors are normalized to `{ status, message, data, originalError }`.

### Auth (src/context/AuthProvider.jsx)
Auth state stored in `localStorage` under key `authUser` (JSON), `accessToken` (string), and `refreshToken` (string). Call `login(userData, token, refreshToken)` and `logout()`. Access via `useAuth()` hook.

**Note:** Both AuthProvider and the axios interceptor use the same `localStorage.getItem('accessToken')` key — no duplication.

## ESLint

Config is **inline in `package.json`** under `"eslintConfig"` — there is no `.eslintrc` file. Rules are relaxed: `exhaustive-deps`, `array-callback-return`, and `no-unused-vars` are all `off`.

## Testing

- Jest via `react-scripts test`
- Setup: `src/setupTests.js` (imports `@testing-library/jest-dom`)
- Only existing test is `src/App.test.js` — **default CRA boilerplate that will fail** (looks for "learn react" text). Replace it when adding real tests.

## Environment

- `.env` is **committed to the repo** (not gitignored) — contains Firebase config keys
- `.env.local`, `.env.development.local` etc. are gitignored (standard CRA behavior)
- Firebase VAPID key and project config are in `.env` with `REACT_APP_` prefix
- Node engine: `22.x` (enforced in `package.json`)

## Backend

- Production API: `https://floralcart.onrender.com`
- Backend repo: https://github.com/Arman091/floral_server.git
- API uses JWT access tokens (Bearer header) + refresh tokens (returned in response body, stored in localStorage)
- Firebase hosting (not Render) for the frontend: `https://floral-cart.web.app/`

## Conventions

- No Prettier or other formatter configured
- No TypeScript — all files are `.js` / `.jsx` / `.css`
- `Array.map()` callbacks often omit `return` (ESLint `array-callback-return` is off)
- Component files are PascalCase, utility/config files are kebab-case or camelCase
