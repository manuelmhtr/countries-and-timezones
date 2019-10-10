const ct = require('../../src');

const TEST_CASES = {
  MX: {
    id: 'MX',
    name: 'Mexico',
    timezones: [
      'America/Bahia_Banderas',
      'America/Cancun',
      'America/Chihuahua',
      'America/Ensenada',
      'America/Hermosillo',
      'America/Matamoros',
      'America/Mazatlan',
      'America/Merida',
      'America/Mexico_City',
      'America/Monterrey',
      'America/Ojinaga',
      'America/Santa_Isabel',
      'America/Tijuana'
    ]
  },
  US: {
    id: 'US',
    name: 'United States of America',
    timezones: [
      'America/Adak',
      'America/Anchorage',
      'America/Atka',
      'America/Boise',
      'America/Chicago',
      'America/Denver',
      'America/Detroit',
      'America/Fort_Wayne',
      'America/Indiana/Indianapolis',
      'America/Indiana/Knox',
      'America/Indiana/Marengo',
      'America/Indiana/Petersburg',
      'America/Indiana/Tell_City',
      'America/Indiana/Vevay',
      'America/Indiana/Vincennes',
      'America/Indiana/Winamac',
      'America/Indianapolis',
      'America/Juneau',
      'America/Kentucky/Louisville',
      'America/Kentucky/Monticello',
      'America/Knox_IN',
      'America/Los_Angeles',
      'America/Louisville',
      'America/Menominee',
      'America/Metlakatla',
      'America/New_York',
      'America/Nome',
      'America/North_Dakota/Beulah',
      'America/North_Dakota/Center',
      'America/North_Dakota/New_Salem',
      'America/Phoenix',
      'America/Shiprock',
      'America/Sitka',
      'America/Yakutat',
      'Pacific/Honolulu',
      'Pacific/Johnston'
    ]
  },
  KR: {
    id: 'KR',
    name: 'South Korea',
    timezones: [
      'Asia/Seoul'
    ]
  }
};

describe('.getCountry', () => {
  Object.keys(TEST_CASES).forEach(testCase => {
    it(`should return correct data for country "${testCase}"`, () => {
      const result = ct.getCountry(testCase);
      const expectedResult = TEST_CASES[testCase];
      expect(result).to.be.eql(expectedResult);
    });
  });

  it('should return null for not existent country', () => {
    const result = ct.getCountry('NOT_EXISTENT_COUNTRY');
    expect(result).to.be.eql(null);
  });
});
