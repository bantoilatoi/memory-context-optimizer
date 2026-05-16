/**
 * Memory Context Optimizer - Plugin Sync Tool
 * Sync source files to plugin mirror
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync, cpSync, rmSync, readdirSync, statSync } from 'node:fs';
import { join, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, '..', '..');
const PLUGIN_DIR = join(REPO_ROOT, 'plugins', 'memory-context-optimizer');

// Source directories to sync
const SOURCE_DIRS = [
    { src: 'skills', dest: 'skills' },
    { src: 'agents', dest: 'agents' },
    { src: 'commands', dest: 'commands' }
];

// Skills to include
const INCLUDE_SKILLS = [
    'memory-context-optimizer',
    'memory-recall',
    'memory-compress',
    'memory-rank',
    'memory-audit',
    'memory-init'
];

// Agents to include
const INCLUDE_AGENTS = [
    'memory-curator.md',
    'context-ranker.md',
    'context-recaller.md',
    'log-compressor.md',
    'security-redaction-agent.md'
];

/**
 * Sync files to plugin directory
 */
export function syncPlugin(options = {}) {
    const { dryRun = false, check = false, force = false } = options;

    console.log(`${dryRun ? '[DRY RUN] ' : ''}Syncing to plugin mirror...\n`);

    // Ensure plugin directory exists
    const pluginReadme = join(PLUGIN_DIR, 'README.md');
    if (!existsSync(PLUGIN_DIR)) {
        if (!dryRun) {
            mkdirSync(PLUGIN_DIR, { recursive: true });
        }
        console.log(`  ✓ Created ${PLUGIN_DIR}/`);
    }

    // Sync skills
    console.log('\n## Skills');
    INCLUDE_SKILLS.forEach(skill => {
        const srcDir = join(REPO_ROOT, 'skills', skill);
        const destDir = join(PLUGIN_DIR, 'skills', skill);

        if (!existsSync(srcDir)) {
            console.log(`  ✗ ${skill}/: source not found`);
            return;
        }

        if (!existsSync(destDir)) {
            if (!dryRun) {
                mkdirSync(join(PLUGIN_DIR, 'skills'), { recursive: true });
                cpSync(srcDir, destDir, { recursive: true });
            }
            console.log(`  ✓ ${skill}/: synced`);
        } else if (force) {
            if (!dryRun) {
                rmSync(destDir, { recursive: true });
                cpSync(srcDir, destDir, { recursive: true });
            }
            console.log(`  ✓ ${skill}/: force synced`);
        } else {
            console.log(`  ○ ${skill}/: exists (use --force to overwrite)`);
        }
    });

    // Sync agents
    console.log('\n## Agents');
    const agentsSrcDir = join(REPO_ROOT, 'agents');
    const agentsDestDir = join(PLUGIN_DIR, 'agents');

    if (!existsSync(agentsDestDir)) {
        if (!dryRun) {
            mkdirSync(agentsDestDir, { recursive: true });
        }
    }

    INCLUDE_AGENTS.forEach(agent => {
        const srcFile = join(agentsSrcDir, agent);
        const destFile = join(agentsDestDir, agent);

        if (!existsSync(srcFile)) {
            console.log(`  ✗ ${agent}: source not found`);
            return;
        }

        if (!existsSync(destFile) || force) {
            if (!dryRun) {
                cpSync(srcFile, destFile);
            }
            console.log(`  ✓ ${agent}: synced`);
        } else {
            console.log(`  ○ ${agent}: exists`);
        }
    });

    // Sync commands (as markdown)
    console.log('\n## Commands');
    const commandsSrcDir = join(REPO_ROOT, 'commands');
    const commandsDestDir = join(PLUGIN_DIR, 'commands');

    if (!existsSync(commandsDestDir)) {
        if (!dryRun) {
            mkdirSync(commandsDestDir, { recursive: true });
        }
    }

    const commandFiles = readdirSync(commandsSrcDir).filter(f => f.endsWith('.toml'));

    commandFiles.forEach(cmdFile => {
        const srcFile = join(commandsSrcDir, cmdFile);
        const destFile = join(commandsDestDir, cmdFile.replace('.toml', '.md'));

        // Convert TOML to markdown stub
        if (!existsSync(destFile) || force) {
            if (!dryRun) {
                const content = readFileSync(srcFile, 'utf-8');
                const markdown = tomlToMarkdown(content);
                writeFileSync(destFile, markdown, 'utf-8');
            }
            console.log(`  ✓ ${cmdFile} → ${cmdFile.replace('.toml', '.md')}`);
        } else {
            console.log(`  ○ ${cmdFile}: exists`);
        }
    });

    // Ensure plugin.json exists
    const pluginJson = join(PLUGIN_DIR, 'plugin.json');
    const srcPluginJson = join(REPO_ROOT, 'plugins', 'memory-context-optimizer', 'plugin.json');

    if (existsSync(srcPluginJson) && (!existsSync(pluginJson) || force)) {
        if (!dryRun) {
            cpSync(srcPluginJson, pluginJson);
        }
        console.log('\n  ✓ plugin.json: synced');
    }

    // Ensure README exists
    if (!existsSync(pluginReadme)) {
        if (!dryRun) {
            const readme = `# Memory Context Optimizer Plugin

This is the Claude Code plugin distribution for memory-context-optimizer.

## Contents

- \`skills/\` - Agent skills
- \`agents/\` - Subagent definitions
- \`commands/\` - Command stubs
- \`plugin.json\` - Plugin manifest

## Installation

Copy this directory to your project's \`.claude/plugins/\` directory.
`;
            writeFileSync(pluginReadme, readme, 'utf-8');
        }
        console.log('\n  ✓ README.md: created');
    }

    console.log(`\n${dryRun ? '[DRY RUN] ' : ''}Sync complete.`);

    return { success: true };
}

