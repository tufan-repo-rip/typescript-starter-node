"use strict";
const semver = require("semver");
const { version } = process;
function check() {
    if (!semver.satisfies(version, '>= 6.0.0')) {
        const msg = `declaratif uses advanced ES6 capabilities (Proxies) which are only
    available on node 6.0+. Current node version ${version} is not ">= 6.0.0"`;
        throw (new Error(msg));
    }
}
exports.check = check;
