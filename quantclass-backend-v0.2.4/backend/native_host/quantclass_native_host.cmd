@echo off
setlocal
set "SCRIPT_DIR=%~dp0"
set "BACKEND_DIR=%SCRIPT_DIR%.."
"%BACKEND_DIR%\venv\Scripts\python.exe" "%SCRIPT_DIR%quantclass_native_host.py"
