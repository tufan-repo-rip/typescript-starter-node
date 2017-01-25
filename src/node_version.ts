

import * as semver from 'semver';
const pkg = require('../package');
const {version} = process;

export function check(desired = version) {
  // Run time validation of engine version
  if (!semver.satisfies(version, desired)) {
    const msg = `${pkg.name} requires node ${desired}. Current node version == ${version}. Aborting.`;
    throw(new Error(msg));
  }
}
