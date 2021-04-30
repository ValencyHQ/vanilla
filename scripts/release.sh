echo Enter a release note:
read RELEASE_NOTE

RELEASE_TYPE=${1:-"patch"}
VERSION_NUMBER=$(node ./scripts/get-project-version.js)
PROJECT_NAME=$(node ./scripts/get-project-name.js)

echo "[info]: Bump $PROJECT_NAME (v$VERSION_NUMBER)..."
if [[ $RELEASE_TYPE == "patch" ]]
then
    npm --no-git-tag-version version patch
    cd app
    npm --no-git-tag-version version patch
fi

if [[ $RELEASE_TYPE == "minor" ]]
then
    npm --no-git-tag-version version minor
    cd app
    npm --no-git-tag-version version minor
fi

if [[ $RELEASE_TYPE == "major" ]]
then
    npm --no-git-tag-version version major
    cd app
    npm --no-git-tag-version version major
fi

cd ../

VERSION_NUMBER=$(node ./scripts/getProjectVersion.js)
echo "[info]: New release $PROJECT_NAME (v$VERSION_NUMBER)..."

echo "[info]: Commit release changes..."
pwd
git add .
git commit -m "$RELEASE_NOTE"

echo "[info]: Create v$VERSION_NUMBER tag..."
git tag "v$VERSION_NUMBER"

echo "[info]: Push updates and tag (v$VERSION_NUMBER)..."
git push
git push --tags
echo "[info]: Done!"

