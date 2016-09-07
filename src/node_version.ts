/// <reference path="../node_modules/@types/node/index.d.ts"/>
import * as semver from 'semver';

const {version} = process;

export function check() {
  // Run time validation of engine version
  if (!semver.satisfies(version, '>= 6.0.0')) {
    const msg = `declaratif uses advanced ES6 capabilities (Proxies) which are only
    available on node 6.0+. Current node version ${version} is not ">= 6.0.0"`;
    throw(new Error(msg));
  }
}
