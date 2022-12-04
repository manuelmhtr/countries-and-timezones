import * as ct from '../../src/index';

const TEST_CASES = {
  KR: [
    {
      name: 'Asia/Seoul',
      countries: ['KR'],
      utcOffset: 540,
      utcOffsetStr: '+09:00',
      dstOffset: 540,
      dstOffsetStr: '+09:00',
      aliasOf: null
    },
  ],
  IS: [
    {
      name: 'Africa/Abidjan',
      countries: ['CI', 'BF', 'GH', 'GM', 'GN', 'IS', 'ML', 'MR', 'SH', 'SL', 'SN', 'TG'],
      utcOffset: 0,
      utcOffsetStr: '+00:00',
      dstOffset: 0,
      dstOffsetStr: '+00:00',
      aliasOf: null
    }
  ],
  DE: [
    {
      name: 'Europe/Berlin',
      countries: ['DE', 'DK', 'NO', 'SE', 'SJ'],
      utcOffset: 60,
      utcOffsetStr: '+01:00',
      dstOffset: 120,
      dstOffsetStr: '+02:00',
      aliasOf: null
    },
    {
      name: 'Europe/Zurich',
      countries: ['CH', 'DE', 'LI'],
      utcOffset: 60,
      utcOffsetStr: '+01:00',
      dstOffset: 120,
      dstOffsetStr: '+02:00',
      aliasOf: null
    },
  ]
};

const DEPRECATED = {
  KR: [
    {
      name: 'ROK',
      countries: ['KR'],
      utcOffset: 540,
      utcOffsetStr: '+09:00',
      dstOffset: 540,
      dstOffsetStr: '+09:00',
      aliasOf: 'Asia/Seoul',
      deprecated: true,
    },
  ],
  IS: [
    {
      name: 'Atlantic/Reykjavik',
      countries: ['IS'],
      utcOffset: 0,
      utcOffsetStr: '+00:00',
      dstOffset: 0,
      dstOffsetStr: '+00:00',
      aliasOf: 'Africa/Abidjan',
      deprecated: true,
    },
    {
      name: 'Iceland',
      countries: ['IS'],
      utcOffset: 0,
      utcOffsetStr: '+00:00',
      dstOffset: 0,
      dstOffsetStr: '+00:00',
      aliasOf: 'Africa/Abidjan',
      deprecated: true,
    },
  ],
  DE: [
    {
      name: 'Europe/Busingen',
      countries: ['DE'],
      utcOffset: 60,
      utcOffsetStr: '+01:00',
      dstOffset: 120,
      dstOffsetStr: '+02:00',
      aliasOf: 'Europe/Zurich',
      deprecated: true,
    },
  ],
};

describe('.getTimezonesForCountry', () => {
  Object.keys(TEST_CASES).forEach(testCase => {
    it(`should return correct timezones for country "${testCase}"`, () => {
      const result = ct.getTimezonesForCountry(testCase);
      const expectedResult = TEST_CASES[testCase];
      expect(result).to.be.eql(expectedResult);
    });

    it(`should return correct timezones for country "${testCase}" with deprecated option`, () => {
      const result = ct.getTimezonesForCountry(testCase, { deprecated: true });
      const expectedResult = [...TEST_CASES[testCase], ...DEPRECATED[testCase]]
        .sort((a, b) => a.name > b.name ? 1 : -1);
      expect(result).to.be.eql(expectedResult);
    });
  });

  it('should return null for not existent country', () => {
    const result = ct.getTimezonesForCountry('NOT_EXISTENT_COUNTRY');
    expect(result).to.be.eql(null);
  });
});
