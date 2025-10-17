# Scripts & Documentation Index

Complete index of all scripts and documentation for the ad-to-bs project.

## 🚀 Quick Navigation

### I want to...

**Bump the version**
→ [VERSION_BUMP_SUMMARY.md](./VERSION_BUMP_SUMMARY.md) or `bun run version:minor`

**Publish to npm**
→ [PUBLISH_GUIDE.md](./PUBLISH_GUIDE.md) or `bun run publish`

**Complete release workflow**
→ [RELEASE_WORKFLOW.md](./RELEASE_WORKFLOW.md)

**Understand all scripts**
→ [SCRIPTS.md](./SCRIPTS.md)

**Get started quickly**
→ [QUICK_START.md](./QUICK_START.md)

## 📁 Scripts Available

### Version Management
```bash
bun run version:major    # Bump major version
bun run version:minor    # Bump minor version
bun run version:patch    # Bump patch version
bun run version          # Show help
```

**Files:**
- `scripts/version.ts` - Bun-based script
- `scripts/version.sh` - Shell script

### Publishing
```bash
bun run publish:dry      # Test publish
bun run publish          # Publish to npm
```

**Files:**
- `scripts/publish.ts` - Bun-based script
- `scripts/publish.sh` - Shell script

### Development
```bash
bun run build            # Build package
bun run test             # Run tests (watch)
bun run test:run         # Run tests once
bun run lint             # Lint code
```

## 📚 Documentation Files

### Getting Started
| File | Purpose | Read Time |
|------|---------|-----------|
| **QUICK_START.md** | Quick reference | 2 min |
| **PUBLISH_INDEX.md** | Publishing navigation | 5 min |

### Version Management
| File | Purpose | Read Time |
|------|---------|-----------|
| **VERSION_BUMP.md** | Detailed version bump guide | 10 min |
| **VERSION_BUMP_SUMMARY.md** | Quick version bump summary | 5 min |

### Publishing
| File | Purpose | Read Time |
|------|---------|-----------|
| **PUBLISH_GUIDE.md** | Complete publishing guide | 10 min |
| **PUBLISHING.md** | Detailed publishing reference | 8 min |

### Workflows
| File | Purpose | Read Time |
|------|---------|-----------|
| **RELEASE_WORKFLOW.md** | Complete release workflow | 10 min |
| **SCRIPTS.md** | All scripts documentation | 10 min |

### Summaries
| File | Purpose | Read Time |
|------|---------|-----------|
| **PUBLISH_SUMMARY.md** | Publishing summary | 5 min |
| **SCRIPTS_INDEX.md** | This file | 5 min |

## 🎯 Common Workflows

### Release a Bug Fix
```bash
# 1. Fix bug
# 2. Test
bun run test:run

# 3. Commit
git add . && git commit -m "fix: resolve issue"

# 4. Bump patch
bun run version:patch

# 5. Publish
bun run publish
```

### Release a New Feature
```bash
# 1. Add feature
# 2. Test
bun run test:run

# 3. Commit
git add . && git commit -m "feat: add feature"

# 4. Bump minor
bun run version:minor

# 5. Publish
bun run publish
```

### Release Breaking Changes
```bash
# 1. Make breaking changes
# 2. Test
bun run test:run

# 3. Commit
git add . && git commit -m "feat!: breaking change"

# 4. Bump major
bun run version:major

# 5. Publish
bun run publish
```

## 📋 All Available Commands

### Version Bumping
```bash
bun run version:major    # 0.1.0 → 1.0.0
bun run version:minor    # 0.1.0 → 0.2.0
bun run version:patch    # 0.1.0 → 0.1.1
bun run version          # Show help
```

### Publishing
```bash
bun run publish:dry      # Test publish
bun run publish          # Publish to npm
```

### Development
```bash
bun run build            # Build TypeScript
bun run test             # Run tests (watch)
bun run test:run         # Run tests once
bun run lint             # Lint code
```

