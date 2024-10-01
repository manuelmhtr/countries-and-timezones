import {type countries, type timezones} from '../src/data.json';

export type CountryCode = keyof typeof countries;
export type TimezoneName = keyof typeof timezones;

export type Country = {
  id: CountryCode;
  name: string;
  timezones: TimezoneName[];
};

export type Timezone = {
  name: string;
  countries: CountryCode[];
  utcOffset: number;
  utcOffsetStr: string;
  dstOffset: number;
  dstOffsetStr: string;
  aliasOf: string | undefined;
  deprecated: boolean | undefined;
};

export type Options = {
  deprecated: boolean;
};

export function getCountry(id: CountryCode, options?: Options): Country;
export function getCountry(id: string, options?: Options): Country | undefined;

export function getTimezone(name: TimezoneName): Timezone;
export function getTimezone(name: string): Timezone | undefined;

export function getAllCountries(
  options?: Options,
): Record<CountryCode, Country>;

export function getAllTimezones(
  options?: Options,
): Record<TimezoneName, Timezone>;

export function getTimezonesForCountry(
  id: CountryCode,
  options?: Options,
): Timezone[];
export function getTimezonesForCountry(
  id: string,
  options?: Options,
): Timezone[] | undefined;

export function getCountriesForTimezone(
  name: TimezoneName,
  options?: Options,
): Country[];
export function getCountriesForTimezone(
  name: string,
  options?: Options,
): Country[];
export function getCountriesForTimezone(
  name: string,
  options?: Options,
): Country[] | undefined;

export function getCountryForTimezone(
  name: TimezoneName,
  options?: Options,
): Country;
export function getCountryForTimezone(
  name: string,
  options?: Options,
): Country | undefined;
