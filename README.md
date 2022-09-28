# Notes

This is the official site of my new project which I am calling <span style="color: #33A2FF">_Yada_</span> because honestly I have no idea what else to call it and Yada sounds as good as anything I can think of at the moment.

## Some Background

Trio (see <span style="color:#33A2FF"><a href="https://gettriossg.com">gettrriossg.com</a></span> if you are at all interested</span>), which is the previous static site generator that I built, represented my disdain for front-end frameworks that required an additional layer of learning over the 3 fundamental building blocks of the Web, namely HTML, CSS and JavaScript. The result was a tool that could handily produce HTML documents but also required Node and a jQuery-like syntax to add dynamic content to those HTML documents.;

Trio also provided a build-pipeline, including everything needed to produce a site containing static HTML documents. While well intentioned, that pipeline is highly subjective and quite honestly inflexible.

To remedy these and numerous other shortcomings, I intended to rewrite Trio by chipping away at its current codebase and incrementally refactoring it. However, because the codebase has acquired a considerable amount of cruft (yes, that's my fault) and because the changes that I intended to implement were quite extensive, I decided to forego maintaining Trio and rather build a brand new static site generator that addresses all of Trio's shortcomings as well as my new ambitions.

## Yada's Goals

- The project will employ TypeScript. No excuses. It just works.

- The project's scope is limited to producing HTML documents and nothing else. It will not provide a build pipeline nor any other tooling other than what is absolutely necessary for creating HTML documents.

- It will not require any project structure other that a folder to build from and a folder to receive the output of what is built.

- Creating HTML documents will be a two step process:

    1. The generation of static HTML will use three asset types - _Pages_, _Includes_ and _Templates_. A Page can be injected into a Template but it can also stand on its own and Includes can be injected into both Pages and Templates. Each of these assets will support front-matter.

    2. The generation and injection of dynamic content has not yet been implemented. I am leaning towards using a _JSX_ solution but I am also considering making JSX an option with the default using a fourt asset type. Would love to hear your opinions on this.

## Current Status

Yada is still in its infancy but is making steady progress. I constantly have to fight the urge to add features that appear attractive but that I know will come back and haunt me in the future. Like you, I try to maintain a balance between all my obligations in life. Sometimes I am not so good at that and I can easily find myself battling burnout and therefore I am taking a more laid back approach to this project to protect myself. What that really means is no more all-nighters and stuffing myself with junk food 😹.

- The creation of static HTML documents using Pages, Includes and Templates is implemented. The implementation is purely text based and it is very quick. Pages, Includes and Templates employ an interpolated file naming convention that describes each file's role in page composition and greatly reduces the strain of discovering the association between these assets.

- The interpolation of YAML data into generated HTML documents is also implemented.

## ToDos

- Data driven JSX-based dynamic markup generation.
- Collection generation.

## Longer Term Goals

- Seek RFC.
- Encourage community involvement.
- Accept pull requests when the codebase is stable enough to receive them, which will probably coincide with the first major Alpha release.

## Community

- [ Discuss Yada on Github ](https://github.com/4awpawz/yada/discussions)
- Consider watching 👀 and starring 🌟 this repo. Every little bit helps.
