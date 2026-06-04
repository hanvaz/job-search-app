#!/bin/bash

# Job Search Setup Script

echo "================================"
echo "Job Search Installation Script"
echo "================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null
then
    echo "❌ Node.js is not installed. Please install it from https://nodejs.org"
    exit 1
fi

echo "✅ Node.js is installed: $(node -v)"
echo "✅ npm is installed: $(npm -v)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

echo ""
echo "✅ Installation complete!"
echo ""
echo "To start development:"
echo "  - Backend only:      npm run server"
echo "  - Frontend only:     npm run dev"
echo "  - Both (recommended): npm run dev:full"
echo ""
echo "Open http://localhost:5173 in your browser"
