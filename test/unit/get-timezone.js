import * as ct from '../../src/index';

const TEST_CASES = {
  'America/Mexico_City': {
    name: 'America/Mexico_City',
    countries: ['MX'],
    utcOffset: -360,
    utcOffsetStr: '-06:00',
    dstOffset: -360,
    dstOffsetStr: '-06:00',
    aliasOf: null,
  },
  'Indian/Comoro': {
    name: 'Indian/Comoro',
    countries: ['KM'],
    utcOffset: 180,
    utcOffsetStr: '+03:00',
    dstOffset: 180,
    dstOffsetStr: '+03:00',
    aliasOf: 'Africa/Nairobi',
    deprecated: true,
  },
  UTC: {
    name: 'UTC',
    countries: [],
    utcOffset: 0,
    utcOffsetStr: '+00:00',
    dstOffset: 0,
    dstOffsetStr: '+00:00',
    aliasOf: 'Etc/UTC',
    deprecated: true,
  },
  'Asia/Jerusalem': {
    name: 'Asia/Jerusalem',
    countries: ['IL'],
    utcOffset: 120,
    utcOffsetStr: '+02:00',
    dstOffset: 180,
    dstOffsetStr: '+03:00',
    aliasOf: null,
  },
};

describe('.getTimezone', () => {
  Object.keys(TEST_CASES).forEach((testCase) => {
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
