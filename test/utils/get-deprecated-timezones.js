export const getDeprecatedTimezones = (timezones) => {
  return Object.keys(timezones).reduce((previous, key) => {
    const tz = timezones[key];
    if (tz.deprecated || tz.r) Object.assign(previous, {[key]: true});
    return previous;
  }, {});
};
