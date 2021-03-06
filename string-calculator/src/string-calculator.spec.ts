import { expect } from 'chai';
import 'mocha';

import { StringCalculator } from './string-calculator';

describe('String Calculator', () => {
	describe('add', () => {
		it('empty string returns zero', () => {
			const sut = new StringCalculator();
			const result = sut.add('');

			expect(result).to.be.equal(0);
		});

		it('just one number returns the same number', () => {
			const sut = new StringCalculator();
			const result = sut.add('9');

			expect(result).to.be.equal(9);
		});

		it('two numbers, delimited by a comma, returns the sum', () => {
			const sut = new StringCalculator();
			const result = sut.add('16,8');

			expect(result).to.be.equal(24);
		});

		it('five numbers, delimited by a comma, returns the sum', () => {
			const sut = new StringCalculator();
			const result = sut.add('10,22,3,2,1');

			expect(result).to.be.equal(38);
		});

		it('three numbers, delimited by commas and newlines, returns the sum', () => {
			const sut = new StringCalculator();
			const result = sut.add('8\n45,22');

			expect(result).to.be.equal(75);
		});

		it('six numbers, delimited by newlines, returns the sum', () => {
			const sut = new StringCalculator();
			const result = sut.add('8\n45\n22\n1\n1\n1');

			expect(result).to.be.equal(78);
		});

		it('override delimiter with semi-colon, returns the sum', () => {
			const sut = new StringCalculator();
			const result = sut.add('//;\n1;2');

			expect(result).to.be.equal(3);
		});

		it('passing one negative number throws an exception w/ detail', () => {
			const sut = new StringCalculator();

			expect(() => { sut.add('1,2,3,-4'); }).to.throw('negatives not allowed: -4');
		});

		it('passing multiple negative number throws an exception w/ detail', () => {
			const sut = new StringCalculator();

			expect(() => { sut.add('1,-2,3,-4'); }).to.throw('negatives not allowed: -2, -4');
		});

		it('passing a number bigger than 1000 is ignored', () => {
			const sut = new StringCalculator();
			const result = sut.add('1001,8');

			expect(result).to.be.equal(8);
		});
	});
	describe('getCalledCount', () => {
		it('should return how many times add is invoked', () => {
			const sut = new StringCalculator();
			sut.add('1,2');
			sut.add('1\n3,4');
			sut.add('//;\n1\n3;4');

			const result = sut.getCalledCount();
			expect(result).to.be.equal(3);
		});
	});
});
