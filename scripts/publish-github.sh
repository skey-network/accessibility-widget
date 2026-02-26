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

mkdir -p release
cp -r dist/embed/* release/

# Get version from package.json
VERSION=$(jq -r .version package.json)
TAG="v$VERSION"

git add release
git commit -m "Release $TAG" --no-verify || true
git push origin main

# Create and push tag
git tag "$TAG"
git push origin "$TAG"

GH_BASE_URL="https://github.com/skey-network/accessibility-widget/blob"

echo "Released files:"

# Print GitHub URLs for each file in release
for file in $(find release -type f); do
  echo "$GH_BASE_URL/$TAG/$file"
done