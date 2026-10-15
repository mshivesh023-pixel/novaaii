# NovaAI frontend

React + Vite + Tailwind + React Router.

    npm install
    npm run dev

## Connecting a backend
All requests live in `src/services/api.js` (see the endpoint list at the top). Set `VITE_API_URL`
in `.env`, or run your Node.js API on port 4000 and use the built-in `/api` dev proxy
(`vite.config.js`). Auth expects `{ token, user }` from login/register and `{ user }` from `/auth/me`.

Until the backend exists, login/register and generation show an error. Nothing is faked.
To preview the dashboard layout only, set `VITE_PREVIEW_DASHBOARD=true`.
Pricing, testimonials, FAQ and history are placeholders in `src/data.js`.
