# Scripts Documentation

This project includes several scripts for development, testing, and publishing.

## Available Scripts

### Development & Testing

```bash
# Build the TypeScript code
bun run build

# Run tests in watch mode
bun run test

# Run tests once
bun run test:run

# Lint and format code
bun run lint
```

### Publishing

#### Quick Publish (npm scripts)

```bash
# Dry-run: Test publish without uploading
bun run publish:dry

# Publish to npm
bun run publish
```

#### Advanced Publishing (Bun script)

```bash
# Dry-run with Bun script
bun scripts/publish.ts --dry-run

# Full publish
bun scripts/publish.ts

# Skip tests (not recommended)
bun scripts/publish.ts --skip-tests
```

#### Shell Script Publishing

```bash
# Dry-run with shell script
./scripts/publish.sh --dry-run

# Full publish
./scripts/publish.sh

# Skip tests
./scripts/publish.sh --skip-tests
```

## Script Details

### `bun run build`
Compiles TypeScript source files to JavaScript in the `dist/` directory.
- Input: `src/**/*.ts`
- Output: `dist/**/*.js` + type definitions

### `bun run test` / `bun run test:run`
Runs the test suite using Vitest.
- `test`: Watch mode (re-runs on file changes)
- `test:run`: Single run (CI-friendly)

### `bun run lint`
Lints and formats code using Biome.
- Checks code style
- Auto-fixes formatting issues
- Validates TypeScript

### `bun run publish:dry`
Simulates the publish process without uploading to npm.
- Builds the package
- Runs all tests
- Lints code
- Shows what would be published

### `bun run publish`
Publishes the package to npm.
- Builds the package
- Runs all tests
- Lints code
- Publishes to npm
- Creates a git tag

### `bun scripts/publish.ts`
Advanced Bun-based publish script with more control.

**Options:**
- `--dry-run`: Simulate publish without uploading
- `--skip-tests`: Skip test execution (not recommended)

**Features:**
- Checks git status
- Validates package.json
- Creates git tags
- Colored output
- Error handling

### `./scripts/publish.sh`
Shell script version of the publish process.

**Options:**
- `--dry-run`: Simulate publish
- `--skip-tests`: Skip tests

**Features:**
- POSIX-compliant shell script
- Works on macOS, Linux, Windows (Git Bash)
- Colored output
- Git integration

## Workflow Examples

### Publishing a New Version

1. **Update version** in `package.json`:
   ```json
   {
     "version": "0.2.0"
   }
   ```

2. **Test locally**:
   ```bash
   bun run test:run
   bun run lint
   ```

3. **Dry-run publish**:
   ```bash
   bun run publish:dry
   ```

4. **Publish to npm**:
   ```bash
   bun run publish
   ```

5. **Verify on npm**:
   - Visit https://www.npmjs.com/package/ad-to-bs
   - Check version is listed

### Development Workflow

```bash
# Start development
bun run test  # Watch mode

# In another terminal
bun run build  # Build on demand

# Make changes, tests auto-run
# Fix any issues
# Commit changes
```

### CI/CD Integration

For GitHub Actions or other CI systems:

```bash
# Run tests once
bun run test:run

# Build
bun run build

# Lint
bun run lint

# Publish (with npm token)
npm publish
```

## Environment Variables

### For Publishing

Set these before running publish scripts:

```bash
# npm token (for CI/CD)
export NPM_TOKEN=your_token_here

# npm registry (optional, defaults to npmjs.com)
export NPM_REGISTRY=https://registry.npmjs.org/
```

## Troubleshooting

### Script Not Found
```bash
# Make sure you're in the project root
cd /path/to/ad-to-bs

# Try with explicit path
bun ./scripts/publish.ts
```

### Permission Denied (Shell Script)
```bash
# Make script executable
chmod +x scripts/publish.sh

# Then run
./scripts/publish.sh
```

### Tests Fail
```bash
# Run tests to see details
bun run test:run

# Fix issues, then retry
bun run publish:dry
```

### npm Login Issues
```bash
# Check if logged in
npm whoami

# Login if needed
npm login

# Verify credentials
npm config get registry
```

## File Structure

```
scripts/
├── publish.ts      # Bun-based publish script
└── publish.sh      # Shell-based publish script

PUBLISHING.md       # Detailed publishing guide
SCRIPTS.md          # This file
```

## See Also

- [PUBLISHING.md](./PUBLISHING.md) - Detailed publishing guide
- [package.json](./package.json) - npm configuration
- [tsconfig.json](./tsconfig.json) - TypeScript configuration

