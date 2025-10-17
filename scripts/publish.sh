#!/bin/bash

# Publish script for ad-to-bs npm package
# Usage: ./scripts/publish.sh [--dry-run] [--skip-tests]

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Parse arguments
DRY_RUN=false
SKIP_TESTS=false

for arg in "$@"; do
  case $arg in
    --dry-run)
      DRY_RUN=true
      shift
      ;;
    --skip-tests)
      SKIP_TESTS=true
      shift
      ;;
    *)
      echo "Unknown option: $arg"
      exit 1
      ;;
  esac
done

# Helper functions
log_info() {
  echo -e "${BLUE}▶ $1${NC}"
}

log_success() {
  echo -e "${GREEN}✓ $1${NC}"
}

log_warning() {
  echo -e "${YELLOW}⚠ $1${NC}"
}

log_error() {
  echo -e "${RED}✗ $1${NC}"
}

run_command() {
  local cmd=$1
  local description=$2
  
  log_info "$description..."
  if eval "$cmd" > /dev/null 2>&1; then
    log_success "$description"
    return 0
  else
    log_error "$description failed"
    return 1
  fi
}

# Main script
echo ""
log_info "Starting publish process..."
echo ""

# Step 1: Check if git is clean
if git status --porcelain | grep -q .; then
  log_warning "Git working directory is not clean"
  echo "Uncommitted changes:"
  git status --short
  read -p "Continue with publish? (y/n): " -n 1 -r
  echo
  if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    log_warning "Publish cancelled"
    exit 0
  fi
fi

# Step 2: Build
if ! run_command "bun run build" "Building package"; then
  exit 1
fi

# Step 3: Run tests
if [ "$SKIP_TESTS" = false ]; then
  if ! run_command "bun run test:run" "Running tests"; then
    exit 1
  fi
else
  log_warning "Skipping tests"
fi

# Step 4: Lint
if ! run_command "bun run lint" "Linting code"; then
  log_warning "Linting failed, but continuing..."
fi

# Step 5: Check package.json
echo ""
log_info "Package Information:"
NAME=$(grep '"name"' package.json | head -1 | sed 's/.*"name": "\(.*\)".*/\1/')
VERSION=$(grep '"version"' package.json | head -1 | sed 's/.*"version": "\(.*\)".*/\1/')
DESCRIPTION=$(grep '"description"' package.json | head -1 | sed 's/.*"description": "\(.*\)".*/\1/')

echo -e "${GREEN}  Name: $NAME${NC}"
echo -e "${GREEN}  Version: $VERSION${NC}"
echo -e "${GREEN}  Description: $DESCRIPTION${NC}"

# Step 6: Publish
echo ""
if [ "$DRY_RUN" = true ]; then
  if ! run_command "npm publish --dry-run" "Publishing (dry-run)"; then
    exit 1
  fi
else
  if ! run_command "npm publish" "Publishing to npm"; then
    exit 1
  fi
fi

# Step 7: Create git tag (if not dry-run)
if [ "$DRY_RUN" = false ]; then
  TAG_NAME="v$VERSION"
  if git tag "$TAG_NAME" 2>/dev/null; then
    log_success "Created git tag: $TAG_NAME"
    echo -e "${BLUE}💡 Push tag with: git push origin $TAG_NAME${NC}"
  else
    log_warning "Could not create git tag (may already exist)"
  fi
fi

echo ""
log_success "Publish process completed!"
if [ "$DRY_RUN" = true ]; then
  log_warning "(This was a dry-run, no changes were published)"
fi
echo ""

