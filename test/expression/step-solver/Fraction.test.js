'use strict';

const assert = require('assert');
const math = require('../../../index');

const Fraction = require('../../../lib/expression/step-solver/Fraction');
const flatten = require('../../../lib/expression/step-solver/flattenOperands.js');

describe('isConstantFraction', function () {
  it('4/5 true', function () {
    assert.deepEqual(
      Fraction.isConstantFraction(math.parse('4/5')),
      true);
  });
  it('4x/5 false', function () {
    assert.deepEqual(
      Fraction.isConstantFraction(math.parse('4x/5')),
      false);
  });
  it('5 false', function () {
    assert.deepEqual(
      Fraction.isConstantFraction(math.parse('5')),
      false);
  });
});

function addConstantFractions(exprString) {
	return Fraction.addConstantFractions(math.parse(exprString)).node;
}

describe('addConstantFractions', function () {
  it('4/5 + 3/5 -> (4+3)/5', function () {
    assert.deepEqual(
      addConstantFractions('4/5 + 3/5'),
      flatten(math.parse('(4+3)/5')));
  });
  it('4/10 + 3/5 -> 4/10 + (3*2)/(5*2)', function () {
    assert.deepEqual(
      addConstantFractions('4/10 + 3/5'),
      flatten(math.parse('4/10 + (3*2)/(5*2)')));
  });
  it('4/9 + 3/5 -> (4*5)/(9*5) + (3*9)/(5*9)', function () {
    assert.deepEqual(
      addConstantFractions('4/9 + 3/5'),
      flatten(math.parse('(4*5)/(9*5) + (3*9)/(5*9)')));
  });
});

function multiplyConstantsAndFractions(exprString) {
	const node = flatten(math.parse(exprString));
	return flatten(Fraction.multiplyConstantsAndFractions(node).node);
}

describe('multiplyConstantsAndFractions', function () {
  it('3 * 1/5 * 5/9 -> (3*1*5)/(5*9)', function () {
    assert.deepEqual(
      multiplyConstantsAndFractions('3 * 1/5 * 5/9'),
      flatten(math.parse('(3*1*5)/(5*9)')));
  });
  it('3/7 * 10/11 -> (3*10)/(7*11)', function () {
    assert.deepEqual(
      multiplyConstantsAndFractions('3/7 * 10/11'),
      flatten(math.parse('(3*10)/(7*11)')));
  });
});
