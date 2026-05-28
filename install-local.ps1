param(
    [Parameter(Mandatory = $true)]
    [ValidatePattern('^[a-p]{32}$')]
    [string]$ExtensionId,

    [switch]$SkipDependencyInstall
)

$ErrorActionPreference = 'Stop'

function Write-Step {
    param([string]$Message)
    Write-Host "`n==> $Message" -ForegroundColor Cyan
}

function Invoke-External {
    param(
        [Parameter(Mandatory = $true)]
        [string[]]$Command,

        [Parameter(Mandatory = $true)]
        [string[]]$Arguments
    )

    $Executable = $Command[0]
    $AllArguments = @($Command | Select-Object -Skip 1) + $Arguments
    & $Executable @AllArguments
    if ($LASTEXITCODE -ne 0) {
        throw "Command failed: $($Command -join ' ') $($Arguments -join ' ')"
    }
}

function Get-PythonCommand {
    if (Get-Command py -ErrorAction SilentlyContinue) {
        return @('py', '-3')
    }
    if (Get-Command python -ErrorAction SilentlyContinue) {
        return @('python')
    }
    throw 'Python was not found. Install Python 3.10+ first, then rerun this installer.'
}

function Test-BackendDependencies {
    param([string]$PythonPath)

    $Check = 'import fastapi, uvicorn, pydantic, aiosqlite, httpx, yaml, openai, anthropic, jwt, bcrypt, fitz'
    & $PythonPath -c $Check *> $null
    return $LASTEXITCODE -eq 0
}

$RootDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$BackendDir = Join-Path $RootDir 'quantclass-backend-v0.2.4\backend'
$VenvDir = Join-Path $BackendDir 'venv'
$VenvPython = Join-Path $VenvDir 'Scripts\python.exe'
$RequirementsPath = Join-Path $BackendDir 'requirements.txt'
$NativeInstallScript = Join-Path $BackendDir 'native_host\install-native-host.ps1'
$NativeHostScript = Join-Path $BackendDir 'native_host\quantclass_native_host.py'

Write-Host 'QuantClass Smart local installer' -ForegroundColor Green
Write-Host "Project: $RootDir"
Write-Host "ExtensionId: $ExtensionId"

if (-not (Test-Path $BackendDir)) {
    throw "Backend directory not found: $BackendDir"
}
if (-not (Test-Path $RequirementsPath)) {
    throw "Requirements file not found: $RequirementsPath"
}
if (-not (Test-Path $NativeInstallScript)) {
    throw "Native Messaging installer not found: $NativeInstallScript"
}

Write-Step 'Checking Python'
$PythonCommand = Get-PythonCommand
Invoke-External -Command $PythonCommand -Arguments @('--version')

if (-not (Test-Path $VenvPython)) {
    Write-Step 'Creating backend virtual environment'
    Invoke-External -Command $PythonCommand -Arguments @('-m', 'venv', $VenvDir)
}

if (-not (Test-Path $VenvPython)) {
    throw "Virtual environment Python not found after setup: $VenvPython"
}

Write-Step 'Checking backend dependencies'
$DependenciesReady = Test-BackendDependencies -PythonPath $VenvPython
if (-not $DependenciesReady) {
    if ($SkipDependencyInstall) {
        throw 'Backend dependencies are missing and -SkipDependencyInstall was specified.'
    }

    Write-Warning "This step will access PyPI and modify the local venv: $VenvDir"
    $Answer = Read-Host 'Continue with pip install? Type Y to continue'
    if ($Answer -notin @('Y', 'y', 'YES', 'Yes', 'yes')) {
        throw 'Dependency installation cancelled by user.'
    }

    Write-Step 'Installing backend dependencies from PyPI'
    & $VenvPython -m pip install --upgrade pip
    if ($LASTEXITCODE -ne 0) {
        throw 'pip upgrade failed.'
    }
    & $VenvPython -m pip install -r $RequirementsPath
    if ($LASTEXITCODE -ne 0) {
        throw 'pip install failed.'
    }
}

Write-Step 'Checking Native Messaging host syntax'
& $VenvPython -m py_compile $NativeHostScript
if ($LASTEXITCODE -ne 0) {
    throw 'Native Messaging host syntax check failed.'
}

Write-Step 'Registering Native Messaging host'
& powershell -NoProfile -ExecutionPolicy Bypass -File $NativeInstallScript -ExtensionId $ExtensionId
if ($LASTEXITCODE -ne 0) {
    throw 'Native Messaging registration failed.'
}

Write-Step 'Running Native Messaging unit tests'
Push-Location $BackendDir
try {
    & $VenvPython -m unittest tests.test_native_host -v
    if ($LASTEXITCODE -ne 0) {
        throw 'Native Messaging unit tests failed.'
    }
}
finally {
    Pop-Location
}

Write-Host "`nInstall completed." -ForegroundColor Green
Write-Host 'Next steps:'
Write-Host '1. Open chrome://extensions'
Write-Host '2. Reload QuantClass Smart'
Write-Host '3. Click the extension icon or open the side panel'
Write-Host '4. The backend should start automatically through Native Messaging'
