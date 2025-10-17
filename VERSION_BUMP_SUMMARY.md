# Version Bump Scripts - Summary

Complete automated version bumping system for semantic versioning.

## 🚀 Quick Start

### One-Command Version Bump

```bash
# Bump patch version (0.1.0 → 0.1.1)
bun run version:patch

# Bump minor version (0.1.0 → 0.2.0)
bun run version:minor

# Bump major version (0.1.0 → 1.0.0)
bun run version:major
```

## 📁 Scripts Created

### `scripts/version.ts` (Bun Script)
- 200+ lines
- Advanced features
- Better error messages
- Supports custom versions

### `scripts/version.sh` (Shell Script)
- 150+ lines
- Universal compatibility
- Works on macOS, Linux, Windows (Git Bash)
- Same features as Bun script

## 📝 npm Scripts Added

```json
{
  "scripts": {
    "version:major": "bun scripts/version.ts major",
    "version:minor": "bun scripts/version.ts minor",
    "version:patch": "bun scripts/version.ts patch",
    "version": "bun scripts/version.ts"
  }
}
```

## 🎯 Available Commands

### Using npm Scripts (Easiest)
```bash
bun run version:major    # Bump major
bun run version:minor    # Bump minor
bun run version:patch    # Bump patch
bun run version          # Show help
```

### Using Bun Script (Advanced)
```bash
bun scripts/version.ts major
bun scripts/version.ts minor
bun scripts/version.ts patch
bun scripts/version.ts 0.2.0    # Custom version
bun scripts/version.ts          # Show help
```

### Using Shell Script (Universal)
```bash
./scripts/version.sh major
./scripts/version.sh minor
./scripts/version.sh patch
./scripts/version.sh 0.2.0      # Custom version
./scripts/version.sh            # Show help
```

## ✨ Features

✅ **Semantic Versioning**
- MAJOR for breaking changes
- MINOR for new features
- PATCH for bug fixes

✅ **Automatic Updates**
- Updates `package.json`
- Updates `package-lock.json` (if exists)
- Auto-updates `bun.lock`

✅ **User-Friendly**
- Colored output
- Clear progress messages
- Helpful next steps
- Error handling

✅ **Flexible**
- Bump by type (major/minor/patch)
- Set custom version
- Works with Bun and npm

## 📋 Typical Workflow

```bash
# 1. Make changes
git add .
git commit -m "feat: add new feature"

# 2. Bump version
bun run version:minor

# 3. Review changes
git diff

# 4. Commit version bump
git add . && git commit -m "chore: bump version to 0.2.0"

# 5. Publish
bun run publish
```

## 📊 Semantic Versioning Guide

| Version | When to Use | Example |
|---------|-------------|---------|
| **MAJOR** | Breaking changes | 0.1.0 → 1.0.0 |
| **MINOR** | New features | 0.1.0 → 0.2.0 |
| **PATCH** | Bug fixes | 0.1.0 → 0.1.1 |

## 🔄 Complete Release Workflow

```bash
# 1. Develop and test
bun run test:run
bun run lint

# 2. Commit changes
git add .
git commit -m "feat: add feature"

# 3. Bump version
bun run version:minor

# 4. Verify
git diff

# 5. Commit version
git add . && git commit -m "chore: bump version"

# 6. Publish
bun run publish

# 7. Verify on npm
# Visit: https://www.npmjs.com/package/ad-to-bs
```

## 📚 Documentation

- **VERSION_BUMP.md** - Detailed version bump guide
- **PUBLISH_GUIDE.md** - Publishing guide
- **QUICK_START.md** - Quick reference
- **SCRIPTS.md** - All scripts documentation

## 🧪 Testing the Script

### Test Help
```bash
bun scripts/version.ts
# Shows usage and examples
```

### Test Patch Bump
```bash
bun scripts/version.ts patch
# 0.1.0 → 0.1.1
```

### Test Custom Version
```bash
bun scripts/version.ts 0.2.0
# 0.1.0 → 0.2.0
```

## 📦 What Gets Updated

The script automatically updates:

1. **package.json**
   - Main version field
   - Preserves formatting

2. **package-lock.json** (if exists)
   - Version field
   - Preserves structure

3. **bun.lock**
   - Auto-updated by Bun
   - No manual action needed

## 🎓 Examples

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

## 🐛 Troubleshooting

### Script Not Found
```bash
# Ensure you're in project root
cd /path/to/ad-to-bs

# Try with explicit path
bun ./scripts/version.ts patch
```

### Permission Denied
```bash
# Make shell script executable
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

## 🔗 Integration

### With Publish Script
```bash
# 1. Bump version
bun run version:minor

# 2. Publish (includes build, test, lint)
bun run publish
```

### With Git
```bash
# Version bump automatically updates files
# Commit the changes
git add .
git commit -m "chore: bump version to 0.2.0"

# Publish creates git tag
bun run publish
```

## 📞 Quick Reference

```bash
# Show help
bun run version

# Bump patch (0.1.0 → 0.1.1)
bun run version:patch

# Bump minor (0.1.0 → 0.2.0)
bun run version:minor

# Bump major (0.1.0 → 1.0.0)
bun run version:major

# Set custom version
bun scripts/version.ts 0.2.0

# Review changes
git diff

# Commit
git add . && git commit -m "chore: bump version"

# Publish
bun run publish
```

## 📖 See Also

- [VERSION_BUMP.md](./VERSION_BUMP.md) - Detailed guide
- [PUBLISH_GUIDE.md](./PUBLISH_GUIDE.md) - Publishing guide
- [QUICK_START.md](./QUICK_START.md) - Quick reference
- [SCRIPTS.md](./SCRIPTS.md) - All scripts
- [semver.org](https://semver.org/) - Semantic versioning

---

**Ready to bump version?**
```bash
bun run version:patch
```

