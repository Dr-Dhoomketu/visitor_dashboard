#!/usr/bin/env bash
set -e

# Build the API server
echo "Building API server..."
cd /home/runner/workspace/artifacts/api-server
pnpm run build

# Start API server on port 3001 in background
echo "Starting API server on port 3001..."
PORT=3001 pnpm run start &
API_PID=$!

# Start the Vite UI on port 5000 in foreground
echo "Starting UI on port 5000..."
cd /home/runner/workspace/artifacts/vms-ui
PORT=5000 pnpm run dev

# Cleanup on exit
kill $API_PID 2>/dev/null || true
