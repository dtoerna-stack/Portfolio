# Portfolio

Een SvelteKit portfolio met een Payload CMS backend/admin.

## Starten

Gebruik de lokale pnpm die in `.tools` staat:

```powershell
$nodeBin = 'C:\Users\Gebruiker\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin'
$pnpmBin = "$PWD\.tools\pnpm\package\bin"
$scriptBin = "$PWD\scripts"
$env:PATH = "$nodeBin;$scriptBin;$pnpmBin;$env:PATH"
& "$nodeBin\node.exe" '.tools\pnpm\package\bin\pnpm.cjs' install
& "$nodeBin\node.exe" '.tools\pnpm\package\bin\pnpm.cjs' dev
```

Of korter op Windows:

```powershell
.\scripts\dev.cmd
```

Alleen de portfolio-preview starten:

```powershell
.\scripts\dev-web.cmd
```

Daarna:

- Portfolio: http://localhost:5173
- CMS/admin: http://localhost:3001/admin

Maak bij de eerste CMS-open een admin gebruiker aan. De frontend toont alvast voorbeeldcontent en haalt automatisch Payload content op zodra de CMS draait.

## CMS vullen

De voorbeeldcontent is al een keer geseed. Later opnieuw draaien kan zo:

```powershell
$nodeBin = 'C:\Users\Gebruiker\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin'
$pnpmBin = "$PWD\.tools\pnpm\package\bin"
$scriptBin = "$PWD\scripts"
$env:PATH = "$nodeBin;$scriptBin;$pnpmBin;$env:PATH"
& "$nodeBin\node.exe" '.tools\pnpm\package\bin\pnpm.cjs' --filter @portfolio/cms seed
```

Belangrijke plekken:

- `apps/web/src/routes/+page.svelte`: homepage markup
- `apps/web/src/app.css`: Tailwind import, theme tokens en animatie-keyframes
- `apps/cms/src/collections`: Payload collections
- `apps/cms/src/globals/Profile.ts`: profieltekst voor de hero

De portfolio-frontend gebruikt Tailwind CSS via de officiele Vite plugin. De Payload admin gebruikt zijn eigen ingebouwde styling, omdat dat een externe CMS-interface is.

## Publiceren

De online versie is een statische snapshot van de portfolio. Payload draait lokaal en wordt niet mee gedeployed.

Workflow:

1. Start lokaal de portfolio en CMS:

```powershell
.\scripts\dev.cmd
```

2. Pas content aan in Payload:

```txt
http://127.0.0.1:3001/admin
```

3. Publiceer de laatste CMS-content naar de static site:

```powershell
.\scripts\publish-site.cmd
```

Dat script exporteert Payload-content naar `apps/web/src/lib/generated-content.json`, bouwt de statische site, commit de contentwijziging en pusht naar GitHub.

## Cloudflare Pages

Kies in Cloudflare Pages deze instellingen:

```txt
Framework preset:
None

Build command:
corepack enable && corepack prepare pnpm@11.5.0 --activate && pnpm install --frozen-lockfile && pnpm run build:static

Build output directory:
apps/web/build
```

De CMS-link wordt op productie verborgen zolang `PUBLIC_PAYLOAD_URL` niet is ingesteld. Daardoor verwijst de publieke site niet naar je lokale Payload CMS.

## GitHub

Deze repository is voorbereid om publiek te pushen. Lokale databases, `.env` bestanden, installatiemappen, build-output en logs staan in `.gitignore`.

Maak lokaal nette commits met:

```powershell
.\scripts\commit-public-repo.cmd
```

Maak daarna op GitHub een lege repository, bijvoorbeeld `portfolio-persona-cms`, en koppel/push met:

```powershell
.\scripts\connect-github.cmd https://github.com/dtoerna-stack/portfolio-persona-cms.git
```
