import * as ct from '../../src';
import data from '../../src/data.json';
import { getDeprecatedTimezones } from '../utils';

const DEPRECATED_TIMEZONES = getDeprecatedTimezones(data.timezones);

describe('.getAllCountries', () => {
  it('returns an object containing full countries data', () => {
    const expectedLength = Object.keys(data.countries).length;
    const countries = ct.getAllCountries();
    expect(countries).to.be.an('object');
    expect(Object.keys(countries).length).to.be.equal(expectedLength);

    Object.values(countries).forEach(expectCountry);
  });

  it('does not include any deprecated timezone when "deprecated" options is false', () => {
    const countries = ct.getAllCountries({ deprecated: false });
    expect(hasDeprecatedTimezones(countries)).to.be.equal(false);
  });

  it('includes deprecated timezones when "deprecated" options is true', () => {
    const countries = ct.getAllCountries({ deprecated: true });
    expect(hasDeprecatedTimezones(countries)).to.be.equal(true);
  });
});

function expectCountry(country) {
  expect(country.id).to.be.a('string');
  expect(country.name).to.be.a('string');
  expect(country.timezones).to.be.an('array');
  expect(country.id.length).to.be.equal(2);
  expect(country.name.length > 0).to.be.equal(true);
}

function hasDeprecatedTimezones(countries) {
  return Object.values(countries).some(({ timezones }) => {
    return timezones.some((tz) => DEPRECATED_TIMEZONES[tz]);
  });
}
