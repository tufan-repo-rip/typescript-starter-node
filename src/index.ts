
import * as engchk from 'runtime-engine-check';
engchk(); // checks node version matches spec in package.json

import Greeter from './greeter';

let greeter = new Greeter<string>('Hello, world');
console.log(greeter.greet());
