# GitHub Pages Deployment Guide

Complete guide for deploying the Conversation Monitoring System to GitHub Pages.

---

## 📋 Prerequisites

- GitHub repository access
- Node.js v18+ installed locally
- `gh-pages` package (already installed via `npm install`)
- Git configured with SSH or HTTPS

---

## 🚀 Quick Deployment

### Option 1: Automatic Deployment (Recommended)

The project includes GitHub Actions for automatic deployment on every push to `main`.

**Setup (One-time):**

1. **Ensure your GitHub repository is public** (required for free GitHub Pages)
   ```bash
   # In repository settings, make sure visibility is "Public"
   ```

2. **Enable GitHub Pages in repository settings:**
   - Go to Settings → Pages
   - Source: Deploy from a branch (or GitHub Actions)
   - Branch: gh-pages (created automatically)
   - Save

3. **Verify GitHub Actions is enabled:**
   - Go to Actions tab in your repository
   - Should see "Deploy to GitHub Pages" workflow

**Automatic Deployment:**

Now any push to `main` branch will:
1. ✅ Run type checks
2. ✅ Build optimized bundle
3. ✅ Deploy to `https://iovn.github.io/w18i.claude-design.lab`

### Option 2: Manual Deployment

Deploy locally using the `gh-pages` package:

```bash
# Build for GitHub Pages
npm run build:gh-pages

# Deploy dist/ to gh-pages branch
npm run deploy
```

This command:
1. Builds the app with correct base path
2. Pushes `dist/` directory to `gh-pages` branch
3. GitHub automatically serves the content

---

## 📝 Configuration Details

### Vite Configuration (`vite.config.ts`)

```typescript
base: process.env.GITHUB_PAGES ? '/w18i.claude-design.lab/' : '/'
```

- **Local dev:** Uses root path `/`
- **GitHub Pages:** Uses repo name path `/w18i.claude-design.lab/`
- Assets and links automatically adjusted by Vite

### Package.json

```json
{
  "homepage": "https://iovn.github.io/w18i.claude-design.lab",
  "scripts": {
    "build:gh-pages": "GITHUB_PAGES=true npm run build",
    "deploy": "npm run build:gh-pages && gh-pages -d dist"
  }
}
```

### GitHub Actions Workflow (`.github/workflows/deploy.yml`)

- **Trigger:** Push to `main` or pull requests
- **Runs on:** Ubuntu latest
- **Node version:** 20.x
- **Steps:**
  1. Checkout code
  2. Setup Node.js with caching
  3. Install dependencies
  4. Run type checks
  5. Build for production
  6. Deploy to GitHub Pages (on main branch only)
  7. Comment on PRs with deployment info

---

## 🌐 Accessing Your Site

After deployment, your application will be available at:

```
https://iovn.github.io/w18i.claude-design.lab
```

---

## 📊 GitHub Pages Settings

### To View/Modify Settings:

1. Go to your GitHub repository
2. Click **Settings**
3. Scroll to **Pages** section

### Verify Deployment:

1. Click **Settings** → **Pages**
2. Look for green checkmark "Your site is published at..."
3. Deployment history shown under "Deployments"

---

## 🔄 Workflow Details

### GitHub Actions Workflow

The `.github/workflows/deploy.yml` file includes:

**Automatic Deployment (Push to main):**
```yaml
on:
  push:
    branches:
      - main
```

**Build Artifacts:**
```yaml
- uses: actions/upload-artifact@v4
  with:
    name: build-artifacts
    path: dist/
```

**GitHub Pages Deployment:**
```yaml
- uses: peaceiris/actions-gh-pages@v3
  with:
    github_token: ${{ secrets.GITHUB_TOKEN }}
    publish_dir: ./dist
```

**PR Comments:**
- Automatically comments on PRs with deployment info
- Shows: "✅ Build successful! Preview available at: ..."

---

## 🛠️ Commands Reference

```bash
# Development (local)
make dev
npm run dev

# Build locally (dev version)
npm run build

# Build for GitHub Pages
npm run build:gh-pages

# Deploy to GitHub Pages (manual)
npm run deploy

# Using Makefile
make release                # Create optimized build
make build                 # Standard build
```

---

## 📁 Branch Structure

After deployment, your repository will have:

- **main** - Source code (where you commit)
- **gh-pages** - Deployed static files (auto-generated)

### gh-pages Branch

- Auto-created by `gh-pages` package or GitHub Actions
- Contains only the built `dist/` contents
- Updated on every deployment
- Do NOT commit to this branch manually

---

## ✅ Deployment Checklist

- [ ] GitHub repository is public
- [ ] GitHub Pages enabled in Settings
- [ ] `.github/workflows/deploy.yml` file exists
- [ ] `gh-pages` package installed (`npm install --save-dev gh-pages`)
- [ ] `vite.config.ts` updated with base path
- [ ] `package.json` includes build:gh-pages and deploy scripts
- [ ] Committed and pushed changes to main branch
- [ ] GitHub Actions workflow completed successfully
- [ ] Site accessible at `https://iovn.github.io/w18i.claude-design.lab`

