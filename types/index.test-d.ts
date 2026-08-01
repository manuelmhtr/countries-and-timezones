import {expectType, expectError} from 'tsd';
import {
  type Country,
  type DatasetMetadata,
  type Timezone,
  createCountriesAndTimezones,
  getCountriesForTimezone,
  getCountry,
  getCountryForTimezone,
  getMetadata,
  getTimezone,
  getTimezonesForCountry,
} from '../src';
import {
  createDynamicCountriesAndTimezones,
  loadCountriesAndTimezones,
} from '../src/dynamic';
import dataset from '../src/data.js';

declare const unknownString: string;
declare const maybeNull: string | undefined;

// GetCountry tests
expectType<Country>(getCountry('GB'));
expectType<Country>(getCountry('GB', {deprecated: true}));
expectType<Country | null>(getCountry(unknownString));
expectError(getCountry(undefined));
expectError(getCountry(maybeNull));
expectError(getCountry({}));

// GetTimezone tests
expectType<Timezone>(getTimezone('America/Cancun'));
expectType<Timezone | null>(getTimezone(unknownString));
expectError(getTimezone(undefined));
expectError(getTimezone(maybeNull));
expectError(getTimezone(0));

// GetTimezonesForCountry tests
expectType<Timezone[]>(getTimezonesForCountry('NZ'));
expectType<Timezone[]>(getTimezonesForCountry('NZ', {deprecated: true}));
expectType<Timezone[] | null>(getTimezonesForCountry(unknownString));
expectError(getTimezonesForCountry(undefined));
expectError(getTimezonesForCountry(maybeNull));
expectError(getTimezonesForCountry());

// GetCountriesForTimezone tests
expectType<Country[]>(getCountriesForTimezone('Europe/Amsterdam'));
expectType<Country[]>(
  getCountriesForTimezone('Europe/Amsterdam', {deprecated: true}),
);
expectType<Country[]>(getCountriesForTimezone(unknownString));
expectError(getCountriesForTimezone(undefined));
expectError(getCountriesForTimezone(maybeNull));
expectError(getCountriesForTimezone(true));

// GetCountryForTimezone tests
expectType<Country>(getCountryForTimezone('America/Cancun'));
expectType<Country>(
  getCountryForTimezone('America/Cancun', {deprecated: true}),
);
expectType<Country | null>(getCountryForTimezone(unknownString));
expectError(getCountryForTimezone(undefined));
expectError(getCountryForTimezone(maybeNull));
expectError(getCountryForTimezone(getCountryForTimezone));

// Metadata and factory tests
expectType<DatasetMetadata | null>(getMetadata());
expectType<Country>(createCountriesAndTimezones(dataset).getCountry('GB'));

// Dynamic API tests
expectType<Promise<Country | null>>(
  createDynamicCountriesAndTimezones().getCountry(unknownString),
);
expectType<Promise<Timezone | null>>(
  createDynamicCountriesAndTimezones().getTimezone(unknownString),
);
expectType<Promise<DatasetMetadata | null>>(
  createDynamicCountriesAndTimezones().getMetadata(),
);
expectType<Promise<Country>>(
  loadCountriesAndTimezones().then((instance) => instance.getCountry('GB')),
);
