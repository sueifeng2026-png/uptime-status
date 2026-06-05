@echo off
REM ========================================
REM  Uptime Status - One-Click Launch Script
REM  Usage: launch.bat [GITHUB_TOKEN] [VERCEL_TOKEN]
REM ========================================
setlocal enabledelayedexpansion

echo.
echo   =====================================
echo     Uptime Status - Launch Script
echo   =====================================
echo.

REM --- Step 1: Push to GitHub ---
if "%~1"=="" (
    echo [SKIP] No GitHub token provided. Skipping GitHub push.
    echo        To push: launch.bat YOUR_GITHUB_TOKEN
    goto :vercel_deploy
)

echo [1/3] Pushing to GitHub...
echo %~1 | gh auth login --with-token
gh repo create willy2023/uptime-status --public --source=. --push
if %errorlevel% neq 0 (
    echo [WARN] GitHub push failed. Check your token permissions (needs 'repo' scope).
) else (
    echo [OK] Code pushed to GitHub!
)

:vercel_deploy
REM --- Step 2: Deploy to Vercel ---
if "%~2"=="" (
    echo [SKIP] No Vercel token provided. Skipping Vercel deploy.
    echo        To deploy: launch.bat GITHUB_TOKEN YOUR_VERCEL_TOKEN
    goto :gumroad
)

echo [2/3] Deploying to Vercel...
set VERCEL_TOKEN=%~2
npx vercel --yes --token %VERCEL_TOKEN% --prod
if %errorlevel% neq 0 (
    echo [WARN] Vercel deploy failed. Check your token at https://vercel.com/account/tokens
) else (
    echo [OK] Deployed to Vercel!
)

:gumroad
REM --- Step 3: Reminder ---
echo [3/3] Reminders:
echo        - Create Gumroad listing at https://app.gumroad.com/products/new
echo        - Copy content from content\gumroad-listing.md
echo        - Price: $19 one-time
echo        - Enable GitHub Sponsors: https://github.com/sponsors/willy2023
echo.
echo   =====================================
echo     Done! Check the output above.
echo   =====================================
endlocal
