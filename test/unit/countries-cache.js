import {afterEach, beforeEach, describe, it, expect, vi} from 'vitest';
import buildCountry from '../../src/build-country.js';
import {countries} from '../../src/data.json';

vi.mock('../../src/build-country.js', {spy: true});

const totalCountries = Object.keys(countries).length;

describe('Countries cache', () => {
  let ct;

  beforeEach(async () => {
    ct = await import('../../src/index.js');
  });

  afterEach(async () => {
    vi.resetModules();
    vi.resetAllMocks();
  });

  it('should call "buildCountry" once when requesting a single country', () => {
    ct.getCountry('MX');
    expect(buildCountry).toHaveBeenCalledTimes(1);
  });

  it('should call "buildCountry" once when requesting the same country multiple times', () => {
    ct.getCountry('MX');
    ct.getCountry('MX');
    expect(buildCountry).toHaveBeenCalledTimes(1);
  });

  it('should call "buildCountry" method once for each country when requesting all', () => {
    ct.getAllCountries();
    expect(buildCountry).toHaveBeenCalledTimes(totalCountries);
  });

  it('should cache all countries to minimize "buildCountry" calls', () => {
    ct.getAllCountries();
    ct.getAllCountries();
    expect(buildCountry).toHaveBeenCalledTimes(totalCountries);
  });

  it('should cache countries incrementally', () => {
    ct.getCountry('MX');
    expect(buildCountry).toHaveBeenCalledTimes(1);
    ct.getCountry('MX');
    expect(buildCountry).toHaveBeenCalledTimes(1);
    ct.getCountry('US');
    expect(buildCountry).toHaveBeenCalledTimes(2);
    ct.getAllCountries();
    expect(buildCountry).toHaveBeenCalledTimes(totalCountries);
    ct.getCountry('MX');
    expect(buildCountry).toHaveBeenCalledTimes(totalCountries);
    ct.getAllCountries();
    expect(buildCountry).toHaveBeenCalledTimes(totalCountries);
  });
});
