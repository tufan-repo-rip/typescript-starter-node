"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const engchk = require("runtime-engine-check");
engchk();
const greeter_1 = require("./greeter");
let greeter = new greeter_1.default('Hello, world');
console.log(greeter.greet());
