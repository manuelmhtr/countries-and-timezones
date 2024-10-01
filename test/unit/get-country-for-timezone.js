import * as ct from '../../src';

const TEST_CASES = {
  'America/Mexico_City': 'MX',
  'America/Anchorage': 'US',
  'America/Los_Angeles': 'US',
  'America/North_Dakota/New_Salem': 'US',
  'Europe/Zurich': 'CH',
};

describe('.getCountryForTimezone', () => {
  for (const testCase of Object.keys(TEST_CASES)) {
    it(`returns the correct country for timezone "${testCase}"`, () => {
      const result = ct.getCountryForTimezone(testCase);
      const expectedResult = ct.getCountry(TEST_CASES[testCase]);
      expect(result).to.be.eql(expectedResult);
    });

    it(`includes deprecated timezones in the country for "${testCase}" with deprecated option`, () => {
      const options = {deprecated: true};
      const result = ct.getCountryForTimezone(testCase, options);
      const expectedResult = ct.getCountry(TEST_CASES[testCase], options);
      expect(result).to.be.eql(expectedResult);
    });
  }

  it('should return null for timezone without country', () => {
    const result = ct.getCountryForTimezone('UTC');
    expect(result).to.be.eql(null);
  });

  it('should return null for not existent timezone', () => {
    const result = ct.getCountryForTimezone('NOT_EXISTENT_TZ');
    expect(result).to.be.eql(null);
  });
});
