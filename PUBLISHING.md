# Publishing Guide

This document explains how to publish the `ad-to-bs` package to npm.

## Prerequisites

1. **npm account**: Create one at [npmjs.com](https://www.npmjs.com)
2. **Logged in locally**: Run `npm login` to authenticate
3. **Git repository**: Ensure you're in a git repository with clean working directory
4. **Bun installed**: The publish scripts use Bun

## Publishing Methods

### Method 1: Using npm Scripts (Recommended)

#### Dry Run (Recommended First Step)
Test the publish process without actually publishing:

```bash
bun run publish:dry
```

This will:
- Build the package
- Run all tests
- Lint the code
- Simulate publishing to npm

#### Actual Publish
Publish to npm:

```bash
bun run publish
```

This will:
- Build the package
- Run all tests
- Lint the code
- Publish to npm
- Create a git tag (e.g., `v0.1.0`)

### Method 2: Using Bun Publish Script

#### Dry Run
```bash
bun scripts/publish.ts --dry-run
```

#### Full Publish
```bash
bun scripts/publish.ts
```

#### Skip Tests (Not Recommended)
```bash
bun scripts/publish.ts --skip-tests
```

### Method 3: Using Shell Script

#### Dry Run
```bash
./scripts/publish.sh --dry-run
```

#### Full Publish
```bash
./scripts/publish.sh
```

#### Skip Tests
```bash
./scripts/publish.sh --skip-tests
```

## Manual Publishing

If you prefer to publish manually:

```bash
# 1. Build the package
bun run build

# 2. Run tests
bun run test:run

# 3. Lint code
bun run lint

# 4. Publish to npm
npm publish

# 5. Create git tag
git tag v0.1.0
git push origin v0.1.0
```

## Pre-Publish Checklist

Before publishing, ensure:

- [ ] All tests pass: `bun run test:run`
- [ ] Code is linted: `bun run lint`
- [ ] Build succeeds: `bun run build`
- [ ] Version is updated in `package.json`
- [ ] CHANGELOG is updated (if applicable)
- [ ] Git working directory is clean
- [ ] You're logged in to npm: `npm whoami`

## Version Management

Update the version in `package.json` before publishing:

```json
{
  "version": "0.2.0"
}
```

Follow [Semantic Versioning](https://semver.org/):
- **MAJOR**: Breaking changes (e.g., 1.0.0)
- **MINOR**: New features (e.g., 0.2.0)
- **PATCH**: Bug fixes (e.g., 0.1.1)

## After Publishing

1. **Verify on npm**: Visit https://www.npmjs.com/package/ad-to-bs
2. **Push git tag**: `git push origin v0.1.0`
3. **Create GitHub Release** (optional): Add release notes on GitHub

## Troubleshooting

### "npm ERR! 403 Forbidden"
- Ensure you're logged in: `npm login`
- Check package name isn't taken
- Verify you have publish permissions

### "npm ERR! 404 Not Found"
- Ensure `package.json` has correct `name` field
- Check `files` array includes `dist/`

### Tests Fail During Publish
- Run `bun run test:run` locally to debug
- Fix issues before retrying
- Use `--skip-tests` only if absolutely necessary

### Git Tag Already Exists
- The script will warn but continue
- Manually delete old tag if needed: `git tag -d v0.1.0`

## NPM Configuration

Ensure your `package.json` has:

```json
{
  "name": "ad-to-bs",
  "version": "0.1.0",
  "type": "module",
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "files": ["dist"],
  "repository": {
    "type": "git",
    "url": "https://github.com/iceinvein/ad-to-bs.git"
  }
}
```

## Resources

- [npm Publishing Guide](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry)
- [Semantic Versioning](https://semver.org/)
- [npm CLI Documentation](https://docs.npmjs.com/cli)

