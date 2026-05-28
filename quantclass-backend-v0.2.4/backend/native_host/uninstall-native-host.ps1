$ErrorActionPreference = 'Stop'

$HostName = 'com.quantclass.smart.launcher'
$RegistryPath = "HKCU:\Software\Google\Chrome\NativeMessagingHosts\$HostName"

if (Test-Path $RegistryPath) {
    Remove-Item -Path $RegistryPath -Recurse -Force
    Write-Host "Removed $HostName"
} else {
    Write-Host "$HostName is not registered"
}
