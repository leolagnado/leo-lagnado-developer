# Apps by Leonardo Mathiazzi Lagnado

Static public developer website built with Astro for GitHub Pages.

## Local development

```sh
npm install
npm run dev
```

Run the complete production build and legal-text verification:

```sh
npm run build
```

The Astro configuration derives the correct GitHub Pages base path from `GITHUB_REPOSITORY` during Actions builds. User sites use `/`; project sites use `/<repository>/`.

## Publishing

The workflow in `.github/workflows/deploy.yml` builds and deploys every push to `main`. In the repository settings, select **Settings > Pages > Build and deployment > Source: GitHub Actions** if it is not selected automatically.

## Store-link placeholders

- Peko’s Fraction Pizzeria Google Play URL is pending.
- PhotoName App Store URL is pending.
