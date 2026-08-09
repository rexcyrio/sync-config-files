$VERSION_IDENTIFIER = 'IntelliJIdea2026.1'

$folders = @(
    "$HOME\AppData\Roaming\JetBrains\$VERSION_IDENTIFIER\tasks\*",
    "$HOME\AppData\Roaming\JetBrains\$VERSION_IDENTIFIER\workspace\*"
)

$files = @(
    "$HOME\AppData\Roaming\JetBrains\$VERSION_IDENTIFIER\options\window.state.xml",
    "$HOME\AppData\Roaming\JetBrains\$VERSION_IDENTIFIER\options\window.layouts.xml",
    "$HOME\AppData\Roaming\JetBrains\$VERSION_IDENTIFIER\options\recentProjects.xml",
    "$HOME\AppData\Roaming\JetBrains\$VERSION_IDENTIFIER\options\inline.factors.completion.xml",
    "$HOME\AppData\Roaming\JetBrains\$VERSION_IDENTIFIER\options\features.usage.statistics.xml",
    "$HOME\AppData\Roaming\JetBrains\$VERSION_IDENTIFIER\options\dailyLocalStatistics.xml",
    "$HOME\AppData\Roaming\JetBrains\$VERSION_IDENTIFIER\options\contributorSummary.xml",
    "$HOME\AppData\Roaming\JetBrains\$VERSION_IDENTIFIER\options\actionSummary.xml"
)

foreach ($file in $files) {
    if (Test-Path -Path $file) {
        Remove-Item -Path $file -Verbose
    }
}

foreach ($folder in $folders) {
    Remove-Item -Path $folder -Recurse -Verbose
}
