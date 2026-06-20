@echo off
setlocal

set "ROOT=%~dp0.."
set "NODE_BIN=%USERPROFILE%\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin"

if exist "%NODE_BIN%\node.exe" (
  set "PATH=%NODE_BIN%;%ROOT%\scripts;%PATH%"
)

if not exist "%ROOT%\.git" (
  echo This folder is not connected to a git repository yet.
  exit /b 1
)

cd /d "%ROOT%"

echo Exporting content from local Payload CMS...
"%ROOT%\scripts\pnpm.cmd" run export:content
if errorlevel 1 exit /b 1

echo Building static website...
"%ROOT%\scripts\pnpm.cmd" run build:static
if errorlevel 1 exit /b 1

git status --short
git add apps/web/src/lib/generated-content.json
git diff --cached --quiet
if errorlevel 1 (
  git commit -m "chore: publish portfolio content"
) else (
  echo No content changes to commit.
)

git push