/**
 * Convert TOML command to Markdown stub
 */
function tomlToMarkdown(tomlContent) {
    const lines = tomlContent.split('\n');
    let description = '';
    let prompt = '';
    let inPrompt = false;

    lines.forEach(line => {
        if (line.startsWith('description = ')) {
            description = line.replace('description = ', '').replace(/^["']|["']$/g, '');
        } else if (line.startsWith('prompt = ')) {
            inPrompt = true;
            prompt = line.replace('prompt = ', '').replace(/^["']|["']$/g, '');
        } else if (inPrompt && line.trim().startsWith('"') && !line.includes('=')) {
            prompt += '\n' + line.replace(/^["']|["']$/g, '');
        }
    });

    return `# ${description}

${prompt.trim()}

<!-- Generated from commands/${basename(tomlContent)} -->
`;
}

/**
 * Check sync status
 */
export function checkSync() {
    const issues = [];

    // Check skills
    INCLUDE_SKILLS.forEach(skill => {
        const srcDir = join(REPO_ROOT, 'skills', skill);
        const destDir = join(PLUGIN_DIR, 'skills', skill);

        if (!existsSync(srcDir)) {
            issues.push(`Source skill missing: ${skill}`);
        } else if (!existsSync(destDir)) {
            issues.push(`Plugin skill missing: ${skill}`);
        } else {
            // Check files
            const srcFiles = readdirSync(srcDir);
            const destFiles = readdirSync(destDir);

            srcFiles.forEach(f => {
                if (!destFiles.includes(f)) {
                    issues.push(`Skill file not synced: ${skill}/${f}`);
                }
            });
        }
    });

    return {
        synced: issues.length === 0,
        issues
    };
}

// CLI entry point
if (import.meta.url === `file://${process.argv[1]}`) {
    const args = process.argv.slice(2);
    const dryRun = args.includes('--dry-run');
    const check = args.includes('--check');
    const force = args.includes('--force');

    if (check) {
        console.log('Checking sync status...\n');
        const result = checkSync();
        if (result.synced) {
            console.log('✓ All files synced');
        } else {
            console.log('Issues found:');
            result.issues.forEach(i => console.log(`  - ${i}`));
            process.exit(1);
        }
    } else {
        syncPlugin({ dryRun, force });
    }
}
