# Changelog

## v1.3.0

- #115: Add labels to changelog items and reformat changelog items to display as item number, item title, labels. [<span style="color: #D4C5F9;">documentation</span>, <span style="color: #E99695;">revision</span>]
- #112: Update to Node v20.11.0 LTS and address all related issues. [<span style="color: #E99695;">revision</span>]
- #111: cache.ts::readCache routine can inadvertently return undefined if path isn't in the cache and the file doesn't exist.  [<span style="color: #d73a4a;">bug</span>]
- #110: Remove logging metrics for css files. [<span style="color: #E99695;">revision</span>]
- #109: Add changelog to project. [<span style="color: #D4C5F9;">documentation</span>, <span style="color: #a2eeef;">feature</span>]
- #107: Rename  function serializeCSSFolder to  serializeCSSLIbsFolder. [<span style="color: #E99695;">revision</span>]
- #106: Update README.md to reflect v1.3.0. [<span style="color: #D4C5F9;">documentation</span>, <span style="color: #E99695;">revision</span>]
- #105: Update Buster dependency to v1.1.1. [<span style="color: #E99695;">revision</span>]
- #103: Console output related to Typescript compilation should identify being for either components or for browser scripts. [<span style="color: #d73a4a;">bug</span>, <span style="color: #E99695;">revision</span>]
- #102: Ignore script and code tags during tokenization. [<span style="color: #a2eeef;">feature</span>, <span style="color: #E99695;">revision</span>]
- #101: Include tokens in code blocks are being reported as unresolved. [<span style="color: #d73a4a;">bug</span>]
- #100: CSS files should be first class assets to support {baseURL} tokenizatiion. [<span style="color: #a2eeef;">feature</span>, <span style="color: #E99695;">revision</span>]
- #98: Unresolved token reporting drops the last closing brace for include tokens. [<span style="color: #d73a4a;">bug</span>, <span style="color: #E99695;">revision</span>]
- #97: Log warning to the console if user project does not have a 404.html document. [<span style="color: #a2eeef;">feature</span>, <span style="color: #E99695;">revision</span>]
- #96: Though template front matter is documented as a requirement, this is not enforced in the codebase. [<span style="color: #ffffff;">wontfix</span>, <span style="color: #E99695;">revision</span>]
- #95: Update  to Node v18.18.0 LTS and address all related issues. [<span style="color: #E99695;">revision</span>]
- #94: Include cache bust metric when release is called without the --verbose option and is called with the --cache-bust option. [<span style="color: #E99695;">revision</span>]
- #93: Refactor the cli help to accommodate multiple command options. [<span style="color: #a2eeef;">feature</span>]
- #92: Provide CLI --verbose logging option. [<span style="color: #a2eeef;">feature</span>, <span style="color: #E99695;">revision</span>]
- #91: Update Buster dependency to v1.1.0. [<span style="color: #E99695;">revision</span>]
