Write-Host "🔧 Fixing navigation in all tool pages..." -ForegroundColor Cyan
Write-Host ""

$count = 0
$errors = 0

Get-ChildItem -Path "tools" -Recurse -Filter "*.html" | ForEach-Object {
    try {
        $content = Get-Content $_.FullName -Raw -Encoding UTF8
        
        # Fix navigation links
        $content = $content -replace 'href="about\.html"', 'href="../../about.html"'
        $content = $content -replace 'href="contact\.html"', 'href="../../contact.html"'
        $content = $content -replace 'href="categories\.html"', 'href="../../categories.html"'
        $content = $content -replace 'href="privacy\.html"', 'href="../../privacy.html"'
        $content = $content -replace 'href="terms\.html"', 'href="../../terms.html"'
        
        # Fix home link (but not in breadcrumbs or other contexts)
        $content = $content -replace '(<nav[^>]*>.*?<a[^>]*?)href="#"', '$1href="../../index.html"'
        
        # Update contact email
        $content = $content -replace 'support@alltoolsonline\.example', 'hello.alltoolsonline@gmail.com'
        
        Set-Content $_.FullName $content -Encoding UTF8 -NoNewline
        $count++
        
        if ($count % 50 -eq 0) {
            Write-Host "  Processed $count files..." -ForegroundColor Gray
        }
    }
    catch {
        Write-Host "  ❌ Error processing: $($_.Name)" -ForegroundColor Red
        $errors++
    }
}

Write-Host ""
Write-Host "✅ Fixed navigation in $count tool pages!" -ForegroundColor Green

if ($errors -gt 0) {
    Write-Host "⚠️  $errors files had errors" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "📋 Changes made:" -ForegroundColor Cyan
Write-Host "   • Updated About link → ../../about.html" -ForegroundColor White
Write-Host "   • Updated Contact link → ../../contact.html" -ForegroundColor White
Write-Host "   • Updated Categories link → ../../categories.html" -ForegroundColor White
Write-Host "   • Updated Privacy link → ../../privacy.html" -ForegroundColor White
Write-Host "   • Updated Terms link → ../../terms.html" -ForegroundColor White
Write-Host "   • Updated Home link → ../../index.html" -ForegroundColor White
Write-Host "   • Updated email → hello.alltoolsonline@gmail.com" -ForegroundColor White
Write-Host ""
Write-Host "🎉 All done! Test by opening any tool page and clicking navigation links." -ForegroundColor Green
