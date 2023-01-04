<br>
<br>
<div align=center>
    <img src="github/readmeheader.png" alt="README Header">
</div>
<br>
<hr color="grey">
<br>

## Why It's Named Yada

Because I'm a huge _Seinfeld_ fan.

## Some Background

Trio is a static site generator that I released almost three years ago (please see <span style="color:#33A2FF"><a href="https://gettriossg.com">gettrriossg.com</a></span> if you are interested</span>). Trio can handily produce HTML documents but it requires a lot of user JavaScript code to produce a site.

Trio also provides a build-pipeline which includes everything needed to produce a site containing static HTML documents. While well intentioned, that pipeline is highly subjective and, quite honestly, it is also quite inflexible.

I originally intended to remedy these and the numerous other shortcomings in Trio by chipping away at its current codebase and incrementally refactoring it. However, because Trio's codebase has acquired a considerable amount of cruft (yes, that's my fault) and because the changes that I intend to implement would require huge alterations to Trio's core architecture, I decided to forego maintaining Trio and to build a brand new static site generator that addresses all of Trio's shortcomings as well as my new ambitions.

## Project Development

The project will be written using TypeScript. No excuses. It just works beautifully.

Yada's project's scope is limited to producing HTML documents and nothing else. It will not provide a build pipeline nor any other tooling other than what is absolutely necessary for creating HTML documents. This benefits users who will be able to pick and chose their own tools.

Yada will not require a rigid project structure other than 2 sub folders off of the project's root folder, one to hold four sub folders - pages, templates, includes and components - and one to receive the serialized output.

Yada's generation of HTML documents consists of two steps.

1\) Static Page Composition:

Static page composition uses _Pages_, _Includes_ and _Templates_ page assets to generate an HTML document.  Pages can be injected into Templates and Includes can be injected into both Templates and Pages. Templates and Pages both support front matter.

2\) Hydration Page Composition:

Hydration-based page composition is supported through the use of user defined Preact components coded in TypeScript that return strings of HTML that Yada uses to replace Tokens embedded within the content created from Static Page Composition. Yada compiles your TypeScript components for you, freeing you from having to implement  this yourself.

## Current Status

Yada is still in its prerelease alpha development stage. Alpha release should be considered unstable and transient. While in alpha features and implementations might change dramatically and this should be considered the norm.

### What Has Already Been Implemented

[x] - HTML document generation using Pages, Templates and Includes.

[x] - Document token interpolation implemented using front matter.

[x] - Document hydration using components .tsx and component tokens.

### What Needs To Be Done

[] - Collections.

[] - Support for content posting (e.g. Blogging).

[] - Documentation.

[] - Encourage early community involvement.

[] - Provide sufficient testing to reduce the likelihood of introducing regressions.

[] = User project implementation with support for TypeScript and Preact.

### Longer Term Goals

- Seek RFC.

- Accept pull requests when the codebase is stable enough to receive them, which will probably coincide with the first major Alpha release.

## Community

For help, discussion about best practices, or any other conversation that would benefit from being searchable:

[Discuss Yada SSG on Github](https://github.com/4awpawz/yada/discussions)

For casual conversation with others about using Yada SSG:

[Discuss Yada SSG on Twitter and other social media.](https://twitter.com).

## And If You Wouldn't Mind

Please consider 👀watching and 🌟starring this repo as these will greatly motivate me to keep moving forward.
