
import Greeter from './greeter'

let greeter = new Greeter<string>("Hello, world");
console.log(greeter.greet())
