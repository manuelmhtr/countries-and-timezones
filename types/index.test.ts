import {
  getCountriesForTimezone,
  getCountry,
  getCountryForTimezone,
  getTimezone,
  getTimezonesForCountry,
} from 'countries-and-timezones';

declare const unknownString: string;
declare const maybeNull: string | null;

getCountry('GB'); // $ExpectType Country
getCountry('GB', { deprecated: true }); // $ExpectType Country
getCountry(unknownString); // $ExpectType Country | null
getCountry(undefined); // $ExpectError
getCountry(maybeNull); // $ExpectError
getCountry({}); // $ExpectError

getTimezone('America/Cancun'); // $ExpectType Timezone
getTimezone(unknownString); // $ExpectType Timezone | null
getTimezone(undefined); // $ExpectError
getTimezone(maybeNull); // $ExpectError
getTimezone(0); // $ExpectError

getTimezonesForCountry('NZ'); // $ExpectType Timezone[]
getTimezonesForCountry('NZ', { deprecated: true }); // $ExpectType Timezone[]
getTimezonesForCountry(unknownString); // $ExpectType Timezone[] | null
getTimezonesForCountry(undefined); // $ExpectError
getTimezonesForCountry(maybeNull); // $ExpectError
getTimezonesForCountry(); // $ExpectError

getCountriesForTimezone('Europe/Amsterdam'); // $ExpectType Country[]
getCountriesForTimezone('Europe/Amsterdam', { deprecated: true }); // $ExpectType Country[]
getCountriesForTimezone(unknownString); // $ExpectType Country[]
getCountriesForTimezone(undefined); // $ExpectError
getCountriesForTimezone(maybeNull); // $ExpectError
getCountriesForTimezone(true); // $ExpectError

getCountryForTimezone('America/Cancun'); // $ExpectType Country
getCountryForTimezone('America/Cancun', { deprecated: true }); // $ExpectType Country
getCountryForTimezone(unknownString); // $ExpectType Country | null
getCountryForTimezone(undefined); // $ExpectError
getCountryForTimezone(maybeNull); // $ExpectError
getCountryForTimezone(getCountryForTimezone); // $ExpectError
