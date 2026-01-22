# Metro Bundler Reset Script
Write-Host "Clearing Metro bundler cache..." -ForegroundColor Yellow

# Stop any running Metro processes
Get-Process | Where-Object {$_.ProcessName -like "*node*" -or $_.ProcessName -like "*metro*"} | Stop-Process -Force -ErrorAction SilentlyContinue

# Clear Metro cache
if (Test-Path "$env:TEMP\metro-*") {
    Remove-Item -Recurse -Force "$env:TEMP\metro-*" -ErrorAction SilentlyContinue
}

if (Test-Path "$env:TEMP\haste-map-*") {
    Remove-Item -Recurse -Force "$env:TEMP\haste-map-*" -ErrorAction SilentlyContinue
}

# Clear node_modules cache
if (Test-Path "node_modules\.cache") {
    Remove-Item -Recurse -Force "node_modules\.cache" -ErrorAction SilentlyContinue
}

# Clear watchman cache (if watchman is installed)
try {
    watchman watch-del-all 2>$null
} catch {
    # Watchman not installed, that's okay
}

Write-Host "Cache cleared! Starting Metro bundler with --reset-cache..." -ForegroundColor Green
Write-Host "Press Ctrl+C to stop Metro bundler" -ForegroundColor Cyan

# Start Metro with reset cache
npx react-native start --reset-cache
