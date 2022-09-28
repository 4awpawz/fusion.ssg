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

## Project Goals

The project will employ TypeScript. No excuses. It just works.

The project's scope is limited to producing HTML documents and nothing else. It will not provide a build pipeline nor any other tooling other than what is absolutely necessary for creating HTML documents. I see this as a benefit to Yada's users because they will be able to pick and chose their own tools.

It will not require a rigid project structure other than a folder to build from and a folder to receive the output of what is built. It will remain up to the user how they want to implement their project structure.

Creating HTML documents will be a two step process:

1\) The generation of static HTML will use three asset types - _Pages_, _Includes_ and _Templates_. A Page can be injected into a Template but it can also stand on its own and Includes can be injected into both Pages and Templates. Each of these assets will support front-matter.

2\) For the generation and injection of dynamic content I am leaning towards _JSX_ but I am also considering making JSX an option with the default being a fourth asset type that would use YAML and markup and markdown to declaratively create dynamic content. Would love to hear your opinions on this.

Community involvement will be both encouraged and welcomed!

## Current Status

Yada is still in its infancy but is making steady progress.

[x] - The creation of static HTML documents using Pages, Includes and Templates is implemented. The implementation is purely text based and it is very quick.

[x] - Pages, Includes and Templates employ an interpolated file naming convention that describes each file's role in page composition and greatly reduces the strain of discovering the association between these assets.

[x] - The interpolation of YAML data into HTML documents decorated with markers is also implemented.

## ToDos

[] - Documentation.

[] - Provide "path awareness" when evaluating interpolated file names.

[] - Provide sufficient testing to reduce the likelihood of introducing regressions.

[] - Data driven dynamic markup generation.

[] - Collection generation.

## Longer Term Goals

- Seek RFC.

- Encourage community involvement.

- Accept pull requests when the codebase is stable enough to receive them, which will probably coincide with the first major Alpha release.

## Community

For help, discussion about best practices, or any other conversation that would benefit from being searchable:

[ Discuss Yada SSG on Github ](https://github.com/4awpawz/yada/discussions)

For casual conversation with others about using Yada SSG:

[<span style="color: #33A2FF;">Discuss Yada SSG on Twitter and other social media.</span>](https://twitter.com).

## And If You Wouldn't Mind

Please consider 👀watching and 🌟starring this repo as these will greatly motivate me to keep moving forward.
