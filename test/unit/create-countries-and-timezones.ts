import {describe, expect, it} from 'vitest';
import {createCountriesAndTimezones, getCountry} from '../../src';
import dataset from '../../src/data.js';

describe('createCountriesAndTimezones', () => {
  it('creates isolated instances from a provided dataset', () => {
    const customCt = createCountriesAndTimezones(dataset);
    expect(customCt.getCountry('MX')).to.be.eql(getCountry('MX'));
    expect(customCt.getTimezone('America/New_York')).to.be.eql(
      customCt.getTimezone('America/New_York'),
    );
    expect(customCt.getMetadata()).to.be.eql(dataset.metadata);
  });
});
