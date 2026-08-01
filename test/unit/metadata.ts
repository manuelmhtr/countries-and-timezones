import {describe, expect, it} from 'vitest';
import * as ct from '../../src';
import {metadata} from '../../src/data.js';

describe('metadata', () => {
  it('exposes bundled dataset metadata', () => {
    expect(ct.getMetadata()).to.be.eql(metadata);
    expect(metadata.tzdbVersion).to.match(/^\d{4}[a-z]$/);
    expect(metadata.generator.repository).to.be.equal(
      'manuelmhtr/countries-and-timezones-generator',
    );
  });
});
