# Conversation Monitoring System - Usage Guide

A comprehensive guide for developing, building, and deploying the Bankaool Conversation Monitoring Page.

## Quick Start

### Prerequisites
- **Node.js** v18 or higher
- **npm** v9 or higher
- **make** (optional, but recommended)

### Installation & Development

```bash
# Install dependencies
make install

# Start development server
make dev

# Open http://localhost:5173 in your browser
```

---

## Available Make Commands

### Development

#### `make help`
Displays all available commands with descriptions.

```bash
make help
```

#### `make install`
Installs all npm dependencies.

```bash
make install
```

#### `make dev`
Starts the development server with hot module reloading.

```bash
make dev
```

- **Server runs on:** `http://localhost:5173` (or next available port)
- **Features:**
  - Hot Module Replacement (HMR)
  - Fast refresh on file changes
  - Browser auto-opens on start

#### `make build`
Builds the application for production. Includes TypeScript type checking.

```bash
make build
```

**Output:** Optimized bundle in `dist/` directory
- HTML: 481 B (0.32 kB gzipped)
- CSS: 8.8 KB (2.05 kB gzipped)
- JavaScript: 198 KB (62.73 kB gzipped)

#### `make preview`
Builds for production and previews the build locally.

```bash
make preview
```

---

### Code Quality

#### `make type-check`
Runs TypeScript type checking without emitting files.

```bash
make type-check
```

Ensures all TypeScript code is type-safe and catches compilation errors early.

#### `make lint`
Performs linting through TypeScript strict mode checking.

```bash
make lint
```

#### `make format`
Formats code using Prettier (if configured).

```bash
make format
```

**Note:** Prettier configuration can be added to `package.json` or `.prettierrc`

---

### Build & Release

#### `make clean`
Removes build artifacts and cache directories.

```bash
make clean
```

Cleans:
- `dist/` - Production build
- `.vite/` - Vite cache
- `node_modules/.vite/` - Cached dependencies

#### `make release`
Creates a production-ready release build with additional analysis.

```bash
make release
```

**Process:**
1. Cleans previous build
2. Installs dependencies
3. Checks TypeScript types
4. Builds for production
5. Shows build size analysis
6. Displays asset breakdown

**Output:**
```
✓ Release build complete!
Build size:
  123K total

Asset breakdown:
  index-BC4hz4KV.js: 198K
  index-Clz4_Ncv.css: 8.8K
  index.html: 481B

Ready to deploy: dist/
```

#### `make build-analyze`
Builds and shows detailed artifact analysis.

```bash
make build-analyze
```

---

### Git & Version Control

#### `make status`
Shows current git status and uncommitted changes.

```bash
make status
```

#### `make log`
Displays the last 10 commits.

```bash
make log
```

---

### Information & Setup

#### `make info`
Shows comprehensive project information including versions, directories, and scripts.

```bash
make info
```

**Output includes:**
- Project name and type
- Build tool version
- Node/npm versions
- Directory structure
- Key configuration files
- Available npm scripts

#### `make setup`
Complete project setup (install + next steps).

```bash
make setup
```

---

## NPM Scripts (Direct Usage)

If you prefer not to use make, you can run npm scripts directly:

### Development
```bash
npm run dev      # Start dev server
```

### Production
```bash
npm run build    # Build for production
npm run preview  # Preview production build
```

---

## Workflow Examples

### Local Development

1. **Start fresh:**
   ```bash
   make clean
   make install
   make dev
   ```

2. **Code changes:**
   - Edit files in `src/`
   - Changes auto-reload in browser (HMR)
   - Check types: `make type-check`

3. **Test before build:**
   ```bash
   make type-check
   make lint
   ```

### Preparing for Deployment

1. **Create release build:**
   ```bash
   make release
   ```

2. **Verify production build:**
   ```bash
   make preview
   ```

3. **Deploy `dist/` directory:**
   - Upload to web server
   - Or run on Node.js server
   - Or deploy to cloud platform (Vercel, Netlify, etc.)

### Continuous Integration

```bash
# In CI pipeline
make install
make type-check
make build
```

---

## Project Structure

```
.
├── src/                    # Source code
│   ├── App.tsx            # Main application component
│   ├── ConversationList.tsx # Left sidebar component
│   ├── DetailsPanel.tsx    # Right details component
│   ├── types.ts           # TypeScript definitions
│   ├── data.ts            # Mock conversation data
│   ├── index.tsx          # React entry point
│   └── styles.css         # Global styles & design system
├── public/                 # Static assets
│   └── index.html         # Static template
├── dist/                   # Production build (generated)
├── node_modules/          # Dependencies (generated)
├── package.json           # Project metadata & dependencies
├── tsconfig.json          # TypeScript configuration
├── vite.config.ts         # Vite build configuration
├── Makefile               # Make commands
└── USAGE.md               # This file
```

