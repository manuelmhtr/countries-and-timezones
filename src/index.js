import data from './data.json';
import buildCountry from './build-country';
import buildTimezone from './build-timezone';

const totalTimezones = Object.keys(data.timezones).length;
const countries = {};
const timezones = {};
let memoizedTimezones = 0;

export function getAllCountries(options = {}) {
  return Object.keys(data.countries).reduce((prev, id) => {
    return Object.assign(prev, { [id]: getCountry(id, options) });
  }, {});
}

export function getAllTimezones(options = {}) {
  if (totalTimezones !== memoizedTimezones) Object.keys(data.timezones).forEach(getTimezone);
  return deliverTimezones(timezones, options);
}

export function getCountry(id, options = {}) {
  if (!countries[id]) memoizeCountry(buildCountry(data, id));
  return deliverCountry(countries[id], options);
}

function memoizeCountry(country) {
  if (!country) return;
  countries[country.id] = country;
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

export function getCountriesForTimezone(tzName, options = {}) {
  const timezone = getTimezone(tzName) || {};
  const values = timezone.countries || [];
  return values.map((c) => getCountry(c, options));
}

export function getCountryForTimezone(tzName, options = {}) {
  const [main] = getCountriesForTimezone(tzName, options);
  return main || null;
}

export function getTimezonesForCountry(countryId, options = {}) {
  const country = getCountry(countryId, options);
  if (!country) return null;
  const values = country.timezones || [];
  return values.map(getTimezone);
}

function deliverTimezones(tzs, options) {
  const { deprecated } = options || {};
  if (deprecated === true) return tzs;
  return Object.keys(tzs).reduce((prev, key) => {
    if (!tzs[key].deprecated) Object.assign(prev, { [key]: tzs[key] });
    return prev;
  }, {});
}

function deliverCountry(country, options) {
  if (!country) return null;
  const { deprecated } = options || {};
  const { allTimezones, ...other } = country;
  const tz = deprecated ? country.allTimezones : country.timezones;
  return { ...other, timezones: tz };
}

export default {
  getCountry,
  getTimezone,
  getAllCountries,
  getAllTimezones,
  getTimezonesForCountry,
  getCountriesForTimezone,
  getCountryForTimezone,
};
