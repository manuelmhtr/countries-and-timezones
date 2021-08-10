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
getCountry(unknownString); // $ExpectType Country | null
getCountry(undefined); // $ExpectType null
getCountry(maybeNull); // $ExpectType Country | null
getCountry({}); // $ExpectError

getTimezone('America/Cancun'); // $ExpectType Timezone
getTimezone(unknownString); // $ExpectType Timezone | null
getTimezone(undefined); // $ExpectType null
getTimezone(maybeNull); // $ExpectType Timezone | null
getTimezone(0); // $ExpectError

getTimezonesForCountry('NZ'); // $ExpectType Timezone[]
getTimezonesForCountry(unknownString); // $ExpectType Timezone[] | null
getTimezonesForCountry(undefined); // $ExpectType null
getTimezonesForCountry(maybeNull); // $ExpectType Timezone[] | null
getTimezonesForCountry(); // $ExpectError

getCountriesForTimezone('Europe/Amsterdam'); // $ExpectType Country[]
getCountriesForTimezone(unknownString); // $ExpectType Country[]
getCountriesForTimezone(undefined); // $ExpectType null
getCountriesForTimezone(maybeNull); // $ExpectType Country[] | null
getCountriesForTimezone(true); // $ExpectError

getCountryForTimezone('America/Cancun'); // $ExpectType Country
getCountryForTimezone(unknownString); // $ExpectType Country | null
getCountryForTimezone(undefined); // $ExpectType null
getCountryForTimezone(maybeNull); // $ExpectType Country | null
getCountryForTimezone(getCountryForTimezone); // $ExpectError
