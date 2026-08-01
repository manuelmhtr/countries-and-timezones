import {describe, expect, it} from 'vitest';
import * as ct from '../../src';
import {metadata} from '../../src/data';

describe('metadata', () => {
  it('exposes bundled dataset metadata', () => {
    expect(ct.getMetadata()).to.be.eql(metadata);
    expect(metadata.tzdbVersion).to.match(/^[0-9]{4}[a-z]$/);
    expect(metadata.generator.repository).to.be.equal(
      'manuelmhtr/countries-and-timezones-generator',
    );
  });
});
