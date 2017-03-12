/**
 * Born out of a frustration at the number of times an extra commit
 * is needed when the repo location changes. This is especially true
 * of such 'template' repos.
 *
 * Completely hacky and designed to work with git.
 * Any usage beyond that is likely to result in pain.
 * Large dosage Ibuprofen recommended.
 *
 */
const pkg = require('../package.json');
const chalk = require('chalk');
const gitcfg = require('parse-git-config');
const path = require('path');

const config = gitcfg.keys(gitcfg.sync());
const repo = {
  name: path.parse(config.remote.origin.url || '').name
};

if (pkg.name !== repo.name) {
  console.log(
    chalk.bold.black.bgYellow(
      `CHECK PACKAGE NAME: 'package.json:${pkg.name}' !== 'repository name: ${repo.name}'`
    ));
}

const url = {
  pkg: pkg.repository.url.replace('git+', '').replace('+git', '').replace('.git', ''),
  repo: config.remote.origin.url.replace('git+', '').replace('+git', '').replace('.git','')
};

if (url.pkg !== url.repo) {
  console.log(
    chalk.red.bold(
      `Repository name mismatch. 'package.json: ${pkg.repository.url}' !== 'git config: ${config.remote.origin.url}'`
    )
  );
  process.exit(-1);
}
