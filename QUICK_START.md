# Quick Start Guide

## Installation & Setup

```bash
# Install dependencies
bun install

# Build the project
bun run build

# Run tests
bun run test:run
```

## Development

```bash
# Watch mode (auto-rebuild on changes)
bun run test

# Lint code
bun run lint
```

## Publishing to npm

### Step 1: Prepare
```bash
# Update version in package.json
# e.g., "version": "0.2.0"

# Commit changes
git add .
git commit -m "chore: bump version to 0.2.0"
```

### Step 2: Test Publish (Recommended)
```bash
bun run publish:dry
```

### Step 3: Publish
```bash
bun run publish
```

That's it! The script will:
- ✅ Build the package
- ✅ Run all tests
- ✅ Lint code
- ✅ Publish to npm
- ✅ Create git tag

## Common Commands

| Command | Purpose |
|---------|---------|
| `bun run build` | Compile TypeScript |
| `bun run test:run` | Run tests once |
| `bun run test` | Run tests in watch mode |
| `bun run lint` | Format & lint code |
| `bun run publish:dry` | Test publish (no upload) |
| `bun run publish` | Publish to npm |

## Troubleshooting

**Tests fail?**
```bash
bun run test:run
# Fix issues, then retry
```

**Not logged in to npm?**
```bash
npm login
npm whoami  # Verify
```

**Want to skip tests?** (Not recommended)
```bash
bun scripts/publish.ts --skip-tests
```

## Documentation

- [PUBLISHING.md](./PUBLISHING.md) - Detailed publishing guide
- [SCRIPTS.md](./SCRIPTS.md) - All available scripts
- [README.md](./README.md) - Library documentation

## Next Steps

1. ✅ Build: `bun run build`
2. ✅ Test: `bun run test:run`
3. ✅ Dry-run: `bun run publish:dry`
4. ✅ Publish: `bun run publish`

