import type {
  CountriesAndTimezonesData,
  InternalCountry,
} from '../types/internal';
import data from './data.json';
import buildCountry from './build-country';
import buildTimezone from './build-timezone';

export type CountryCode = keyof typeof data.countries;
export type TimezoneName = keyof typeof data.timezones;

export type Country = {
  id: CountryCode;
  name: string;
  timezones: TimezoneName[];
};

export type Timezone = {
  name: TimezoneName;
  countries: CountryCode[];
  utcOffset: number;
  utcOffsetStr: string;
  dstOffset: number;
  dstOffsetStr: string;
  aliasOf?: TimezoneName;
  deprecated?: boolean;
};

export type Options = {
  deprecated?: boolean;
};

const totalTimezones = Object.keys(data.timezones).length;
const countries = {} as Record<CountryCode, InternalCountry>;
const timezones = {} as Record<TimezoneName, Timezone>;
let memoizedTimezones = 0;

/**
 * Returns an object with the data of all countries.
 * @param {Options} [options={}] - Optional configuration options.
 * @param {boolean} [options.deprecated] - Indicates if the result should include deprecated timezones or not.
 * @returns {Record<CountryCode, Country>} Object with all countries.
 * @example
 * const ct = require("countries-and-timezones");
 *
 * const countries = ct.getAllCountries();
 * console.log(countries);
 *
 * // Prints:
 * // {
 * //   AD: {
 * //     id: 'AD',
 * //     name: 'Andorra',
 * //     timezones: [ 'Europe/Andorra' ]
 * //   },
 * //   AE: {
 * //     id: 'AE',
 * //     name: 'United Arab Emirates',
 * //     timezones: [ 'Asia/Dubai' ]
 * //   },
 * //   ...
 * // }
 */
export function getAllCountries(
  options: Options = {},
): Record<CountryCode, Country> {
  return Object.keys(data.countries).reduce(
    (previous, id) => {
      return Object.assign(previous, {[id]: getCountry(id, options)});
    },
    {} as Record<CountryCode, Country>,
  );
}

/**
 * Returns an object with the data of all timezones.
 * @param {Options} [options={}] - Optional configuration options.
 * @param {boolean} [options.deprecated] - Indicates if the result should include deprecated timezones or not.
 * @returns {Record<TimezoneName, Timezone>} Object with all timezones.
 * @example
 * const ct = require("countries-and-timezones");
 *
 * const timezones = ct.getAllTimezones();
 * console.log(timezones);
 *
 * // Prints:
 * // {
 * //   "Africa/Abidjan": {
 * //     "name": "Africa/Abidjan",
 * //     "countries": [
 * //       "CI", "BF", "GH",
 * //       "GM", "GN", "ML",
 * //       "MR", "SH", "SL",
 * //       "SN", "TG"
 * //     ],
 * //     "utcOffset": 0,
 * //     "utcOffsetStr": "+00:00",
 * //     "dstOffset": 0,
 * //     "dstOffsetStr": "+00:00",
 * //     "aliasOf": null
 * //   },
 * //   ...
 * // }
 */
export function getAllTimezones(
  options: Options = {},
): Record<TimezoneName, Timezone> {
  if (totalTimezones !== memoizedTimezones)
    for (const name of Object.keys(data.timezones)) {
      getTimezone(name);
    }

  return deliverTimezones(timezones, options);
}

export function getCountry(id: CountryCode, options?: Options): Country;
export function getCountry(id: string, options?: Options): Country | null;
/**
 * Returns a country referenced by its id.
 * @param {CountryCode | string} id - The country ISO 3166-1 code.
 * @param {Options} [options={}] - Optional configuration options.
 * @param {boolean} [options.deprecated] - Indicates if the result should include deprecated timezones or not.
 * @returns {(Country | null)} The country data or null if not found.
 * @example
 * const ct = require("countries-and-timezones");
 *
 * const country = ct.getCountry("DE");
 * console.log(country);
 *
 * // Prints:
 * // {
 * //   id: 'DE',
 * //   name: 'Germany',
 * //   timezones: [ 'Europe/Berlin', 'Europe/Zurich' ]
 * // }
 */
export function getCountry(
  id: CountryCode | string,
  options: Options = {},
): Country | null {
  if (!countries[id as CountryCode])
    memoizeCountry(buildCountry(data as CountriesAndTimezonesData, id));
  return deliverCountry(countries[id as CountryCode], options);
}

function memoizeCountry(country: InternalCountry | null): void {
  if (!country) return;
  countries[country.id] = country;
}

export function getTimezone(name: TimezoneName): Timezone;
export function getTimezone(name: string): Timezone | null;
/**
 * Returns a timezone referenced by its name.
 * @param {TimezoneName | string} name - The timezone name from tz database.
 * @returns {(Timezone | null)} The timezone data or null if not found.
 * @example
 * const ct = require("countries-and-timezones");
 *
 * const timezone = ct.getTimezone("America/Los_Angeles");
 * console.log(timezone);
 *
 * // Prints:
 * // {
 * //   name: 'America/Los_Angeles',
 * //   countries: [ 'US' ],
 * //   utcOffset: -480,
 * //   utcOffsetStr: '-08:00',
 * //   dstOffset: -420,
 * //   dstOffsetStr: '-07:00',
 * //   aliasOf: null
 * // }
 */
