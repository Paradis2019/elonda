Function Set-WallPaper($Value)
{
 Set-ItemProperty -path 'HKCU:\Control Panel\Desktop\' -name wallpaper -value $value
 rundll32.exe user32.dll, UpdatePerUserSystemParameters
 rundll32.exe user32.dll, UpdatePerUserSystemParameters
 rundll32.exe user32.dll, UpdatePerUserSystemParameters
 rundll32.exe user32.dll, UpdatePerUserSystemParameters
 rundll32.exe user32.dll, UpdatePerUserSystemParameters
 rundll32.exe user32.dll, UpdatePerUserSystemParameters
 rundll32.exe user32.dll, UpdatePerUserSystemParameters
 rundll32.exe user32.dll, UpdatePerUserSystemParameters
 rundll32.exe user32.dll, UpdatePerUserSystemParameters
 rundll32.exe user32.dll, UpdatePerUserSystemParameters
 rundll32.exe user32.dll, UpdatePerUserSystemParameters
 rundll32.exe user32.dll, UpdatePerUserSystemParameters
}

$pictures_path = "C:\Users\mcdonago\Pictures\wallpapers-master\wallpapers-master\Wallpapers\"
$pictures = Get-ChildItem -File -path $pictures_path
$random_num = Get-Random -Maximum $pictures.Count
$new_wallpaper = [string]$pictures[$random_num]
$wallpaper_str = $pictures_path + $new_wallpaper
Write-Host $wallpaper_str
Set-Wallpaper($wallpaper_str)
