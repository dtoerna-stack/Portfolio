@echo off
setlocal

set "ROOT=%~dp0.."
set "NODE_BIN=%USERPROFILE%\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin"
set "PNPX=%ROOT%\.tools\pnpm\package\bin\pnpx.cjs"

if exist "%PNPX%" if exist "%NODE_BIN%\node.exe" (
  set "PATH=%NODE_BIN%;%PATH%"
  "%NODE_BIN%\node.exe" "%PNPX%" %*
  exit /b %ERRORLEVEL%
)

if exist "%PNPX%" (
  node "%PNPX%" %*
  exit /b %ERRORLEVEL%
)

corepack pnpx %*
