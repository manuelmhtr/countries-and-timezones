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
}

export function getCountry(id: CountryCode): Country;
export function getCountry(id: string): Country | null;

export function getTimezone(name: TimezoneName): Timezone;
export function getTimezone(name: string): Timezone | null;

export function getAllCountries(): Record<CountryCode, Country>;

export function getAllTimezones(): Record<TimezoneName, Timezone>;

export function getTimezonesForCountry(id: CountryCode): Timezone[];
export function getTimezonesForCountry(id: string): Timezone[] | null;

export function getCountriesForTimezone(name: TimezoneName): Country[];
export function getCountriesForTimezone(name: string): Country[];
export function getCountriesForTimezone(name: string): Country[] | null;

export function getCountryForTimezone(name: TimezoneName): Country;
export function getCountryForTimezone(name: string): Country | null;
