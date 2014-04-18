#!/bin/bash
MDOC_VERSION = 0.1
GITHUB_REPO = ""

# clone repo and create orphan branch for github pages
git clone $GITHUB_REPO
git checkout --orphan gh-pages
rm -rf !(README.md | README | LICENCE)

# download mdoc index file
GITHUB_LINK = "raw.githubusercontent.com/chutsu/mdoc/master/ver"
MDOC_INDEX = "$MDOC_VERSION/index.html"
curl -o https://$GITHUB_LINK/$MDOC_INDEX

# create sidebar file
touch sidebar.md
echo "- [example](#docs/example)" > sidebar.md

# create dummy doc file
mkdir docs/example.md
echo "hello world! :)" > example.md

# add changes, commit and push changes to github
git add -u
git add index.html
git add sidebar.html
git add docs

git commit -m "Add initial mdoc pages"
git push origin gh-pages
