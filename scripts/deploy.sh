git checkout dist
rm -rf dist
git add .
git commit -m 'delete old file'
git push
git checkout master

npm run build
git checkout dist
git add .
git commit -m 'update a new version'
git push
git checkout master
