export default class Greeter<T> {
    greeting: T;
    constructor(message: T);
    greet(): T;
}
