# Complete Release Workflow

End-to-end guide for developing, versioning, and publishing releases.

## 🎯 Overview

This guide covers the complete workflow from development to npm publication using automated scripts.

## 📋 Pre-Release Checklist

Before starting a release:

- [ ] All features implemented
- [ ] Tests passing: `bun run test:run`
- [ ] Code linted: `bun run lint`
- [ ] Build succeeds: `bun run build`
- [ ] Documentation updated
- [ ] CHANGELOG updated (if applicable)
- [ ] Git working directory clean

## 🚀 Step-by-Step Release Process

### Step 1: Develop & Test

```bash
# Make changes
# Add tests
# Update documentation

# Test locally
bun run test:run
bun run lint
bun run build
```

### Step 2: Commit Changes

```bash
git add .
git commit -m "feat: add new feature"
```

### Step 3: Bump Version

Choose the appropriate version bump:

```bash
# For bug fixes
bun run version:patch

# For new features
bun run version:minor

# For breaking changes
bun run version:major
```

### Step 4: Review Changes

```bash
git diff
```

### Step 5: Commit Version Bump

```bash
git add .
git commit -m "chore: bump version to X.Y.Z"
```

### Step 6: Test Publish (Optional but Recommended)

```bash
bun run publish:dry
```

### Step 7: Publish to npm

```bash
bun run publish
```

### Step 8: Verify

Visit: https://www.npmjs.com/package/ad-to-bs

## 🔄 Quick Release (All Steps)

```bash
# 1. Make changes and test
bun run test:run && bun run lint

# 2. Commit changes
git add . && git commit -m "feat: add feature"

# 3. Bump version
bun run version:minor

# 4. Commit version
git add . && git commit -m "chore: bump version"

# 5. Publish
bun run publish
```

## 📊 Version Bump Decision Tree

```
Is this a breaking change?
├─ YES → bun run version:major (1.0.0)
└─ NO
   ├─ Are there new features?
   │  ├─ YES → bun run version:minor (0.1.0)
   │  └─ NO → bun run version:patch (0.0.1)
```

## 🎓 Release Examples

### Example 1: Bug Fix Release

```bash
# Current version: 0.1.0

# 1. Fix bug
# 2. Test
bun run test:run

# 3. Commit
git add . && git commit -m "fix: resolve issue with conversion"

# 4. Bump patch
bun run version:patch
# Result: 0.1.1

# 5. Commit version
git add . && git commit -m "chore: bump version to 0.1.1"

# 6. Publish
bun run publish
```

### Example 2: Feature Release

```bash
# Current version: 0.1.0

# 1. Add feature
# 2. Add tests
# 3. Test
bun run test:run

# 4. Commit
git add . && git commit -m "feat: add date validation"

# 5. Bump minor
bun run version:minor
# Result: 0.2.0

# 6. Commit version
git add . && git commit -m "chore: bump version to 0.2.0"

# 7. Publish
bun run publish
```

### Example 3: Major Release

```bash
# Current version: 0.1.0

# 1. Make breaking changes
# 2. Update tests
# 3. Update documentation
# 4. Test
bun run test:run

# 5. Commit
git add . && git commit -m "feat!: change API structure"

# 6. Bump major
bun run version:major
# Result: 1.0.0

# 7. Commit version
git add . && git commit -m "chore: bump version to 1.0.0"

# 8. Publish
bun run publish
```

## 📚 Available Scripts

### Version Management
```bash
bun run version:major    # Bump major version
bun run version:minor    # Bump minor version
bun run version:patch    # Bump patch version
bun run version          # Show version help
```

### Development
```bash
bun run build            # Build package
bun run test             # Run tests (watch mode)
bun run test:run         # Run tests once
bun run lint             # Lint and format code
```

### Publishing
```bash
bun run publish:dry      # Test publish
bun run publish          # Publish to npm
```

## 🔐 Authentication

### Login to npm

```bash
npm login
npm whoami  # Verify
```

### Using npm Token (CI/CD)

```bash
export NPM_TOKEN=your_token_here
```

## 📝 Commit Message Conventions

Use conventional commits:

```bash
# Features
git commit -m "feat: add new feature"

# Bug fixes
git commit -m "fix: resolve issue"

# Breaking changes
git commit -m "feat!: breaking change"

# Version bumps
git commit -m "chore: bump version to 0.2.0"

# Documentation
git commit -m "docs: update README"

# Tests
git commit -m "test: add test cases"
```

## 🎯 Semantic Versioning

```
MAJOR.MINOR.PATCH

MAJOR - Breaking changes (1.0.0)
MINOR - New features (0.1.0)
PATCH - Bug fixes (0.0.1)
```

## 🐛 Troubleshooting

### Tests Fail
```bash
bun run test:run
# Fix issues, then retry
```

### Build Fails
```bash
bun run build
# Check TypeScript errors
```

### Lint Fails
```bash
bun run lint
# Auto-fixes most issues
```

### Publish Fails
```bash
# Check npm login
npm whoami

# Re-login if needed
npm login

# Retry
bun run publish
```

## 📊 Release Checklist

Before publishing:

- [ ] All tests pass
- [ ] Code lints successfully
- [ ] Build succeeds
- [ ] Version bumped correctly
- [ ] Changes committed
- [ ] Dry-run successful
- [ ] npm logged in

## 🔗 Related Documentation

- [VERSION_BUMP.md](./VERSION_BUMP.md) - Version bump guide
- [PUBLISH_GUIDE.md](./PUBLISH_GUIDE.md) - Publishing guide
- [QUICK_START.md](./QUICK_START.md) - Quick reference
- [SCRIPTS.md](./SCRIPTS.md) - All scripts

## 📞 Quick Commands

```bash
# Full release workflow
bun run test:run && \
git add . && git commit -m "feat: add feature" && \
bun run version:minor && \
git add . && git commit -m "chore: bump version" && \
bun run publish
```

## ✨ Best Practices

1. **Always test before releasing**
   ```bash
   bun run test:run
   ```

2. **Use semantic versioning**
   - MAJOR for breaking changes
   - MINOR for new features
   - PATCH for bug fixes

3. **Write clear commit messages**
   ```bash
   git commit -m "feat: add feature description"
   ```

4. **Review changes before publishing**
   ```bash
   git diff
   ```

5. **Test publish first**
   ```bash
   bun run publish:dry
   ```

6. **Verify on npm after publishing**
   - Visit: https://www.npmjs.com/package/ad-to-bs

---

**Ready to release?** Follow the [Step-by-Step Release Process](#-step-by-step-release-process) above.

