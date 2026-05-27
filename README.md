# FimHub Deployment

This repo is set up for a split deployment:

- Backend API: Render web service from `backend`
- Frontend: Vercel static Vite app from `frontend2.0/fimhub`

## Backend on Render

Use the included `render.yaml` as a Render Blueprint, or create a Web Service manually with these settings:

- Runtime: Node
- Root Directory: `backend`
- Build Command: `npm ci`
- Start Command: `npm start`
- Health Check Path: `/api/health`

Environment variables:

```text
NODE_ENV=production
ALLOW_VERCEL_ORIGINS=true
```

After Render deploys, confirm this URL works:

```text
https://YOUR-RENDER-SERVICE.onrender.com/api/health
```

If you use a custom Vercel domain instead of `*.vercel.app`, also set this on Render:

```text
CORS_ORIGINS=https://your-domain.com
```

Use comma-separated values if you need more than one origin.

## Frontend on Vercel

You can deploy from the repo root using the included `vercel.json`, or set the Vercel Project Root Directory to `frontend2.0/fimhub`.

Recommended Vercel settings from the repo root:

- Framework Preset: Vite
- Install Command: `npm --prefix frontend2.0/fimhub ci`
- Build Command: `npm --prefix frontend2.0/fimhub run build`
- Output Directory: `frontend2.0/fimhub/dist`

Environment variable:

```text
VITE_API_URL=https://YOUR-RENDER-SERVICE.onrender.com
```

Redeploy the frontend after setting `VITE_API_URL`; Vite reads this value at build time.

## Local Checks

```bash
npm --prefix backend run smoke
npm --prefix frontend2.0/fimhub run build
```
