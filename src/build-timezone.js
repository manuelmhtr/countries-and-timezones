export default function buildTimezone(data, name) {
  const timezone = data.timezones[name];
  if (!timezone) return null;

  const {a: aliasOf = null} = timezone;
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
    utcOffsetStr: getOffsetString(utcOffset),
    dstOffset,
    dstOffsetStr: getOffsetString(dstOffset),
    aliasOf,
  };
  if (timezone.r) result.deprecated = true;
  return result;
}

function getOffsetString(offset) {
  const hours = Math.floor(Math.abs(offset) / 60);
  const min = offset % 60;
  const sign = offset < 0 ? '-' : '+';

  return `${sign}${getNumberString(hours)}:${getNumberString(min)}`;
}

function getNumberString(input) {
  const number_ = Math.abs(input);
  const prefix = number_ < 10 ? '0' : '';
  return `${prefix}${number_}`;
}