---

## 🐛 Troubleshooting

### Site Shows 404 Error

**Issue:** Pages not deployed correctly

**Solutions:**
1. Check GitHub Pages settings - ensure it's enabled
2. Verify `gh-pages` branch exists in repository
3. Check Actions tab for workflow errors
4. Ensure `dist/` directory was generated correctly

```bash
# Verify build locally
npm run build:gh-pages
ls -la dist/
```

### Base Path Issues

**Issue:** Assets load with wrong paths

**Solution:** Vite automatically handles base path via `vite.config.ts`:
```typescript
base: process.env.GITHUB_PAGES ? '/w18i.claude-design.lab/' : '/'
```

Clear browser cache and hard refresh (Cmd+Shift+R or Ctrl+Shift+R)

### GitHub Actions Workflow Not Triggering

**Issue:** Workflow doesn't run on push

**Solutions:**
1. Ensure workflow file is in `.github/workflows/deploy.yml`
2. Check file is committed and pushed
3. Verify branch is `main` (case-sensitive)
4. Check Actions tab for errors
5. Try committing again with a force push (not recommended)

### Dependencies Installation Fails

**Issue:** `npm install` fails in GitHub Actions

**Solution:** Usually temporary. The workflow has retry logic built-in.

If persistent:
1. Check `package.json` syntax
2. Verify `package-lock.json` is up to date
3. Clear npm cache locally: `npm cache clean --force`
4. Commit cleaned `package-lock.json`

---

## 🔐 Security

### Automatic Token Handling

GitHub Actions automatically provides:
- `${{ secrets.GITHUB_TOKEN }}` - Authentication for deployment
- No need to create personal access tokens
- Permissions auto-scoped to this repository

### CNAME Record (Optional)

For custom domain (e.g., `yourdomain.com`):

1. Uncomment/update in workflow:
```yaml
cname: your-custom-domain.com
```

2. Add DNS CNAME record pointing to:
```
iovn.github.io
```

---

## 📈 Performance

GitHub Pages serves:
- ✅ Optimized production build
- ✅ Gzip compression enabled
- ✅ CDN distribution (GitHub's global network)
- ✅ Free SSL/HTTPS
- ✅ No bandwidth limits

---

## 📚 Additional Resources

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [peaceiris/actions-gh-pages](https://github.com/peaceiris/actions-gh-pages)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)

---

## 🎯 Common Workflows

### Deploy Latest Changes

```bash
git add .
git commit -m "Update: description"
git push origin main

# GitHub Actions automatically deploys
# Monitor in Actions tab
```

### Manual Deployment (Emergency/Testing)

```bash
npm run deploy
# Bypasses GitHub Actions, directly deploys locally
```

### Preview Before Committing

```bash
npm run build:gh-pages
npm run preview
# Test at http://localhost:5050 (or shown port)
```

---

## 💡 Best Practices

1. **Always test locally first:**
   ```bash
   npm run build:gh-pages
   npm run preview
   ```

2. **Use GitHub Actions for production:**
   - Consistent environment
   - Automatic deployments
   - Built-in CI/CD checks

3. **Monitor deployments:**
   - Check Actions tab regularly
   - Review workflow logs for errors
   - Get notifications for failures

4. **Maintain clean commits:**
   - Don't commit `dist/` or `.gh-pages/`
   - Keep `.gitignore` updated
   - Use `.gitignore`:
     ```
     dist/
     .vite/
     node_modules/
     .gh-pages/
     ```

5. **Security:**
   - Use GitHub HTTPS clone URL
   - Never commit `gh-pages` branch
   - Keep dependencies updated

---

## 📞 Support

### If deployment fails:

1. **Check GitHub Actions logs:**
   - Repository → Actions tab
   - Click workflow run
   - Review build logs

2. **Verify configuration:**
   - Correct repository name in base path
   - `gh-pages` package installed
   - Workflow file exists

3. **Test locally:**
   ```bash
   npm run build:gh-pages
   npm run preview
   ```

4. **Check GitHub Pages settings:**
   - Settings → Pages
   - Correct branch selected
   - Custom domain (if applicable)

---

## 🚀 Summary

Your application is now configured for GitHub Pages deployment:

✅ **Automatic:** GitHub Actions deploys on every push to main  
✅ **Manual:** Can deploy locally with `npm run deploy`  
✅ **Optimized:** Production build with all optimizations  
✅ **Fast:** CDN distributed, HTTPS enabled  
✅ **Free:** No hosting costs, just your GitHub account  

**Your site is available at:**
```
https://iovn.github.io/w18i.claude-design.lab
```

---

Last Updated: 2026-06-19
