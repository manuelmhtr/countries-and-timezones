const sinon = require('sinon');
const proxyquire = require('proxyquire');
const data = require('../../src/data.json');
const totalCountries = Object.keys(data.countries).length;
const buildCountryMock = sinon.spy(function(data, id) {
  return { id };
});

describe('Countries cache', () => {
  let ct;

  beforeEach(() => {
    buildCountryMock.resetHistory();

    ct = proxyquire('../../src', {
      './build-country': buildCountryMock
    });
  });

  it('should call "buildContry" once when requesting a single country', () => {
    ct.getCountry('MX');
    expect(buildCountryMock.callCount).to.be.equal(1);
  });

  it('should call "buildContry" once when requesting the same country multiple times', () => {
    ct.getCountry('MX');
    ct.getCountry('MX');
    expect(buildCountryMock.callCount).to.be.equal(1);
  });

  it('should call "buildContry" method once for each country when requesting all', () => {
    ct.getAllCountries();
    expect(buildCountryMock.callCount).to.be.equal(totalCountries);
  });

  it('should cache all countries to minimize "buildContry" calls', () => {
    ct.getAllCountries();
    ct.getAllCountries();
    expect(buildCountryMock.callCount).to.be.equal(totalCountries);
  });

  it('should cache countries incrementally', () => {
    ct.getCountry('MX');
    expect(buildCountryMock.callCount).to.be.equal(1);
    ct.getCountry('MX');
    expect(buildCountryMock.callCount).to.be.equal(1);
    ct.getCountry('US');
    expect(buildCountryMock.callCount).to.be.equal(2);
    ct.getAllCountries();
    expect(buildCountryMock.callCount).to.be.equal(totalCountries);
    ct.getCountry('MX');
    expect(buildCountryMock.callCount).to.be.equal(totalCountries);
    ct.getAllCountries();
    expect(buildCountryMock.callCount).to.be.equal(totalCountries);
  });
});
