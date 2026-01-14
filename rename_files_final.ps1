$directory = "C:\Users\Win10Ltsc\Downloads\herramientasmeca-main\herramientasmeca-main"

# Use ? wildcard for accented characters
$mapping = @{
    "*Inclinaci?n de Cabezal*"         = "inclinacion_cabezal.html";
    "*Conversiones T?cnicas*"          = "conversiones_tecnicas.html";
    "*C?digo G G76*"                   = "codigo_g76_fanuc.html";
    "*Generador de C?digo G71*"        = "codigo_g71_torno.html";
    "*Inclinaci?n y Conicidad*"        = "inclinacion_conicidad.html";
    "*Calculadora de Tri?ngulos.html*" = "calculadora_triangulos.html";
}

foreach ($key in $mapping.Keys) {
    # Get-ChildItem with filter to find the file
    $file = Get-ChildItem -Path $directory -Filter $key | Select-Object -First 1
    
    if ($file) {
        $newName = $mapping[$key]
        $newPath = Join-Path $directory $newName
        Rename-Item -Path $file.FullName -NewName $newName
        Write-Host "Renamed '$($file.Name)' to '$newName'"
    }
    else {
        Write-Host "File pattern '$key' not found."
    }
}
