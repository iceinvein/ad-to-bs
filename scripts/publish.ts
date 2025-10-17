#!/usr/bin/env bun
/**
 * Publish script for ad-to-bs npm package
 * Usage: bun scripts/publish.ts [--dry-run] [--skip-tests]
 */

import { $ } from "bun";
import * as fs from "fs";
import * as path from "path";

const args = process.argv.slice(2);
const isDryRun = args.includes("--dry-run");
const skipTests = args.includes("--skip-tests");

const colors = {
  reset: "\x1b[0m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  red: "\x1b[31m",
  blue: "\x1b[34m",
};

function log(message: string, color: keyof typeof colors = "reset") {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

async function runCommand(
  command: string,
  description: string
): Promise<boolean> {
  try {
    log(`\n▶ ${description}...`, "blue");
    await $`${command}`.quiet();
    log(`✓ ${description}`, "green");
    return true;
  } catch (error) {
    log(`✗ ${description} failed`, "red");
    console.error(error);
    return false;
  }
}

async function main() {
  log("\n🚀 Starting publish process...\n", "blue");

  // Step 1: Check if git is clean
  try {
    const status = await $`git status --porcelain`.text();
    if (status.trim()) {
      log("⚠ Warning: Git working directory is not clean", "yellow");
      log("Uncommitted changes:", "yellow");
      console.log(status);
      const proceed = await confirm(
        "Continue with publish? (y/n): "
      );
      if (!proceed) {
        log("Publish cancelled", "yellow");
        process.exit(0);
      }
    }
  } catch {
    log("⚠ Warning: Could not check git status", "yellow");
  }

  // Step 2: Build
  if (!(await runCommand("bun run build", "Building package"))) {
    process.exit(1);
  }

  // Step 3: Run tests
  if (!skipTests) {
    if (!(await runCommand("bun run test:run", "Running tests"))) {
      process.exit(1);
    }
  } else {
    log("⊘ Skipping tests", "yellow");
  }

  // Step 4: Lint
  if (!(await runCommand("bun run lint", "Linting code"))) {
    log("⚠ Linting failed, but continuing...", "yellow");
  }

  // Step 5: Check package.json
  const packageJsonPath = path.join(process.cwd(), "package.json");
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));

  log(`\n📦 Package Information:`, "blue");
  log(`  Name: ${packageJson.name}`, "green");
  log(`  Version: ${packageJson.version}`, "green");
  log(`  Description: ${packageJson.description}`, "green");

  // Step 6: Publish
  const publishCmd = isDryRun ? "npm publish --dry-run" : "npm publish";
  const publishDesc = isDryRun ? "Publishing (dry-run)" : "Publishing to npm";

  if (!(await runCommand(publishCmd, publishDesc))) {
    process.exit(1);
  }

  // Step 7: Create git tag (if not dry-run)
  if (!isDryRun) {
    const tagName = `v${packageJson.version}`;
    try {
      await $`git tag ${tagName}`.quiet();
      log(`✓ Created git tag: ${tagName}`, "green");
      log(`\n💡 Push tag with: git push origin ${tagName}`, "blue");
    } catch {
      log(`⚠ Could not create git tag (may already exist)`, "yellow");
    }
  }

  log("\n✨ Publish process completed!", "green");
  if (isDryRun) {
    log("(This was a dry-run, no changes were published)", "yellow");
  }
}

// Helper function for user confirmation
async function confirm(message: string): Promise<boolean> {
  process.stdout.write(message);
  const answer = await new Promise<string>((resolve) => {
    process.stdin.once("data", (data) => {
      resolve(data.toString().trim().toLowerCase());
    });
  });
  return answer === "y" || answer === "yes";
}

main().catch((error) => {
  log(`\n✗ Error: ${error.message}`, "red");
  process.exit(1);
});

