import {describe, it, expect} from 'vitest';
import * as ct from '../../src';
import data from '../../src/data.json';
import {countDeprecatedTimezones} from '../utils';
import type {Timezone, TimezoneName, TimezonesData} from '../../src';

const TOTAL_TIMEZONES = Object.keys(data.timezones).length;
const DEPRECATED_TIMEZONES = countDeprecatedTimezones(
  data.timezones as TimezonesData,
);
const TZ_WITHOUT_COUNTRIES = new Set([
  'GMT',
  'UTC',
  'UCT',
  'CET',
  'CST6CDT',
  'EET',
  'EST',
  'EST5EDT',
  'Factory',
  'HST',
  'MET',
  'MST',
  'MST7MDT',
  'PST8PDT',
  'WET',
  'Greenwich',
  'Universal',
  'Zulu',
]);

describe('.getAllTimezones', () => {
  it('should return an object containing current timezones data', () => {
    const expectedLength = TOTAL_TIMEZONES - DEPRECATED_TIMEZONES;
    const timezones = ct.getAllTimezones();
    expect(timezones).to.be.an('object');
    expect(Object.keys(timezones).length).to.be.equal(expectedLength);
    expect(countDeprecatedTimezones(timezones)).to.be.equal(0);

    for (const timezone of Object.values(timezones)) {
      const aliasTz = timezone.aliasOf ? timezones[timezone.aliasOf] : null;
      expectTimezone(timezone, aliasTz);
    }
  });

  it('should return an object containing full timezones data, even deprecated ones', () => {
    const timezones = ct.getAllTimezones({deprecated: true});
    expect(timezones).to.be.an('object');
    expect(Object.keys(timezones).length).to.be.equal(TOTAL_TIMEZONES);
    expect(countDeprecatedTimezones(timezones)).to.be.equal(
      DEPRECATED_TIMEZONES,
    );

    for (const timezone of Object.values(timezones)) {
      const aliasTz = timezone.aliasOf ? timezones[timezone.aliasOf] : null;
      expectTimezone(timezone, aliasTz);
    }
  });
});

function expectTimezone(
  timezone: Timezone,
  aliasTz: Timezone | undefined,
): void {
  expect(timezone.name).to.be.a('string');
  expect(timezone.utcOffset).to.be.a('number');
  expect(timezone.utcOffsetStr).to.be.a('string');
  expect(timezone.dstOffset).to.be.a('number');
  expect(timezone.dstOffsetStr).to.be.a('string');
  expect(timezone.utcOffsetStr).to.match(/^([+-])\d{2}:\d{2}$/);
  expect(timezone.dstOffsetStr).to.match(/^([+-])\d{2}:\d{2}$/);
  if (aliasTz) expectAlias(timezone, aliasTz);
  if (shouldHaveCountry(timezone.name)) {
    expect(timezone.countries).to.be.an('array');
    expect(timezone.countries.length > 0).to.be.equal(true);
    for (const country of timezone.countries) {
      expect(country).to.be.a('string');
      expect(country.length).to.be.equal(2);
    }
  }
}

function shouldHaveCountry(name: TimezoneName): boolean {
  return (
    !name.includes('Etc/') &&
    !name.includes('GMT') &&
    !TZ_WITHOUT_COUNTRIES.has(name)
  );
}

function expectAlias(timezone: Timezone, aliasTz: Timezone): void {
  expect(timezone.aliasOf).to.be.equal(aliasTz.name);
  expect(timezone.utcOffset).to.be.equal(aliasTz.utcOffset);
  expect(timezone.utcOffsetStr).to.be.equal(aliasTz.utcOffsetStr);
  expect(timezone.dstOffset).to.be.equal(aliasTz.dstOffset);
  expect(timezone.dstOffsetStr).to.be.equal(aliasTz.dstOffsetStr);
}
