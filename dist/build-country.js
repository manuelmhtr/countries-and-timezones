"use strict";

var timezonesMap;

function buildCountry(data, id) {
  var name = data.countries[id];
  if (!name) return null;
  var tzMap = getTimezonesMap(data);
  var timezones = tzMap[id] || [];
  return {
    id: id,
    name: name,
    timezones: timezones
  };
}

function getTimezonesMap(data) {
  if (!timezonesMap) timezonesMap = buildTimezonesMap(data);
  return timezonesMap;
}

;

function buildTimezonesMap(data) {
  return Object.keys(data.timezones).reduce(function (result, id) {
    var tz = data.timezones[id];
    var c = tz.c,
        a = tz.a;
    var aliasTz = data.timezones[a] || {};
    var country = c || aliasTz.c;
    if (!country) return result;
    if (!result[country]) result[country] = [];
    result[country].push(id);
    return result;
  }, {});
}

module.exports = buildCountry;
//# sourceMappingURL=build-country.js.map