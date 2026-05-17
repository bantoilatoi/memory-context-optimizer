/**
 * Memory Context Optimizer - Validation Tests
 */

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, '..');

describe('Repository Validation', () => {
    test('should have required root files', () => {
        const required = [
            'README.md',
            'INSTALL.md',
            'CLAUDE.md',
            'AGENTS.md',
            'GEMINI.md',
            'package.json',
            'gemini-extension.json',
            'qwen-extension.json'
        ];

        required.forEach(file => {
            const path = join(REPO_ROOT, file);
            assert.ok(existsSync(path), `Missing required file: ${file}`);
        });
    });

    test('should have required directories', () => {
        const required = [
            'skills',
            'agents',
            'commands',
            'plugins/memory-context-optimizer',
            'src/tools',
            'context',
            'prompts'
        ];

        required.forEach(dir => {
            const path = join(REPO_ROOT, dir);
            assert.ok(existsSync(path), `Missing required directory: ${dir}`);
        });
    });

    test('should have all required skills', () => {
        const skills = [
            'memory-context-optimizer',
            'memory-recall',
            'memory-compress',
            'memory-rank',
            'memory-audit',
            'memory-init'
        ];

        skills.forEach(skill => {
            const skillFile = join(REPO_ROOT, 'skills', skill, 'SKILL.md');
            assert.ok(existsSync(skillFile), `Missing skill: ${skill}/SKILL.md`);
        });
    });

    test('should have valid JSON manifests', () => {
        const manifests = [
            'gemini-extension.json',
            'qwen-extension.json',
            '.claude-plugin/plugin.json',
            'plugins/memory-context-optimizer/plugin.json',
            'package.json'
        ];

        manifests.forEach(file => {
            const path = join(REPO_ROOT, file);
            if (existsSync(path)) {
                const content = readFileSync(path, 'utf-8');
                assert.doesNotThrow(() => {
                    JSON.parse(content);
                }, `Invalid JSON: ${file}`);
            }
        });
    });

    test('should not have deprecated memory path references except in migration notes', () => {
        const forbidden = '.ai' + '/memory';
        const violations = [];

        function scanDir(dir, depth = 0) {
            if (depth > 5) return;
            try {
                const entries = readdirSync(dir);
                entries.forEach(entry => {
                    if (entry === 'node_modules' || entry === '.git') return;
                    const fullPath = join(dir, entry);
                    const stat = statSync(fullPath);
                    if (stat.isDirectory()) {
                        scanDir(fullPath, depth + 1);
                    } else if (stat.isFile() && !entry.endsWith('.original.md')) {
                        try {
                            const content = readFileSync(fullPath, 'utf-8');
                            if (content.includes(forbidden)) {
                                // Allow if it's in a migration/deprecation note
                                // Check for various valid patterns
                                const lines = content.split('\n');
                                let hasViolation = true;
                                for (const line of lines) {
                                    // Skip checklist items, documentation, code references
                                    if (line.match(/\[.*\].*.ai\/memory/i)) { hasViolation = false; break; }
                                    if (line.match(/`.*\.ai\/memory.*`/i)) { hasViolation = false; break; }
                                    if (line.match(/deprecated.*\.ai\/memory/i)) { hasViolation = false; break; }
                                    if (line.match(/\.ai\/memory.*deprecated/i)) { hasViolation = false; break; }
                                    if (line.match(/Never use.*\.ai\/memory/i)) { hasViolation = false; break; }
                                    if (line.match(/not.*\.ai\/memory/i)) { hasViolation = false; break; }
                                    if (line.match(/check.*\.ai\/memory/i)) { hasViolation = false; break; }
                                    if (line.match(/"\.ai\/memory"/i)) { hasViolation = false; break; }
                                    if (line.match(/'.ai\/memory'/i)) { hasViolation = false; break; }
                                }
                                if (hasViolation) {
                                    violations.push(fullPath.replace(REPO_ROOT + '/', ''));
                                }
                            }
                        } catch {}
                    }
                });
            } catch {}
        }

        scanDir(REPO_ROOT);

        assert.strictEqual(violations.length, 0, `Found deprecated memory path in (not in migration notes): ${violations.join(', ')}`);
    });

    test('should not have Python in JavaScript files', () => {
        const violations = [];
        // Pattern for actual Python usage, not documentation
        const pythonPattern = /import\s+.*python|from\s+['"]python|require\s*\(\s*['"]python|spawn\s*\(\s*['"]python|execSync\s*\(\s*['"]python/i;

        function scanDir(dir, depth = 0) {
            if (depth > 5) return;
            try {
                const entries = readdirSync(dir);
                entries.forEach(entry => {
                    if (entry === 'node_modules' || entry === '.git') return;
                    const fullPath = join(dir, entry);
                    const stat = statSync(fullPath);
                    if (stat.isDirectory()) {
                        scanDir(fullPath, depth + 1);
                    } else if (stat.isFile() && entry.endsWith('.js')) {
                        try {
                            const content = readFileSync(fullPath, 'utf-8');
                            // Filter out comments and doc strings
                            const codeLines = content.split('\n').filter(line => {
                                const trimmed = line.trim();
                                if (trimmed.startsWith('//')) return false;
                                if (trimmed.startsWith('/*') || trimmed.endsWith('*/')) return false;
                                if (trimmed.startsWith('*')) return false;
                                return true;
                            }).join('\n');
                            if (pythonPattern.test(codeLines)) {
                                violations.push(fullPath.replace(REPO_ROOT + '/', ''));
                            }
                        } catch {}
                    }
                });
            } catch {}
        }

        scanDir(join(REPO_ROOT, 'bin'));
        scanDir(join(REPO_ROOT, 'src'));

        assert.strictEqual(violations.length, 0, `Python in JS files: ${violations.join(', ')}`);
    });

    test('should have Node.js >= 20 in package.json', () => {
        const pkgPath = join(REPO_ROOT, 'package.json');
        const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'));

        assert.ok(pkg.engines?.node, 'Missing engines.node in package.json');
        const version = pkg.engines.node;
        assert.ok(version.startsWith('>='), 'Node version should be >=20');
        assert.ok(version.includes('20'), 'Node version should be 20+');
    });

    test('should have no required dependencies', () => {
        const pkgPath = join(REPO_ROOT, 'package.json');
        const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'));

        // Runtime dependencies should be empty
        assert.ok(
            !pkg.dependencies || Object.keys(pkg.dependencies).length === 0,
            'Should have no runtime dependencies'
        );
    });

    test('should have all command TOML files', () => {
        const commands = [
            'memory-init.toml',
            'memory-recall.toml',
            'memory-rank.toml',
            'memory-compress.toml',
            'memory-audit.toml',
            'memory-status.toml'
        ];

        commands.forEach(cmd => {
            const path = join(REPO_ROOT, 'commands', cmd);
            assert.ok(existsSync(path), `Missing command: ${cmd}`);

            // Verify has required fields
            const content = readFileSync(path, 'utf-8');
            assert.ok(content.includes('description'), `${cmd} missing description`);
            assert.ok(content.includes('prompt'), `${cmd} missing prompt`);
        });
    });

    test('should have skills with YAML frontmatter', () => {
        const skills = [
            'memory-context-optimizer',
            'memory-recall',
            'memory-compress',
            'memory-rank',
            'memory-audit',
            'memory-init'
        ];

        skills.forEach(skill => {
            const skillFile = join(REPO_ROOT, 'skills', skill, 'SKILL.md');
            const content = readFileSync(skillFile, 'utf-8');
            assert.ok(
                content.startsWith('---'),
                `${skill}/SKILL.md should start with YAML frontmatter`
            );
        });
    });

    test('should have agent files with required sections', () => {
        const agents = readdirSync(join(REPO_ROOT, 'agents')).filter(f => f.endsWith('.md'));

        assert.ok(agents.length > 0, 'Should have agent files');

        agents.forEach(agent => {
            const path = join(REPO_ROOT, 'agents', agent);
            const content = readFileSync(path, 'utf-8');

            // Check for common sections
            const hasRole = content.includes('## Role') || content.includes('Role');
            const hasResponsibilities = content.includes('## Responsibilities') || content.includes('Responsibilities');

            assert.ok(
                hasRole || hasResponsibilities,
                `${agent} should have Role or Responsibilities section`
            );
        });
    });
});
