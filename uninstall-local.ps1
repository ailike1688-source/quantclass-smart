$ErrorActionPreference = 'Stop'

function Write-Step {
    param([string]$Message)
    Write-Host "`n==> $Message" -ForegroundColor Cyan
}

$RootDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$BackendDir = Join-Path $RootDir 'quantclass-backend-v0.2.4\backend'
$VenvDir = Join-Path $BackendDir 'venv'
$NativeUninstallScript = Join-Path $BackendDir 'native_host\uninstall-native-host.ps1'

Write-Host 'QuantClass Smart local uninstaller' -ForegroundColor Green
Write-Host "Project: $RootDir"

if (-not (Test-Path $NativeUninstallScript)) {
    throw "Native Messaging uninstaller not found: $NativeUninstallScript"
}

Write-Step 'Removing Native Messaging host registration'
& powershell -NoProfile -ExecutionPolicy Bypass -File $NativeUninstallScript
if ($LASTEXITCODE -ne 0) {
    throw 'Native Messaging unregistration failed.'
}

Write-Host "`nUninstall completed." -ForegroundColor Green
Write-Host 'Preserved local files:'
Write-Host "- Source code: $RootDir"
Write-Host "- Backend directory: $BackendDir"
Write-Host "- Virtual environment preserved: $VenvDir"
Write-Host '- Local database files, knowledge files, and user data are preserved.'
Write-Host 'To fully remove the project, delete the project folder manually after backing up any data you need.'
