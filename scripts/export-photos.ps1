param(
  [Parameter(Mandatory=$true)][string]$PortraitSource,
  [Parameter(Mandatory=$true)][string]$RideSource
)
# Deployment derivatives only: resizing/encoding, no creative retouching.
Add-Type -AssemblyName System.Drawing
function Export-Photo([string]$Source, [string]$Destination, [int]$Width) {
  $sourceImage = [System.Drawing.Image]::FromFile($Source)
  try {
    $height = [int][Math]::Round($sourceImage.Height * $Width / $sourceImage.Width)
    $bitmap = [System.Drawing.Bitmap]::new($Width, $height)
    $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
    try {
      $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
      $graphics.DrawImage($sourceImage, 0, 0, $Width, $height)
      $encoder = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object MimeType -eq 'image/jpeg'
      $parameters = [System.Drawing.Imaging.EncoderParameters]::new(1)
      $parameters.Param[0] = [System.Drawing.Imaging.EncoderParameter]::new([System.Drawing.Imaging.Encoder]::Quality, [long]86)
      try { $bitmap.Save($Destination, $encoder, $parameters) }
      finally { $parameters.Dispose() }
    } finally { $graphics.Dispose(); $bitmap.Dispose() }
  } finally { $sourceImage.Dispose() }
}
$projectRoot = Split-Path $PSScriptRoot -Parent
Export-Photo $PortraitSource (Join-Path $projectRoot 'public/ayush-portrait.jpg') 800
Export-Photo $RideSource (Join-Path $projectRoot 'public/ayush-cb350rs.jpg') 900
Get-Item (Join-Path $projectRoot 'public/ayush-portrait.jpg'), (Join-Path $projectRoot 'public/ayush-cb350rs.jpg') | Select-Object Name,Length
