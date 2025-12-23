#!/bin/bash
set -e

# Navigate to the app directory (relative to this script)
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR/.." || exit

echo "--- Working directory: $(pwd) ---"

# Get ENVIRONMENT from .env file
if [ -f .env ]; then
  ENVIRONMENT=$(grep -E '^ENVIRONMENT=' .env | cut -d '=' -f2 | tr -d '"' | tr -d "'" | tr '[:upper:]' '[:lower:]')
fi

if [ -z "$ENVIRONMENT" ]; then
    echo "Error: ENVIRONMENT variable was not found in .env file."
    exit 1
fi

echo "--- Environment: ${ENVIRONMENT} ---"

node --version
npm --version

# Ensure PM2 is installed globally
if ! command -v pm2 &> /dev/null; then
    echo "--- PM2 not found, installing globally ---"
    npm install pm2 -g
fi

echo "--- Installing dependencies ---"
npm install --omit=dev

echo '--- DEBUG: Starting PM2 ---'

echo "--> Stopping and deleting ALL existing PM2 processes to ensure a clean environment..."
pm2 delete all || true

echo "--> Starting new PM2 process for '${ENVIRONMENT}'..."
pm2 start ecosystem.config.cjs --only ${ENVIRONMENT}

pm2 save

echo "--- Displaying final PM2 status ---"
pm2 list
