import * as ct from '../../src';

const TEST_CASES = {
  'America/Mexico_City': ['MX'],
  'America/Anchorage': ['US'],
  'America/Los_Angeles': ['US'],
  'America/North_Dakota/New_Salem': ['US'],
  'Europe/Zurich': ['CH', 'DE', 'LI']
};

describe('.getCountriesForTimezone', () => {
  Object.keys(TEST_CASES).forEach(testCase => {
    it(`returns correct countries for timezone "${testCase}"`, () => {
      const result = ct.getCountriesForTimezone(testCase);
      const expectedResult = TEST_CASES[testCase].map(id => ct.getCountry(id));
      expect(result).to.be.eql(expectedResult);
    });

    it(`includes deprecated timezones on countries for "${testCase}" with deprecated option`, () => {
      const options = { deprecated: true };
      const result = ct.getCountriesForTimezone(testCase, options);
      const expectedResult = TEST_CASES[testCase].map(id => ct.getCountry(id, options));
      expect(result).to.be.eql(expectedResult);
    });
  });

  it('should return null for timezone without country', () => {
    const result = ct.getCountriesForTimezone('UTC');
    expect(result).to.be.eql([]);
  });

  it('should return null for not existent timezone', () => {
    const result = ct.getCountriesForTimezone('NOT_EXISTENT_TZ');
    expect(result).to.be.eql([]);
  });
});
