/**
 * Memory Context Optimizer - Memory Compress Tool
 * Compress logs while preserving errors
 */

import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

/**
 * Compress log content
 */
export function compressLogs(input = null, options = {}) {
    const { maxFrames = 5, showCount = true } = options;

    // If no input provided, show usage
    if (!input) {
        console.log('# Memory Compress Tool');
        console.log('\nUsage: compressLogs(text, options)');
        console.log('\nOptions:');
        console.log('  maxFrames: Maximum stack frames to show (default: 5)');
        console.log('  showCount: Show repeat count (default: true)');
        console.log('\nCompression rules:');
        console.log('  - Stack traces: Keep first N frames + count');
        console.log('  - Repeated lines: First + "[repeated Nx]"');
        console.log('  - Whitespace: Collapse multiple blank lines');
        return '';
    }

    const lines = input.split('\n');
    const compressed = compressLines(lines, { maxFrames, showCount });

    return compressed.join('\n');
}

/**
 * Compress array of lines
 */
function compressLines(lines, options) {
    const { maxFrames, showCount } = options;
    const result = [];
    const lineCount = {};

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        // Skip empty lines (keep max 1)
        if (line.trim() === '') {
            const prevNonEmpty = result[result.length - 1];
            if (prevNonEmpty !== undefined && prevNonEmpty !== '') {
                result.push('');
            }
            continue;
        }

        // Track repeated lines
        const trimmed = line.trim();
        if (trimmed) {
            lineCount[trimmed] = (lineCount[trimmed] || 0) + 1;
        }
    }

    // Second pass: build compressed output
    let prevLine = null;
    let repeatCount = 0;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const trimmed = line.trim();

        // Handle repeated lines
        if (trimmed && lineCount[trimmed] > 1) {
            if (prevLine === trimmed) {
                repeatCount++;
                continue;
            } else if (prevLine !== null) {
                if (repeatCount > 1 && showCount) {
                    result.push(`[${trimmed} repeated ${repeatCount}x]`);
                } else if (repeatCount > 1) {
                    // Just skip repeats
                }
                repeatCount = 1;
            } else {
                repeatCount = 1;
            }
            prevLine = trimmed;
            result.push(line);
        } else if (trimmed) {
            prevLine = null;
            repeatCount = 0;
            result.push(line);
        }
    }

    // Handle last repeat
    if (repeatCount > 1 && showCount && prevLine) {
        result.push(`[${prevLine} repeated ${repeatCount}x]`);
    }

    return result.filter(l => l !== '' || result[result.length - 1] === '');
}

/**
 * Compress stack trace
 */
export function compressStackTrace(stack, options = {}) {
    const { maxFrames = 5 } = options;

    if (!stack) return '';

    const lines = stack.split('\n');
    if (lines.length <= maxFrames) return stack;

    const result = [];

    // Keep first frame (error message)
    result.push(lines[0]);

    // Keep next maxFrames frames
    const frameLines = lines.slice(1).filter(l => l.trim());
    const toShow = frameLines.slice(0, maxFrames);
    const remaining = frameLines.length - maxFrames;

    toShow.forEach(line => result.push(line));

    if (remaining > 0) {
        result.push(`[${remaining} more frame${remaining > 1 ? 's' : ''}]`);
    }

    return result.join('\n');
}

/**
 * Extract error summary from log
 */
export function extractErrorSummary(input) {
    const lines = input.split('\n');
    const errors = [];

    let currentError = null;

    lines.forEach(line => {
        // Detect error patterns
        if (line.match(/^\s*(Error:|error:|Exception:|FATAL:|FAIL:)/i)) {
            if (currentError) errors.push(currentError);
            currentError = { message: line.trim(), stack: [] };
        } else if (currentError && line.match(/^\s*at\s+/)) {
            currentError.stack.push(line.trim());
        } else if (currentError && currentError.stack.length > 0) {
            // End of stack trace
            errors.push(currentError);
            currentError = null;
        }
    });

    if (currentError) errors.push(currentError);

    return errors.map(e => ({
        message: e.message,
        stack: compressStackTrace(e.stack.join('\n'), { maxFrames: 3 })
    }));
}

// CLI entry point
if (import.meta.url === `file://${process.argv[1]}`) {
    const args = process.argv.slice(2);

    if (args.length === 0) {
        compressLogs(null);
        console.log('\n\n# Example');
        console.log('\nPass log content via stdin or string:');
        console.log('  node memory-compress.js < log.txt');
    } else if (args[0] === '--stdin') {
        // Read from stdin
        const fs = await import('node:fs');
        const input = fs.readFileSync(0, 'utf-8');
        console.log(compressLogs(input));
    } else {
        // Treat as file path
        try {
            const content = readFileSync(args[0], 'utf-8');
            console.log(compressLogs(content));
        } catch (e) {
            console.error(`Error: ${e.message}`);
        }
    }
}
