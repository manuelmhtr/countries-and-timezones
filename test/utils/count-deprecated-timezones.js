import {getDeprecatedTimezones} from './get-deprecated-timezones.js';

export const countDeprecatedTimezones = (timezones) => {
  return Object.keys(getDeprecatedTimezones(timezones)).length;
};
