# typescript-starter-node
<!-- badge -->
[![npm license](https://img.shields.io/npm/l/typescript-starter-node.svg)](https://www.npmjs.com/package/typescript-starter-node)
[![travis status](https://img.shields.io/travis/sramam/typescript-starter-node.svg)](https://travis-ci.org/sramam/typescript-starter-node)
[![Build status](https://ci.appveyor.com/api/projects/status/90am2usst4qeutgi?svg=true)](https://ci.appveyor.com/project/sramam/typescript-starter-node)
[![Coverage Status](https://coveralls.io/repos/github/sramam/typescript-starter-node/badge.svg?branch=master)](https://coveralls.io/github/sramam/typescript-starter-node?branch=master)
[![David](https://david-dm.org/sramam/typescript-starter-node/status.svg)](https://david-dm.org/sramam/typescript-starter-node)
[![David](https://david-dm.org/sramam/typescript-starter-node/dev-status.svg)](https://david-dm.org/sramam/typescript-starter-node?type=dev)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
<br/>
[![NPM](https://nodei.co/npm/typescript-starter-node.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/typescript-starter-node/)
<!-- endbadge -->

A simple, full-functionality starter package for node modules, built in TypeScript.

The goal is to be simple, lean and automated.

- minimize dependencies.
- use simpler-to-understand dependencies when necessary.
- enable a move-fast mindset.

Support for the following is baked in:

- [x] [tslint](https://github.com/palantir/tslint)
- [x] build automation
- [x] [mocha](https://mochajs.org/) test-automation
- [x] test coverage (remapped to TypeScript)
- [x] checks dependencies for known vulnerabilities before commit.
- [x] CI integration

# Usage

```
mkdir myApp
cd myApp
git clone https://github.com/sramam/typescript-starter-node
```

Since we are using a git repo as a template, a little reconfiguration is required.
This has been encapsulated into a simple node script - [.reinit](./.reinit).
The script destroys itself after execution, creating a clean start for your spanking new project.

```
node ./.reinit
```

At this point, explore ./src for the bare bones example.
Typically, you'd want to delete it's contents, start over and profit!


## Development Tooling

Described [here](./docs/DevTools.md)

## License
Apache-2.0

## Code of Conduct
Please note that this project is released with a [Contributor Code of Conduct](code-of-conduct.md).
By participating in this project you agree to abide by its terms.

## Support
Bugs, PRs, comments, suggestions welcomed!

