import data from './data.json';
import buildCountry from './build-country';
import buildTimezone from './build-timezone';

export type Data = typeof data;

export type CompressedTimezone = {
  a?: StrictTimezoneName;
  c?: CountryCode[];
  u?: number;
  d?: number;
  r?: boolean;
}

export type StrictCountryCode = keyof typeof data.countries;
export type CountryCode = StrictCountryCode | string;
export type StrictTimezoneName = keyof typeof data.timezones;
export type TimezoneName = StrictTimezoneName | string;

export interface Country {
  id: CountryCode;
  name: string;
  timezones: TimezoneName[];
}

export interface InternalCountry extends Country{
  allTimezones: TimezoneName[];
}

export interface Timezone {
  name: StrictTimezoneName;
  countries: CountryCode[];
  utcOffset: number;
  utcOffsetStr: string;
  dstOffset: number;
  dstOffsetStr: string;
  aliasOf: string | null;
  deprecated?: boolean;
}

export interface Options {
  deprecated: boolean;
}

const totalTimezones = Object.keys(data.timezones).length;
const countries = {} as Record<CountryCode | string, InternalCountry>; /* TODO: refine */
const timezones = {} as Record<TimezoneName, Timezone>; /* TODO: refine */
let memoizedTimezones = 0;

export function getAllCountries(options?: Options): Record<CountryCode, Country> {
  return (Object.keys(data.countries) as CountryCode[]).reduce((prev, id) => {
    return Object.assign(prev, { [id]: getCountry(id, options) });
  }, {});
}

export function getAllTimezones(options?: Options): Record<TimezoneName, Timezone> {
  if (totalTimezones !== memoizedTimezones) Object.keys(data.timezones).forEach(getTimezone);
  return deliverTimezones(timezones, options);
}

export function getCountry(id: CountryCode, options?: Options): Country | null {
  if (!countries[id]) memoizeCountry(buildCountry(data, id));
  return deliverCountry(countries[id], options);
}

function memoizeCountry(country: InternalCountry | null): void {
  if (!country) return;
  countries[country.id] = country;
}

export function getTimezone(name: TimezoneName): Timezone | null {
  if (!timezones[name]) memoizeTimezone(buildTimezone(data, name));
  return timezones[name] ? { ...timezones[name] } : null;
}

function memoizeTimezone(timezone: Timezone | null): void {
  if (!timezone) return;
  timezones[timezone.name] = timezone;
  memoizedTimezones = Object.keys(timezone).length;
}

export function getCountriesForTimezone(name: TimezoneName, options?: Options): Country[] | null {
  const timezone = getTimezone(name) || {} as Timezone;
  const values = timezone.countries || [];
  return values.map((c) => getCountry(c, options)!);
}

export function getCountryForTimezone(name: TimezoneName, options?: Options): Country | null {
  const [main] = getCountriesForTimezone(name, options)! /* TODO: refine */;
  return main || null;
}

export function getTimezonesForCountry(id: CountryCode, options?: Options): Timezone[] | null {
  const country = getCountry(id, options)
  if (!country) return null;
  const values = country.timezones || [];
  return values.map(getTimezone) as Timezone[] /* TODO: refine */;
}

function deliverTimezones(tzs: Record<TimezoneName, Timezone>, options?: Options) {
  const { deprecated } = options || {};
  if (deprecated === true) return tzs;
  return (Object.keys(tzs) as TimezoneName[]).reduce((prev, key) => {
    if (!tzs[key].deprecated) Object.assign(prev, { [key]: tzs[key] });
    return prev;
  }, {});
}

function deliverCountry(country: InternalCountry | null, options?: Options): Country | null {
  if (!country) return null;
  const { deprecated } = options || {};
  const { allTimezones, ...other } = country;
  const tz = deprecated ? country.allTimezones : country.timezones;
  return { ...other, timezones: tz };
}

export default {
  getCountry,
  getTimezone,
  getAllCountries,
  getAllTimezones,
  getTimezonesForCountry,
  getCountriesForTimezone,
  getCountryForTimezone,
};
