import type {
  CountriesAndTimezonesData,
  InternalCountry,
} from '../types/internal';
import buildCountry from './build-country';
import buildTimezone from './build-timezone';
import type {
  Country,
  CountryCode,
  DatasetMetadata,
  Options,
  Timezone,
  TimezoneName,
} from './types';

export type CountriesAndTimezonesDataset = {
  data: CountriesAndTimezonesData;
  metadata?: DatasetMetadata;
};

export type CountriesAndTimezonesInstance = {
  getCountry(id: CountryCode, options?: Options): Country;
  getCountry(id: string, options?: Options): Country | null;
  getTimezone(name: TimezoneName): Timezone;
  getTimezone(name: string): Timezone | null;
  getAllCountries(options?: Options): Record<CountryCode, Country>;
  getAllTimezones(options?: Options): Record<TimezoneName, Timezone>;
  getTimezonesForCountry(countryId: CountryCode, options?: Options): Timezone[];
  getTimezonesForCountry(countryId: string, options?: Options): Timezone[] | null;
  getCountriesForTimezone(tzName: TimezoneName | string, options?: Options): Country[];
  getCountryForTimezone(tzName: TimezoneName, options?: Options): Country;
  getCountryForTimezone(tzName: string, options?: Options): Country | null;
  getMetadata(): DatasetMetadata | null;
};

export function createCountriesAndTimezones({
  data,
  metadata,
}: CountriesAndTimezonesDataset): CountriesAndTimezonesInstance {
  const totalTimezones = Object.keys(data.timezones).length;
  const countries = {} as Record<CountryCode, InternalCountry>;
  const timezones = {} as Record<TimezoneName, Timezone>;
  let memoizedTimezones = 0;

  function getAllCountries(
    options: Options = {},
  ): Record<CountryCode, Country> {
    return Object.keys(data.countries).reduce(
      (previous, id) => {
        return Object.assign(previous, {[id]: getCountry(id, options)});
      },
      {} as Record<CountryCode, Country>,
    );
  }

  function getAllTimezones(
    options: Options = {},
  ): Record<TimezoneName, Timezone> {
    if (totalTimezones !== memoizedTimezones)
      for (const name of Object.keys(data.timezones)) {
        getTimezone(name);
      }

    return deliverTimezones(timezones, options);
  }

  function getCountry(id: CountryCode, options?: Options): Country;
  function getCountry(id: string, options?: Options): Country | null;
  function getCountry(
    id: CountryCode | string,
    options: Options = {},
  ): Country | null {
    if (!countries[id as CountryCode]) {
      memoizeCountry(buildCountry(data, id));
    }

    return deliverCountry(countries[id as CountryCode], options);
  }

  function memoizeCountry(country: InternalCountry | null): void {
    if (!country) return;
    countries[country.id] = country;
  }

  function getTimezone(name: TimezoneName): Timezone;
  function getTimezone(name: string): Timezone | null;
  function getTimezone(name: TimezoneName | string): Timezone | null {
    if (!timezones[name as TimezoneName]) {
      memoizeTimezone(buildTimezone(data, name));
    }

    return timezones[name as TimezoneName]
      ? {...timezones[name as TimezoneName]}
      : null;
  }

  function memoizeTimezone(timezone: Timezone | null): void {
    if (!timezone) return;
    timezones[timezone.name] = timezone;
    memoizedTimezones = Object.keys(timezones).length;
  }

  function getCountriesForTimezone(
    tzName: TimezoneName | string,
    options: Options = {},
  ): Country[] {
    const timezone = getTimezone(tzName) || ({} as Timezone);
    const values = timezone.countries || [];
    return values.map((countryCode) => getCountry(countryCode, options));
  }

  function getCountryForTimezone(
    tzName: TimezoneName,
    options?: Options,
  ): Country;
  function getCountryForTimezone(
    tzName: string,
    options?: Options,
  ): Country | null;
  function getCountryForTimezone(
    tzName: TimezoneName | string,
    options: Options = {},
  ): Country | null {
    const [main] = getCountriesForTimezone(tzName, options);
    return main || null;
  }

  function getTimezonesForCountry(
    countryId: CountryCode,
    options?: Options,
  ): Timezone[];
  function getTimezonesForCountry(
    countryId: string,
    options?: Options,
  ): Timezone[] | null;
  function getTimezonesForCountry(
    countryId: CountryCode | string,
    options: Options = {},
  ): Timezone[] | null {
    const country = getCountry(countryId, options);
    if (!country) return null;
    const values = country.timezones || [];
    return values.map((timezoneName) => getTimezone(timezoneName));
  }

  function getMetadata(): DatasetMetadata | null {
    return metadata ? {...metadata, generator: {...metadata.generator}} : null;
  }

  return {
    getCountry,
    getTimezone,
    getAllCountries,
    getAllTimezones,
    getTimezonesForCountry,
    getCountriesForTimezone,
    getCountryForTimezone,
    getMetadata,
  };
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
  const timezones = deprecated ? country.allTimezones : country.timezones;
  return {...other, timezones};
}
