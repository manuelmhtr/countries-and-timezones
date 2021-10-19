import { getDeprecatedTimezones } from './getDeprecatedTimezones';

export const countDeprecatedTimezones = (timezones) => {
  return Object.keys(getDeprecatedTimezones(timezones)).length;
}
