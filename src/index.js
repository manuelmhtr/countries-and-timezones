const data = require('./data.json');
const buildCountry = require('./build-country');
const buildTimezone = require('./build-timezone');
const totalCountries = Object.keys(data.countries).length;
const totalTimezones = Object.keys(data.timezones).length;
const countries = {};
const timezones = {};
let memoizedCountries = 0;
let memoizedTimezones = 0;

function getAllCountries() {
  if (totalCountries !== memoizedCountries) Object.keys(data.countries).forEach(getCountry);
  return { ...countries };
}

function getAllTimezones() {
  if (totalTimezones !== memoizedTimezones) Object.keys(data.timezones).forEach(getTimezone);
  return { ...timezones };
}

function getCountry(id) {
  if (!countries[id]) memoizeCountry(buildCountry(data, id));
  return countries[id] ? { ...countries[id] } : null;
}

function memoizeCountry(country) {
  if (!country) return;
  countries[country.id] = country;
  memoizedCountries = Object.keys(countries).length;
}

function getTimezone(name) {
  if (!timezones[name]) memoizeTimezone(buildTimezone(data, name));
  return timezones[name] ? { ...timezones[name] } : null;
}

function memoizeTimezone(timezone) {
  if (!timezone) return;
  timezones[timezone.name] = timezone;
  memoizedTimezones = Object.keys(timezone).length;
}

function getCountryForTimezone(tzName) {
  const timezone = getTimezone(tzName) || {};
  const country = timezone.country;
  return country ? getCountry(country) : null;
}

function getTimezonesForCountry(countryId) {
  const country = getCountry(countryId);
  if (!country) return null;
  const {timezones = []} = country;
  return timezones.map(getTimezone);
}

module.exports = {
  getAllCountries,
  getAllTimezones,
  getCountry,
  getTimezone,
  getCountryForTimezone,
  getTimezonesForCountry
};
