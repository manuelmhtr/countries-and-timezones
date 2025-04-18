import type {CountriesAndTimezonesData} from '../types/internal';
import type {Timezone, TimezoneName} from '.';

export default function buildTimezone(
  data: CountriesAndTimezonesData,
  name: TimezoneName | string,
): Timezone | null {
  const timezone = data.timezones[name as TimezoneName];
  if (!timezone) return null;

  const {a: aliasOf = null} = timezone as any;
  const aliasTz = aliasOf ? data.timezones[aliasOf as TimezoneName] : {};
  const tz = {
    ...aliasTz,
    ...data.timezones[name as TimezoneName],
  } as any;

  const countries = tz.c || [];
  const utcOffset = tz.u;
  const dstOffset = Number.isInteger(tz.d) ? tz.d : utcOffset;

  const result: Timezone = {
    name: name as TimezoneName,
    countries,
    utcOffset,
    utcOffsetStr: getOffsetString(utcOffset),
    dstOffset,
    dstOffsetStr: getOffsetString(dstOffset),
    aliasOf,
  };
  if (timezone.r) result.deprecated = true;
  return result;
}

function getOffsetString(offset: number): string {
  const hours = Math.floor(Math.abs(offset) / 60);
  const min = offset % 60;
  const sign = offset < 0 ? '-' : '+';

  return `${sign}${getNumberString(hours)}:${getNumberString(min)}`;
}

function getNumberString(input: number): string {
  const number_ = Math.abs(input);
  const prefix = number_ < 10 ? '0' : '';
  return `${prefix}${number_}`;
}
