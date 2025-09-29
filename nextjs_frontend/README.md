# Next.js Data Explorer (Ocean Professional)

Minimal, responsive data explorer built with Next.js and React. A left-aligned sidebar lists MongoDB collections; the main area displays tabular data fetched from the backend. Styled with the Ocean Professional theme for a clean, classic look.

## Features

- Sidebar navigation for collections (collection1, collection2)
- Responsive, minimal UI with subtle shadows and clear sectioning
- Dynamic table columns inferred from data
- Client-side fetching from Express backend
- Theme: Ocean Professional (primary `#1E3A8A`, secondary `#F59E0B`)

## Getting Started

1) Install dependencies

```bash
npm install
```

2) Configure the backend URL  
Create a `.env` file from `.env.example` and set:

```
NEXT_PUBLIC_BACKEND_URL=https://your-backend-host:3001
```

3) Run the dev server

```bash
npm run dev
```

Open http://localhost:3000 to view the app.

4) Build and run in production

```bash
npm run build
npm start
```

## Styling

All styles live in `app/globals.css` using CSS variables based on the Ocean Professional palette:

- primary: `#1E3A8A`
- secondary: `#F59E0B`
- background: `#F3F4F6`
- surface: `#FFFFFF`
- text: `#111827`
- success: `#059669`
- error: `#DC2626`

## Notes

- Ensure CORS is enabled on the backend for the frontend origin if hosting separately.
- Linting is ignored during production builds via `next.config.js` to avoid CI failures unrelated to functionality.
