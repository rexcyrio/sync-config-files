try {
    Write-Output 'Starting IntelliJ cleanup...' 

    Push-Location 'C:\Users\stefan.lee\AppData\Roaming\JetBrains\IntelliJIdea2025.3'

    Remove-Item ./tasks/*     -Recurse -ErrorAction SilentlyContinue | Out-Host
    Remove-Item ./workspace/* -Recurse -ErrorAction SilentlyContinue | Out-Host

    $files = @(
        './options/window.state.xml',
        './options/window.layouts.xml',
        './options/recentProjects.xml',
        './options/inline.factors.completion.xml',
        './options/features.usage.statistics.xml',
        './options/dailyLocalStatistics.xml',
        './options/contributorSummary.xml',
        './options/actionSummary.xml'
    )

    foreach ($file in $files) {
        Remove-Item $file -ErrorAction SilentlyContinue | Out-Host
    }

    Write-Host 'Done'
}
finally {
    Pop-Location
}
