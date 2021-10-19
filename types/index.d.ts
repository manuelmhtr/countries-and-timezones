import { countries, timezones } from '../src/data.json';

export type CountryCode = keyof typeof countries;
export type TimezoneName = keyof typeof timezones;

export interface Country {
  id: CountryCode;
  name: string;
  timezones: TimezoneName[];
}

export interface Timezone {
  name: string;
  countries: CountryCode[];
  utcOffset: number;
  utcOffsetStr: string;
  dstOffset: number;
  dstOffsetStr: string;
  aliasOf: string | null;
  deprecated: boolean | undefined;
}

export interface Options {
  deprecated: boolean;
}

export function getCountry(id: CountryCode, options?: Options): Country;
export function getCountry(id: string, options?: Options): Country | null;

export function getTimezone(name: TimezoneName): Timezone;
export function getTimezone(name: string): Timezone | null;

export function getAllCountries(options?: Options): Record<CountryCode, Country>;

export function getAllTimezones(options?: Options): Record<TimezoneName, Timezone>;

export function getTimezonesForCountry(id: CountryCode, options?: Options): Timezone[];
export function getTimezonesForCountry(id: string, options?: Options): Timezone[] | null;

export function getCountriesForTimezone(name: TimezoneName, options?: Options): Country[];
export function getCountriesForTimezone(name: string, options?: Options): Country[];
export function getCountriesForTimezone(name: string, options?: Options): Country[] | null;

export function getCountryForTimezone(name: TimezoneName, options?: Options): Country;
export function getCountryForTimezone(name: string, options?: Options): Country | null;
