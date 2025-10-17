# Complete Publish Guide for ad-to-bs

## Overview

This project includes automated publish scripts for Bun. Choose your preferred method below.

## 🚀 Quick Publish (Recommended)

### One-Command Publish

```bash
# 1. Update version in package.json
# 2. Commit changes
git add .
git commit -m "chore: bump version to 0.2.0"

# 3. Publish (all-in-one)
bun run publish
```

Done! The script automatically:
- ✅ Builds the package
- ✅ Runs all tests
- ✅ Lints code
- ✅ Publishes to npm
- ✅ Creates git tag

### Test First (Recommended)

```bash
# Test the publish process without uploading
bun run publish:dry

# If successful, publish for real
bun run publish
```

## 📋 Available Publish Methods

### Method 1: npm Scripts (Easiest)

```bash
# Dry-run (test without uploading)
bun run publish:dry

# Actual publish
bun run publish
```

**Pros:** Simple, one command
**Cons:** Less control

### Method 2: Bun Script (Advanced)

```bash
# Dry-run
bun scripts/publish.ts --dry-run

# Publish
bun scripts/publish.ts

# Skip tests (not recommended)
bun scripts/publish.ts --skip-tests
```

**Pros:** More control, better error messages
**Cons:** Requires Bun

### Method 3: Shell Script (Universal)

```bash
# Make executable (first time only)
chmod +x scripts/publish.sh

# Dry-run
./scripts/publish.sh --dry-run

# Publish
./scripts/publish.sh

# Skip tests
./scripts/publish.sh --skip-tests
```

**Pros:** Works everywhere, no Bun required
**Cons:** Shell-specific

### Method 4: Manual (Full Control)

```bash
# 1. Build
bun run build

# 2. Test
bun run test:run

# 3. Lint
bun run lint

# 4. Publish
npm publish

# 5. Tag
git tag v0.2.0
git push origin v0.2.0
```

**Pros:** Full control
**Cons:** More steps

## 📝 Pre-Publish Checklist

Before publishing, verify:

- [ ] **Version updated**: Check `package.json` version
- [ ] **Tests pass**: `bun run test:run`
- [ ] **Code lints**: `bun run lint`
- [ ] **Build succeeds**: `bun run build`
- [ ] **Git clean**: `git status` shows no uncommitted changes
- [ ] **npm logged in**: `npm whoami`
- [ ] **CHANGELOG updated** (if applicable)

## 🔄 Typical Workflow

### 1. Make Changes
```bash
# Edit source files
# Add tests
# Update documentation
```

### 2. Test Locally
```bash
bun run test:run
bun run lint
bun run build
```

### 3. Commit
```bash
git add .
git commit -m "feat: add new feature"
```

### 4. Update Version
Edit `package.json`:
```json
{
  "version": "0.2.0"
}
```

### 5. Commit Version Bump
```bash
git add package.json
git commit -m "chore: bump version to 0.2.0"
```

### 6. Dry-Run Publish
```bash
bun run publish:dry
```

### 7. Publish
```bash
bun run publish
```

### 8. Verify
- Check https://www.npmjs.com/package/ad-to-bs
- Verify version is listed
- Test installation: `npm install ad-to-bs@0.2.0`

## 🔐 Authentication

### Login to npm
```bash
npm login
```

### Verify Login
```bash
npm whoami
```

### Using npm Token (CI/CD)
```bash
# Set token in environment
export NPM_TOKEN=your_token_here

# Or in .npmrc
echo "//registry.npmjs.org/:_authToken=your_token_here" > ~/.npmrc
```

## 📦 Version Management

Follow [Semantic Versioning](https://semver.org/):

| Version | When to Use | Example |
|---------|-------------|---------|
| MAJOR | Breaking changes | 1.0.0 → 2.0.0 |
| MINOR | New features | 1.0.0 → 1.1.0 |
| PATCH | Bug fixes | 1.0.0 → 1.0.1 |

## ✅ What Each Script Does

### `bun run publish:dry`
- Builds package
- Runs tests
- Lints code
- **Simulates** npm publish (no upload)
- Shows what would be published

### `bun run publish`
- Builds package
- Runs tests
- Lints code
- **Publishes** to npm
- Creates git tag
- Suggests pushing tag

### `bun scripts/publish.ts`
- Same as above
- More detailed output
- Better error messages
- Supports `--dry-run` and `--skip-tests`

### `./scripts/publish.sh`
- Same as above
- Shell script version
- Works on macOS, Linux, Windows (Git Bash)

## 🐛 Troubleshooting

### "npm ERR! 403 Forbidden"
```bash
# Check login
npm whoami

# Re-login if needed
npm logout
npm login
```

### "npm ERR! 404 Not Found"
```bash
# Check package name in package.json
grep '"name"' package.json

# Verify dist/ is in files array
grep -A 2 '"files"' package.json
```

### Tests Fail During Publish
```bash
# Run tests locally to debug
bun run test:run

# Fix issues
# Retry publish
bun run publish:dry
```

### Git Tag Already Exists
```bash
# Delete old tag
git tag -d v0.1.0

# Or use different version
```

### Script Not Found
```bash
# Ensure you're in project root
cd /path/to/ad-to-bs

# Try with explicit path
bun ./scripts/publish.ts
```

## 📚 Additional Resources

- [npm Publishing Docs](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry)
- [Semantic Versioning](https://semver.org/)
- [npm CLI Reference](https://docs.npmjs.com/cli)
- [Bun Documentation](https://bun.sh)

## 🎯 Quick Reference

```bash
# Most common commands
bun run publish:dry      # Test publish
bun run publish          # Publish to npm
bun run test:run         # Run tests
bun run build            # Build package
bun run lint             # Lint code
```

## 📞 Support

For issues:
1. Check [PUBLISHING.md](./PUBLISHING.md) for detailed guide
2. Check [SCRIPTS.md](./SCRIPTS.md) for script documentation
3. Review troubleshooting section above
4. Check npm documentation

