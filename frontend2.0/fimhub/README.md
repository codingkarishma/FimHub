# FimHub

Active app:
- Frontend: `frontend2.0/fimhub`
- Backend: `backend`

Current public routes:
- `/`
- `/pathogenesis`
- `/explorer`
- `/papers`
- `/team`
- `/guide`

Frontend commands:
- `npm run dev`
- `npm run build`

Backend commands:
- `npm run dev`
- `npm run start`
- `npm run build:data`
- `npm run smoke`

Current frontend architecture:
- React 19 + Vite
- route shell in `src/App.jsx`
- active pages in `src/pages`
- active content model in `src/content/platformContentV2.js`
- active style entry in `src/indexV2.css`

Current backend architecture:
- Express app in `backend/app.js`
- entrypoint in `backend/index.js`
- dataset registry in `backend/lib/datasets.js`
- normalized clean data in `backend/data/clean`

Deployment:
- configured in root `vercel.json`
- deploy from the repository root on Vercel, not from `frontend2.0/fimhub`
- frontend build path: `frontend2.0/fimhub`
- backend API path: root `api` serverless functions
- no `VITE_API_URL` is required for production because the frontend calls same-origin `/api` and `/pdb` routes
