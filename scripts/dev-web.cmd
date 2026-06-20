@echo off
setlocal

set "ROOT=%~dp0.."
set "NODE_BIN=%USERPROFILE%\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin"

if exist "%NODE_BIN%\node.exe" (
  set "NODE=%NODE_BIN%\node.exe"
) else (
  set "NODE=node"
)

cd /d "%ROOT%\apps\web"
"%NODE%" "node_modules\vite\bin\vite.js" --host 127.0.0.1 --port 5173
