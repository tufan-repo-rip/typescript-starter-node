/**
 * Born out of a frustration at the number of times an extra commit
 * is needed when the repo location changes. This is especially true
 * of such 'template' repos.
 */
const pkg = require('../package.json');
const chalk = require('chalk');
const gitConfig = require('git-config');
const path = require('path');

const config = gitConfig.sync();
const repo = {
  name: path.parse(config.remote.url || '')
};

if (pkg.name !== repo.name) {
  console.log(
    chalk.inverse.bold(
      `CHECK PACKAGE NAME: 'package.json:${pkg.name}' !== 'repository name: ${repo.name}'`
    ));
}

if (pkg.repository.url != config.remote.url) {
  console.log(
    chalk.red.bold(
      `Repository name mismatch. 'package.json:${pkg.repository.url}' !== 'git config: ${config.remote.url}'`
    )
  )
}
