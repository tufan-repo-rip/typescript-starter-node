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
const pkg = require('../../package.json');
const chalk = require('chalk');
const gitcfg = require('parse-git-config');
const path = require('path');

/**
 *
 * 'GIt+https://blah-git.git'.replace(/git\+|\+git|\.git/gi, '')
 *  => 'https://blah-git'
 *
 *  'https://user@github.com/user/repo'.replace(/:\/\/([^@]+@)/, '://')
 *  => 'https://github.com/user/repo'
 *
 *  'https://github.com/user/repo'.replace(/:\/\/([^@]+@)/, '://')
 *  => 'https://github.com/user/repo'
 */
function sanitizeGitUrl(url) {
  return url.replace(/git\+|\+git|\.git/gi, '').replace(/:\/\/([^@]+@)/, '://');
}

function pkgRepo(pkg) {
  if (pkg.repository === '') {
    return '';
  }
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
          throw new Error(`Unsupported 'package.json:repository' ${pkg.repository}`)
        case 2:
          const svcid = parts[0].split(':')
          const prop = {
            service: svcid.length === 2 ? svcid[0] : 'github',
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

exports.validate = () => {

  if (!!__dirname.match(/.*node_modules.*/)) {
    // this is a dependent install, skip validation
    return;
  }

  const config = gitcfg.keys(gitcfg.sync()) || {};

  if (!(config && config.remote && config.remote.origin && config.remote.origin.url)) {
    console.log(
      chalk.yellow(
        `WARNING: git remote url is not configured`
      )
    );
    config.remote = config.remote || {};
    config.remote.origin = config.remote.origin || {};
    config.remote.origin.url = config.remote.origin.url || '';
  }

  if (!(pkg && pkg.repository)) {
    console.log(
      chalk.yellow(
        `WARNING: package.json:repository is not configured`
      )
    );
    pkg.repository = pkg.repository || '';
  }

  pkg_url = pkgRepo(pkg);
  repo_url = config.remote.origin.url;

  if (sanitizeGitUrl(pkg_url) !== sanitizeGitUrl(repo_url)) {
    console.log(
      chalk.red.bold(
        `ERROR: git url mismatch. package.json:'${pkg_url}' !== git config:'${repo_url}'`
      )
    );
  }
}
