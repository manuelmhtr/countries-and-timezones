import {describe, expect, it, vi} from 'vitest';
import * as ct from '../../src';
import dataset, {metadata} from '../../src/data';
import {
  createDynamicCountriesAndTimezones,
  loadCountriesAndTimezones,
} from '../../src/dynamic';

describe('dynamic API', () => {
  it('loads the bundled dataset lazily', async () => {
    const dynamicCt = await loadCountriesAndTimezones();
    expect(dynamicCt.getCountry('MX')).to.be.eql(ct.getCountry('MX'));
    expect(dynamicCt.getTimezone('UTC')).to.be.eql(ct.getTimezone('UTC'));
    expect(dynamicCt.getMetadata()).to.be.eql(metadata);
  });

  it('loads the dataset only once per dynamic instance', async () => {
    const loader = vi.fn(async () => dataset);
    const dynamicCt = createDynamicCountriesAndTimezones(loader);

    expect(dynamicCt.isLoaded()).to.be.equal(false);
    expect(await dynamicCt.getCountry('MX')).to.be.eql(ct.getCountry('MX'));
    expect(await dynamicCt.getCountry('US')).to.be.eql(ct.getCountry('US'));
    expect(await dynamicCt.getMetadata()).to.be.eql(metadata);
    expect(dynamicCt.isLoaded()).to.be.equal(true);
    expect(loader).toHaveBeenCalledTimes(1);
  });
});
