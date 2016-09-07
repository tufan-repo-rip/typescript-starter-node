
import Greeter from './greeter'
import {check} from './node_version';

check(); // validates that the node engine version check works.



let greeter = new Greeter<string>("Hello, world");
console.log(greeter.greet())
