import {describe, it, expect} from 'vitest';
import * as ct from '../../src';

const TEST_CASES = {
  'America/Mexico_City': {
    name: 'America/Mexico_City',
    countries: ['MX'],
    utcOffset: -360,
    utcOffsetStr: '-06:00',
    dstOffset: -360,
    dstOffsetStr: '-06:00',
    aliasOf: null,
  },
  'Indian/Comoro': {
    name: 'Indian/Comoro',
    countries: ['KM'],
    utcOffset: 180,
    utcOffsetStr: '+03:00',
    dstOffset: 180,
    dstOffsetStr: '+03:00',
    aliasOf: 'Africa/Nairobi',
    deprecated: true,
  },
  UTC: {
    name: 'UTC',
    countries: [],
    utcOffset: 0,
    utcOffsetStr: '+00:00',
    dstOffset: 0,
    dstOffsetStr: '+00:00',
    aliasOf: 'Etc/UTC',
    deprecated: true,
  },
  'Asia/Jerusalem': {
    name: 'Asia/Jerusalem',
    countries: ['IL'],
    utcOffset: 120,
    utcOffsetStr: '+02:00',
    dstOffset: 180,
    dstOffsetStr: '+03:00',
    aliasOf: null,
  },
} as const;

describe('.getTimezone', () => {
  for (const testCase of Object.keys(TEST_CASES) as Array<
    keyof typeof TEST_CASES
  >) {
    it(`should return correct data for timezone "${testCase}"`, () => {
      const result = ct.getTimezone(testCase);
      const expectedResult = TEST_CASES[testCase];
      expect(result).to.be.eql(expectedResult);
    });
  }

  it('should return null for not existent timezone', () => {
    const result = ct.getTimezone('NOT_EXISTENT_TZ');
    expect(result).to.be.eql(null);
  });

  it('calculates utcOffsetStr correctly when is not a module of 60', () => {
    const result = ct.getTimezone('Pacific/Marquesas');
    expect(result.utcOffset).to.be.eql(-570);
    expect(result.utcOffsetStr).to.be.eql('-09:30');
  });

  it.each([
    [
      'CST6CDT',
      {
        utcOffset: -360,
        utcOffsetStr: '-06:00',
        dstOffset: -300,
        dstOffsetStr: '-05:00',
      },
    ],
    [
      'EST5EDT',
      {
        utcOffset: -300,
        utcOffsetStr: '-05:00',
        dstOffset: -240,
        dstOffsetStr: '-04:00',
      },
    ],
    [
      'MST7MDT',
      {
        utcOffset: -420,
        utcOffsetStr: '-07:00',
        dstOffset: -360,
        dstOffsetStr: '-06:00',
      },
    ],
    [
      'PST8PDT',
      {
        utcOffset: -480,
        utcOffsetStr: '-08:00',
        dstOffset: -420,
        dstOffsetStr: '-07:00',
      },
    ],
  ] as const)(
    'preserves "%s" as a deprecated standalone timezone without countries',
    (name, offsets) => {
      const timezone = ct.getTimezone(name);
      expect(timezone).to.be.eql({
        name,
        countries: [],
        ...offsets,
        aliasOf: null,
        deprecated: true,
      });
      expect(ct.getAllTimezones()).not.to.have.property(name);
      expect(ct.getAllTimezones({deprecated: true})[name]).to.be.eql(timezone);
      expect(ct.getCountriesForTimezone(name)).to.be.eql([]);
      expect(ct.getCountryForTimezone(name)).to.be.eql(null);
      expect(ct.getCountry('US', {deprecated: true}).timezones).not.to.contain(
        name,
      );
      expect(
        ct
          .getTimezonesForCountry('US', {deprecated: true})
          .map((timezone) => timezone.name),
      ).not.to.contain(name);
    },
  );

  it.each([
    ['America/Inuvik', -360, '-06:00'],
    ['America/Winnipeg', -300, '-05:00'],
    ['Canada/Central', -300, '-05:00'],
    ['America/Rainy_River', -300, '-05:00'],
    ['Africa/Casablanca', 0, '+00:00'],
    ['Africa/El_Aaiun', 0, '+00:00'],
  ] as const)(
    'returns permanent offsets for "%s"',
    (name, offset, offsetString) => {
      const timezone = ct.getTimezone(name);
      expect(timezone.utcOffset).to.be.eql(offset);
      expect(timezone.utcOffsetStr).to.be.eql(offsetString);
      expect(timezone.dstOffset).to.be.eql(offset);
      expect(timezone.dstOffsetStr).to.be.eql(offsetString);
    },
  );
});
