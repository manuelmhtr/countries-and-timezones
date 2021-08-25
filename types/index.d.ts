export interface Country {
  id: string;
  name: string;
  timezones: string[];
}

export interface Timezone {
  name: string;
  countries: string[];
  utcOffset: number;
  utcOffsetStr: string;
  dstOffset: number;
  dstOffsetStr: string;
  aliasOf: string | null;
}

export function getCountry(id: string): Country | null;

export function getTimezone(name: string): Timezone | null;

export function getAllCountries(): Record<string, Country>;

export function getAllTimezones(): Record<string, Timezone>;

export function getTimezonesForCountry(id: string): Timezone[] | null;

export function getCountriesForTimezone(name: string): Country[];

export function getCountryForTimezone(name: string): Country | null;
