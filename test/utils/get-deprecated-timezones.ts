import type {CompressedTimezone, Timezone, TimezoneName} from '../../src';

export const getDeprecatedTimezones = (
  timezones: Record<TimezoneName, Timezone | CompressedTimezone>,
) => {
  return (Object.keys(timezones) as TimezoneName[]).reduce<
    Record<TimezoneName, Timezone>
  >((previous, key) => {
    const tz = timezones[key];
    if ((tz as Timezone).deprecated || (tz as CompressedTimezone).r)
      Object.assign(previous, {[key]: true});
    return previous;
  }, {});
};
