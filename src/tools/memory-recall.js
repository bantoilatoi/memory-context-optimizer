/**
 * Memory Context Optimizer - Memory Recall Tool
 * Compact context when usage reaches 60%
 */

import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, '..', '..');

const RECALL_THRESHOLD = 0.60;
const DEFAULT_MEMORY_PATH = '.memory-context';

/**
 * Generate recall summary
 */
export function recallContext(options = {}) {
    const { threshold = RECALL_THRESHOLD } = options;

    console.log('# Recall Summary');
    console.log('\n## Status');
    console.log(`Recall threshold: ${threshold * 100}%`);
    console.log('\n## Note');
    console.log('This tool generates a template for manual recall summary creation.');
    console.log('Actual recall should be performed by the AI agent based on active context.');

    console.log('\n## Template');
    console.log(`
## Current Task
[Task description]

## Success Criteria
1. [Criterion 1]
2. [Criterion 2]
3. [Criterion 3]

## Active Files (Top 10)
1. [path] - [why relevant]
2. ...

## Critical Facts
- \`src/file.js\`: \`function()\` - [what it does]
- Config: [key] = [value structure]

## Current Errors
\`\`\`
[Exact error message]
[First 3-5 stack frames]
\`\`\`

## Relevant Memory
- [file.md]: [One-line summary]

## Stale/Conflicting
- [entry]: [Issue description]

## Discarded
- [Category]: [Why discarded]

## Next Action
[Immediate next step]
`);

    return true;
}

/**
 * Calculate estimated context usage
 */
export function estimateContextUsage(text) {
    // Rough estimate: ~4 characters per token
    const estimatedTokens = Math.ceil(text.length / 4);
    return estimatedTokens;
}

/**
 * Check if recall should trigger
 */
export function shouldRecall(usage, maxTokens = 128000) {
    return (usage / maxTokens) >= RECALL_THRESHOLD;
}

/**
 * Load memory entries for recall
 */
export function loadMemoryEntries(targetDir = process.cwd()) {
    const memDir = join(targetDir, DEFAULT_MEMORY_PATH);
    const entries = [];

    if (!existsSync(memDir)) {
        return entries;
    }

    readdirSync(memDir).forEach(file => {
        if (!file.endsWith('.md')) return;

        const filePath = join(memDir, file);
        const stat = statSync(filePath);

        if (stat.isFile()) {
            const content = readFileSync(filePath, 'utf-8');
            entries.push({
                file,
                size: stat.size,
                mtime: stat.mtime,
                summary: content.slice(0, 200) + (content.length > 200 ? '...' : '')
            });
        }
    });

    return entries;
}

// CLI entry point
if (import.meta.url === `file://${process.argv[1]}`) {
    recallContext();
}
