# Consorzio Nocciola Campana — Next.js Rework

This repository is a starter scaffold for rebuilding https://www.consorzionocciolacampana.it using Next.js (App Router) and Tailwind CSS.

Setup

```bash
# 1) Install
npm install

# 2) Run dev
npm run dev
```

CMS

I recommend using a headless CMS (Sanity, Contentful, or Strapi). Next steps:
- Choose a CMS provider (I can set up Sanity for you).
- Create schemas for `pages`, `products`, `news` and `team`.
- Add a preview webhook and integrate the CMS client in `src/lib`.

Next tasks

- Implement `About`, `Products`, `News`, `Contact` pages.
- Migrate content & images.
- Configure SEO, accessibility, and i18n.

## Quick start

Install dependencies and run dev server:

```powershell
npm install
npm run dev
```

Build for production:

```powershell
npm run build
npm run start
```

## Push to GitHub
Two options are shown: using the GitHub CLI (`gh`) or manually via the GitHub web UI.

Option A (recommended, using `gh`):

```powershell
git init
git add .
git commit -m "Initial commit — modular refactor"
# create & push (will use your authenticated account)
gh repo create ConsorzioNocciolaCampana --public --source=. --remote=origin --push
```

Option B (manual):

```powershell
# create an empty repo on GitHub via the web UI, then run:
git init
git add .
git commit -m "Initial commit — modular refactor"
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git
git branch -M main
git push -u origin main
```

If you'd like, I can run these git commands for you now and attempt the `gh` flow (will require you to be authenticated with `gh`).
