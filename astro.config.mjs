import { defineConfig } from 'astro/config';

const [owner, repository] = (process.env.GITHUB_REPOSITORY ?? '').split('/');
const isGitHubBuild = Boolean(owner && repository);
const isUserSite = repository?.toLowerCase().endsWith('.github.io');
const base = isGitHubBuild && !isUserSite ? `/${repository}/` : '/';
const site = isGitHubBuild
  ? `https://${owner}.github.io`
  : 'http://localhost:4321';

export default defineConfig({
  output: 'static',
  site,
  base,
  trailingSlash: 'always',
});
