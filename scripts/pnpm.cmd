@echo off
setlocal

set "ROOT=%~dp0.."
set "NODE_BIN=%USERPROFILE%\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin"
set "PNPM=%ROOT%\.tools\pnpm\package\bin\pnpm.cjs"

if exist "%PNPM%" if exist "%NODE_BIN%\node.exe" (
  set "PATH=%NODE_BIN%;%PATH%"
  "%NODE_BIN%\node.exe" "%PNPM%" %*
  exit /b %ERRORLEVEL%
)

if exist "%PNPM%" (
  node "%PNPM%" %*
  exit /b %ERRORLEVEL%
)

corepack pnpm %*
