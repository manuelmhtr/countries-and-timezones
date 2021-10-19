import * as ct from '../../src';

const US = {
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
};

const MX = {
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
};

const CH = {
  id: 'CH',
  name: 'Switzerland',
  timezones: [
    'Europe/Zurich',
  ]
};

const TEST_CASES = {
  'America/Mexico_City': 'MX',
  'America/Anchorage': 'US',
  'America/Los_Angeles': 'US',
  'America/North_Dakota/New_Salem': 'US',
  'Europe/Zurich': 'CH',
};

describe('.getCountryForTimezone', () => {
  Object.keys(TEST_CASES).forEach(testCase => {
    it(`returns the correct country for timezone "${testCase}"`, () => {
      const result = ct.getCountryForTimezone(testCase);
      const expectedResult = ct.getCountry(TEST_CASES[testCase]);
      expect(result).to.be.eql(expectedResult);
    });

    it(`includes deprecated timezones in the country for "${testCase}" with deprecated option`, () => {
      const options = { deprecated: true };
      const result = ct.getCountryForTimezone(testCase, options);
      const expectedResult = ct.getCountry(TEST_CASES[testCase], options);
      expect(result).to.be.eql(expectedResult);
    });
  });

  it('should return null for timezone without country', () => {
    const result = ct.getCountryForTimezone('UTC');
    expect(result).to.be.eql(null);
  });

  it('should return null for not existent timezone', () => {
    const result = ct.getCountryForTimezone('NOT_EXISTENT_TZ');
    expect(result).to.be.eql(null);
  });
});
