
import * as semver from 'semver';
const pkg = require('../package');
const _version = process.version;

export const version = ((desired = (pkg.engines.node || _version)) => {
  // Run time validation of engine version
  if (!semver.satisfies(version, desired)) {
    const msg = `${pkg.name} requires node version ${desired}. Currently running an unsatisfactory ${version}. Aborting.`;
    throw(new Error(msg));
  }
  return version;
})();
