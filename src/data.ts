import rawData from './data.json';
import metadata from './metadata.json';
import type {CountriesAndTimezonesData} from '../types/internal';

export const data = rawData as CountriesAndTimezonesData;
export {metadata};

const dataset = {
  data,
  metadata,
};

export default dataset;
