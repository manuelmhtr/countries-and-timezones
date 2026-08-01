import type {
  CountryCode,
  DatasetMetadata,
  Options,
  TimezoneName,
} from './types';
import {
  type CountriesAndTimezonesDataset,
  type CountriesAndTimezonesInstance,
  createCountriesAndTimezones,
} from './create-countries-and-timezones';

export type CountriesAndTimezonesLoader = () =>
  | Promise<CountriesAndTimezonesDataset>
  | CountriesAndTimezonesDataset;

export type DynamicCountriesAndTimezonesInstance = {
  isLoaded(): boolean;
  load(): Promise<CountriesAndTimezonesInstance>;
  getMetadata(): Promise<DatasetMetadata | null>;
  getCountry(
    id: CountryCode,
    options?: Options,
  ): Promise<ReturnType<CountriesAndTimezonesInstance['getCountry']>>;
  getCountry(
    id: string,
    options?: Options,
  ): Promise<ReturnType<CountriesAndTimezonesInstance['getCountry']>>;
  getTimezone(
    name: TimezoneName,
  ): Promise<ReturnType<CountriesAndTimezonesInstance['getTimezone']>>;
  getTimezone(
    name: string,
  ): Promise<ReturnType<CountriesAndTimezonesInstance['getTimezone']>>;
  getAllCountries(
    options?: Options,
  ): Promise<ReturnType<CountriesAndTimezonesInstance['getAllCountries']>>;
  getAllTimezones(
    options?: Options,
  ): Promise<ReturnType<CountriesAndTimezonesInstance['getAllTimezones']>>;
  getTimezonesForCountry(
    countryId: CountryCode,
    options?: Options,
  ): Promise<
    ReturnType<CountriesAndTimezonesInstance['getTimezonesForCountry']>
  >;
  getTimezonesForCountry(
    countryId: string,
    options?: Options,
  ): Promise<
    ReturnType<CountriesAndTimezonesInstance['getTimezonesForCountry']>
  >;
  getCountriesForTimezone(
    tzName: TimezoneName | string,
    options?: Options,
  ): Promise<
    ReturnType<CountriesAndTimezonesInstance['getCountriesForTimezone']>
  >;
  getCountryForTimezone(
    tzName: TimezoneName,
    options?: Options,
  ): Promise<
    ReturnType<CountriesAndTimezonesInstance['getCountryForTimezone']>
  >;
  getCountryForTimezone(
    tzName: string,
    options?: Options,
  ): Promise<
    ReturnType<CountriesAndTimezonesInstance['getCountryForTimezone']>
  >;
};

export function createDynamicCountriesAndTimezones(
  loader: CountriesAndTimezonesLoader = loadBundledCountriesAndTimezonesData,
): DynamicCountriesAndTimezonesInstance {
  let instancePromise: Promise<CountriesAndTimezonesInstance> | undefined;

  async function load(): Promise<CountriesAndTimezonesInstance> {
    instancePromise ||= Promise.resolve(loader()).then((dataset) =>
      createCountriesAndTimezones(dataset),
    );
    return instancePromise;
  }

  return {
    isLoaded() {
      return instancePromise !== undefined;
    },
    load,
    async getMetadata() {
      const instance = await load();
      return instance.getMetadata();
    },
    async getCountry(id: CountryCode | string, options?: Options) {
      const instance = await load();
      return instance.getCountry(id, options);
    },
    async getTimezone(name: TimezoneName | string) {
      const instance = await load();
      return instance.getTimezone(name);
    },
    async getAllCountries(options?: Options) {
      const instance = await load();
      return instance.getAllCountries(options);
    },
    async getAllTimezones(options?: Options) {
      const instance = await load();
      return instance.getAllTimezones(options);
    },
    async getTimezonesForCountry(
      countryId: CountryCode | string,
      options?: Options,
    ) {
      const instance = await load();
      return instance.getTimezonesForCountry(countryId, options);
    },
    async getCountriesForTimezone(
      tzName: TimezoneName | string,
      options?: Options,
    ) {
      const instance = await load();
      return instance.getCountriesForTimezone(tzName, options);
    },
    async getCountryForTimezone(
      tzName: TimezoneName | string,
      options?: Options,
    ) {
      const instance = await load();
      return instance.getCountryForTimezone(tzName, options);
    },
  };
}

export async function loadCountriesAndTimezones(
  loader: CountriesAndTimezonesLoader = loadBundledCountriesAndTimezonesData,
): Promise<CountriesAndTimezonesInstance> {
  return createDynamicCountriesAndTimezones(loader).load();
}

async function loadBundledCountriesAndTimezonesData(): Promise<CountriesAndTimezonesDataset> {
  const module = await import('./data.js');
  return module.default;
}
