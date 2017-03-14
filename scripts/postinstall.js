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

const pkgRepo = (pkg) => {
  const type = toString.call(pkg.repository);
  const svcMap = {
    github: 'https://github.com',
    gitlab: 'https://gitlab.com',
    bitbucket: 'https://bitbucket.org'
  };
  switch (type) {
    case '[object String]':
      const parts = pkg.repository.split('/');
      switch (parts.length) {
        case 1:
          throw new Error(`Unsupportted 'package.json:repository' ${pkg.repository}`)
        case 2:
          const svcid = parts[0].split(':')
          const prop = {
            service: svcid.length === 2 ? svcid[0]: 'github',
            userid: svcid.length === 2 ? svcid[1] : svcid[0],
            repo: parts[1]
          }
          return `${svcMap[prop.service]}/${prop.userid}/${prop.repo}`
        default:
          return pkg.repository
      }
    case '[object Object]':
      return pkg.repository.url
  }
}

const url = {
  pkg: pkgRepo(pkg).replace('git+', '').replace('+git', '').replace('.git', '').replace(/:\/\/([^@]+@)/, '://'),
  repo: config.remote.origin.url.replace('git+', '').replace('+git', '').replace('.git', '').replace(/:\/\/([^@]+@)/, '://')
};

if (url.pkg !== url.repo) {
  console.log(
    chalk.red.bold(
      `Repository name mismatch. 'package.json: ${pkgRepo(pkg)}' !== 'git config: ${config.remote.origin.url}'`
    )
  );
  process.exit(-1);
}
