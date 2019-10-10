let timezonesMap;

function buildCountry(data, id) {
  const name = data.countries[id];
  if (!name) return null;

  const tzMap = getTimezonesMap(data);
  const timezones = tzMap[id] || [];

  return {
    id,
    name,
    timezones
  };
}

function getTimezonesMap(data) {
  if (!timezonesMap) timezonesMap = buildTimezonesMap(data);
  return timezonesMap;
};

function buildTimezonesMap(data) {
  return Object.keys(data.timezones).reduce((result, id) => {
    const tz = data.timezones[id];
    const {c, a} = tz;
    const aliasTz = data.timezones[a] || {};
    const country = c || aliasTz.c;

    if (!country) return result;

    if (!result[country]) result[country] = [];
    result[country].push(id);

    return result;
  }, {});
}

module.exports = buildCountry;
