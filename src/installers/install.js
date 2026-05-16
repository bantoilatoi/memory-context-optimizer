/**
 * Memory Context Optimizer - Install Logic
 * Node.js built-ins only
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync, cpSync, rmSync, readdirSync, statSync } from 'node:fs';
import { join, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, '..', '..');

import { PROVIDER_CONFIG, validateProviderManifest, getProviderInstructions } from './providers.js';

/**
 * Copy a file or directory
 */
function copyItem(src, dest, options = {}) {
    const { dryRun = false, force = false } = options;

    if (!existsSync(src)) {
        throw new Error(`Source not found: ${src}`);
    }

    if (existsSync(dest) && !force) {
        throw new Error(`Destination exists (use --force to overwrite): ${dest}`);
    }

    // Ensure parent directory exists
    const destDir = dirname(dest);
    if (!existsSync(destDir)) {
        if (!dryRun) {
            mkdirSync(destDir, { recursive: true });
        }
    }

    if (dryRun) {
        return;
    }

    const stat = statSync(src);
    if (stat.isDirectory()) {
        cpSync(src, dest, { recursive: true });
    } else {
        cpSync(src, dest);
    }
}

/**
 * Read template file
 */
function readTemplate(templatePath) {
    const fullPath = join(REPO_ROOT, templatePath);
    if (!existsSync(fullPath)) {
        return null;
    }
    return readFileSync(fullPath, 'utf-8');
}

/**
 * Initialize .memory-context/ directory
 */
export function initMemoryContext(targetDir, options = {}) {
    const { dryRun = false } = options;
    const memDir = join(targetDir, '.memory-context');

    const templates = [
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

    if (!dryRun && !existsSync(memDir)) {
        mkdirSync(memDir, { recursive: true });
    }

    templates.forEach(name => {
        const templatePath = `templates/project-memory/${name}`;
        const content = readTemplate(templatePath);
        const destPath = join(memDir, name);

        if (content && (!existsSync(destPath) || options.force)) {
            if (!dryRun) {
                writeFileSync(destPath, content, 'utf-8');
            }
        }
    });

    return memDir;
}

/**
 * Install for a specific provider
 */
export function installProvider(provider, options = {}) {
    const { dryRun = false, force = false } = options;
    const config = PROVIDER_CONFIG[provider];

    if (!config) {
        throw new Error(`Unknown provider: ${provider}`);
    }

    // Validate manifest if required
    const manifestResult = validateProviderManifest(provider);
    if (!manifestResult.valid) {
        throw new Error(`Manifest validation failed: ${manifestResult.message}`);
    }

    // Provider-specific install logic
    switch (provider) {
        case 'gemini':
            // Manifest validated above
            if (!dryRun) {
                console.log('  Gemini: Use "gemini extensions install ." to install');
            }
            break;

        case 'claude':
            config.files.forEach(file => {
                const src = join(REPO_ROOT, file);
                const dest = join(process.cwd(), file);
                copyItem(src, dest, { dryRun, force });
            });
            break;

        case 'qwen':
            // Copy skill directory
            const skillSrc = join(REPO_ROOT, 'skills', 'memory-context-optimizer');
            const skillDest = join(process.cwd(), '.qwen', 'skills', 'memory-context-optimizer');
            copyItem(skillSrc, skillDest, { dryRun, force });

            // Copy manifest
            const manifestSrc = join(REPO_ROOT, 'qwen-extension.json');
            const manifestDest = join(process.cwd(), 'qwen-extension.json');
            copyItem(manifestSrc, manifestDest, { dryRun, force });
            break;

        case 'codex':
            const codexDir = join(process.cwd(), '.codex');
            if (!dryRun && !existsSync(codexDir)) {
                mkdirSync(codexDir, { recursive: true });
            }
            const codexSrc = join(REPO_ROOT, '.codex', 'AGENTS.md');
            const codexDest = join(process.cwd(), '.codex', 'AGENTS.md');
            if (existsSync(codexSrc)) {
                copyItem(codexSrc, codexDest, { dryRun, force });
            }
            break;

        case 'generic':
            // Copy root files
            const rootFiles = ['AGENTS.md', 'GEMINI.md'];
            rootFiles.forEach(file => {
                const src = join(REPO_ROOT, file);
                const dest = join(process.cwd(), file);
                if (existsSync(src)) {
                    copyItem(src, dest, { dryRun, force });
                }
            });
            break;

        default:
            // Generic copy for other providers
            config.files.forEach(file => {
                const src = join(REPO_ROOT, file);
                const dest = join(process.cwd(), file);
                if (existsSync(src)) {
                    copyItem(src, dest, { dryRun, force });
                }
            });
    }

    return true;
}

/**
 * Uninstall for a specific provider
 */
export function uninstallProvider(provider, options = {}) {
    const { dryRun = false } = options;
    const config = PROVIDER_CONFIG[provider];

    if (!config) {
        throw new Error(`Unknown provider: ${provider}`);
    }

    switch (provider) {
        case 'gemini':
            if (!dryRun) {
                console.log('  Gemini: Use "gemini extensions uninstall memory-context-optimizer" to remove');
            }
            break;

        case 'qwen':
            const skillDir = join(process.cwd(), '.qwen', 'skills', 'memory-context-optimizer');
            if (existsSync(skillDir) && !dryRun) {
                rmSync(skillDir, { recursive: true, force: true });
            }
            break;

        default:
            // Try to remove files
            config.files.forEach(file => {
                const dest = join(process.cwd(), file);
                if (existsSync(dest) && !dryRun) {
                    const stat = statSync(dest);
                    if (stat.isDirectory()) {
                        rmSync(dest, { recursive: true, force: true });
                    } else {
                        rmSync(dest, { force: true });
                    }
                }
            });
    }

    return true;
}

/**
 * Test install (validate without real install)
 */
export function testInstallProvider(provider) {
    const config = PROVIDER_CONFIG[provider];

    if (!config) {
        throw new Error(`Unknown provider: ${provider}`);
    }

    // Validate manifest if exists
    const manifestResult = validateProviderManifest(provider);
    if (!manifestResult.valid) {
        throw new Error(manifestResult.message);
    }

    // Check source files exist
    const missing = [];
    config.files.forEach(file => {
        const src = join(REPO_ROOT, file);
        if (!existsSync(src)) {
            missing.push(file);
        }
    });

    if (missing.length > 0) {
        throw new Error(`Missing files: ${missing.join(', ')}`);
    }

    // Check if real CLI is available
    if (provider === 'gemini') {
        try {
            execSync('gemini --version', { stdio: 'ignore' });
            return 'manifest validated, CLI available';
        } catch {
            return 'manifest validated, CLI not available (use --test-install)';
        }
    }

    return 'manifest validated, files present';
}
