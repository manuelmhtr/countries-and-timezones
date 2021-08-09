const data = require('../src/data.json');
const ct = require('../dist');

const TZ_WITHOUT_COUNTRIES = [
  'GMT', 'UTC', 'UCT', 'CET', 'CST6CDT', 'EET', 'EST', 'EST5EDT', 'HST', 'MET',
  'MST', 'MST7MDT', 'PST8PDT', 'WET', 'Greenwich', 'Universal', 'Zulu',
];

describe('.getAllTimezones', () => {
  it('should return an object containing full timezones data', () => {
    const expectedLength = Object.keys(data.timezones).length;
    const timezones = ct.getAllTimezones();
    expect(Object.keys(timezones).length).toEqual(expectedLength);

    Object.values(timezones).forEach((timezone) => {
      const aliasTz = timezone.aliasOf ? timezones[timezone.aliasOf] : null;
      expectTimezone(timezone, aliasTz);
    });
  });
});

function expectTimezone(timezone, aliasTz) {
  expect(typeof timezone.utcOffset).toEqual('number');
  expect(typeof timezone.dstOffset).toEqual('number');
  expect(timezone.name).toMatch(/^[a-zA-Z0-9/\-+_]+$/);
  expect(timezone.utcOffsetStr).toMatch(/^(\+|-)\d{2}:\d{2}$/);
  expect(timezone.dstOffsetStr).toMatch(/^(\+|-)\d{2}:\d{2}$/);
  if (aliasTz) expectAlias(timezone, aliasTz);
  if (shouldHaveCountry(timezone.name)) {
    expect(timezone.countries.length > 0).toEqual(true);
    timezone.countries.forEach((country) => {
      expect(country).toMatch(/^[A-Z]{2}$/);
    });
  }
}

function shouldHaveCountry(name) {
  return !name.includes('Etc/')
    && !name.includes('GMT')
    && !TZ_WITHOUT_COUNTRIES.includes(name);
}

function expectAlias(timezone, aliasTz) {
  expect(timezone.aliasOf).toEqual(aliasTz.name);
  expect(timezone.utcOffset).toEqual(aliasTz.utcOffset);
  expect(timezone.utcOffsetStr).toEqual(aliasTz.utcOffsetStr);
  expect(timezone.dstOffset).toEqual(aliasTz.dstOffset);
  expect(timezone.dstOffsetStr).toEqual(aliasTz.dstOffsetStr);
}
