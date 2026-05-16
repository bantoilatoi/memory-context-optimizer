/**
 * Memory Context Optimizer - Memory Init Tool
 * Initialize .memory-context/ directory
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync, statSync } from 'node:fs';
import { join, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, '..', '..');
const TEMPLATES_DIR = join(REPO_ROOT, 'templates', 'project-memory');
const DEFAULT_MEMORY_PATH = '.memory-context';

const TEMPLATE_FILES = [
    'architecture.md',
    'coding-conventions.md',
    'current-work.md',
    'known-errors.md',
    'testing-patterns.md',
    'deployment.md',
    'decisions.md',
    'observability.md',
    'api-contracts.md',
    'data-models.md',
    'ci-cd.md',
    'security-notes.md',
    'stale-candidates.md',
    'recall-index.md'
];

/**
 * Initialize memory context directory
 */
export function initMemory(targetDir = process.cwd(), options = {}) {
    const { dryRun = false, force = false } = options;
    const memDir = join(targetDir, DEFAULT_MEMORY_PATH);

    console.log(`Initializing ${DEFAULT_MEMORY_PATH}/`);

    if (!dryRun && !existsSync(memDir)) {
        mkdirSync(memDir, { recursive: true });
        console.log('  Created directory');
    }

    let created = 0;
    let skipped = 0;

    TEMPLATE_FILES.forEach(file => {
        const templatePath = join(TEMPLATES_DIR, file);
        const destPath = join(memDir, file);

        if (!existsSync(templatePath)) {
            console.log(`  ${file}: template not found, skipped`);
            skipped++;
            return;
        }

        if (existsSync(destPath) && !force) {
            console.log(`  ${file}: exists, skipped`);
            skipped++;
            return;
        }

        if (dryRun) {
            console.log(`  ${file}: would create`);
        } else {
            const content = readFileSync(templatePath, 'utf-8');
            writeFileSync(destPath, content, 'utf-8');
            console.log(`  ${file}: created`);
        }
        created++;
    });

    console.log(`\nDone: ${created} created, ${skipped} skipped`);

    return { created, skipped, path: memDir };
}

/**
 * Check if memory is initialized
 */
export function isMemoryInitialized(targetDir = process.cwd()) {
    const memDir = join(targetDir, DEFAULT_MEMORY_PATH);
    if (!existsSync(memDir)) {
        return false;
    }

    const files = readdirSync(memDir);
    return files.length > 0;
}

/**
 * Get memory status
 */
export function getMemoryStatus(targetDir = process.cwd()) {
    const memDir = join(targetDir, DEFAULT_MEMORY_PATH);

    if (!existsSync(memDir)) {
        return { initialized: false, path: memDir, files: [], totalSize: 0 };
    }

    const files = [];
    let totalSize = 0;

    readdirSync(memDir).forEach(file => {
        const filePath = join(memDir, file);
        const stat = statSync(filePath);
        if (stat.isFile()) {
            files.push({
                name: file,
                size: stat.size,
                mtime: stat.mtime
            });
            totalSize += stat.size;
        }
    });

    return {
        initialized: true,
        path: memDir,
        files,
        totalSize
    };
}

// CLI entry point
if (import.meta.url === `file://${process.argv[1]}`) {
    const args = process.argv.slice(2);
    const targetDir = args[0] || process.cwd();
    const dryRun = args.includes('--dry-run');
    const force = args.includes('--force');

    initMemory(targetDir, { dryRun, force });
}
