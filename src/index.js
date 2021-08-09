import data from './data.json';
import buildCountry from './build-country';
import buildTimezone from './build-timezone';

const totalCountries = Object.keys(data.countries).length;
const totalTimezones = Object.keys(data.timezones).length;
const countries = {};
const timezones = {};
let memoizedCountries = 0;
let memoizedTimezones = 0;

export function getAllCountries() {
  if (totalCountries !== memoizedCountries) Object.keys(data.countries).forEach(getCountry);
  return { ...countries };
}

export function getAllTimezones() {
  if (totalTimezones !== memoizedTimezones) Object.keys(data.timezones).forEach(getTimezone);
  return { ...timezones };
}

export function getCountry(id) {
  if (!countries[id]) memoizeCountry(buildCountry(data, id));
  return countries[id] ? { ...countries[id] } : null;
}

function memoizeCountry(country) {
  if (!country) return;
  countries[country.id] = country;
  memoizedCountries = Object.keys(countries).length;
}

export function getTimezone(name) {
  if (!timezones[name]) memoizeTimezone(buildTimezone(data, name));
  return timezones[name] ? { ...timezones[name] } : null;
}

function memoizeTimezone(timezone) {
  if (!timezone) return;
  timezones[timezone.name] = timezone;
  memoizedTimezones = Object.keys(timezone).length;
}

export function getCountriesForTimezone(tzName) {
  const timezone = getTimezone(tzName) || {};
  const values = timezone.countries || [];
  return values.map(getCountry);
}

export function getCountryForTimezone(tzName) {
  const [main] = getCountriesForTimezone(tzName);
  return main || null;
}

export function getTimezonesForCountry(countryId) {
  const country = getCountry(countryId);
  if (!country) return null;
  const values = country.timezones || [];
  return values.map(getTimezone);
}
