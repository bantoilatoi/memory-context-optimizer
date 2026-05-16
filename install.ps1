# Memory Context Optimizer - Windows Installer
# Requires: Node.js v20+

$ErrorActionPreference = "Stop"

$InstallJs = "bin\install.js"

if (-not (Test-Path $InstallJs)) {
    Write-Error "install.js not found. Run from repository root."
    exit 1
}

node $InstallJs $args
