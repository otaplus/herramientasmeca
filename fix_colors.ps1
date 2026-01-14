$directory = "C:\Users\Win10Ltsc\Downloads\herramientasmeca-main\herramientasmeca-main"
# Escape special characters for regex match if needed, or use simple string replace
$targetString = 'color: #333;'
$replacementString = 'color: var(--accent-primary);' 

$files = Get-ChildItem -Path $directory -Filter "*.html"
$count = 0

foreach ($file in $files) {
    $content = Get-Content -Path $file.FullName -Raw -Encoding UTF8
    
    # We only want to replace it in the context of the back button inline style we added.
    # The signature we used was: style="... color: #333; ..."
    
    if ($content.Contains($targetString)) {
        # Perform replacement
        $newContent = $content.Replace($targetString, $replacementString)
        
        if ($newContent -ne $content) {
            Set-Content -Path $file.FullName -Value $newContent -Encoding UTF8
            $count++
            Write-Host "Updated $($file.Name)"
        }
    }
}

Write-Host "Updated colors in $count files."
