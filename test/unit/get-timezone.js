const ct = require('../../src');

const TEST_CASES = {
  'America/Mexico_City': {
    name: 'America/Mexico_City',
    country: 'MX',
    utcOffset: -360,
    utcOffsetStr: '-06:00',
    dstOffset: -300,
    dstOffsetStr: '-05:00',
    aliasOf: null
  },
  'Indian/Comoro': {
    name: 'Indian/Comoro',
    country: 'KM',
    utcOffset: 180,
    utcOffsetStr: '+03:00',
    dstOffset: 180,
    dstOffsetStr: '+03:00',
    aliasOf: 'Africa/Nairobi'
  },
  'UTC': {
    name: 'UTC',
    country: null,
    utcOffset: 0,
    utcOffsetStr: '+00:00',
    dstOffset: 0,
    dstOffsetStr: '+00:00',
    aliasOf: 'Etc/UTC'
  },
  'Asia/Tel_Aviv': {
    name: 'Asia/Tel_Aviv',
    country: 'IL',
    utcOffset: 120,
    utcOffsetStr: '+02:00',
    dstOffset: 180,
    dstOffsetStr: '+03:00',
    aliasOf: 'Asia/Jerusalem'
  }
};

describe('.getTimezone', () => {
  Object.keys(TEST_CASES).forEach(testCase => {
    it(`should return correct data for timezone "${testCase}"`, () => {
      const result = ct.getTimezone(testCase);
      const expectedResult = TEST_CASES[testCase];
      expect(result).to.be.eql(expectedResult);
    });
  });

  it('should return null for not existent timezone', () => {
    const result = ct.getTimezone('NOT_EXISTENT_TZ');
    expect(result).to.be.eql(null);
  });
});
