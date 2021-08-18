import * as ct from '../../src/index';

const TEST_CASES = {
  MX: {
    id: 'MX',
    name: 'Mexico',
    timezones: [
      "Mexico/BajaSur",
      "Mexico/General",
      "America/Ensenada",
      "America/Santa_Isabel",
      "Mexico/BajaNorte",
      'America/Bahia_Banderas',
      'America/Cancun',
      'America/Chihuahua',
      'America/Tijuana',
      'America/Hermosillo',
      'America/Matamoros',
      'America/Mazatlan',
      'America/Merida',
      'America/Mexico_City',
      'America/Monterrey',
      'America/Ojinaga'
    ]
  },
  US: {
    id: 'US',
    name: 'United States of America',
    timezones: [
      "America/Atka",
      "US/Aleutian",
      "US/Alaska",
      "US/Central",
      "America/Shiprock",
      "Navajo",
      "US/Mountain",
      "US/Michigan",
      "America/Indiana/Indianapolis",
      "America/Knox_IN",
      "US/Indiana-Starke",
      "America/Louisville",
      "US/Pacific",
      "US/Eastern",
      "US/Arizona",
      "Pacific/Johnston",
      "US/Hawaii",
      'America/Adak',
      'America/Anchorage',
      'America/Boise',
      'America/Chicago',
      'America/Denver',
      'America/Detroit',
      'America/Indiana/Knox',
      'America/Indiana/Marengo',
      'America/Indiana/Petersburg',
      'America/Indiana/Tell_City',
      'America/Indiana/Vevay',
      'America/Indiana/Vincennes',
      'America/Indiana/Winamac',
      'America/Juneau',
      'America/Kentucky/Louisville',
      'America/Kentucky/Monticello',
      'America/Los_Angeles',
      'America/Menominee',
      'America/Metlakatla',
      'America/New_York',
      'America/Nome',
      'America/North_Dakota/Beulah',
      'America/North_Dakota/Center',
      'America/North_Dakota/New_Salem',
      'America/Phoenix',
      'America/Sitka',
      'America/Yakutat',
      'Pacific/Honolulu'
    ]
  },
  KR: {
    id: 'KR',
    name: 'South Korea',
    timezones: [
      'ROK',
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
