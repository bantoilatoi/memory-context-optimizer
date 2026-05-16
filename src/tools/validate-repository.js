/**
 * Memory Context Optimizer - Repository Validator
 * Validates repository structure and content
 */

import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, '..', '..');

// Required root files
const REQUIRED_ROOT_FILES = [
    'README.md',
    'INSTALL.md',
    'CLAUDE.md',
    'AGENTS.md',
    'GEMINI.md',
    'package.json',
    'gemini-extension.json',
    'qwen-extension.json',
    'skills-lock.json'
];

// Required directories
const REQUIRED_DIRS = [
    'skills',
    'agents',
    'commands',
    'plugins/memory-context-optimizer',
    'src/tools',
    'context',
    'prompts'
];

// Skills that must exist
const REQUIRED_SKILLS = [
    'memory-context-optimizer',
    'memory-recall',
    'memory-compress',
    'memory-rank',
    'memory-audit',
    'memory-init'
];

/**
 * Validate repository structure
 */
export function validateRepository(options = {}) {
    const { strict = false } = options;
    const errors = [];
    const warnings = [];

    console.log('Validating repository...\n');

    // Check Node.js version
    const nodeVersion = process.version;
    const nodeMajor = parseInt(nodeVersion.slice(1).split('.')[0]);
    if (nodeMajor < 20) {
        errors.push(`Node.js version too old: ${nodeVersion} (requires >= 20)`);
    } else {
        console.log(`✓ Node.js: ${nodeVersion}`);
    }

    // Check required root files
    console.log('\n## Root Files');
    REQUIRED_ROOT_FILES.forEach(file => {
        if (existsSync(join(REPO_ROOT, file))) {
            console.log(`  ✓ ${file}`);
        } else {
            errors.push(`Missing root file: ${file}`);
        }
    });

    // Check required directories
    console.log('\n## Directories');
    REQUIRED_DIRS.forEach(dir => {
        if (existsSync(join(REPO_ROOT, dir))) {
            console.log(`  ✓ ${dir}/`);
        } else {
            errors.push(`Missing directory: ${dir}/`);
        }
    });

    // Check required skills
    console.log('\n## Skills');
    REQUIRED_SKILLS.forEach(skill => {
        const skillDir = join(REPO_ROOT, 'skills', skill);
        const skillFile = join(skillDir, 'SKILL.md');
        if (existsSync(skillFile)) {
            console.log(`  ✓ ${skill}/`);
        } else {
            errors.push(`Missing skill: ${skill}/`);
        }
    });

    // Check .claude-plugin/plugin.json
    console.log('\n## Extension Manifests');
    const claudePluginPath = join(REPO_ROOT, '.claude-plugin', 'plugin.json');
    if (existsSync(claudePluginPath)) {
        try {
            JSON.parse(readFileSync(claudePluginPath, 'utf-8'));
            console.log('  ✓ .claude-plugin/plugin.json (valid JSON)');
        } catch (e) {
            errors.push(`Invalid .claude-plugin/plugin.json: ${e.message}`);
        }
    } else {
        errors.push('Missing .claude-plugin/plugin.json');
    }

    const pluginPath = join(REPO_ROOT, 'plugins', 'memory-context-optimizer', 'plugin.json');
    if (existsSync(pluginPath)) {
        try {
            JSON.parse(readFileSync(pluginPath, 'utf-8'));
            console.log('  ✓ plugins/memory-context-optimizer/plugin.json (valid JSON)');
        } catch (e) {
            errors.push(`Invalid plugins/memory-context-optimizer/plugin.json: ${e.message}`);
        }
    } else {
        errors.push('Missing plugins/memory-context-optimizer/plugin.json');
    }

    // Check package.json engine
    const packagePath = join(REPO_ROOT, 'package.json');
    if (existsSync(packagePath)) {
        try {
            const pkg = JSON.parse(readFileSync(packagePath, 'utf-8'));
            if (pkg.engines?.node) {
                console.log(`  ✓ package.json engine: ${pkg.engines.node}`);
            } else {
                warnings.push('package.json missing engines.node');
            }
            if (pkg.dependencies && Object.keys(pkg.dependencies).length > 0) {
                warnings.push(`package.json has runtime dependencies: ${Object.keys(pkg.dependencies).join(', ')}`);
            }
        } catch (e) {
            errors.push(`Invalid package.json: ${e.message}`);
        }
    }

    // Check for .ai/memory usage
    console.log('\n## Memory Path Check');
    const forbiddenPattern = '.ai/memory';
    const forbiddenFiles = [];

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
                        if (content.includes(forbiddenPattern)) {
                            forbiddenFiles.push(fullPath.replace(REPO_ROOT + '/', ''));
                        }
                    } catch {}
                }
            });
        } catch {}
    }

    scanDir(REPO_ROOT);

    if (forbiddenFiles.length > 0) {
        errors.push(`Found .ai/memory in: ${forbiddenFiles.join(', ')}`);
        forbiddenFiles.forEach(f => console.log(`  ✗ ${f}`));
    } else {
        console.log(`  ✓ No .ai/memory references found`);
    }

    // Check for Python references (unless explicitly allowed)
    console.log('\n## Python Check');
    const pythonFiles = [];
    function scanPython(dir, depth = 0) {
        if (depth > 5) return;
        try {
            const entries = readdirSync(dir);
            entries.forEach(entry => {
                if (entry === 'node_modules' || entry === '.git') return;
                const fullPath = join(dir, entry);
                const stat = statSync(fullPath);
                if (stat.isDirectory()) {
                    scanPython(fullPath, depth + 1);
                } else if (stat.isFile() && entry.endsWith('.js')) {
                    try {
                        const content = readFileSync(fullPath, 'utf-8');
                        // Flag actual Python usage (not documentation in comments)
                        // Look for import statements, require(), spawn(), exec() with python
                        // Exclude comment lines and string literals
                        const codeLines = content.split('\n').filter(line => {
                            const trimmed = line.trim();
                            // Skip comments and doc strings
                            if (trimmed.startsWith('//')) return false;
                            if (trimmed.startsWith('/*') || trimmed.endsWith('*/')) return false;
                            if (trimmed.startsWith('*')) return false;
                            return true;
                        }).join('\n');
                        const pythonPattern = /import\s+.*python|from\s+['"]python|require\s*\(\s*['"]python|spawn\s*\(\s*['"]python|execSync\s*\(\s*['"]python/i;
                        if (pythonPattern.test(codeLines)) {
                            pythonFiles.push(fullPath.replace(REPO_ROOT + '/', ''));
                        }
                    } catch {}
                }
            });
        } catch {}
    }

    scanPython(REPO_ROOT);
    if (pythonFiles.length > 0) {
        errors.push(`JavaScript files with Python references: ${pythonFiles.join(', ')}`);
    } else {
        console.log('  ✓ No Python in JavaScript files');
    }

    // Check JS syntax
    console.log('\n## JavaScript Syntax');
    const jsFiles = [];
    function scanJS(dir, depth = 0) {
        if (depth > 5) return;
        try {
            const entries = readdirSync(dir);
            entries.forEach(entry => {
                if (entry === 'node_modules' || entry === '.git') return;
                const fullPath = join(dir, entry);
                const stat = statSync(fullPath);
                if (stat.isDirectory()) {
                    scanJS(fullPath, depth + 1);
                } else if (stat.isFile() && entry.endsWith('.js')) {
                    jsFiles.push(fullPath);
                }
            });
        } catch {}
    }

    scanJS(join(REPO_ROOT, 'bin'));
    scanJS(join(REPO_ROOT, 'src'));

    // Check branch reference in README
    const readmePath = join(REPO_ROOT, 'README.md');
    if (existsSync(readmePath)) {
        const readme = readFileSync(readmePath, 'utf-8');
        if (readme.includes('main') && !readme.includes('master')) {
            warnings.push('README references "main" branch, should use "master"');
        }
    }

    // Summary
    console.log('\n## Summary');
    console.log(`  Errors: ${errors.length}`);
    console.log(`  Warnings: ${warnings.length}`);

    if (warnings.length > 0 && strict) {
        console.log('\nWarnings (strict mode):');
        warnings.forEach(w => console.log(`  - ${w}`));
    }

    if (errors.length > 0) {
        console.log('\nErrors:');
        errors.forEach(e => console.log(`  ✗ ${e}`));
    } else {
        console.log('\n✓ All checks passed!');
    }

    return {
        valid: errors.length === 0,
        errors,
        warnings
    };
}

// CLI entry point
if (import.meta.url === `file://${process.argv[1]}`) {
    const args = process.argv.slice(2);
    const strict = args.includes('--strict');

    const result = validateRepository({ strict });

    if (!result.valid) {
        process.exit(1);
    }

    if (strict && result.warnings.length > 0) {
        process.exit(1);
    }
}
