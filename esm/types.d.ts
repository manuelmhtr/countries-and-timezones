interface Country {
  id: string;
  name: string;
  timezones: string[];
}

interface Timezone {
  name: string;
  countries: string[];
  utcOffset: number;
  utcOffsetStr: string;
  dstOffset: number;
  dstOffsetStr: string;
  aliasOf: string | null;
}

declare function getCountry(id: string): Country | null;

declare function getTimezone(name: string): Timezone | null;

declare function getAllCountries(): Record<string, Country>;

declare function getAllTimezones(): Record<string, Timezone>;

declare function getTimezonesForCountry(id: string): Timezone[] | null;

declare function getCountriesForTimezone(name: string): Country[];

declare function getCountryForTimezone(name: string): Country | null;

export { Country, Timezone, getAllCountries, getAllTimezones, getCountriesForTimezone, getCountry, getCountryForTimezone, getTimezone, getTimezonesForCountry };
