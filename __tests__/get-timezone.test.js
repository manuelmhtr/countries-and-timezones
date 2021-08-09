const ct = require('../dist');

const TEST_CASES = {
  'America/Mexico_City': {
    name: 'America/Mexico_City',
    countries: ['MX'],
    utcOffset: -360,
    utcOffsetStr: '-06:00',
    dstOffset: -300,
    dstOffsetStr: '-05:00',
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
  },
  'Asia/Tel_Aviv': {
    name: 'Asia/Tel_Aviv',
    countries: ['IL'],
    utcOffset: 120,
    utcOffsetStr: '+02:00',
    dstOffset: 180,
    dstOffsetStr: '+03:00',
    aliasOf: 'Asia/Jerusalem',
  },
  UTC: {
    name: 'UTC',
    countries: [],
    utcOffset: 0,
    utcOffsetStr: '+00:00',
    dstOffset: 0,
    dstOffsetStr: '+00:00',
    aliasOf: 'Etc/UTC',
  },
};

describe('.getTimezone', () => {
  Object.keys(TEST_CASES).forEach((testCase) => {
    it(`should return correct data for timezone "${testCase}"`, () => {
      const result = ct.getTimezone(testCase);
      const expectedResult = TEST_CASES[testCase];
      expect(result).toEqual(expectedResult);
    });
  });

  it('should return null for not existent timezone', () => {
    const result = ct.getTimezone('NOT_EXISTENT_TZ');
    expect(result).toEqual(null);
  });
});
