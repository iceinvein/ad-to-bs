#!/bin/bash

# Version bump script for ad-to-bs npm package
# Usage: ./scripts/version.sh [major|minor|patch|<version>]
#
# Examples:
#   ./scripts/version.sh major      # 0.1.0 → 1.0.0
#   ./scripts/version.sh minor      # 0.1.0 → 0.2.0
#   ./scripts/version.sh patch      # 0.1.0 → 0.1.1
#   ./scripts/version.sh 0.2.0      # 0.1.0 → 0.2.0

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Helper functions
log_info() {
  echo -e "${BLUE}$1${NC}"
}

log_success() {
  echo -e "${GREEN}$1${NC}"
}

log_warning() {
  echo -e "${YELLOW}$1${NC}"
}

log_error() {
  echo -e "${RED}$1${NC}"
}

log_cyan() {
  echo -e "${CYAN}$1${NC}"
}

# Parse version string
parse_version() {
  local version=$1
  if [[ ! $version =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
    log_error "Invalid version format: $version. Expected: major.minor.patch"
    exit 1
  fi
  echo "$version"
}

# Bump version
bump_version() {
  local current=$1
  local bump_type=$2

  # Parse current version
  local major=$(echo "$current" | cut -d. -f1)
  local minor=$(echo "$current" | cut -d. -f2)
  local patch=$(echo "$current" | cut -d. -f3)

  case "$bump_type" in
    major)
      echo "$((major + 1)).0.0"
      ;;
    minor)
      echo "$major.$((minor + 1)).0"
      ;;
    patch)
      echo "$major.$minor.$((patch + 1))"
      ;;
    *)
      # Assume it's a specific version
      parse_version "$bump_type"
      ;;
  esac
}

# Main script
if [ $# -eq 0 ]; then
  echo ""
  log_cyan "📦 Version Bump Script"
  echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
  echo ""
  log_info "Usage: ./scripts/version.sh [major|minor|patch|<version>]"
  echo ""
  log_info "Examples:"
  log_warning "  ./scripts/version.sh major      # 0.1.0 → 1.0.0"
  log_warning "  ./scripts/version.sh minor      # 0.1.0 → 0.2.0"
  log_warning "  ./scripts/version.sh patch      # 0.1.0 → 0.1.1"
  log_warning "  ./scripts/version.sh 0.2.0      # 0.1.0 → 0.2.0"
  echo ""
  log_info "Semantic Versioning:"
  log_warning "  MAJOR - Breaking changes (1.0.0)"
  log_warning "  MINOR - New features (0.1.0)"
  log_warning "  PATCH - Bug fixes (0.0.1)"
  echo ""
  exit 0
fi

BUMP_TYPE=$1

# Read current version from package.json
if [ ! -f "package.json" ]; then
  log_error "package.json not found"
  exit 1
fi

CURRENT_VERSION=$(grep '"version"' package.json | head -1 | sed 's/.*"version": "\(.*\)".*/\1/')

echo ""
log_cyan "📦 Current version: $CURRENT_VERSION"

# Calculate new version
NEW_VERSION=$(bump_version "$CURRENT_VERSION" "$BUMP_TYPE")

if [ "$NEW_VERSION" = "$CURRENT_VERSION" ]; then
  log_warning "⚠ Version unchanged: $CURRENT_VERSION"
  exit 0
fi

log_success "📈 New version: $NEW_VERSION"

# Update package.json using sed
if [[ "$OSTYPE" == "darwin"* ]]; then
  # macOS
  sed -i '' "s/\"version\": \"$CURRENT_VERSION\"/\"version\": \"$NEW_VERSION\"/" package.json
else
  # Linux
  sed -i "s/\"version\": \"$CURRENT_VERSION\"/\"version\": \"$NEW_VERSION\"/" package.json
fi

log_success "✓ Updated package.json"

# Update package-lock.json if it exists
if [ -f "package-lock.json" ]; then
  if [[ "$OSTYPE" == "darwin"* ]]; then
    sed -i '' "s/\"version\": \"$CURRENT_VERSION\"/\"version\": \"$NEW_VERSION\"/" package-lock.json
  else
    sed -i "s/\"version\": \"$CURRENT_VERSION\"/\"version\": \"$NEW_VERSION\"/" package-lock.json
  fi
  log_success "✓ Updated package-lock.json"
fi

# Check for bun.lock
if [ -f "bun.lock" ]; then
  log_success "✓ bun.lock exists (auto-updated by Bun)"
fi

echo ""
log_success "✨ Version bumped successfully!"
echo ""
log_info "📝 Next steps:"
log_warning "  1. Review changes: git diff"
log_warning "  2. Commit: git add . && git commit -m \"chore: bump version to $NEW_VERSION\""
log_warning "  3. Publish: bun run publish"
echo ""

