#!/bin/sh
# Memory Context Optimizer - Unix/macOS Installer
# Requires: Node.js v20+

set -e

INSTALL_JS="bin/install.js"

if [ ! -f "$INSTALL_JS" ]; then
    echo "Error: install.js not found. Run from repository root."
    exit 1
fi

node "$INSTALL_JS" "$@"
