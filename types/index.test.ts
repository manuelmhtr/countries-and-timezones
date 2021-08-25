import {
  getCountriesForTimezone,
  getCountry,
  getCountryForTimezone,
  getTimezone,
  getTimezonesForCountry,
} from 'countries-and-timezones';

declare const unknownString: string;
declare const maybeNull: string | null;

getCountry(unknownString); // $ExpectType Country | null
getCountry(undefined); // $ExpectError
getCountry(maybeNull); // $ExpectError
getCountry({}); // $ExpectError

getTimezone(unknownString); // $ExpectType Timezone | null
getTimezone(undefined); // $ExpectError
getTimezone(maybeNull); // $ExpectError
getTimezone(0); // $ExpectError

getTimezonesForCountry(unknownString); // $ExpectType Timezone[] | null
getTimezonesForCountry(undefined); // $ExpectError
getTimezonesForCountry(maybeNull); // $ExpectError
getTimezonesForCountry(); // $ExpectError

getCountriesForTimezone(unknownString); // $ExpectType Country[]
getCountriesForTimezone(undefined); // $ExpectError
getCountriesForTimezone(maybeNull); // $ExpectError
getCountriesForTimezone(true); // $ExpectError

getCountryForTimezone(unknownString); // $ExpectType Country | null
getCountryForTimezone(undefined); // $ExpectError
getCountryForTimezone(maybeNull); // $ExpectError
getCountryForTimezone(getCountryForTimezone); // $ExpectError
