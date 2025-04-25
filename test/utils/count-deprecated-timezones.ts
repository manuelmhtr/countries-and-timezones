import type {CompressedTimezone, Timezone, TimezoneName} from '../../src';
import {getDeprecatedTimezones} from './get-deprecated-timezones';

export const countDeprecatedTimezones = (
  timezones: Record<TimezoneName, Timezone | CompressedTimezone>,
) => {
  return Object.keys(getDeprecatedTimezones(timezones)).length;
};
