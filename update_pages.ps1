$directory = "C:\Users\Win10Ltsc\Downloads\herramientasmeca-main\herramientasmeca-main"
$buttonHtml = @"
<div style="margin: 10px 0;">
    <a href="index.html" style="display: inline-flex; align-items: center; text-decoration: none; color: #333; font-weight: 500; font-family: 'Roboto', sans-serif;">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16" style="margin-right: 8px;">
            <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
        </svg>
        Volver al Inicio
    </a>
</div>
"@

$files = Get-ChildItem -Path $directory -Filter "*.html"
$count = 0

foreach ($file in $files) {
    if ($file.Name -eq "index.html") { continue }
    
    $content = Get-Content -Path $file.FullName -Raw -Encoding UTF8
    
    if ($content.Contains("Volver al Inicio")) { 
        Write-Host "Skipping $($file.Name), already has button."
        continue 
    }

    $regexH1 = [regex]"<h1>"
    $regexContainer = [regex]'<div class="container">'
    $regexBody = [regex]'(<body[^>]*>)'

    $newContent = $null

    if ($regexH1.IsMatch($content)) {
        $newContent = $regexH1.Replace($content, $buttonHtml + "<h1>", 1)
        Write-Host "Inserted before <h1> in $($file.Name)"
    }
    elseif ($regexContainer.IsMatch($content)) {
        $newContent = $regexContainer.Replace($content, '<div class="container">' + $buttonHtml, 1)
        Write-Host "Inserted after container in $($file.Name)"
    }
    else {
        # Fallback to body
        if ($regexBody.IsMatch($content)) {
             $newContent = $regexBody.Replace($content, '$1' + $buttonHtml, 1)
             Write-Host "Inserted after body in $($file.Name)"
        } else {
             Write-Host "Could not find insertion point for $($file.Name)"
        }
    }
    
    if ($newContent) {
        Set-Content -Path $file.FullName -Value $newContent -Encoding UTF8
        $count++
    }
}
Write-Host "Updated $count files"