export function getTimezone(name: TimezoneName | string): Timezone | null {
  if (!timezones[name as TimezoneName])
    memoizeTimezone(buildTimezone(data as CountriesAndTimezonesData, name));
  return timezones[name as TimezoneName]
    ? {...timezones[name as TimezoneName]}
    : null;
}

function memoizeTimezone(timezone: Timezone | null): void {
  if (!timezone) return;
  timezones[timezone.name] = timezone;
  memoizedTimezones = Object.keys(timezone).length;
}

/**
 * Returns a list of the countries that uses a timezone given its name.
 * When a timezone has multiple countries the first element is more relevant
 * due to its geographical location.
 * @param {TimezoneName | string} tzName - The timezone name.
 * @param {Options} [options={}] - Optional configuration options.
 * @param {boolean} [options.deprecated] - Indicates if the result should include deprecated timezones or not.
 * @returns {Country[]} Array of countries that use the timezone.
 * @example
 * const ct = require("countries-and-timezones");
 *
 * const timezone = ct.getCountriesForTimezone("Europe/Zurich");
 * console.log(timezone);
 *
 * // Prints:
 * // [
 * //   {
 * //     "id": "CH",
 * //     "name": "Switzerland",
 * //     "timezones": [
 * //       "Europe/Zurich"
 * //     ]
 * //   },
 * //   {
 * //     "id": "DE",
 * //     "name": "Germany",
 * //     "timezones": [
 * //       "Europe/Berlin",
 * //       "Europe/Zurich"
 * //     ]
 * //   },
 * //   {
 * //     "id": "LI",
 * //     "name": "Liechtenstein",
 * //     "timezones": [
 * //       "Europe/Zurich"
 * //     ]
 * //   }
 * // ]
 */
export function getCountriesForTimezone(
  tzName: TimezoneName | string,
  options: Options = {},
): Country[] {
  const timezone = getTimezone(tzName) || ({} as Timezone);
  const values = timezone.countries || [];
  return values.map((c) => getCountry(c, options));
}

export function getCountryForTimezone(
  tzName: TimezoneName,
  options?: Options,
): Country;
export function getCountryForTimezone(
  tzName: string,
  options?: Options,
): Country | null;
/**
 * Returns the most relevant country (due to its geographical location) that uses a timezone given its name.
 * @param {TimezoneName | string} tzName - The timezone name.
 * @param {Options} [options={}] - Optional configuration options.
 * @param {boolean} [options.deprecated] - Indicates if the result should include deprecated timezones or not.
 * @returns {(Country | null)} The country data or null if not found.
 * @example
 * const ct = require("countries-and-timezones");
 *
 * const timezone = ct.getCountryForTimezone("Europe/Zurich");
 * console.log(timezone);
 *
 * // Prints:
 * // {
 * //   "id": "CH",
 * //   "name": "Switzerland",
 * //   "timezones": [
 * //     "Europe/Zurich"
 * //   ]
 * // }
 */
export function getCountryForTimezone(
  tzName: TimezoneName | string,
  options: Options = {},
): Country | null {
  const [main] = getCountriesForTimezone(tzName, options);
  return main || null;
}

export function getTimezonesForCountry(
  countryId: CountryCode,
  options?: Options,
): Timezone[];
export function getTimezonesForCountry(
  countryId: string,
  options?: Options,
): Timezone[] | null;
/**
 * Returns an array with all the timezones of a country given its id.
 * @param {CountryCode | string} countryId - The country ISO 3166-1 code.
 * @param {Options} [options={}] - Optional configuration options.
 * @param {boolean} [options.deprecated] - Indicates if the result should include deprecated timezones or not.
 * @returns {(Timezone[] | null)} Array of timezones or null if country not found.
 * @example
 * const ct = require("countries-and-timezones");
 *
 * const timezones = ct.getTimezonesForCountry("MX");
 * console.log(timezones);
 *
 * // Prints:
 * // [
 * //   {
 * //     "name": "America/Bahia_Banderas",
 * //     "countries": [ "MX" ],
 * //     "utcOffset": -360,
 * //     "utcOffsetStr": "-06:00",
 * //     "dstOffset": -300,
 * //     "dstOffsetStr": "-05:00",
 * //     "aliasOf": null
 * //   },
 * //   ...
 * // ]
 */
export function getTimezonesForCountry(
  countryId: CountryCode | string,
  options: Options = {},
): Timezone[] | null {
  const country = getCountry(countryId, options);
  if (!country) return null;
  const values = country.timezones || [];
  return values.map((timezone) => getTimezone(timezone));
}

function deliverTimezones(
  tzs: Record<TimezoneName, Timezone>,
  options?: Options,
): Record<TimezoneName, Timezone> {
  const {deprecated} = options || {};
  if (deprecated === true) return tzs;
  return (Object.keys(tzs) as TimezoneName[]).reduce(
    (previous, key) => {
      if (!tzs[key].deprecated) Object.assign(previous, {[key]: tzs[key]});
      return previous;
    },
    {} as Record<TimezoneName, Timezone>,
  );
}

function deliverCountry(
  country: InternalCountry | undefined,
  options?: Options,
): Country | null {
  if (!country) return null;
  const {deprecated} = options || {};
  const {allTimezones, ...other} = country;
  const tz = deprecated ? country.allTimezones : country.timezones;
  return {...other, timezones: tz};
}

const utils = {
  getCountry,
  getTimezone,
  getAllCountries,
  getAllTimezones,
  getTimezonesForCountry,
  getCountriesForTimezone,
  getCountryForTimezone,
};

export default utils;
