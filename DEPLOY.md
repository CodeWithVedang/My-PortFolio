# Deployment guide

The site is now a React (Vite) app. Build output is `dist/`. The old static HTML is gone, so the host must run a build.

## Vercel / Netlify (most likely what you use)
1. Project Settings > Build & Development:
   - Framework preset: **Vite**
   - Build command: `npm run build`
   - Output directory: `dist`
   - Install command: `npm install`
2. Push to `main` (or merge the PR). The host redeploys on every push.
3. Manual redeploy: Vercel dashboard > Deployments > latest > Redeploy (or `npx vercel --prod`).
4. The daily GitHub Action commits `src/data/projects.json` to `main`, which triggers a redeploy, so new sheet rows go live and the "Projects shipped" count updates.

## GitHub Pages
1. Repo Settings > Pages > Source: **GitHub Actions**.
2. Add a workflow that runs `npm ci && npm run build` and uploads `dist/` with `actions/upload-pages-artifact` + `actions/deploy-pages`.
3. Vite `base` is `./`, so it works under `/My-PortFolio/` without changes.

## Local
```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # typecheck + dist/
npm run preview    # serve dist/
```

## Roll back
Merge commit of the redesign PR can be reverted: `git revert -m 1 <merge-sha>`, push to `main`. Or on Vercel: Deployments > older deployment > Promote to Production.
