import type {CountriesAndTimezonesData} from '../types/internal';
import rawData from './data.json';
import metadata from './metadata.json';

export const data = rawData as CountriesAndTimezonesData;

const dataset = {
  data,
  metadata,
};

export default dataset;

export {default as metadata} from './metadata.json';
