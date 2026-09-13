# Mental Health Matters

A responsive mental wellness awareness site built with Express and EJS. Includes a session-only mood check-in, a one-minute breathing timer, support resources, and light/dark themes.

## Run locally

Requires Node.js 20 or newer.

```sh
npm install
npm start
```

Open http://localhost:3000. Set `PORT` to use a different port. `npm run dev` enables server restart on file changes; `npm test` checks routes and static assets.

## Structure

- `app.js`: Express app, routes, and 404 handling.
- `views/`: EJS pages and shared header/footer.
- `public/`: CSS, browser JavaScript, and favicon.
- `test/`: Tests using Node's built-in runner.

Mood selections are held only in the current page. They are not persisted or transmitted. Local storage saves only the theme preference. Fonts are loaded from Google Fonts with system fallbacks. The project provides awareness resources, not clinical care or a monitored contact service.
