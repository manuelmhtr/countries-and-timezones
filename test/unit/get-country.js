import * as ct from '../../src/index';

const TEST_CASES = {
  MX: {
    id: 'MX',
    name: 'Mexico',
    timezones: [
      'America/Bahia_Banderas',
      'America/Cancun',
      'America/Chihuahua',
      'America/Ciudad_Juarez',
      'America/Hermosillo',
      'America/Matamoros',
      'America/Mazatlan',
      'America/Merida',
      'America/Mexico_City',
      'America/Monterrey',
      'America/Ojinaga',
      'America/Tijuana',
    ]
  },
  US: {
    id: 'US',
    name: 'United States of America',
    timezones: [
      'America/Adak',
      'America/Anchorage',
      'America/Boise',
      'America/Chicago',
      'America/Denver',
      'America/Detroit',
      "America/Indiana/Indianapolis",
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
      'Asia/Seoul'
    ]
  }
};

const DEPRECATED = {
  MX: [
    "America/Ensenada",
    "America/Santa_Isabel",
    "Mexico/BajaNorte",
    "Mexico/BajaSur",
    "Mexico/General",
  ],
  US: [
    "America/Atka",
    "America/Fort_Wayne",
    "America/Indianapolis",
    "America/Knox_IN",
    "America/Louisville",
    "America/Shiprock",
    "Navajo",
    'Pacific/Johnston',
    "US/Alaska",
    "US/Aleutian",
    "US/Arizona",
    "US/Central",
    "US/East-Indiana",
    "US/Eastern",
    "US/Hawaii",
    "US/Indiana-Starke",
    "US/Michigan",
    "US/Mountain",
    "US/Pacific",
  ],
  KR: [
    'ROK',
  ],
};

describe('.getCountry', () => {
  Object.keys(TEST_CASES).forEach(testCase => {
    it(`should return correct data for country "${testCase}"`, () => {
      const result = ct.getCountry(testCase);
      const expectedResult = TEST_CASES[testCase];
      expect(result).to.be.eql(expectedResult);
    });

    it(`should return correct data for country "${testCase}" with deprecated option`, () => {
      const result = ct.getCountry(testCase, { deprecated: true });
      const expectedResult = TEST_CASES[testCase];
      expectedResult.timezones = [...expectedResult.timezones, ...DEPRECATED[testCase]].sort();
      expect(result).to.be.eql(expectedResult);
    });
  });

  it('should return null for not existent country', () => {
    const result = ct.getCountry('NOT_EXISTENT_COUNTRY');
    expect(result).to.be.eql(null);
  });
});
