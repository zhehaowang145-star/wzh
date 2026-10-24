$ErrorActionPreference = "Stop"

$projectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $projectRoot

$vitePath = Join-Path $projectRoot "node_modules\vite\bin\vite.js"
if (-not (Test-Path -LiteralPath $vitePath)) {
  throw "Dependencies are missing. Run pnpm install in this folder first."
}

$nodeCommand = Get-Command node -ErrorAction SilentlyContinue
$bundledNode = "C:\Users\23914\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe"

if ($nodeCommand) {
  $nodePath = $nodeCommand.Source
} elseif (Test-Path -LiteralPath $bundledNode) {
  $nodePath = $bundledNode
} else {
  throw "Node.js was not found. Install Node.js 20 or newer, then run pnpm install."
}

Write-Host "Portfolio preview: http://127.0.0.1:5173"
& $nodePath $vitePath --host 127.0.0.1 --port 5173
