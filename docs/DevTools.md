# Development tooling

The repo comes with tooling pre-configured for most development tasks
for node.js projects built in TypeScript

## Goal

The goal is to be simple, lean and automated.

Support for the following is baked in:

- [x] [tslint](https://github.com/palantir/tslint)integration
- [x] build automation
- [x] [ava](https://github.com/avajs/ava) test-automation
- [x] test coverage (remapped to TypeScript)
- [x] checks dependencies for known vulnerabilities before commit.
- [x] CI integration (Travis/Appveyor included. PRs for others welcomed)
- [x] [commitizen](https://www.npmjs.com/package/commitizen) integration

## DX & minimizing tech-debt

This package take an opinioned view on the Developer-Experience with an eye towards minimizing tech-debt.
There are four operations that will be part of a developer experience:

- `npm build`: cleans, lints, builds and tests with coverage metrics.
- `npm build:dist`: generates distribution artifacts
- `git cz`: formats commit message to ease generation of Changelogs
- `git push`: a pre-push hook runs coverage-check, checks packages for updates and unpatched vulnerabilities

The process is meant to serve as an early-warning mechanism to catch issues that will cause potentially
expensive mishaps or re-work later in the project life-cycle.

## run-scripts

Since "lean"-ness is a primary goal, npm is used as a build tool.
We use [npm-run-batch](https://github.com/sramam/npm-run-batch) to create
a simple pipeline of tasks to perform for each build step.

### The run-scripts used

*aside:* To help with these, we recommend [npm-completion](https://docs.npmjs.com/cli/completion)

    commit      : uses `commitizen` to help format commit messages
    clean       : `rimraf ./build ./coverage`
    build       : builds the project
    build:dist  : build a distribution - skips compiling test files
    build:watch : watch project files and rebuild when anything changes
    test        : runs tests with coverage on generated JavaScript
    secure      : checks all installed dependencies for vulnerabilities
    lcheck      : compliance check of project dependency license
    coverage    : prints coverage report over typescript source

## Project Structure

The directory structure of a typical project:

    ├── LICENSE
    ├── README.md
    ├── package.json
    ├── scripts/              - post install scripts
    ├── src/                  - module source (TypeScript)
    │   ├── test/
    │   │   └── specs/
    │   │       └── index.ts
    │   └── index.ts
    ├── docs/                 - module documentation
    ├── tsconfig.dist.json    - production tsconfig
    ├── tsconfig.json         - development tsconfig
    └── tslint.json           - tslint

In addition, these directories are auto-created by the various scripts.
The coverage & build directories are .gitignored.
By design, dist directories are commited to the repo. For components
with non-native dependencies, which is a vast majority of the cases,
this is an advantage, since it minimizes the module size for download
and makes the build setup a lot simpler.

If your module includes native/compiled artifacts, this might need to be
reconsidered.

    ├── coverage/
    |   └── typescript/
    |       └── index.html    - html report of typescript
    ├── dist/                 - Commmitted to repo. Minimizes package size
    └── build/                - scratch dir - for build & test

### Why are there two tsconfig*.json files

TypeScript compiler configuration, tsconfig.json does not support multiple
build targets. To create separate builds then, one has to use multiple config
files and invoke atleast one of them explicitly like we do.

Further, our opinioned preferences is to keep source and associated tests
together in the source tree. This requires to compile time configurations -
a regular build that includes
