import {
  type Country,
  type CountryCode,
  type Timezone,
  type TimezoneName,
} from '../src';

export type CountriesAndTimezonesData = {
  countries: CountriesData;
  timezones: TimezonesData;
};

export type CountriesData = Record<Country['id'], Country['name']>;
export type TimezonesData = Record<Timezone['name'], CompressedTimezone>;

export type CompressedTimezone = CanonicalTimezone | AliasTimezone;

export type InternalCountry = {
  allTimezones: TimezoneName[];
} & Country;

type BaseTimezone = {
  /**
   * Countries (country code)
   */
  c?: CountryCode[];

  /**
   * Deprecated
   */
  r?: number;
};

export type AliasTimezone = BaseTimezone & {
  /**
   * Alias
   */
  a: string;
};

export type CanonicalTimezone = BaseTimezone & {
  /**
   * Utc offset
   */
  u: number;

  /**
   * Dst offset
   */
  d?: number;
};
