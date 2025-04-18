import {expectType, expectError} from 'tsd';
import {
  type Country,
  type Timezone,
  getCountriesForTimezone,
  getCountry,
  getCountryForTimezone,
  getTimezone,
  getTimezonesForCountry,
} from '../src';

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
