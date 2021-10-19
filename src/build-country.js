let timezonesMap;

export default function buildCountry(data, id) {
  const name = data.countries[id];
  if (!name) return null;

  const tzMap = getTimezonesMap(data)[id] || {};

  return {
    id,
    name,
    timezones: tzMap.current || [],
    allTimezones: tzMap.all || [],
  };
}

function getTimezonesMap(data) {
  if (!timezonesMap) timezonesMap = buildTimezonesMap(data);
  return timezonesMap;
}

function buildTimezonesMap(data) {
  return Object.keys(data.timezones).reduce((result, id) => {
    const tz = data.timezones[id];
    const { c, a } = tz;
    const aliasTz = data.timezones[a] || {};
    const countries = c || aliasTz.c;

    if (!countries) return result;

    countries.forEach((country) => {
      if (!result[country]) Object.assign(result, { [country]: { current: [], all: [] } });
      if (tz.r === undefined) result[country].current.push(id);
      result[country].all.push(id);
    });

    return result;
  }, {});
}
