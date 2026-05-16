/**
 * Memory Context Optimizer - Provider Definitions
 * Node.js built-ins only
 */

import { readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, '..', '..');

/**
 * All supported providers
 */
export const PROVIDERS = [
    'gemini',
    'claude',
    'qwen',
    'codex',
    'opencode',
    'cursor',
    'windsurf',
    'cline',
    'copilot',
    'generic'
];

/**
 * Provider configuration
 */
export const PROVIDER_CONFIG = {
    gemini: {
        name: 'Gemini CLI',
        files: ['gemini-extension.json'],
        dir: null,
        cmd: 'gemini extensions install',
        manifest: 'gemini-extension.json'
    },
    claude: {
        name: 'Claude Code',
        files: ['.claude-plugin/plugin.json', 'CLAUDE.md', 'AGENTS.md'],
        dir: '.claude-plugin',
        cmd: null,
        manifest: '.claude-plugin/plugin.json'
    },
    qwen: {
        name: 'Qwen Code',
        files: ['qwen-extension.json', 'skills/memory-context-optimizer/SKILL.md'],
        dir: '.qwen/skills/memory-context-optimizer',
        cmd: null,
        manifest: 'qwen-extension.json'
    },
    codex: {
        name: 'Codex CLI',
        files: ['.codex/AGENTS.md', 'AGENTS.md', 'GEMINI.md'],
        dir: '.codex',
        cmd: null,
        manifest: null
    },
    opencode: {
        name: 'OpenCode',
        files: ['AGENTS.md', 'GEMINI.md'],
        dir: null,
        cmd: null,
        manifest: null
    },
    cursor: {
        name: 'Cursor',
        files: ['AGENTS.md', '.cursorrules'],
        dir: null,
        cmd: null,
        manifest: null
    },
    windsurf: {
        name: 'Windsurf',
        files: ['AGENTS.md', '.windsurfrules'],
        dir: null,
        cmd: null,
        manifest: null
    },
    cline: {
        name: 'Cline',
        files: ['AGENTS.md'],
        dir: null,
        cmd: null,
        manifest: null
    },
    copilot: {
        name: 'Copilot',
        files: ['AGENTS.md'],
        dir: null,
        cmd: null,
        manifest: null
    },
    generic: {
        name: 'Generic Agent',
        files: ['AGENTS.md', 'GEMINI.md', '.memory-context/'],
        dir: '.memory-context',
        cmd: null,
        manifest: null
    }
};

/**
 * Get all providers
 */
export function getProviders() {
    return [...PROVIDERS];
}

/**
 * Detect which providers are likely active
 */
export function detectProviders() {
    const detected = [];

    // Check for CLI binaries
    try {
        execSync('gemini --version', { stdio: 'ignore' });
        detected.push('gemini');
    } catch {}

    try {
        execSync('claude --version', { stdio: 'ignore' });
        detected.push('claude');
    } catch {}

    try {
        execSync('codex --version', { stdio: 'ignore' });
        detected.push('codex');
    } catch {}

    // Always include generic
    detected.push('generic');

    return [...new Set(detected)];
}

/**
 * Get files to install for a provider
 */
export function getProviderFiles(provider) {
    const config = PROVIDER_CONFIG[provider];
    if (!config) {
        throw new Error(`Unknown provider: ${provider}`);
    }
    return config.files;
}

/**
 * Check if provider manifest is valid
 */
export function validateProviderManifest(provider) {
    const config = PROVIDER_CONFIG[provider];
    if (!config || !config.manifest) {
        return { valid: true, message: 'No manifest required' };
    }

    const manifestPath = join(REPO_ROOT, config.manifest);
    if (!existsSync(manifestPath)) {
        return { valid: false, message: `Manifest not found: ${config.manifest}` };
    }

    try {
        const content = readFileSync(manifestPath, 'utf-8');
        JSON.parse(content);
        return { valid: true, message: 'Valid JSON' };
    } catch (e) {
        return { valid: false, message: `Invalid JSON: ${e.message}` };
    }
}

/**
 * Get provider install instructions
 */
export function getProviderInstructions(provider) {
    const config = PROVIDER_CONFIG[provider];
    if (!config) {
        throw new Error(`Unknown provider: ${provider}`);
    }

    switch (provider) {
        case 'gemini':
            return `
Local install: gemini extensions install .
GitHub install: gemini extensions install https://github.com/bantoilatoi/memory-context-optimizer
`;
        case 'claude':
            return `
Copy to project root:
  - .claude-plugin/plugin.json
  - CLAUDE.md
  - AGENTS.md
`;
        case 'qwen':
            return `
Copy to project:
  - qwen-extension.json
  - skills/memory-context-optimizer/ → .qwen/skills/memory-context-optimizer/
`;
        case 'codex':
            return `
Copy to project:
  - .codex/AGENTS.md
  - AGENTS.md (root)
  - GEMINI.md (root)
`;
        case 'opencode':
        case 'cursor':
        case 'windsurf':
        case 'cline':
        case 'copilot':
        case 'generic':
            return `
Copy to project root:
  - AGENTS.md
  - GEMINI.md
`;
        default:
            return '';
    }
}
