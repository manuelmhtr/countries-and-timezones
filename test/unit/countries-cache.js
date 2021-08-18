import sinon from 'sinon';
import proxyquire from 'proxyquire';
import buildCountry from '../../src/build-country';
import { countries } from '../../src/data.json';

const totalCountries = Object.keys(countries).length;

describe('Countries cache', () => {
  const buildCountrySpy = sinon.spy(buildCountry);
  let ct;

  beforeEach(() => {
    buildCountrySpy.resetHistory();

    ct = proxyquire('../../src', {
      './build-country': {
        __esModule: true,
        default: buildCountrySpy,
      }
    });
  });

  it('should call "buildCountry" once when requesting a single country', () => {
    ct.getCountry('MX');
    expect(buildCountrySpy.callCount).to.be.equal(1);
  });

  it('should call "buildCountry" once when requesting the same country multiple times', () => {
    ct.getCountry('MX');
    ct.getCountry('MX');
    expect(buildCountrySpy.callCount).to.be.equal(1);
  });

  it('should call "buildCountry" method once for each country when requesting all', () => {
    ct.getAllCountries();
    expect(buildCountrySpy.callCount).to.be.equal(totalCountries);
  });

  it('should cache all countries to minimize "buildCountry" calls', () => {
    ct.getAllCountries();
    ct.getAllCountries();
    expect(buildCountrySpy.callCount).to.be.equal(totalCountries);
  });

  it('should cache countries incrementally', () => {
    ct.getCountry('MX');
    expect(buildCountrySpy.callCount).to.be.equal(1);
    ct.getCountry('MX');
    expect(buildCountrySpy.callCount).to.be.equal(1);
    ct.getCountry('US');
    expect(buildCountrySpy.callCount).to.be.equal(2);
    ct.getAllCountries();
    expect(buildCountrySpy.callCount).to.be.equal(totalCountries);
    ct.getCountry('MX');
    expect(buildCountrySpy.callCount).to.be.equal(totalCountries);
    ct.getAllCountries();
    expect(buildCountrySpy.callCount).to.be.equal(totalCountries);
  });
});
