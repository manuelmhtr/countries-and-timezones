import { CountryCode, Data, InternalCountry, TimezoneName } from "./index";

type CurrentAndAllTimeZones = {
  current: TimezoneName[];
  all: TimezoneName[]
};

type TimezonesMap = Record<CountryCode, CurrentAndAllTimeZones>;

let timezonesMap: TimezonesMap;

export default function buildCountry(data: Data, id: CountryCode): InternalCountry | null {
  const name = (data as any).countries[id];
  if (!name) return null;

  const tzMap = getTimezonesMap(data)[id] || {};

  return {
    id,
    name,
    timezones: tzMap.current || [],
    allTimezones: tzMap.all || [],
  };
}

function getTimezonesMap(data: Data): TimezonesMap {
  if (!timezonesMap) timezonesMap = buildTimezonesMap(data);
  return timezonesMap;
}

function buildTimezonesMap(data: Data): TimezonesMap {
  return (Object.keys(data.timezones) as TimezoneName[]).reduce((result, id) => {
    const tz = (data as any).timezones[id];
    const { c, a } = tz;
    const aliasTz = (data as any).timezones[a! /* TODO: refine */] || {};
    const countries: CountryCode[] /* TODO: refine */ = c || aliasTz.c;

    if (!countries) return result;

    countries.forEach((country) => {
      if (!result[country]) Object.assign(result, { [country]: { current: [], all: [] } });
      if (tz.r === undefined) result[country].current.push(id);
      result[country].all.push(id);
    });

    return result;
  }, {} as TimezonesMap /* TODO: refine */);
}
