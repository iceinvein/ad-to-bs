# Publishing Documentation Index

Complete guide to publishing the `ad-to-bs` npm package.

## 📚 Documentation Files

### 🚀 [QUICK_START.md](./QUICK_START.md)
**Start here!** Quick reference for common tasks.
- Installation & setup
- Common commands
- Troubleshooting
- ~30 lines, 2-minute read

### 📖 [PUBLISH_GUIDE.md](./PUBLISH_GUIDE.md)
**Main guide.** Complete publishing workflow.
- Quick publish (recommended)
- All publish methods
- Pre-publish checklist
- Version management
- Troubleshooting
- ~200 lines, 10-minute read

### 📋 [PUBLISHING.md](./PUBLISHING.md)
**Detailed reference.** In-depth publishing information.
- Prerequisites
- All publishing methods
- Manual publishing
- Version management
- npm configuration
- ~150 lines, 8-minute read

### 🔧 [SCRIPTS.md](./SCRIPTS.md)
**Script reference.** Documentation for all available scripts.
- Available scripts
- Script details
- Workflow examples
- CI/CD integration
- ~200 lines, 10-minute read

## 🎯 Quick Navigation

### I want to...

**Publish my package**
→ [QUICK_START.md](./QUICK_START.md) or [PUBLISH_GUIDE.md](./PUBLISH_GUIDE.md)

**Understand all publish methods**
→ [PUBLISH_GUIDE.md](./PUBLISH_GUIDE.md#-available-publish-methods)

**See all available scripts**
→ [SCRIPTS.md](./SCRIPTS.md#available-scripts)

**Set up CI/CD**
→ [SCRIPTS.md](./SCRIPTS.md#cicd-integration)

**Troubleshoot an issue**
→ [PUBLISH_GUIDE.md](./PUBLISH_GUIDE.md#-troubleshooting) or [SCRIPTS.md](./SCRIPTS.md#troubleshooting)

**Understand version management**
→ [PUBLISH_GUIDE.md](./PUBLISH_GUIDE.md#-version-management)

## 📦 Publish Scripts

### `scripts/publish.ts`
Bun-based publish script with advanced features.

```bash
bun scripts/publish.ts [--dry-run] [--skip-tests]
```

**Features:**
- Checks git status
- Validates package.json
- Creates git tags
- Colored output
- Error handling

### `scripts/publish.sh`
Shell script version for universal compatibility.

```bash
./scripts/publish.sh [--dry-run] [--skip-tests]
```

**Features:**
- POSIX-compliant
- Works on macOS, Linux, Windows (Git Bash)
- Colored output
- Git integration

## 🚀 One-Minute Quick Start

```bash
# 1. Update version in package.json
# 2. Commit changes
git add . && git commit -m "chore: bump version"

# 3. Test publish (optional but recommended)
bun run publish:dry

# 4. Publish to npm
bun run publish

# Done! ✨
```

## 📋 npm Scripts in package.json

```json
{
  "scripts": {
    "build": "tsc",
    "test": "vitest",
    "test:run": "vitest run",
    "lint": "biome check --write .",
    "prepublishOnly": "bun run build && bun run test:run",
    "publish": "npm publish",
    "publish:dry": "npm publish --dry-run"
  }
}
```

## 🔄 Publish Workflow

```
1. Make changes
   ↓
2. Test locally (bun run test:run)
   ↓
3. Update version in package.json
   ↓
4. Commit changes
   ↓
5. Dry-run publish (bun run publish:dry)
   ↓
6. Publish (bun run publish)
   ↓
7. Verify on npm
   ↓
8. Done! ✨
```

## 🎓 Learning Path

1. **New to publishing?**
   - Start: [QUICK_START.md](./QUICK_START.md)
   - Then: [PUBLISH_GUIDE.md](./PUBLISH_GUIDE.md)

2. **Want to understand scripts?**
   - Read: [SCRIPTS.md](./SCRIPTS.md)

3. **Need detailed reference?**
   - Check: [PUBLISHING.md](./PUBLISHING.md)

4. **Setting up CI/CD?**
   - See: [SCRIPTS.md](./SCRIPTS.md#cicd-integration)

## 🔐 Before Publishing

- [ ] npm account created
- [ ] Logged in locally: `npm login`
- [ ] Version updated in package.json
- [ ] Tests pass: `bun run test:run`
- [ ] Code lints: `bun run lint`
- [ ] Build succeeds: `bun run build`
- [ ] Git working directory clean
- [ ] Changes committed

## 📞 Common Commands

```bash
# Development
bun run build          # Build package
bun run test:run       # Run tests
bun run test           # Watch mode
bun run lint           # Lint code

# Publishing
bun run publish:dry    # Test publish
bun run publish        # Publish to npm

# Advanced
bun scripts/publish.ts --dry-run
./scripts/publish.sh --dry-run
```

## 🆘 Troubleshooting

**Tests fail?**
```bash
bun run test:run
# Fix issues, retry
```

**Not logged in?**
```bash
npm login
npm whoami
```

**Need more help?**
- See [PUBLISH_GUIDE.md](./PUBLISH_GUIDE.md#-troubleshooting)
- See [SCRIPTS.md](./SCRIPTS.md#troubleshooting)

## 📚 External Resources

- [npm Publishing Guide](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry)
- [Semantic Versioning](https://semver.org/)
- [npm CLI Docs](https://docs.npmjs.com/cli)
- [Bun Docs](https://bun.sh)

---

**Ready to publish?** Start with [QUICK_START.md](./QUICK_START.md) or run:
```bash
bun run publish:dry
```

