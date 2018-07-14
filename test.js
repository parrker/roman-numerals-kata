const assert = require('assert');

const splitByDigit = (number) => {
  return {
    ones: number % 10,
    tens: Math.floor(number / 10) % 10,
    hundreds: Math.floor(number / 100) % 10,
    thousands: Math.floor(number / 1000) % 10,
  };
};

const romaniseDigit = (number, one, five, ten) => {
  if (number < 4) return one.repeat(number);
  if (number === 4) return one + five;
  if (number === 5) return five;
  if (number < 9) return five + one.repeat(number - 5);
  if (number === 9) return one + ten;
};

const romanise = (arabicNumber) => {
  if (arabicNumber > 3999) {
    return 'Invalid input';
  }

  const splitNumber = splitByDigit(arabicNumber);

  const ones = romaniseDigit(splitNumber.ones, 'I', 'V', 'X');
  const tens = romaniseDigit(splitNumber.tens, 'X', 'L', 'C');
  const hundreds = romaniseDigit(splitNumber.hundreds, 'C', 'D', 'M');
  const thousands = romaniseDigit(splitNumber.thousands, 'M');

  return thousands + hundreds + tens + ones;
};

describe('#romanise', () => {
  it('returns I for 1', () => {
    const result = romanise(1);

    assert.equal(result, 'I');
  });

  it('returns an error if invalid input', () => {
    const result = romanise(4000);

    assert.equal(result, 'Invalid input');
  });

  it('returns V for 5', () => {
    assert.equal(romanise(5), 'V');
  });

  it('returns II for 2', () => {
    assert.equal(romanise(2), 'II');
  });

  it('returns III for 3', () => {
    assert.equal(romanise(3), 'III');
  });

  it('returns IV for 4', () => {
    assert.equal(romanise(4), 'IV');
  });

  it('returns V for 5', () => {
    assert.equal(romanise(5), 'V');
  });

  it('returns VIII for 8', () => {
    assert.equal(romanise(8), 'VIII');
  });

  it('returns IX for 9', () => {
    assert.equal(romanise(9), 'IX');
  });

  it('returns X for 10', () => {
    assert.equal(romanise(10), 'X');
  });

  it('returns XII for 12', () => {
    assert.equal(romanise(12), 'XII');
  });

  it('returns XXIV for 24', () => {
    assert.equal(romanise(24), 'XXIV');
  });

  it('returns XLVI for 46', () => {
    assert.equal(romanise(46), 'XLVI');
  });

  it('returns LXXVII for 77', () => {
    assert.equal(romanise(77), 'LXXVII');
  });

  it('returns LXXIX for 79', () => {
    assert.equal(romanise(79), 'LXXIX');
  });

  it('returns XCVIII for 98', () => {
    assert.equal(romanise(98), 'XCVIII');
  });

  it('returns C for 100', () => {
    assert.equal(romanise(100), 'C');
  });

  it('returns DCXLVI for 646', () => {
    assert.equal(romanise(646), 'DCXLVI');
  });

  it('returns CMXCIX for 999', () => {
    assert.equal(romanise(999), 'CMXCIX');
  });

  it('returns MM for 2000', () => {
    assert.equal(romanise(2000), 'MM');
  });

  it('returns MMMCMXCIX for 3999', () => {
    assert.equal(romanise(3999), 'MMMCMXCIX');
  });
});

describe('#splitByDigit', () => {
  it('returns an object with digits as separate properties', () => {
    assert.deepStrictEqual(splitByDigit(2013), {
      ones: 3,
      tens: 1,
      hundreds: 0,
      thousands: 2,
    });
  });
});
