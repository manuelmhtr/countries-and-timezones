const ct = require('../dist');

const TEST_CASES = {
  KR: [
    {
      name: 'ROK',
      countries: ['KR'],
      utcOffset: 540,
      utcOffsetStr: '+09:00',
      dstOffset: 540,
      dstOffsetStr: '+09:00',
      aliasOf: 'Asia/Seoul',
    },
    {
      name: 'Asia/Seoul',
      countries: ['KR'],
      utcOffset: 540,
      utcOffsetStr: '+09:00',
      dstOffset: 540,
      dstOffsetStr: '+09:00',
      aliasOf: null,
    },
  ],
  IS: [
    {
      name: 'Iceland',
      countries: ['IS'],
      utcOffset: 0,
      utcOffsetStr: '+00:00',
      dstOffset: 0,
      dstOffsetStr: '+00:00',
      aliasOf: 'Atlantic/Reykjavik',
    },
    {
      name: 'Atlantic/Reykjavik',
      countries: ['IS'],
      utcOffset: 0,
      utcOffsetStr: '+00:00',
      dstOffset: 0,
      dstOffsetStr: '+00:00',
      aliasOf: null,
    },
  ],
  DE:
  [
    {
      name: 'Europe/Busingen',
      countries: ['DE'],
      utcOffset: 60,
      utcOffsetStr: '+01:00',
      dstOffset: 120,
      dstOffsetStr: '+02:00',
      aliasOf: 'Europe/Zurich',
    },
    {
      name: 'Europe/Berlin',
      countries: ['DE'],
      utcOffset: 60,
      utcOffsetStr: '+01:00',
      dstOffset: 120,
      dstOffsetStr: '+02:00',
      aliasOf: null,
    },
    {
      name: 'Europe/Zurich',
      countries: ['CH', 'DE', 'LI'],
      utcOffset: 60,
      utcOffsetStr: '+01:00',
      dstOffset: 120,
      dstOffsetStr: '+02:00',
      aliasOf: null,
    },
  ],
};

describe('.getTimezonesForCountry', () => {
  Object.keys(TEST_CASES).forEach((testCase) => {
    it(`should return correct timezones for country "${testCase}"`, () => {
      const result = ct.getTimezonesForCountry(testCase);
      const expectedResult = TEST_CASES[testCase];
      expect(result).toEqual(expectedResult);
    });
  });

  it('should return null for not existent country', () => {
    const result = ct.getTimezonesForCountry('NOT_EXISTENT_COUNTRY');
    expect(result).toEqual(null);
  });
});
