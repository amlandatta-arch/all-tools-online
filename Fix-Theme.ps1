Write-Host "🎨 Fixing theme initialization in all tool pages..." -ForegroundColor Cyan
Write-Host ""

$themeScript = @'
  <!-- Set theme IMMEDIATELY before page renders -->
  <script>
    (function() {
      const savedTheme = localStorage.getItem('theme');
      const theme = savedTheme || 'light'; // Default to light if nothing saved
      document.documentElement.setAttribute('data-theme', theme);
      if (document.body) document.body.setAttribute('data-theme', theme);
    })();
  </script>

  <link rel="preconnect" href="https://fonts.googleapis.com">
'@

$count = 0
$updated = 0

Get-ChildItem -Path "tools" -Recurse -Filter "*.html" | ForEach-Object {
    $count++
    $content = Get-Content $_.FullName -Raw -Encoding UTF8
    
    # Check if theme script already exists
    if ($content -notmatch 'Set theme IMMEDIATELY') {
        # Add theme script before fonts link
        $content = $content -replace '  <link rel="preconnect" href="https://fonts.googleapis.com">', $themeScript
        Set-Content $_.FullName $content -Encoding UTF8 -NoNewline
        $updated++
        
        if ($updated % 50 -eq 0) {
            Write-Host "  Updated $updated files..." -ForegroundColor Gray
        }
    }
}

Write-Host ""
Write-Host "✅ Fixed theme in $updated out of $count tool pages!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Changes made:" -ForegroundColor Cyan
Write-Host "   • Added immediate theme initialization script" -ForegroundColor White
Write-Host "   • Defaults to light theme if no preference saved" -ForegroundColor White
Write-Host "   • Prevents dark theme flash on page load" -ForegroundColor White
Write-Host ""
Write-Host "Test: Clear localStorage and refresh - should load light theme!" -ForegroundColor Yellow
