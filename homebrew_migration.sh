#!/bin/bash
# Homebrew Migration Script
# This script helps standardize your development environment to use Homebrew exclusively

# Step 1: Uninstall manual installations
echo "=== Uninstalling manual installations ==="

# Uninstall Google Cloud SDK
echo "Removing Google Cloud SDK..."
if [ -d "$HOME/google-cloud-sdk" ]; then
  $HOME/google-cloud-sdk/install.sh --quiet --usage-reporting=false --command-completion=false --path-update=false --uninstall
  rm -rf $HOME/google-cloud-sdk
  echo "Google Cloud SDK removed."
else
  echo "Google Cloud SDK not found in expected location."
fi

# Uninstall Node.js
echo "Removing manually installed Node.js..."
if [ -f "/usr/local/bin/node" ]; then
  sudo rm -rf /usr/local/bin/node /usr/local/bin/npm /usr/local/lib/node_modules
  sudo rm -rf /usr/local/include/node
  echo "Manual Node.js installation removed."
else
  echo "Manual Node.js not found in expected location."
fi

# Step 2: Install via Homebrew
echo -e "\n=== Installing tools via Homebrew ==="

# Install Google Cloud SDK
echo "Installing Google Cloud SDK via Homebrew..."
brew install --cask google-cloud-sdk

# Install Node.js (latest LTS)
echo "Installing Node.js via Homebrew..."
brew install node@22

# Step 3: Update PATH in shell config
echo -e "\n=== Updating PATH configuration ==="

# Create a backup of existing configuration
cp ~/.zshrc ~/.zshrc.backup.$(date +%Y%m%d)
cp ~/.zprofile ~/.zprofile.backup.$(date +%Y%m%d)

# Update .zshrc with standardized PATH
cat > ~/.zshrc << 'EOL'
# Homebrew setup (core)
eval "$(/opt/homebrew/bin/brew shellenv)"

# Node.js (from Homebrew)
export PATH="/opt/homebrew/opt/node@22/bin:$PATH"

# Java (from Homebrew)
export PATH="/opt/homebrew/opt/openjdk@11/bin:$PATH"

# Google Cloud SDK (from Homebrew)
source "/opt/homebrew/Caskroom/google-cloud-sdk/latest/google-cloud-sdk/path.zsh.inc"
source "/opt/homebrew/Caskroom/google-cloud-sdk/latest/google-cloud-sdk/completion.zsh.inc"

# Development settings
export NODE_OPTIONS="--no-deprecation"
EOL

# Create minimal .zprofile
cat > ~/.zprofile << 'EOL'
eval "$(/opt/homebrew/bin/brew shellenv)"
EOL

echo -e "\nSetup complete! Please restart your terminal or run 'source ~/.zshrc'."
echo "Your previous configurations were backed up with the date suffix."