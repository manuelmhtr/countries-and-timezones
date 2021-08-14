import { countries, timezones } from '../src/data.json'

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

type nullish = null | undefined;

export function getCountry(id: CountryCode): Country;
export function getCountry(id: nullish): null;
export function getCountry(id: string | nullish): Country | null;

export function getTimezone(name: TimezoneName): Timezone;
export function getTimezone(name: nullish): null;
export function getTimezone(name: string | nullish): Timezone | null;

export function getAllCountries(): { [id in CountryCode]: Country };

export function getAllTimezones(): { [name in TimezoneName]: Timezone };

export function getTimezonesForCountry(id: CountryCode): Timezone[];
export function getTimezonesForCountry(id: nullish): null;
export function getTimezonesForCountry(id: string | nullish): Timezone[] | null;

export function getCountriesForTimezone(name: TimezoneName): Country[];
export function getCountriesForTimezone(name: string): Country[];
export function getCountriesForTimezone(name: nullish): null;
export function getCountriesForTimezone(
  name: string | nullish
): Country[] | null;

export function getCountryForTimezone(name: TimezoneName): Country;
export function getCountryForTimezone(name: nullish): null;
export function getCountryForTimezone(name: string | nullish): Country | null;
