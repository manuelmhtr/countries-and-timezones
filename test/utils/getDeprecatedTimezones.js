export const getDeprecatedTimezones = (timezones) => {
  return Object.keys(timezones).reduce((prev, key) => {
    const tz = timezones[key];
    if (tz.deprecated || tz.r) Object.assign(prev, { [key]: true });
    return prev;
  }, {});
}
