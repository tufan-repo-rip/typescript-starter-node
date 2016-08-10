/// <reference path="../../node_modules/@types/mocha/index.d.ts"/>

import { expect } from 'chai';
import Calculator from '../calculator';

describe('Calculator', () => {
	let subject: Calculator;
	beforeEach(() => {
		subject = new Calculator();
	});

	describe('#add', () => {
		it('should add two numbers together', () => {
			let result: number = subject.add(2, 3);
			expect(result).to.equal(5);
		});
    it('should subtract two numbers', () => {
			let result: number = subject.subtract(5, 3);
			expect(result).to.equal(2);
    })
	});
});
