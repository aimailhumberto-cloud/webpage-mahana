Add-Type -AssemblyName System.Drawing

$imagesDir = "C:\Users\Usuario\.gemini\antigravity\scratch\webpage-mahana\public\images"
$files = Get-ChildItem -Path $imagesDir -File | Where-Object { 
    ($_.Extension -ieq ".jpg" -or $_.Extension -ieq ".jpeg" -or $_.Extension -ieq ".png") -and ($_.Length -gt 900KB)
}

Write-Host "Found $($files.Count) images larger than 900KB to optimize..."

function Get-JpegCodec {
    foreach ($codec in [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders()) {
        if ($codec.MimeType -eq "image/jpeg") {
            return $codec
        }
    }
    return $null
}

$jpegCodec = Get-JpegCodec
$encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
$encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]82)

$totalSavedBytes = 0

foreach ($file in $files) {
    try {
        $oldSize = $file.Length
        $bytes = [System.IO.File]::ReadAllBytes($file.FullName)
        $ms = New-Object System.IO.MemoryStream(,$bytes)
        $img = [System.Drawing.Image]::FromStream($ms)

        $origW = $img.Width
        $origH = $img.Height

        $maxDim = 1920
        $newW = $origW
        $newH = $origH

        if ($origW -gt $maxDim -or $origH -gt $maxDim) {
            if ($origW -ge $origH) {
                $newW = $maxDim
                $newH = [int][Math]::Round(($origH * $maxDim) / $origW)
            } else {
                $newH = $maxDim
                $newW = [int][Math]::Round(($origW * $maxDim) / $origH)
            }
        }

        $destBmp = New-Object System.Drawing.Bitmap($newW, $newH, [System.Drawing.Imaging.PixelFormat]::Format24bppRgb)
        $graphics = [System.Drawing.Graphics]::FromImage($destBmp)
        $graphics.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
        $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
        $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
        $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality

        $graphics.DrawImage($img, 0, 0, $newW, $newH)

        $outMs = New-Object System.IO.MemoryStream
        if ($file.Extension -ieq ".png") {
            $destBmp.Save($outMs, [System.Drawing.Imaging.ImageFormat]::Png)
        } else {
            $destBmp.Save($outMs, $jpegCodec, $encoderParams)
        }

        $newBytes = $outMs.ToArray()
        $newSize = $newBytes.Length

        $graphics.Dispose()
        $destBmp.Dispose()
        $img.Dispose()
        $ms.Dispose()
        $outMs.Dispose()

        if ($newSize -lt $oldSize) {
            [System.IO.File]::WriteAllBytes($file.FullName, $newBytes)
            $saved = $oldSize - $newSize
            $totalSavedBytes += $saved
            $oldKb = [Math]::Round($oldSize / 1KB, 1)
            $newKb = [Math]::Round($newSize / 1KB, 1)
            $pct = [Math]::Round(($saved / $oldSize) * 100, 1)
            Write-Host ("Optimized " + $file.Name + ": " + $oldKb + "KB -> " + $newKb + "KB (-" + $pct + "%) [" + $origW + "x" + $origH + " -> " + $newW + "x" + $newH + "]")
        } else {
            Write-Host ("Kept original for " + $file.Name)
        }
    } catch {
        Write-Warning ("Failed " + $file.Name + ": " + $_.Exception.Message)
    }
}

$savedMb = [Math]::Round($totalSavedBytes / 1MB, 2)
Write-Host ("Finished image optimization! Total bandwidth saved: " + $savedMb + " MB")
