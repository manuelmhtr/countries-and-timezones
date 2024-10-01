import data from './data.json';
import buildCountry from './build-country.js';
import buildTimezone from './build-timezone.js';

const totalTimezones = Object.keys(data.timezones).length;
const countries = {};
const timezones = {};
let memoizedTimezones = 0;

export function getAllCountries(options = {}) {
  return Object.keys(data.countries).reduce((previous, id) => {
    return Object.assign(previous, {[id]: getCountry(id, options)});
  }, {});
}

export function getAllTimezones(options = {}) {
  if (totalTimezones !== memoizedTimezones)
    for (const name of Object.keys(data.timezones)) {
      getTimezone(name);
    }

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
  return timezones[name] ? {...timezones[name]} : null;
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
  return values.map((timezone) => getTimezone(timezone));
}

function deliverTimezones(tzs, options) {
  const {deprecated} = options || {};
  if (deprecated === true) return tzs;
  return Object.keys(tzs).reduce((previous, key) => {
    if (!tzs[key].deprecated) Object.assign(previous, {[key]: tzs[key]});
    return previous;
  }, {});
}

function deliverCountry(country, options) {
  if (!country) return null;
  const {deprecated} = options || {};
  const {allTimezones, ...other} = country;
  const tz = deprecated ? country.allTimezones : country.timezones;
  return {...other, timezones: tz};
}

const utils = {
  getCountry,
  getTimezone,
  getAllCountries,
  getAllTimezones,
  getTimezonesForCountry,
  getCountriesForTimezone,
  getCountryForTimezone,
};

export default utils;
