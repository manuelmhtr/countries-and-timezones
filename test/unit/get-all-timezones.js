const data = require('../../src/data.json');
const ct = require('../../src');

const TZ_WITHOUT_COUNTRIES = ['GMT', 'UTC'];

describe('.getAllTimezones', () => {
  it('should return an object containing full timezones data', () => {
    const expectedLength = Object.keys(data.timezones).length;
    const timezones = ct.getAllTimezones();
    expect(timezones).to.be.an('object');
    expect(Object.keys(timezones).length).to.be.equal(expectedLength);

    Object.values(timezones).forEach(timezone => {
      const aliasTz = timezone.aliasOf ? timezones[timezone.aliasOf] : null;
      expectTimezone(timezone, aliasTz);
    });
  });
});

function expectTimezone(timezone, aliasTz) {
  expect(timezone.name).to.be.a('string');
  expect(timezone.utcOffset).to.be.a('number');
  expect(timezone.utcOffsetStr).to.be.a('string');
  expect(timezone.dstOffset).to.be.a('number');
  expect(timezone.dstOffsetStr).to.be.a('string');
  expect(timezone.utcOffsetStr).to.match(/^(\+|\-)\d{2}:\d{2}$/);
  expect(timezone.dstOffsetStr).to.match(/^(\+|\-)\d{2}:\d{2}$/);
  if (aliasTz) expectAlias(timezone, aliasTz);
  if (shouldHaveCountry(timezone.name)) {
    expect(timezone.country).to.be.a('string');
    expect(timezone.country.length).to.be.equal(2);
  }
}

function shouldHaveCountry(name) {
  return !name.includes('Etc/') && !TZ_WITHOUT_COUNTRIES.includes(name);
}

function expectAlias(timezone, aliasTz) {
  expect(timezone.aliasOf).to.be.equal(aliasTz.name);
  expect(timezone.utcOffset).to.be.equal(aliasTz.utcOffset);
  expect(timezone.utcOffsetStr).to.be.equal(aliasTz.utcOffsetStr);
  expect(timezone.dstOffset).to.be.equal(aliasTz.dstOffset);
  expect(timezone.dstOffsetStr).to.be.equal(aliasTz.dstOffsetStr);
}
