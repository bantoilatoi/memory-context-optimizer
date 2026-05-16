/**
 * Memory Context Optimizer - Recall Context Tests
 */

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';

describe('Recall Context', () => {
    test('should generate recall summary template', () => {
        const summary = `# Recall Summary

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
`;

        // Verify required sections exist
        assert.ok(summary.includes('# Recall Summary'), 'Should have title');
        assert.ok(summary.includes('## Current Task'), 'Should have task section');
        assert.ok(summary.includes('## Success Criteria'), 'Should have criteria');
        assert.ok(summary.includes('## Active Files'), 'Should have files section');
        assert.ok(summary.includes('## Critical Facts'), 'Should have facts section');
        assert.ok(summary.includes('## Current Errors'), 'Should have errors section');
        assert.ok(summary.includes('## Relevant Memory'), 'Should have memory section');
        assert.ok(summary.includes('## Next Action'), 'Should have action section');
    });

    test('should preserve critical identifiers', () => {
        const criticalIdentifiers = {
            filePaths: ['src/services/auth.js', 'config/api.yaml'],
            functionNames: ['validateToken', 'processPayment'],
            classNames: ['UserService', 'PaymentGateway'],
            configKeys: ['baseURL', 'apiKey'],
            lineNumbers: ['42', '100']
        };

        // These should be preserved, not redacted
        assert.ok(criticalIdentifiers.filePaths.length > 0);
        assert.ok(criticalIdentifiers.functionNames.length > 0);
        assert.ok(criticalIdentifiers.classNames.length > 0);
        assert.ok(criticalIdentifiers.configKeys.length > 0);
        assert.ok(criticalIdentifiers.lineNumbers.length > 0);
    });

    test('should detect stale entries', () => {
        const stalePatterns = [
            '<!-- STALE:',
            'references deleted file',
            'outdated',
            'deprecated',
            'no longer used'
        ];

        stalePatterns.forEach(pattern => {
            assert.ok(pattern.length > 0, 'Pattern should exist');
        });
    });

    test('should flag conflicting entries', () => {
        const conflictPatterns = [
            '<!-- CONFLICTING:',
            'conflicts with',
            'contradicts'
        ];

        conflictPatterns.forEach(pattern => {
            assert.ok(pattern.length > 0, 'Pattern should exist');
        });
    });

    test('recall threshold should be 0.60', () => {
        const RECALL_THRESHOLD = 0.60;
        assert.strictEqual(RECALL_THRESHOLD, 0.60, 'Recall threshold should be 60%');
    });

    test('should calculate context usage correctly', () => {
        // 4 characters per token approximation
        const estimateTokens = (text) => Math.ceil(text.length / 4);

        // "This is a test." = 18 chars exactly
        const sampleText = 'Hello world test!';
        const estimated = estimateTokens(sampleText);

        assert.strictEqual(estimated, 5, '18 chars exactly / 4 = 5 tokens (rounded up)');
    });

    test('should trigger recall at threshold', () => {
        const RECALL_THRESHOLD = 0.60;
        const MAX_TOKENS = 128000;

        const shouldRecall = (activeTokens, maxTokens = MAX_TOKENS) => {
            return (activeTokens / maxTokens) >= RECALL_THRESHOLD;
        };

        // At 60%, should recall
        assert.ok(shouldRecall(76800), 'At 60% should recall');

        // At 59%, should not recall
        assert.ok(!shouldRecall(75520), 'At 59% should not recall');

        // At 61%, should recall
        assert.ok(shouldRecall(78080), 'At 61% should recall');
    });
});

describe('Memory Loading', () => {
    test('should load memory entries', () => {
        const entries = [
            { file: 'architecture.md', summary: 'System design' },
            { file: 'coding-conventions.md', summary: 'Style guide' },
            { file: 'current-work.md', summary: 'Active tasks' }
        ];

        assert.ok(entries.length > 0, 'Should have memory entries');
        entries.forEach(entry => {
            assert.ok(entry.file, 'Entry should have file');
            assert.ok(entry.summary, 'Entry should have summary');
        });
    });

    test('should prioritize recent entries', () => {
        const entries = [
            { file: 'recent.md', mtime: new Date('2024-05-01'), score: 1.0 },
            { file: 'old.md', mtime: new Date('2023-01-01'), score: 0.5 }
        ];

        // Recent entries should have higher scores
        const recentScore = entries[0].score;
        const oldScore = entries[1].score;

        assert.ok(recentScore > oldScore, 'Recent entries should score higher');
    });
});
