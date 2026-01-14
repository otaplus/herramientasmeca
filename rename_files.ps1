$directory = "C:\Users\Win10Ltsc\Downloads\herramientasmeca-main\herramientasmeca-main"

# Use wildcards to avoid encoding weirdness
$mapping = @{
    "*Avances Para Freasadoras*"       = "avances_fresadora.html";
    "*Código G G76*"                   = "codigo_g76_fanuc.html";
    "*Inclinación y Conicidad*"        = "inclinacion_conicidad.html";
    "*Tolerancias ISO*"                = "tolerancias_iso.html";
    "*Calculadora de Triángulos.html*" = "calculadora_triangulos.html";
    "*Consejos para Principiantes*"    = "consejos_principiantes.html";
    "*Conversiones Técnicas*"          = "conversiones_tecnicas.html";
    "*Generador de Código G71*"        = "codigo_g71_torno.html";
    "*Calculadora de Chaveteros*"      = "calculadora_chaveteros.html";
    "*Inclinación de Cabezal*"         = "inclinacion_cabezal.html";
    "*Suite Integral*"                 = "suite_integral.html";
    "*Renuncia de Responsabilidad*"    = "renuncia_responsabilidad.html";
    "*Seguridad en Talleres*"          = "seguridad_talleres.html";
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
