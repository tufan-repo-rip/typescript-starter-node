"use strict";
const greeter_1 = require("./greeter");
const node_version_1 = require("./node_version");
node_version_1.check(); // validates that the node engine version check works.
let greeter = new greeter_1.default("Hello, world");
console.log(greeter.greet());
//# sourceMappingURL=index.js.map