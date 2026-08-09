# enable scoop-search
Invoke-Expression (&scoop-search --hook)

# enable completion in current shell, use absolute path because PowerShell Core not respect $env:PSModulePath
Import-Module "$($(Get-Item $(Get-Command scoop.ps1).Path).Directory.Parent.FullName)\modules\scoop-completion"

# Import the Chocolatey Profile that contains the necessary code to enable
# tab-completions to function for `choco`.
# Be aware that if you are missing these lines from your profile, tab completion
# for `choco` will not function.
# See https://ch0.co/tab-completion for details.
# $ChocolateyProfile = "$env:ChocolateyInstall\helpers\chocolateyProfile.psm1"
# if (Test-Path($ChocolateyProfile)) {
#   Import-Module "$ChocolateyProfile"
# }

# enable pshazz
# try { $null = gcm pshazz -ea stop; pshazz init 'default' } catch { }

# enable starship
Invoke-Expression (&starship init powershell)

# remove powershell aliases
$aliasesToRemove = @('curl', 'wget', 'r')

foreach ($name in $aliasesToRemove) {
    if (Get-Alias $name -ErrorAction SilentlyContinue) {
        Remove-Item alias:$name -Force
    }
}

# add ll
function ll { Get-ChildItem -Force $args }
