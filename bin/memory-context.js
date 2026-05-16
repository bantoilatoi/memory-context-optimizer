#!/usr/bin/env node
/**
 * Memory Context Optimizer - CLI
 * Node.js v20+ required
 */

import { readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const HELP = `
Memory Context Optimizer CLI

Usage: node bin/memory-context.js <command>

Commands:
  recall    Compact context when usage >= 60%
  rank      Rank files, logs, snippets by relevance
  compress  Compress logs while preserving errors
  audit     Check memory for stale/conflicting entries
  status    Show memory and context health summary
  validate  Run repository validation

Examples:
  node bin/memory-context.js recall
  node bin/memory-context.js rank
  node bin/memory-context.js audit
`;

const COMMANDS = {
    recall: async () => {
        const { recallContext } = await import('../src/tools/memory-recall.js');
        await recallContext();
    },
    rank: async () => {
        const { rankContext } = await import('../src/tools/memory-rank.js');
        await rankContext();
    },
    compress: async () => {
        const { compressLogs } = await import('../src/tools/memory-compress.js');
        await compressLogs();
    },
    audit: async () => {
        const { auditMemory } = await import('../src/tools/memory-audit.js');
        await auditMemory();
    },
    status: async () => {
        const { memoryStatus } = await import('../src/tools/memory-audit.js');
        await memoryStatus();
    },
    validate: async () => {
        const { validateRepository } = await import('../src/tools/validate-repository.js');
        const result = validateRepository({ strict: true });
        if (!result.valid) {
            console.log('Validation failed:');
            result.errors.forEach(e => console.log(`  - ${e}`));
            process.exit(1);
        }
        console.log('Validation passed.');
    }
};

async function main() {
    const args = process.argv.slice(2);
    const cmd = args[0];

    if (!cmd || cmd === '--help' || cmd === '-h') {
        console.log(HELP);
        return;
    }

    if (COMMANDS[cmd]) {
        try {
            await COMMANDS[cmd]();
        } catch (e) {
            console.error(`Error: ${e.message}`);
            process.exit(1);
        }
        return;
    }

    console.log(`Unknown command: ${cmd}`);
    console.log(HELP);
    process.exit(1);
}

main();
