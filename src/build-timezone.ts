import { CompressedTimezone, Data, StrictTimezoneName, Timezone, TimezoneName } from "./index";

export default function buildTimezone(data: Data, name: TimezoneName): Timezone | null {
  const timezone = data.timezones[name as StrictTimezoneName] as CompressedTimezone;
  if (!timezone) return null;

  const { a: aliasOf = null } = timezone;
  const aliasTz = aliasOf ? data.timezones[aliasOf] : {};
  const tz = {
    ...aliasTz,
    ...data.timezones[name as StrictTimezoneName] as CompressedTimezone,
  };

  const countries = tz.c || [];
  const utcOffset = tz.u! /* TODO: refine */;
  const dstOffset = Number.isInteger(tz.d) ? tz.d! /* TODO: refine */ : utcOffset;

  const result: Timezone = {
    name: name as StrictTimezoneName,
    countries,
    utcOffset,
    utcOffsetStr: getOffsetStr(utcOffset),
    dstOffset,
    dstOffsetStr: getOffsetStr(dstOffset),
    aliasOf,
  };
  if (timezone.r) result.deprecated = true;
  return result;
}

function getOffsetStr(offset: number): string {
  const hours = Math.floor(Math.abs(offset) / 60);
  const min = offset % 60;
  const sign = offset < 0 ? '-' : '+';

  return `${sign}${getNumStr(hours)}:${getNumStr(min)}`;
}

function getNumStr(input: number): string {
  const num = Math.abs(input);
  const prefix = num < 10 ? '0' : '';
  return `${prefix}${num}`;
}
