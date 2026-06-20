import { spawnSync } from 'node:child_process'
import { access, cp, mkdir, rm } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(fileURLToPath(new URL('..', import.meta.url)))
const webDir = path.join(root, 'apps', 'web')
const outputDir = path.join(webDir, '.svelte-kit', 'output')
const clientDir = path.join(outputDir, 'client')
const pagesDir = path.join(outputDir, 'prerendered', 'pages')
const buildDir = path.join(webDir, 'build')

const vite = path.join(webDir, 'node_modules', 'vite', 'bin', 'vite.js')
const result = spawnSync(process.execPath, [vite, 'build'], {
  cwd: webDir,
  env: process.env,
  stdio: 'inherit'
})

if (result.status !== 0) {
  process.exit(result.status ?? 1)
}

try {
  await access(path.join(pagesDir, 'index.html'))
} catch {
  console.error('Static build failed: SvelteKit did not prerender index.html.')
  console.error('Check that apps/web/src/routes/+page.ts exports prerender = true.')
  process.exit(1)
}

await rm(buildDir, { force: true, recursive: true })
await mkdir(buildDir, { recursive: true })
await cp(clientDir, buildDir, { recursive: true })
await cp(pagesDir, buildDir, { recursive: true })

console.log(`Static site ready: ${path.relative(root, buildDir)}`)
