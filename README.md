# Minimal SSG Framework For Building Static Websites

HTML, Markdown, Front Matter + Custom `.tsx and .jsx` Components.

## The Name

_fusion_ plays on the idea of **_fusing_** together various elements (HTML, Markdown, Components, JSON data, YAML front matter, etc.).

## Features

- No initial project configuration is required.
- DOMless and serverless, so builds are really very quick.
- Create HTML documents using markdown, HTML, tokens, components, JSON data sources and meta data.
- Support for .tsx and .jsx components, including sand-boxed execution, and for .ts browser scripts.
- Portfolio generation via collections.
- package.json scripts provided for development and release builds.
- CLI for one-off development and one-off release builds.
- Base URL support for sites hosted in sub folders.
- Works in progress for HTML documents that need to be ignored during release builds.
- Blogging support, including categories and tags.
- Beautified HTML documents.

## Project Development

The project is written in ` TypeScript` (no excuses, _it just works beautifully_) and runs on `Node`.

## Project Scope
The project's scope is limited to generating robust and resilient HTML documents and nothing else. It will not provide any other tooling other than what is absolutely necessary to accomplish that. Importantly, fusion.ssg requires no knowledge of front-end frameworks like React. This keeps the scope of the project focused, preventing feature creep, and benefits users who will be able to pick and chose their own tools.

## Versioning

Beginning with v1.0.0, which will be our first production release, we will be dropping the use of _beta_ when versioning a development release. Going forward, all development releases will use `-dev.n` instead of -beta.n.

### What Has Already Been Implemented

- [X] Support for _simple HTML document creation_ using _Pages, Templates and Includes_.
- [X] Support for _simple token replacement_ involving _front matter property values_ and _matching property names_ in HTML.
- [X] Support for _`.tsx` and .jsx components_, _compilation_ and _sand-boxed execution_.
- [X]  Support for _document hydration_ using components and JSON data sources.
- [X] Support for generating _collections of pages_ using components and JSON data sources.
- [X] Support for base URLs.
- [X] Support for development and release builds.
- [X]  Support for content posting (e.g. Blogging).
  - [X] Support for tags.
  - [X] Support for categories.
- [X] Work in progress templates.
  - [X] Individual files.
  - [X] Folders.
  - [X] Ignored.
- [X] End user project creation.

### What Still Remains To Be Done

- Logo, fusion.ssg is desperately in need of a great logo.

### Longer Term Goals

- Seek RFC.
- Accept pull requests when the codebase is stable enough to receive them, which will probably coincide with the first major Alpha release.

## Community

For help, discussion about best practices, or any other conversation that would benefit from being searchable:

[Discuss _fusion.ssg _on Github](https://github.com/4awpawz/fusion.ssg/discussions)

For casual conversation with others about using _fusion.ssg_:

[Discuss _fusion.ssg on Twitter and other social media.](https://twitter.com).

## And If You Wouldn't Mind

Please consider 👀watching and 🌟starring this repo as these will provide the motivation to keep moving forward.
