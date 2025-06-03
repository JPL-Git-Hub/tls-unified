#!/bin/bash
# Homebrew Migration Test Script
# Run this after the migration to verify tools are working correctly

echo "=== Testing Homebrew-installed tools ==="

# Test Google Cloud SDK
echo -e "\n--- Testing Google Cloud SDK ---"
which gcloud
gcloud --version

# Test Node.js
echo -e "\n--- Testing Node.js ---"
which node
node -v
which npm
npm -v

# Test Java
echo -e "\n--- Testing Java ---"
which java
java -version

# Test Git
echo -e "\n--- Testing Git ---"
which git
git --version

# Test Python
echo -e "\n--- Testing Python ---"
which python3
python3 --version

echo -e "\n=== PATH Environment ===\n"
echo $PATH

echo -e "\n=== Test Complete ==="
echo "If any command failed, make sure to restart your terminal or run 'source ~/.zshrc' after migration"