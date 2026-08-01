import data from './data.json';

export type CountryCode = keyof typeof data.countries;
export type TimezoneName = keyof typeof data.timezones;

export type Country<
  TCountryCode extends string = CountryCode,
  TTimezoneName extends string = TimezoneName,
> = {
  id: TCountryCode;
  name: string;
  timezones: TTimezoneName[];
};

export type Timezone<
  TCountryCode extends string = CountryCode,
  TTimezoneName extends string = TimezoneName,
> = {
  name: TTimezoneName;
  countries: TCountryCode[];
  utcOffset: number;
  utcOffsetStr: string;
  dstOffset: number;
  dstOffsetStr: string;
  aliasOf: TTimezoneName | null;
  deprecated?: boolean;
};

export type Options = {
  deprecated?: boolean;
};

export type DatasetMetadata = {
  tzdbVersion: string;
  generatedAt: string;
  generator: {
    repository: string;
  };
};
