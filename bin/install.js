#!/usr/bin/env node
/**
 * Memory Context Optimizer - Installer
 * Node.js v20+ required
 * No npm dependencies required
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync, cpSync, rmSync, readdirSync, statSync } from 'node:fs';
import { join, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = __dirname;

// Import installers
import { getProviders, detectProviders } from '../src/installers/providers.js';
import { installProvider, uninstallProvider, testInstallProvider } from '../src/installers/install.js';
import { initMemoryContext } from '../src/installers/install.js';

const HELP = `
Memory Context Optimizer Installer

Usage: node bin/install.js [options]

Options:
  --all              Install for all detected providers
  --only <provider>  Install for specific provider only
  --with-init        Also initialize .memory-context/ files
  --dry-run          Preview changes without applying
  --force            Overwrite existing files
  --uninstall        Remove installed files
  --test-install     Validate manifests without real install
  --list             Show available providers
  --help             Show this help

Providers: ${getProviders().join(', ')}

Examples:
  node bin/install.js --all
  node bin/install.js --only generic --with-init
  node bin/install.js --dry-run --all
  node bin/install.js --test-install --only gemini
  node bin/install.js --uninstall
`;

function parseArgs(args) {
    const opts = {
        all: false,
        only: null,
        withInit: false,
        dryRun: false,
        force: false,
        uninstall: false,
        testInstall: false,
        list: false,
        help: false
    };

    for (let i = 0; i < args.length; i++) {
        const arg = args[i];
        switch (arg) {
            case '--all':
                opts.all = true;
                break;
            case '--only':
                opts.only = args[++i];
                break;
            case '--with-init':
                opts.withInit = true;
                break;
            case '--dry-run':
                opts.dryRun = true;
                break;
            case '--force':
                opts.force = true;
                break;
            case '--uninstall':
                opts.uninstall = true;
                break;
            case '--test-install':
                opts.testInstall = true;
                break;
            case '--list':
                opts.list = true;
                break;
            case '--help':
            case '-h':
                opts.help = true;
                break;
        }
    }

    return opts;
}

function main() {
    const args = process.argv.slice(2);
    const opts = parseArgs(args);

    if (opts.help) {
        console.log(HELP);
        return;
    }

    if (opts.list) {
        const providers = getProviders();
        const detected = detectProviders();
        console.log('Available providers:');
        providers.forEach(p => {
            const status = detected.includes(p) ? '(detected)' : '';
            console.log(`  - ${p} ${status}`);
        });
        return;
    }

    if (opts.uninstall) {
        console.log('Uninstalling memory-context-optimizer...\n');
        const providers = opts.only ? [opts.only] : getProviders();
        providers.forEach(p => {
            try {
                uninstallProvider(p, { dryRun: opts.dryRun });
            } catch (e) {
                console.log(`  ${p}: ${e.message}`);
            }
        });
        return;
    }

    if (opts.testInstall) {
        console.log('Testing install (validation only)...\n');
        const providers = opts.only ? [opts.only] : getProviders();
        providers.forEach(p => {
            try {
                const result = testInstallProvider(p);
                console.log(`  ${p}: ${result}`);
            } catch (e) {
                console.log(`  ${p}: FAILED - ${e.message}`);
            }
        });
        return;
    }

    if (opts.all || opts.only) {
        const providers = opts.only ? [opts.only] : detectProviders();
        console.log(`${opts.dryRun ? '[DRY RUN] ' : ''}Installing memory-context-optimizer...\n`);

        providers.forEach(p => {
            try {
                installProvider(p, {
                    dryRun: opts.dryRun,
                    force: opts.force
                });
                console.log(`  ${p}: ${opts.dryRun ? 'would install' : 'installed'}`);
            } catch (e) {
                console.log(`  ${p}: ${e.message}`);
            }
        });

        if (opts.withInit) {
            console.log(`\n${opts.dryRun ? '[DRY RUN] ' : ''}Initializing .memory-context/...`);
            try {
                initMemoryContext(REPO_ROOT, { dryRun: opts.dryRun });
                console.log(`  .memory-context/: ${opts.dryRun ? 'would create' : 'created'}`);
            } catch (e) {
                console.log(`  .memory-context/: ${e.message}`);
            }
        }

        return;
    }

    console.log(HELP);
}

main();
