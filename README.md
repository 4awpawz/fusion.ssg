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

Yada's project's scope is limited to producing HTML documents and nothing else. It will not provide a build pipeline nor any other tooling other than what is absolutely necessary for creating HTML documents. I see this as a benefit to Yada's users because they will be able to pick and chose their own tools.

Yada will not require a rigid project structure other than 2 sub folders off of the project's root folder, one to hold three sub folders - pages, templates and includes - and one to receive the serialized output.

Yada's generation of HTML documents consists of two steps.

1\) Static Page Composition:

Static page composition uses _Pages_, _Includes_ and _Templates_ to generate an HTML document. These are called _page assets_. Pages can be injected into Templates but they can also stand on their own and Includes can be injected into both Pages and Templates. Pages and Includes support front matter.

2\) Dynamic Page Composition:

Dynamic page composition is optional and can use both the _metadata_ that Yada generates every time it builds a site and user supplied _external data_ such as data from an external file like a .json file for example to add content to a page.

Two implementation options are currently being explored, the first one being Yada's default and which will employ HTM/JSX/TSX and the second one as a user selected option that would employ a fourth asset type along, YAML and markup and markdown to _declaratively_ compose pages using dynamic content. Would love to hear your opinions on this.

A pluggable dynamic composition engine might also be considered for a post release if its benefits falls within the overall goals of the project.

Community involvement will be both encouraged and welcomed!

## Current Status

Yada is still in its pre-release alpha development stage and every alpha release should be considered unstable and transient. While in alpha features and implementations might change dramatically and this should be considered the norm.

### What Has Already Been Implemented

[x] - Page generation using pages, templates and includes.

[x] - Pages, Includes and Templates employ an interpolated file naming convention that describes each file's role in page composition and greatly reduces the strain of discovering the association between these assets.

[x] - Document marker implemented from front matter.

[x] - Template path interpolation in page asset file names.

### What Needs To Be Done

[] - Encourage early community involvement.

[] - Data driven dynamic content generation.

[] - Collection generation.

[] - Provide sufficient testing to reduce the likelihood of introducing regressions.

[] - Documentation.

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
