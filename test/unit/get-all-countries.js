const data = require('../../src/data.json');
const ct = require('../../src');

const COUNTRIES_WITHOUT_TZ = ['BV', 'HM'];

describe('.getAllCountries', () => {
  it('should return an object containing full countries data', () => {
    const expectedLength = Object.keys(data.countries).length;
    const countries = ct.getAllCountries();
    expect(countries).to.be.an('object');
    expect(Object.keys(countries).length).to.be.equal(expectedLength);

    Object.values(countries).forEach(expectCountry);
  });
});

function expectCountry(country) {
  expect(country.id).to.be.a('string');
  expect(country.name).to.be.a('string');
  expect(country.timezones).to.be.an('array');
  expect(country.id.length).to.be.equal(2);
  expect(country.name.length > 0).to.be.equal(true);

  const expectTzLength = !COUNTRIES_WITHOUT_TZ.includes(country.id);
  expect(country.timezones.length > 0).to.be.equal(expectTzLength);
}
