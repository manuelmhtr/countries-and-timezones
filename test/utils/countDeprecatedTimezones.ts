import { CompressedTimezone, getAllTimezones, StrictTimezoneName } from '../../src';
import { getDeprecatedTimezones } from './getDeprecatedTimezones';

export const countDeprecatedTimezones = (timezones: ReturnType<typeof getAllTimezones> | Record<StrictTimezoneName, CompressedTimezone>): number => {
  return Object.keys(getDeprecatedTimezones(timezones)).length;
}
