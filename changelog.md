# Changelog

## v1.3.0

- #112: Update to Node v20.11.0 LTS and address all related issues. [revision]
- #111: cache.ts::readCache routine can inadvertently return undefined if path isn't in the cache and the file doesn't exist.  [bug]
- #110: Remove logging metrics for css files. [revision]
- #109: Add changelog to project. [documentation, feature]
- #107: Rename  function serializeCSSFolder to  serializeCSSLIbsFolder. [revision]
- #106: Update README.md to reflect v1.3.0. [documentation, revision]
- #105: Update Buster dependency to v1.1.1. [revision]
- #103: Console output related to Typescript compilation should identify being for either components or for browser scripts. [bug, revision]
- #102: Ignore script and code tags during tokenization. [feature, revision]
- #101: Include tokens in code blocks are being reported as unresolved. [bug]
- #100: CSS files should be first class assets to support {baseURL} tokenizatiion. [feature, revision]
- #98: Unresolved token reporting drops the last closing brace for include tokens. [bug, revision]
- #97: Log warning to the console if user project does not have a 404.html document. [feature, revision]
- #96: Though template front matter is documented as a requirement, this is not enforced in the codebase. [wontfix, revision]
- #95: Update  to Node v18.18.0 LTS and address all related issues. [revision]
- #94: Include cache bust metric when release is called without the --verbose option and is called with the --cache-bust option. [revision]
- #93: Refactor the cli help to accommodate multiple command options. [feature]
- #92: Provide CLI --verbose logging option. [feature, revision]
- #91: Update Buster dependency to v1.1.0. [revision]
