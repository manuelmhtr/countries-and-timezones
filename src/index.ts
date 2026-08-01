import dataset from './data.js';
import {createCountriesAndTimezones} from './create-countries-and-timezones';

export type {
  Country,
  CountryCode,
  DatasetMetadata,
  Options,
  Timezone,
  TimezoneName,
} from './types';

const utilities = createCountriesAndTimezones(dataset);

export const {getCountry} = utilities;
export const {getTimezone} = utilities;
export const {getAllCountries} = utilities;
export const {getAllTimezones} = utilities;
export const {getTimezonesForCountry} = utilities;
export const {getCountriesForTimezone} = utilities;
export const {getCountryForTimezone} = utilities;
export const {getMetadata} = utilities;

const defaultExport = {
  getCountry,
  getTimezone,
  getAllCountries,
  getAllTimezones,
  getTimezonesForCountry,
  getCountriesForTimezone,
  getCountryForTimezone,
  getMetadata,
};

export {
  type CountriesAndTimezonesDataset,
  createCountriesAndTimezones,
  type CountriesAndTimezonesInstance,
} from './create-countries-and-timezones';

export default defaultExport;
