const ct = require('../../dist');

const TEST_CASES = {
  KR: [
    {
      name: 'ROK',
      country: 'KR',
      utcOffset: 540,
      utcOffsetStr: '+09:00',
      dstOffset: 540,
      dstOffsetStr: '+09:00',
      aliasOf: 'Asia/Seoul'
    },
    {
      name: 'Asia/Seoul',
      country: 'KR',
      utcOffset: 540,
      utcOffsetStr: '+09:00',
      dstOffset: 540,
      dstOffsetStr: '+09:00',
      aliasOf: null
    }
  ],
  IS: [
    {
      name: 'Iceland',
      country: 'IS',
      utcOffset: 0,
      utcOffsetStr: '+00:00',
      dstOffset: 0,
      dstOffsetStr: '+00:00',
      aliasOf: 'Atlantic/Reykjavik'
    },
    {
      name: 'Atlantic/Reykjavik',
      country: 'IS',
      utcOffset: 0,
      utcOffsetStr: '+00:00',
      dstOffset: 0,
      dstOffsetStr: '+00:00',
      aliasOf: null
    }
  ],
  DE: 
  [
    {
      name: 'Europe/Busingen',
      country: 'DE',
      utcOffset: 60,
      utcOffsetStr: '+01:00',
      dstOffset: 120,
      dstOffsetStr: '+02:00',
      aliasOf: 'Europe/Zurich'
    },
    {
      name: 'Europe/Berlin',
      country: 'DE',
      utcOffset: 60,
      utcOffsetStr: '+01:00',
      dstOffset: 120,
      dstOffsetStr: '+02:00',
      aliasOf: null
    }
  ]
};

describe('.getTimezonesForCountry', () => {
  Object.keys(TEST_CASES).forEach(testCase => {
    it(`should return correct timezones for country "${testCase}"`, () => {
      const result = ct.getTimezonesForCountry(testCase);
      const expectedResult = TEST_CASES[testCase];
      expect(result).to.be.eql(expectedResult);
    });
  });

  it('should return empty array for country without timezones', () => {
    const result = ct.getTimezonesForCountry('BV');
    expect(result).to.be.eql([]);
  });

  it('should return null for not existent country', () => {
    const result = ct.getTimezonesForCountry('NOT_EXISTENT_COUNTRY');
    expect(result).to.be.eql(null);
  });
});
