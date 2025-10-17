# Version Bump Guide

Automated version bumping for semantic versioning.

## Quick Start

### Using npm Scripts (Easiest)

```bash
# Bump patch version (0.1.0 → 0.1.1)
bun run version:patch

# Bump minor version (0.1.0 → 0.2.0)
bun run version:minor

# Bump major version (0.1.0 → 1.0.0)
bun run version:major

# Show help
bun run version
```

### Using Bun Script (Advanced)

```bash
# Bump patch
bun scripts/version.ts patch

# Bump minor
bun scripts/version.ts minor

# Bump major
bun scripts/version.ts major

# Set specific version
bun scripts/version.ts 0.2.0

# Show help
bun scripts/version.ts
```

### Using Shell Script (Universal)

```bash
# Bump patch
./scripts/version.sh patch

# Bump minor
./scripts/version.sh minor

# Bump major
./scripts/version.sh major

# Set specific version
./scripts/version.sh 0.2.0

# Show help
./scripts/version.sh
```

## Semantic Versioning

Follow [semver.org](https://semver.org/):

| Version | When to Use | Example |
|---------|-------------|---------|
| **MAJOR** | Breaking changes | 0.1.0 → 1.0.0 |
| **MINOR** | New features | 0.1.0 → 0.2.0 |
| **PATCH** | Bug fixes | 0.1.0 → 0.1.1 |

## Available Commands

### npm Scripts

```bash
bun run version:major    # Bump major version
bun run version:minor    # Bump minor version
bun run version:patch    # Bump patch version
bun run version          # Show help
```

### Bun Script

```bash
bun scripts/version.ts major
bun scripts/version.ts minor
bun scripts/version.ts patch
bun scripts/version.ts 0.2.0
bun scripts/version.ts
```

### Shell Script

```bash
./scripts/version.sh major
./scripts/version.sh minor
./scripts/version.sh patch
./scripts/version.sh 0.2.0
./scripts/version.sh
```

## What It Does

The version bump script:

1. ✅ Reads current version from `package.json`
2. ✅ Calculates new version based on bump type
3. ✅ Updates `package.json`
4. ✅ Updates `package-lock.json` (if exists)
5. ✅ Displays next steps

## Typical Workflow

### Step 1: Make Changes
```bash
# Edit source files
# Add tests
# Update documentation
```

### Step 2: Test Locally
```bash
bun run test:run
bun run lint
bun run build
```

### Step 3: Commit Changes
```bash
git add .
git commit -m "feat: add new feature"
```

### Step 4: Bump Version
```bash
# Choose appropriate bump type
bun run version:minor
```

### Step 5: Review Changes
```bash
git diff
```

### Step 6: Commit Version Bump
```bash
git add .
git commit -m "chore: bump version to 0.2.0"
```

### Step 7: Publish
```bash
bun run publish
```

## Examples

### Patch Release (Bug Fix)
```bash
# Current: 0.1.0
bun run version:patch
# Result: 0.1.1

git add . && git commit -m "chore: bump version to 0.1.1"
bun run publish
```

### Minor Release (New Feature)
```bash
# Current: 0.1.0
bun run version:minor
# Result: 0.2.0

git add . && git commit -m "chore: bump version to 0.2.0"
bun run publish
```

### Major Release (Breaking Change)
```bash
# Current: 0.1.0
bun run version:major
# Result: 1.0.0

git add . && git commit -m "chore: bump version to 1.0.0"
bun run publish
```

### Custom Version
```bash
# Set specific version
bun scripts/version.ts 2.0.0

git add . && git commit -m "chore: bump version to 2.0.0"
bun run publish
```

## Files Updated

The script automatically updates:

- ✅ `package.json` - Main version field
- ✅ `package-lock.json` - If exists
- ✅ `bun.lock` - Auto-updated by Bun

## Output Example

```
📦 Current version: 0.1.0
📈 New version: 0.2.0
✓ Updated package.json

✨ Version bumped successfully!

📝 Next steps:
  1. Review changes: git diff
  2. Commit: git add . && git commit -m "chore: bump version to 0.2.0"
  3. Publish: bun run publish
```

## Troubleshooting

### Script Not Found
```bash
# Ensure you're in project root
cd /path/to/ad-to-bs

# Try with explicit path
bun ./scripts/version.ts patch
```

### Permission Denied (Shell Script)
```bash
# Make script executable
chmod +x scripts/version.sh

# Then run
./scripts/version.sh patch
```

### Invalid Version Format
```bash
# Correct format: major.minor.patch
bun scripts/version.ts 0.2.0  # ✓ Correct
bun scripts/version.ts 0.2    # ✗ Wrong
```

### package.json Not Found
```bash
# Ensure you're in project root
pwd
# Should show: /path/to/ad-to-bs
```

## Integration with Publish

The version bump script works seamlessly with the publish script:

```bash
# 1. Bump version
bun run version:minor

# 2. Commit
git add . && git commit -m "chore: bump version"

# 3. Publish (includes build, test, lint)
bun run publish
```

## Best Practices

1. **Always test before bumping**
   ```bash
   bun run test:run
   bun run lint
   ```

2. **Commit changes before bumping**
   ```bash
   git add .
   git commit -m "feat: add feature"
   ```

3. **Review version bump**
   ```bash
   git diff
   ```

4. **Use semantic versioning**
   - MAJOR for breaking changes
   - MINOR for new features
   - PATCH for bug fixes

5. **Publish after bumping**
   ```bash
   bun run publish
   ```

## Scripts Reference

### `scripts/version.ts`
Bun-based version bump script.
- Advanced features
- Better error messages
- Supports custom versions

### `scripts/version.sh`
Shell script version.
- Universal compatibility
- Works on macOS, Linux, Windows (Git Bash)
- Same features as Bun script

## See Also

- [PUBLISH_GUIDE.md](./PUBLISH_GUIDE.md) - Publishing guide
- [QUICK_START.md](./QUICK_START.md) - Quick reference
- [SCRIPTS.md](./SCRIPTS.md) - All scripts documentation
- [semver.org](https://semver.org/) - Semantic versioning spec

