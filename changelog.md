# Changelog

## v1.3.0

- Update README.md to reflect v1.3.0. #106 

- Update to Node v20.11.0 LTS and address all related issues. #112 

- cache.ts::readCache routine can inadvertently return undefined if path isn't in the cache and the file doesn't exist. #111 

- Remove logging metrics for css files. #110

- Add changelog to project. #109 

- Rename function serializeCSSFolder to serializeCSSLIbsFolder. #107 

- Update Buster dependency to v1.1.1. #105 

- Console output related to Typescript compilation should identify being for either components or for browser scripts. #103 

- Ignore script and code tags during tokenization. #102 

- Include tokens in code blocks are being reported as unresolved. #101 

- CSS files should be first class assets to support {baseURL} tokenizatiion. #100 

- Unresolved token reporting drops the last closing brace for include tokens. #98 

- Log warning to the console if user project does not have a 404.html document. #97 

- Update to Node v18.18.0 LTS and address all related issues. #95 

- Include cache bust metric when release is called without the --verbose option and is called with the --cache-bust option. #94

- Refactor the cli help to accommodate multiple command options. #93 

- Provide CLI --verbose logging option. #92 

- Update Buster dependency to v1.1.0. #91 
