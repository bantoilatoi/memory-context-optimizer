/**
 * Memory Context Optimizer - Memory Audit Tool
 * Check memory for stale/conflicting entries
 */

import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DEFAULT_MEMORY_PATH = '.memory-context';

// Patterns for detection
const STALE_PATTERNS = [
    /<!--\s*STALE/i,
    /outdated/i,
    /deprecated/i,
    /no longer used/i,
    /removed in/i,
    /deleted file/i
];

const CONFLICTING_PATTERNS = [
    /<!--\s*CONFLICT/i,
    /conflicts with/i,
    /contradicts/i,
    /different from/i
];

const SENSITIVE_PATTERNS = [
    /sk-[a-zA-Z0-9]{20,}/,
    /api[_-]?key\s*=\s*["'][^"']{10,}["']/i,
    /password\s*=\s*["'][^"']+["']/i,
    /token\s*=\s*["'][^"']+["']/i,
    /-----BEGIN\s+(RSA|EC|DSA|PRIVATE|OPENSSH)/
];

/**
 * Audit memory files
 */
export function auditMemory(targetDir = process.cwd(), options = {}) {
    const { verbose = false } = options;
    const memDir = join(targetDir, DEFAULT_MEMORY_PATH);

    console.log('# Memory Audit Report');
    console.log(`\nMemory path: ${DEFAULT_MEMORY_PATH}/`);

    if (!existsSync(memDir)) {
        console.log('\n## Status: NOT INITIALIZED');
        console.log('\nNo .memory-context/ directory found.');
        console.log('Run: node bin/memory-context.js init');
        return { initialized: false, stale: [], conflicting: [], sensitive: [], issues: [] };
    }

    const files = readdirSync(memDir).filter(f => f.endsWith('.md'));
    console.log(`\n## Files Found: ${files.length}`);

    const issues = {
        stale: [],
        conflicting: [],
        sensitive: [],
        orphaned: [],
        missingTimestamp: []
    };

    files.forEach(file => {
        const filePath = join(memDir, file);
        const content = readFileSync(filePath, 'utf-8');

        // Check for stale markers
        STALE_PATTERNS.forEach(pattern => {
            const matches = content.match(new RegExp(`.*${pattern.source}.*`, 'gi'));
            if (matches) {
                issues.stale.push({
                    file,
                    pattern: pattern.source,
                    lines: matches
                });
            }
        });

        // Check for conflicting markers
        CONFLICTING_PATTERNS.forEach(pattern => {
            const matches = content.match(new RegExp(`.*${pattern.source}.*`, 'gi'));
            if (matches) {
                issues.conflicting.push({
                    file,
                    pattern: pattern.source,
                    lines: matches
                });
            }
        });

        // Check for sensitive content
        SENSITIVE_PATTERNS.forEach(pattern => {
            const matches = content.match(new RegExp(pattern.source, 'gi'));
            if (matches) {
                issues.sensitive.push({
                    file,
                    pattern: pattern.source,
                    matches: matches.slice(0, 3) // Limit to first 3
                });
            }
        });

        // Check for timestamps
        if (!content.match(/\d{4}-\d{2}-\d{2}|updated?\s*:\s*\d{4}/i)) {
            issues.missingTimestamp.push(file);
        }
    });

    // Report
    console.log('\n## Summary');
    console.log(`- Stale entries: ${issues.stale.length}`);
    console.log(`- Conflicting entries: ${issues.conflicting.length}`);
    console.log(`- Sensitive content: ${issues.sensitive.length}`);
    console.log(`- Missing timestamps: ${issues.missingTimestamp.length}`);

    if (issues.stale.length > 0) {
        console.log('\n## Stale Entries');
        issues.stale.forEach(item => {
            console.log(`  \`${item.file}\`: ${item.lines.length} flagged`);
        });
    }

    if (issues.conflicting.length > 0) {
        console.log('\n## Conflicting Entries');
        issues.conflicting.forEach(item => {
            console.log(`  \`${item.file}\`: ${item.lines.length} flagged`);
        });
    }

    if (issues.sensitive.length > 0) {
        console.log('\n## Sensitive Content Detected');
        issues.sensitive.forEach(item => {
            console.log(`  \`${item.file}\`: ${item.matches.length} potential secret(s)`);
        });
    }

    if (issues.missingTimestamp.length > 0) {
        console.log('\n## Missing Timestamps');
        issues.missingTimestamp.forEach(file => {
            console.log(`  \`${file}\`: no date found`);
        });
    }

    if (issues.stale.length === 0 && issues.conflicting.length === 0 && issues.sensitive.length === 0) {
        console.log('\n## Health: GOOD');
        console.log('No stale, conflicting, or sensitive entries detected.');
    }

    return {
        initialized: true,
        files,
        ...issues
    };
}

/**
 * Show memory status
 */
export function memoryStatus(targetDir = process.cwd()) {
    const memDir = join(targetDir, DEFAULT_MEMORY_PATH);

    console.log('# Memory Status');
    console.log(`\nMemory path: ${DEFAULT_MEMORY_PATH}/`);

    if (!existsSync(memDir)) {
        console.log('\nStatus: NOT INITIALIZED');
        console.log('Run: node bin/memory-context.js init');
        return { initialized: false };
    }

    const files = readdirSync(memDir).filter(f => f.endsWith('.md'));

    console.log(`\nStatus: INITIALIZED`);
    console.log(`Files: ${files.length}`);

    let totalSize = 0;
    const fileStats = [];

    files.forEach(file => {
        const filePath = join(memDir, file);
        const stat = statSync(filePath);
        totalSize += stat.size;
        fileStats.push({
            file,
            size: stat.size,
            mtime: stat.mtime
        });
    });

    console.log(`Total size: ${(totalSize / 1024).toFixed(1)} KB`);

    console.log('\n## Files');
    fileStats.forEach(f => {
        const date = f.mtime.toISOString().split('T')[0];
        const size = `${(f.size / 1024).toFixed(1)} KB`;
        console.log(`  ${date} ${size.padStart(10)} ${f.file}`);
    });

    return { initialized: true, files, totalSize, fileStats };
}

// CLI entry point
if (import.meta.url === `file://${process.argv[1]}`) {
    const args = process.argv.slice(2);
    const targetDir = args[0] || process.cwd();

    if (args.includes('--audit')) {
        auditMemory(targetDir);
    } else {
        memoryStatus(targetDir);
    }
}
