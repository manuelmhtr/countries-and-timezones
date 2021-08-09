const ct = require('../dist');
const data = require('../src/data.json');

describe('.getAllCountries', () => {
  it('should return an object containing full countries data', () => {
    const expectedLength = Object.keys(data.countries).length;
    const countries = ct.getAllCountries();
    expect(Object.keys(countries).length).toEqual(expectedLength);

    Object.values(countries).forEach(expectCountry);
  });
});

function expectCountry(country) {
  expect(country.id).toMatch(/^[A-Z]{2}$/);
  expect(country.name).toMatch(/^[a-zA-ZÀ-ÿ \-,()]+$/);
  expect(country.timezones.length > 0).toEqual(true);
  country.timezones.forEach((timezone) => {
    expect(timezone).toMatch(/^[a-zA-Z0-9/\-+_]+$/);
  });
}
