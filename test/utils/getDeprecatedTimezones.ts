import { CompressedTimezone, Data, getAllTimezones, StrictTimezoneName, Timezone } from "../../src";

export const getDeprecatedTimezones = (timezones: ReturnType<typeof getAllTimezones> | Record<StrictTimezoneName, CompressedTimezone>) => {
  return Object.keys(timezones).reduce((prev, key) => {
    const tz = timezones[key as keyof typeof timezones];
    if (isDeprecated(tz)) Object.assign(prev, { [key]: true });
    return prev;
  }, {});
}

function isDeprecated(tz: Timezone | CompressedTimezone): boolean {
  return !!("deprecated" in tz ? tz.deprecated : "r" in tz ? tz.r : false);
}
