/// <reference path="../../node_modules/@types/mocha/index.d.ts"/>

import { expect } from 'chai';
import Greeter from '../greeter';

describe('Greeter', () => {
    let greeter: Greeter<any>;
    it('creates greeter', () => {
        const msg = 'Hello, world';
        let greeter = new Greeter<string>(msg);
        expect(greeter.greet()).to.equal(msg);
    });
});
