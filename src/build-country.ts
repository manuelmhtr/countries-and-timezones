import type {
  CountriesAndTimezonesData,
  InternalCountry,
} from '../types/internal';
import type {Country, CountryCode, TimezoneName} from '.';

let timezonesMap;

export default function buildCountry(
  data: CountriesAndTimezonesData,
  id: CountryCode | string,
): InternalCountry | null {
  const name = data.countries[id as CountryCode];
  if (!name) return null;

  const tzMap = getTimezonesMap(data)[id as CountryCode] || {};

  return {
    id: id as CountryCode,
    name,
    timezones: tzMap.current || [],
    allTimezones: tzMap.all || [],
  };
}

function getTimezonesMap(
  data: CountriesAndTimezonesData,
): Record<
  CountryCode,
  Country & {current: TimezoneName[]; all: TimezoneName[]}
> {
  timezonesMap ||= buildTimezonesMap(data);
  return timezonesMap;
}

function buildTimezonesMap(data: CountriesAndTimezonesData): Record<
  CountryCode,
  Country & {
    current: TimezoneName[];
    all: TimezoneName[];
  }
> {
  return (Object.keys(data.timezones) as TimezoneName[]).reduce(
    (result, id) => {
      const tz = data.timezones[id];
      const {c, a} = tz as any;
      const aliasTz = data.timezones[a as TimezoneName] || {};
      const countries = (c || aliasTz.c) as CountryCode[];

      if (!countries) return result;

      for (const country of countries) {
        if (!result[country])
          Object.assign(result, {[country]: {current: [], all: []}});
        if (tz.r === undefined) result[country].current.push(id);
        result[country].all.push(id);
      }

      return result;
    },
    {} as Record<
      CountryCode,
      Country & {
        current: TimezoneName[];
        all: TimezoneName[];
      }
    >,
  );
}