---

## Development Features

### TypeScript
- **Strict Mode:** Full type checking enabled
- **Configuration:** `tsconfig.json`
- **Checking:** `make type-check`

### React
- **Version:** 19.2.7
- **Features:** Hooks, functional components
- **Entry Point:** `src/index.tsx`

### Vite
- **Build Tool:** Ultra-fast bundler
- **Dev Server:** HMR support
- **Config:** `vite.config.ts`

### Styling
- **CSS3** with design tokens
- **No CSS framework** (custom design system)
- **CSS Variables** for theming

---

## Deployment

### Production Build

1. **Generate optimized bundle:**
   ```bash
   make build
   ```

2. **Artifacts in `dist/`:**
   - `index.html` - Main HTML file
   - `assets/` - Bundled JS and CSS

### GitHub Pages Deployment (Recommended)

#### Automatic Deployment (via GitHub Actions)

```bash
# Just commit and push to main
git add .
git commit -m "Your message"
git push origin main

# GitHub Actions automatically:
# 1. Runs type checks
# 2. Builds for GitHub Pages
# 3. Deploys to your GitHub Pages site
# 4. Comments on PRs with status
```

**Site URL:**
```
https://thinh-wee.github.io/w18i.claude-design.lab
```

#### Manual Deployment

```bash
# Build and deploy directly
make deploy-gh-pages

# Or build only (for GitHub Actions):
make deploy-gh-pages-manual
```

**Requirements:**
- Repository is public
- `gh-pages` package installed (included)
- GitHub Pages enabled in Settings

**For detailed setup instructions, see: [DEPLOY_GITHUB_PAGES.md](./DEPLOY_GITHUB_PAGES.md)**

### Deployment Options

#### GitHub Pages (Recommended)
```bash
make deploy-gh-pages
# Automatic via GitHub Actions on push to main
```

#### Static Hosting (Vercel, Netlify)
```bash
make build
# Upload dist/ directory
```

#### Docker Container
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npx", "vite", "preview", "--host"]
```

#### Node.js Server
```bash
npm install -g serve
serve -s dist -l 3000
```

---

## Troubleshooting

### Port Already in Use
```bash
# Dev server will automatically try next port
make dev
# Or specify port
npm run dev -- --port 5174
```

### Build Errors

1. **TypeScript errors:**
   ```bash
   make type-check
   # Fix errors shown
   ```

2. **Clean and rebuild:**
   ```bash
   make clean
   make build
   ```

3. **Dependency issues:**
   ```bash
   rm -rf node_modules package-lock.json
   make install
   ```

### Performance Issues

- Check build size: `make build-analyze`
- Profile bundle: `npm run build --report` (if configured)
- Monitor dev server: Check network tab in browser DevTools

---

## Environment Variables

Create a `.env` file in the root directory:

```bash
# .env
VITE_API_URL=http://localhost:3000
VITE_ENVIRONMENT=development
```

Access in code:
```typescript
const apiUrl = import.meta.env.VITE_API_URL
```

---

## Code Style & Quality

### TypeScript Checking
```bash
make type-check
```

### Format Code
```bash
make format
```

### Pre-commit Hook (Optional)
Create `.git/hooks/pre-commit`:
```bash
#!/bin/bash
make type-check || exit 1
```

---

## Useful Resources

- **React:** https://react.dev
- **TypeScript:** https://www.typescriptlang.org
- **Vite:** https://vitejs.dev
- **Node.js:** https://nodejs.org

---

## Quick Reference

| Command | Purpose |
|---------|---------|
| `make help` | Show all commands |
| `make install` | Install dependencies |
| `make dev` | Start dev server |
| `make build` | Build for production |
| `make preview` | Preview production build |
| `make type-check` | Check TypeScript types |
| `make clean` | Clean build artifacts |
| `make release` | Create release build |
| `make info` | Show project info |
| `make status` | Show git status |
| `make log` | Show recent commits |

---

## Getting Help

### Common Tasks

**"I want to start developing"**
```bash
make install && make dev
```

**"I want to check for errors"**
```bash
make type-check
```

**"I want to deploy"**
```bash
make release
```

**"I want to clean up"**
```bash
make clean
```

**"I want to see what's available"**
```bash
make help
```

---

## License & Support

For issues or questions, refer to the project documentation or create an issue in the repository.

Last Updated: 2026-06-19