### Advanced Scripts
```bash
bun scripts/version.ts major
bun scripts/version.ts minor
bun scripts/version.ts patch
bun scripts/version.ts 0.2.0

bun scripts/publish.ts --dry-run
bun scripts/publish.ts

./scripts/version.sh major
./scripts/version.sh minor
./scripts/version.sh patch

./scripts/publish.sh --dry-run
./scripts/publish.sh
```

## 🔄 Complete Release Workflow

```
1. Develop & Test
   ↓
2. Commit Changes
   ↓
3. Bump Version (bun run version:minor)
   ↓
4. Commit Version Bump
   ↓
5. Test Publish (bun run publish:dry)
   ↓
6. Publish (bun run publish)
   ↓
7. Verify on npm
```

## 📖 Learning Path

### New to the project?
1. Read: [QUICK_START.md](./QUICK_START.md)
2. Read: [RELEASE_WORKFLOW.md](./RELEASE_WORKFLOW.md)

### Want to bump version?
1. Read: [VERSION_BUMP_SUMMARY.md](./VERSION_BUMP_SUMMARY.md)
2. Run: `bun run version:minor`

### Want to publish?
1. Read: [PUBLISH_GUIDE.md](./PUBLISH_GUIDE.md)
2. Run: `bun run publish:dry`
3. Run: `bun run publish`

### Need detailed reference?
1. [VERSION_BUMP.md](./VERSION_BUMP.md) - Version bumping
2. [PUBLISHING.md](./PUBLISHING.md) - Publishing details
3. [SCRIPTS.md](./SCRIPTS.md) - All scripts

## 🎓 Semantic Versioning

```
MAJOR.MINOR.PATCH

MAJOR - Breaking changes (1.0.0)
MINOR - New features (0.1.0)
PATCH - Bug fixes (0.0.1)
```

## 📁 Project Structure

```
ad-to-bs/
├── scripts/
│   ├── version.ts        # Version bump (Bun)
│   ├── version.sh        # Version bump (Shell)
│   ├── publish.ts        # Publish (Bun)
│   └── publish.sh        # Publish (Shell)
│
├── src/
│   ├── converter.ts      # Core logic
│   ├── converter.test.ts # Tests
│   ├── types.ts          # Types
│   ├── nepaliMonths.ts   # Data
│   └── index.ts          # Exports
│
├── dist/                 # Built files
├── examples/             # Usage examples
│
├── package.json          # npm config
├── tsconfig.json         # TypeScript config
├── vitest.config.ts      # Test config
│
└── Documentation/
    ├── README.md                 # Main readme
    ├── QUICK_START.md            # Quick reference
    ├── RELEASE_WORKFLOW.md       # Release workflow
    ├── VERSION_BUMP.md           # Version bumping
    ├── VERSION_BUMP_SUMMARY.md   # Version summary
    ├── PUBLISH_GUIDE.md          # Publishing guide
    ├── PUBLISHING.md             # Publishing details
    ├── PUBLISH_SUMMARY.md        # Publish summary
    ├── SCRIPTS.md                # Scripts documentation
    ├── SCRIPTS_INDEX.md          # This file
    └── PUBLISH_INDEX.md          # Publishing index
```

## 🔗 Quick Links

- **npm Package**: https://www.npmjs.com/package/ad-to-bs
- **GitHub**: https://github.com/iceinvein/ad-to-bs
- **Semantic Versioning**: https://semver.org/

## 📞 Quick Reference

```bash
# Development
bun run test:run         # Run tests
bun run lint             # Lint code
bun run build            # Build

# Version
bun run version:patch    # Patch bump
bun run version:minor    # Minor bump
bun run version:major    # Major bump

# Publishing
bun run publish:dry      # Test publish
bun run publish          # Publish

# Help
bun run version          # Version help
bun run publish:dry      # Publish help
```

## ✨ Features

✅ Automated version bumping
✅ Semantic versioning support
✅ Automated publishing
✅ Git integration
✅ Dry-run mode
✅ Colored output
✅ Error handling
✅ Comprehensive documentation

---

**Ready to get started?** Pick a task above and follow the link!

