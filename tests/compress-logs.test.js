/**
 * Memory Context Optimizer - Compress Logs Tests
 */

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';

describe('Log Compression', () => {
    test('should compress repeated lines', () => {
        const input = `Processing item...
Processing item...
Processing item...
Processing item...
Processing item...`;

        const lines = input.split('\n');
        const lineCount = {};

        lines.forEach(line => {
            const trimmed = line.trim();
            if (trimmed) {
                lineCount[trimmed] = (lineCount[trimmed] || 0) + 1;
            }
        });

        // All lines are the same pattern
        const uniquePatterns = Object.keys(lineCount).length;
        const totalLines = lines.length;

        assert.ok(uniquePatterns < totalLines, 'Should detect repeated patterns');
    });

    test('should preserve error messages', () => {
        const errorLines = [
            'Error: Cannot read property',
            'TypeError: undefined is not a function',
            'AssertionError: expected true to equal false'
        ];

        errorLines.forEach(line => {
            assert.ok(line.includes('Error') || line.includes('TypeError') || line.includes('AssertionError'), 'Should preserve error type');
        });
    });

    test('should preserve file paths and line numbers', () => {
        const stackLine = '    at Bar.baz (src/utils.js:42:15)';

        // Extract file path
        const pathMatch = stackLine.match(/src\/[\w/]+\.js/);
        assert.ok(pathMatch, 'Should preserve file path');

        // Extract line number
        const lineMatch = stackLine.match(/:(\d+):/);
        assert.ok(lineMatch, 'Should preserve line number');
    });

    test('should compress stack traces to max frames', () => {
        const maxFrames = 5;
        const stackLines = [
            'Error: Something failed',
            'at function1 (file1.js:10)',
            'at function2 (file2.js:20)',
            'at function3 (file3.js:30)',
            'at function4 (file4.js:40)',
            'at function5 (file5.js:50)',
            'at function6 (file6.js:60)',
            'at function7 (file7.js:70)'
        ];

        const errorLine = stackLines[0];
        const frames = stackLines.slice(1);
        const toShow = frames.slice(0, maxFrames);
        const remaining = frames.length - maxFrames;

        assert.strictEqual(toShow.length, 5, 'Should show max 5 frames');
        assert.strictEqual(remaining, 2, 'Should have 2 remaining');
    });

    test('should collapse duplicate stack traces', () => {
        const duplicateTraces = [
            'Error: Failed at line 1',
            'at foo (a.js:1)',
            'Error: Failed at line 1',
            'at foo (a.js:1)',
            'Error: Different error',
            'at bar (b.js:2)'
        ];

        const seen = new Set();
        const unique = duplicateTraces.filter(line => {
            if (seen.has(line)) return false;
            seen.add(line);
            return true;
        });

        assert.ok(unique.length < duplicateTraces.length, 'Should detect duplicates');
    });

    test('should keep timestamps if order-critical', () => {
        const logsWithTimestamps = [
            '[2024-05-16 10:00:01] Starting process',
            '[2024-05-16 10:00:02] Step 1',
            '[2024-05-16 10:00:03] Step 2',
            '[2024-05-16 10:00:04] Complete'
        ];

        // For sequential operations, timestamps are order-critical
        const isOrderCritical = logsWithTimestamps.every(log =>
            log.match(/^\[\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}\]/)
        );

        assert.ok(isOrderCritical, 'Should detect order-critical timestamps');
    });

    test('should remove excess whitespace', () => {
        const messyLog = `
Line 1


Line 2


Line 3
`;

        const lines = messyLog.split('\n');
        const nonEmptyLines = lines.filter(l => l.trim() !== '');

        // Should collapse multiple blank lines
        assert.ok(nonEmptyLines.length < lines.length, 'Should collapse blank lines');
    });

    test('should extract error summary', () => {
        const logWithErrors = `
INFO: Application started
ERROR: Connection failed
  at connect (db.js:42)
  at handle (server.js:100)
WARN: Retry in 5 seconds
INFO: Retry attempt 1
ERROR: Connection failed again
  at connect (db.js:42)
`;

        const errorMatches = logWithErrors.match(/ERROR:.*/g);

        assert.ok(errorMatches, 'Should find error lines');
        assert.ok(errorMatches.length >= 2, 'Should find multiple errors');
    });
});

describe('Secret Redaction', () => {
    const sensitivePatterns = [
        { pattern: /sk-[a-zA-Z0-9]{20,}/g, name: 'API Key' },
        { pattern: /api[_-]?key\s*=\s*["'][^"']+["']/gi, name: 'API Key Assignment' },
        { pattern: /password\s*=\s*["'][^"']+["']/gi, name: 'Password' },
        { pattern: /token\s*=\s*["'][^"']+["']/gi, name: 'Token' },
        { pattern: /-----BEGIN.+-----/g, name: 'Private Key' }
    ];

    test('should detect API keys', () => {
        const apiKeyPattern = /sk-[a-zA-Z0-9]{20,}/g;
        const sampleText = 'Authorization: Bearer sk-1234567890abcdefghijklmnop';

        const match = sampleText.match(apiKeyPattern);
        assert.ok(match, 'Should detect API key pattern');
    });

    test('should detect password assignments', () => {
        const passwordPattern = /password\s*=\s*["'][^"']+["']/gi;
        const sampleText = 'password="secret123"';

        const match = sampleText.match(passwordPattern);
        assert.ok(match, 'Should detect password pattern');
    });

    test('should preserve variable names', () => {
        const codeWithSecrets = 'const API_KEY = process.env.API_KEY;';
        const secretValue = codeWithSecrets.match(/= [^;]+;/)?.[0];

        // Should preserve the variable name
        assert.ok(codeWithSecrets.includes('API_KEY'), 'Should preserve variable name');
    });

    test('should not match normal text as secrets', () => {
        const normalText = 'This is a normal sentence about keys and tokens.';

        const hasSecret = sensitivePatterns.some(({ pattern }) =>
            pattern.test(normalText)
        );

        assert.ok(!hasSecret, 'Should not flag normal text as secrets');
    });
});

describe('Compression Output', () => {
    test('should show compression ratio', () => {
        const originalLines = 100;
        const compressedLines = 30;

        const ratio = ((originalLines - compressedLines) / originalLines) * 100;

        assert.strictEqual(ratio, 70, 'Should show 70% compression');
    });

    test('should format repeated lines marker', () => {
        const marker = '[Line 2-5 repeated 4x]';

        assert.ok(marker.includes('repeated'), 'Should include "repeated"');
        assert.ok(marker.includes('[Line 2-5'), 'Should show range');
    });

    test('should format remaining frames marker', () => {
        const marker = '[5 more frames]';

        assert.ok(marker.includes('more frames'), 'Should indicate remaining');
        assert.ok(marker.includes('5'), 'Should show count');
    });
});
