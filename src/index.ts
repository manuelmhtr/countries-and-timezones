import dataset from './data';
import {
  createCountriesAndTimezones,
  type CountriesAndTimezonesDataset,
  type CountriesAndTimezonesInstance,
} from './create-countries-and-timezones';

export type {
  Country,
  CountryCode,
  DatasetMetadata,
  Options,
  Timezone,
  TimezoneName,
} from './types';
export {createCountriesAndTimezones};
export type {CountriesAndTimezonesDataset, CountriesAndTimezonesInstance};

const utilities = createCountriesAndTimezones(dataset);

export const getCountry = utilities.getCountry;
export const getTimezone = utilities.getTimezone;
export const getAllCountries = utilities.getAllCountries;
export const getAllTimezones = utilities.getAllTimezones;
export const getTimezonesForCountry = utilities.getTimezonesForCountry;
export const getCountriesForTimezone = utilities.getCountriesForTimezone;
export const getCountryForTimezone = utilities.getCountryForTimezone;
export const getMetadata = utilities.getMetadata;

export default {
  getCountry,
  getTimezone,
  getAllCountries,
  getAllTimezones,
  getTimezonesForCountry,
  getCountriesForTimezone,
  getCountryForTimezone,
  getMetadata,
};
