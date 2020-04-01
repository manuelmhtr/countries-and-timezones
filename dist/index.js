"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var data = require('./data.json');

var buildCountry = require('./build-country');

var buildTimezone = require('./build-timezone');

var totalCountries = Object.keys(data.countries).length;
var totalTimezones = Object.keys(data.timezones).length;
var countries = {};
var timezones = {};
var memoizedCountries = 0;
var memoizedTimezones = 0;

function getAllCountries() {
  if (totalCountries !== memoizedCountries) Object.keys(data.countries).forEach(getCountry);
  return _objectSpread({}, countries);
}

function getAllTimezones() {
  if (totalTimezones !== memoizedTimezones) Object.keys(data.timezones).forEach(getTimezone);
  return _objectSpread({}, timezones);
}

function getCountry(id) {
  if (!countries[id]) memoizeCountry(buildCountry(data, id));
  return countries[id] ? _objectSpread({}, countries[id]) : null;
}

function memoizeCountry(country) {
  if (!country) return;
  countries[country.id] = country;
  memoizedCountries = Object.keys(countries).length;
}

function getTimezone(name) {
  if (!timezones[name]) memoizeTimezone(buildTimezone(data, name));
  return timezones[name] ? _objectSpread({}, timezones[name]) : null;
}

function memoizeTimezone(timezone) {
  if (!timezone) return;
  timezones[timezone.name] = timezone;
  memoizedTimezones = Object.keys(timezone).length;
}

function getCountryForTimezone(tzName) {
  var timezone = getTimezone(tzName) || {};
  var country = timezone.country;
  return country ? getCountry(country) : null;
}

function getTimezonesForCountry(countryId) {
  var country = getCountry(countryId);
  if (!country) return null;
  var _country$timezones = country.timezones,
      timezones = _country$timezones === void 0 ? [] : _country$timezones;
  return timezones.map(getTimezone);
}

module.exports = {
  getAllCountries: getAllCountries,
  getAllTimezones: getAllTimezones,
  getCountry: getCountry,
  getTimezone: getTimezone,
  getCountryForTimezone: getCountryForTimezone,
  getTimezonesForCountry: getTimezonesForCountry
};
//# sourceMappingURL=index.js.map