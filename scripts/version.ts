#!/usr/bin/env bun
/**
 * Version bump script for ad-to-bs npm package
 * Usage: bun scripts/version.ts [major|minor|patch|<version>]
 *
 * Examples:
 *   bun scripts/version.ts major      # 0.1.0 → 1.0.0
 *   bun scripts/version.ts minor      # 0.1.0 → 0.2.0
 *   bun scripts/version.ts patch      # 0.1.0 → 0.1.1
 *   bun scripts/version.ts 0.2.0      # 0.1.0 → 0.2.0
 */

import * as fs from "fs";
import * as path from "path";

const colors = {
  reset: "\x1b[0m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  red: "\x1b[31m",
  blue: "\x1b[34m",
  cyan: "\x1b[36m",
};

function log(message: string, color: keyof typeof colors = "reset") {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function parseVersion(version: string): [number, number, number] {
  const parts = version.split(".");
  if (parts.length !== 3) {
    throw new Error(`Invalid version format: ${version}. Expected: major.minor.patch`);
  }
  const [major, minor, patch] = parts.map((p) => {
    const num = parseInt(p, 10);
    if (isNaN(num)) {
      throw new Error(`Invalid version part: ${p}`);
    }
    return num;
  });
  return [major, minor, patch];
}

function versionToString(major: number, minor: number, patch: number): string {
  return `${major}.${minor}.${patch}`;
}

function bumpVersion(
  current: string,
  bumpType: string
): string {
  const [major, minor, patch] = parseVersion(current);

  switch (bumpType.toLowerCase()) {
    case "major":
      return versionToString(major + 1, 0, 0);
    case "minor":
      return versionToString(major, minor + 1, 0);
    case "patch":
      return versionToString(major, minor, patch + 1);
    default:
      // Assume it's a specific version
      parseVersion(bumpType); // Validate format
      return bumpType;
  }
}

async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    log("\n📦 Version Bump Script", "cyan");
    log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━", "cyan");
    log("\nUsage: bun scripts/version.ts [major|minor|patch|<version>]", "blue");
    log("\nExamples:", "blue");
    log("  bun scripts/version.ts major      # 0.1.0 → 1.0.0", "yellow");
    log("  bun scripts/version.ts minor      # 0.1.0 → 0.2.0", "yellow");
    log("  bun scripts/version.ts patch      # 0.1.0 → 0.1.1", "yellow");
    log("  bun scripts/version.ts 0.2.0      # 0.1.0 → 0.2.0", "yellow");
    log("\nSemantic Versioning:", "blue");
    log("  MAJOR - Breaking changes (1.0.0)", "yellow");
    log("  MINOR - New features (0.1.0)", "yellow");
    log("  PATCH - Bug fixes (0.0.1)", "yellow");
    log("\n");
    process.exit(0);
  }

  const bumpType = args[0];

  try {
    // Read package.json
    const packageJsonPath = path.join(process.cwd(), "package.json");
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));
    const currentVersion = packageJson.version;

    log(`\n📦 Current version: ${currentVersion}`, "cyan");

    // Calculate new version
    const newVersion = bumpVersion(currentVersion, bumpType);

    if (newVersion === currentVersion) {
      log(`⚠ Version unchanged: ${currentVersion}`, "yellow");
      process.exit(0);
    }

    log(`📈 New version: ${newVersion}`, "green");

    // Update package.json
    packageJson.version = newVersion;
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + "\n");
    log(`✓ Updated package.json`, "green");

    // Try to update package-lock.json if it exists
    const packageLockPath = path.join(process.cwd(), "package-lock.json");
    if (fs.existsSync(packageLockPath)) {
      const packageLock = JSON.parse(fs.readFileSync(packageLockPath, "utf-8"));
      packageLock.version = newVersion;
      fs.writeFileSync(packageLockPath, JSON.stringify(packageLock, null, 2) + "\n");
      log(`✓ Updated package-lock.json`, "green");
    }

    // Try to update bun.lock if it exists
    const bunLockPath = path.join(process.cwd(), "bun.lock");
    if (fs.existsSync(bunLockPath)) {
      log(`✓ bun.lock exists (auto-updated by Bun)`, "green");
    }

    log(`\n✨ Version bumped successfully!`, "green");
    log(`\n📝 Next steps:`, "blue");
    log(`  1. Review changes: git diff`, "yellow");
    log(`  2. Commit: git add . && git commit -m "chore: bump version to ${newVersion}"`, "yellow");
    log(`  3. Publish: bun run publish`, "yellow");
    log(`\n`);
  } catch (error) {
    log(`\n✗ Error: ${error instanceof Error ? error.message : String(error)}`, "red");
    process.exit(1);
  }
}

main();

