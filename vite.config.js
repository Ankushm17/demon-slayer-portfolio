import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? 'demon-slayer-themed-portfolio'
const base = repoName.endsWith('.github.io') ? '/' : `/${repoName}/`

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base,
})
