export default function buildTimezone(data, name) {
  const timezone = data.timezones[name];
  if (!timezone) return null;

  const { a: aliasOf = null } = timezone;
  const aliasTz = aliasOf ? data.timezones[aliasOf] : {};
  const tz = {
    ...aliasTz,
    ...data.timezones[name],
  };

  const countries = tz.c || [];
  const utcOffset = tz.u;
  const dstOffset = Number.isInteger(tz.d) ? tz.d : utcOffset;

  const result = {
    name,
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

function getOffsetStr(offset) {
  const hours = Math.floor(offset / 60);
  const min = offset % 60;
  const sign = offset < 0 ? '-' : '+';

  return `${sign}${getNumStr(hours)}:${getNumStr(min)}`;
}

function getNumStr(input) {
  const num = Math.abs(input);
  const prefix = num < 10 ? '0' : '';
  return `${prefix}${num}`;
}
