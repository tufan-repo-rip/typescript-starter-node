
import * as semver from 'semver';
import * as pkg from '../package';

const {version} = process;

export function check(desired) {
  // Run time validation of engine version
  if (!semver.satisfies(version, desired)) {
    const msg = `${pkg.name} requires node ${desired}. Current node version == ${version}. Aborting.`;
    throw(new Error(msg));
  }
}
