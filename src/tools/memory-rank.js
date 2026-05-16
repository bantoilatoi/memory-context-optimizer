/**
 * Memory Context Optimizer - Memory Rank Tool
 * Rank files by relevance
 */

import { readdirSync, statSync, readFileSync, existsSync } from 'node:fs';
import { join, extname, basename } from 'node:path';

const DEFAULT_MEMORY_PATH = '.memory-context';

/**
 * Rank files by relevance
 */
export function rankContext(taskKeywords = [], options = {}) {
    const { targetDir = process.cwd(), maxResults = 20 } = options;

    console.log('# Context Ranking');
    console.log(`\nTask keywords: ${taskKeywords.length > 0 ? taskKeywords.join(', ') : '(none specified)'}`);
    console.log(`Max results: ${maxResults}`);

    // Scan for code files
    const codeExtensions = ['.js', '.ts', '.jsx', '.tsx', '.py', '.go', '.java', '.rs', '.rb', '.php', '.cs', '.cpp', '.c', '.h'];
    const files = scanCodeFiles(targetDir, codeExtensions);

    // Score files
    const scored = files.map(f => ({
        ...f,
        score: calculateScore(f, taskKeywords)
    }));

    // Sort by score
    scored.sort((a, b) => b.score - a.score);

    // Categorize
    const critical = scored.filter(f => f.score >= 0.7).slice(0, 10);
    const useful = scored.filter(f => f.score >= 0.4 && f.score < 0.7).slice(0, 20);
    const reference = scored.filter(f => f.score >= 0.2 && f.score < 0.4).slice(0, 10);

    console.log('\n## Tier 1: Critical');
    if (critical.length === 0) {
        console.log('  (none)');
    } else {
        critical.forEach((f, i) => {
            console.log(`  ${i + 1}. \`${f.relativePath}\` (score: ${f.score.toFixed(2)})`);
        });
    }

    console.log('\n## Tier 2: Useful');
    if (useful.length === 0) {
        console.log('  (none)');
    } else {
        useful.forEach((f, i) => {
            console.log(`  ${critical.length + i + 1}. \`${f.relativePath}\` (score: ${f.score.toFixed(2)})`);
        });
    }

    console.log('\n## Tier 3: Reference');
    if (reference.length === 0) {
        console.log('  (none)');
    } else {
        reference.forEach((f, i) => {
            console.log(`  ${critical.length + useful.length + i + 1}. \`${f.relativePath}\` (score: ${f.score.toFixed(2)})`);
        });
    }

    return { critical, useful, reference };
}

/**
 * Scan for code files
 */
function scanCodeFiles(dir, extensions, maxDepth = 3, currentDepth = 0) {
    const files = [];
    const ignoreDirs = ['node_modules', '.git', 'dist', 'build', 'coverage', '__pycache__', '.venv', 'venv'];

    if (currentDepth >= maxDepth) return files;

    try {
        const entries = readdirSync(dir, { withFileTypes: true });

        entries.forEach(entry => {
            if (entry.name.startsWith('.') && entry.name !== '.memory-context') return;
            if (ignoreDirs.includes(entry.name)) return;

            const fullPath = join(dir, entry.name);

            if (entry.isDirectory()) {
                files.push(...scanCodeFiles(fullPath, extensions, maxDepth, currentDepth + 1));
            } else if (entry.isFile()) {
                const ext = extname(entry.name).toLowerCase();
                if (extensions.includes(ext) || entry.name === 'package.json') {
                    try {
                        const stat = statSync(fullPath);
                        files.push({
                            name: entry.name,
                            path: fullPath,
                            relativePath: fullPath.replace(dir + '/', ''),
                            ext,
                            size: stat.size,
                            mtime: stat.mtime
                        });
                    } catch {}
                }
            }
        });
    } catch {}

    return files;
}

/**
 * Calculate relevance score
 */
function calculateScore(file, keywords) {
    let score = 0;

    // Base score from file type
    if (file.ext === '.json') score += 0.1;

    // Check name matches
    const nameLower = file.name.toLowerCase();
    keywords.forEach(kw => {
        if (nameLower.includes(kw.toLowerCase())) {
            score += 0.3;
        }
    });

    // Recency score
    const daysSinceModified = (Date.now() - file.mtime.getTime()) / (1000 * 60 * 60 * 24);
    if (daysSinceModified < 7) score += 0.3;
    else if (daysSinceModified < 30) score += 0.15;
    else score += 0.05;

    // Size factor (prefer reasonable sized files)
    if (file.size > 100 && file.size < 50000) score += 0.2;

    return Math.min(score, 1.0);
}

// CLI entry point
if (import.meta.url === `file://${process.argv[1]}`) {
    const args = process.argv.slice(2);
    const keywords = args.filter(a => !a.startsWith('--'));
    rankContext(keywords.length > 0 ? keywords : ['src', 'index', 'main']);
}
