param(
    [Parameter(Mandatory = $true)]
    [ValidatePattern('^[a-p]{32}$')]
    [string]$ExtensionId
)

$ErrorActionPreference = 'Stop'

$HostName = 'com.quantclass.smart.launcher'
$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$HostPath = Join-Path $ScriptDir 'quantclass_native_host.cmd'
$ManifestPath = Join-Path $ScriptDir "$HostName.json"
$RegistryPath = "HKCU:\Software\Google\Chrome\NativeMessagingHosts\$HostName"

if (-not (Test-Path $HostPath)) {
    throw "Native host wrapper not found: $HostPath"
}

$Manifest = [ordered]@{
    name = $HostName
    description = 'QuantClass Smart backend launcher'
    path = $HostPath
    type = 'stdio'
    allowed_origins = @("chrome-extension://$ExtensionId/")
}

$Json = $Manifest | ConvertTo-Json -Depth 5
[System.IO.File]::WriteAllText($ManifestPath, $Json, [System.Text.UTF8Encoding]::new($false))
New-Item -Path $RegistryPath -Force | Out-Null
Set-Item -Path $RegistryPath -Value $ManifestPath

Write-Host "Registered $HostName"
Write-Host "Manifest: $ManifestPath"
Write-Host "Allowed origin: chrome-extension://$ExtensionId/"
