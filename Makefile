.PHONY: help install dev build preview clean lint type-check format test release

# Color output
CYAN := \033[0;36m
GREEN := \033[0;32m
YELLOW := \033[0;33m
RED := \033[0;31m
NC := \033[0m # No Color

help:
	@echo "$(CYAN)╔════════════════════════════════════════════════════════════════╗$(NC)"
	@echo "$(CYAN)║  Bankaool Conversation Monitoring System - Makefile              ║$(NC)"
	@echo "$(CYAN)╚════════════════════════════════════════════════════════════════╝$(NC)"
	@echo ""
	@echo "$(GREEN)Development Commands:$(NC)"
	@echo "  $(CYAN)make install$(NC)              Install dependencies"
	@echo "  $(CYAN)make dev$(NC)                  Start development server (port 5173/5174)"
	@echo "  $(CYAN)make build$(NC)                Build for production"
	@echo "  $(CYAN)make preview$(NC)              Preview production build locally"
	@echo "  $(CYAN)make clean$(NC)                Clean build artifacts and caches"
	@echo ""
	@echo "$(GREEN)Code Quality:$(NC)"
	@echo "  $(CYAN)make type-check$(NC)           Check TypeScript types"
	@echo "  $(CYAN)make format$(NC)               Format code with Prettier (if configured)"
	@echo "  $(CYAN)make lint$(NC)                 Lint TypeScript files"
	@echo ""
	@echo "$(GREEN)Git & Release:$(NC)"
	@echo "  $(CYAN)make status$(NC)               Show git status"
	@echo "  $(CYAN)make log$(NC)                  Show recent commits"
	@echo "  $(CYAN)make release$(NC)              Create a release build"
	@echo ""
	@echo "$(GREEN)GitHub Pages Deployment:$(NC)"
	@echo "  $(CYAN)make deploy-gh-pages$(NC)      Deploy to GitHub Pages"
	@echo "  $(CYAN)make deploy-gh-pages-manual$(NC) Build for GitHub Pages"
	@echo ""
	@echo "$(GREEN)Information:$(NC)"
	@echo "  $(CYAN)make help$(NC)                 Show this help message"
	@echo "  $(CYAN)make info$(NC)                 Show project information"
	@echo ""

# Installation
install:
	@echo "$(CYAN)Installing dependencies...$(NC)"
	npm install
	@echo "$(GREEN)✓ Dependencies installed$(NC)"

# Development
dev:
	@echo "$(CYAN)Starting development server...$(NC)"
	@echo "$(YELLOW)Server will be available at: http://localhost:5173$(NC)"
	npm run dev

# Build
build: type-check
	@echo "$(CYAN)Building for production...$(NC)"
	npm run build
	@echo "$(GREEN)✓ Production build complete$(NC)"
	@echo "$(YELLOW)Output: dist/$(NC)"

preview: build
	@echo "$(CYAN)Previewing production build...$(NC)"
	npm run preview

# TypeScript
type-check:
	@echo "$(CYAN)Checking TypeScript types...$(NC)"
	npx tsc --noEmit
	@echo "$(GREEN)✓ No type errors$(NC)"

# Linting (using TypeScript compiler in strict mode)
lint: type-check
	@echo "$(CYAN)Type checking complete (linting via TypeScript)$(NC)"
	@echo "$(GREEN)✓ Code quality check passed$(NC)"

# Format (if prettier is installed)
format:
	@echo "$(CYAN)Formatting code...$(NC)"
	@if command -v npx > /dev/null; then \
		npx prettier --write "src/**/*.{ts,tsx,css}" 2>/dev/null || echo "$(YELLOW)Note: Prettier not configured$(NC)"; \
	else \
		echo "$(YELLOW)Note: Prettier not available$(NC)"; \
	fi

# Clean
clean:
	@echo "$(CYAN)Cleaning build artifacts...$(NC)"
	@rm -rf dist
	@rm -rf .vite
	@rm -rf node_modules/.vite
	@echo "$(GREEN)✓ Clean complete$(NC)"

# Git operations
status:
	@echo "$(CYAN)Git status:$(NC)"
	@git status

log:
	@echo "$(CYAN)Recent commits:$(NC)"
	@git log --oneline -n 10

# Release build with additional checks
release: clean install type-check
	@echo "$(CYAN)Creating release build...$(NC)"
	@npm run build
	@echo ""
	@echo "$(GREEN)✓ Release build complete!$(NC)"
	@echo "$(YELLOW)Build size:$(NC)"
	@du -sh dist/ | awk '{print "  " $$1 " total"}'
	@echo ""
	@echo "$(YELLOW)Asset breakdown:$(NC)"
	@ls -lh dist/assets/ | tail -n +2 | awk '{print "  " $$9 ": " $$5}'
	@echo ""
	@echo "$(GREEN)Ready to deploy: dist/$(NC)"

# Project info
info:
	@echo "$(CYAN)╔════════════════════════════════════════════════════════════════╗$(NC)"
	@echo "$(CYAN)║            Project Information                                  ║$(NC)"
	@echo "$(CYAN)╚════════════════════════════════════════════════════════════════╝$(NC)"
	@echo ""
	@echo "$(GREEN)Project:$(NC)           Bankaool Conversation Monitoring System"
	@echo "$(GREEN)Type:$(NC)              React + TypeScript Web Application"
	@echo "$(GREEN)Build Tool:$(NC)        Vite 5"
	@echo "$(GREEN)Node Version:$(NC)      $$(node --version)"
	@echo "$(GREEN)NPM Version:$(NC)       $$(npm --version)"
	@echo ""
	@echo "$(GREEN)Directories:$(NC)"
	@echo "  src/              Source code"
	@echo "  dist/             Production build (generated)"
	@echo "  public/           Static assets"
	@echo ""
	@echo "$(GREEN)Key Files:$(NC)"
	@echo "  package.json      Project dependencies"
	@echo "  tsconfig.json     TypeScript configuration"
	@echo "  vite.config.ts    Vite build configuration"
	@echo "  src/App.tsx       Main application component"
	@echo ""
	@echo "$(GREEN)Scripts:$(NC)"
	@npm run --list 2>/dev/null | grep -E "dev|build|preview" || echo "  See package.json for scripts"
	@echo ""

# Development server on specific port
dev-port:
	@echo "$(CYAN)Starting development server...$(NC)"
	@echo "$(YELLOW)Available at: http://localhost:5173$(NC)"
	npm run dev -- --port 5173

# Build with size analysis
build-analyze: build
	@echo ""
	@echo "$(CYAN)Build artifacts:$(NC)"
	@find dist -type f -exec ls -lh {} + | awk '{print "  " $$9 ": " $$5}' | sort -k3 -hr

# GitHub Pages deployment
deploy-gh-pages:
	@echo "$(CYAN)Building for GitHub Pages...$(NC)"
	@GITHUB_PAGES=true npm run build
	@echo "$(GREEN)✓ Build complete$(NC)"
	@echo ""
	@echo "$(CYAN)Deploying to GitHub Pages...$(NC)"
	@npm run deploy
	@echo "$(GREEN)✓ Deployment complete!$(NC)"
	@echo "$(YELLOW)Your site is available at:$(NC)"
	@echo "  https://thinh-wee.github.io/w18i.claude-design.lab"

deploy-gh-pages-manual: build
	@echo "$(CYAN)Building for GitHub Pages (manual mode)...$(NC)"
	@GITHUB_PAGES=true npm run build
	@echo "$(GREEN)✓ Ready to deploy$(NC)"
	@echo "$(YELLOW)Next step: Commit and push to main branch$(NC)"
	@echo "$(YELLOW)GitHub Actions will automatically deploy$(NC)"

# Watch mode (if needed)
watch:
	@echo "$(CYAN)Watching for changes...$(NC)"
	@npm run dev

# Install and setup
setup: install
	@echo "$(GREEN)✓ Project setup complete$(NC)"
	@echo "$(YELLOW)Next steps:$(NC)"
	@echo "  1. Run 'make dev' to start the development server"
	@echo "  2. Open http://localhost:5173 in your browser"
	@echo "  3. Run 'make build' when ready for production"

.DEFAULT_GOAL := help
