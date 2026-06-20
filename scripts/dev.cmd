@echo off
setlocal

set "ROOT=%~dp0.."
set "NODE_BIN=%USERPROFILE%\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin"
set "SCRIPT_BIN=%ROOT%\scripts"

if exist "%NODE_BIN%\node.exe" (
  set "Path=%NODE_BIN%;%SCRIPT_BIN%;%Path%"
) else (
  set "Path=%SCRIPT_BIN%;%Path%"
)

cd /d "%ROOT%"
"%SCRIPT_BIN%\pnpm.cmd" dev
