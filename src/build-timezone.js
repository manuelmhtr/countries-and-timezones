function buildTimezone(data, name) {
  const timezone = data.timezones[name];
  if (!timezone) return null;

  const {a: aliasOf = null} = timezone;
  const aliasTz = aliasOf ? data.timezones[aliasOf] : {};
  const tz = {
    ...aliasTz,
    ...data.timezones[name]
  };

  const country = tz.c || null;
  const utcOffset = tz.u;
  const dstOffset = Number.isInteger(tz.d) ? tz.d : utcOffset;

  return {
    name,
    country,
    utcOffset,
    utcOffsetStr: getOffsetStr(utcOffset),
    dstOffset,
    dstOffsetStr: getOffsetStr(dstOffset),
    aliasOf
  };
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

module.exports = buildTimezone;
