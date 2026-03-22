if ($args.Count -ne 2) {
    Write-Error 'Usage: .\checksum.ps1 <file1> <file2>'
    exit
}

$file1 = $args[0]
$file2 = $args[1]

if (!(Test-Path $file1)) {
    Write-Error "$file1 does not exist."
    exit
}
if (!(Test-Path $file2)) {
    Write-Error "$file2 does not exist."
    exit
}

$hash1 = (Get-FileHash -Path $file1 -Algorithm SHA256).Hash
$hash2 = (Get-FileHash -Path $file2 -Algorithm SHA256).Hash

Write-Host "$hash1"
Write-Host "$hash2"

if ($hash1 -eq $hash2) {
    Write-Host 'SHA256 hash match' -ForegroundColor Green
} else {
    Write-Host 'SHA256 hash are different (!)' -ForegroundColor Yellow
}
