#demo
> This design system is for the Demo.

## build commands
If you need to test building on your local machine you can use following commands

| Command                   | Description                   |
|---------------------------|-------------------------------|
| `npm run build`           | Build project for production  |
| `npm run build:dev`       | Build project for development |
| `npm run build:storybook` | Build static Storybook        |

### Static Storybook

Run `npm run build:storybook` to build a static version of Storybook. After that
you can use [`http-server`](https://www.npmjs.com/package/http-server) to run that: `cd storybook-static && http-server -a localhost -p 8080`

## Tech stack
This design system is built using
* [LitElement](https://lit-element.polymer-project.org/)
* [Tailwind CSS](https://tailwindcss.com)
* [Storybook](https://storybook.js.org)

### Tailwind config
All design tokens and variables must be defined here.

---

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)
