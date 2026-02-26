#!/bin/bash

set -e

# Ensure repo is clean and pushed
if [[ -n $(git status --porcelain) ]]; then
  echo "Repository has uncommitted changes. Please commit or stash them first."
  exit 1
fi

git fetch
LOCAL=$(git rev-parse @)
REMOTE=$(git rev-parse @{u})

if [[ $LOCAL != $REMOTE ]]; then
  echo "Local branch is not up to date with remote. Please push or pull first."
  exit 1
fi

# Run build:embed script
npm run build:embed

# Get version from package.json
VERSION=$(jq -r .version package.json)
TAG="v$VERSION"

# Create and push tag
git tag "$TAG"
git push origin "$TAG"

# Create GitHub release and attach files from dist/embed
ASSETS=$(find dist/embed -type f | tr '\n' ' ')
gh release create "$TAG" $ASSETS --title "$TAG" --notes "Release $TAG"

echo "Release $TAG created and assets uploaded."