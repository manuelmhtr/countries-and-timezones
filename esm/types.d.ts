export type { Country, CountryCode, DatasetMetadata, Options, Timezone, TimezoneName, } from './types';
export declare const getCountry: {
    (id: import('./types').CountryCode, options?: import('./types').Options): import('./types').Country;
    (id: string, options?: import('./types').Options): import('./types').Country | null;
};
export declare const getTimezone: {
    (name: import('./types').TimezoneName): import('./types').Timezone;
    (name: string): import('./types').Timezone | null;
};
export declare const getAllCountries: (options?: import('./types').Options) => Record<import('./types').CountryCode, import('./types').Country>;
export declare const getAllTimezones: (options?: import('./types').Options) => Record<import('./types').TimezoneName, import('./types').Timezone>;
export declare const getTimezonesForCountry: {
    (countryId: import('./types').CountryCode, options?: import('./types').Options): import('./types').Timezone[];
    (countryId: string, options?: import('./types').Options): import('./types').Timezone[] | null;
};
export declare const getCountriesForTimezone: (tzName: import('./types').TimezoneName | string, options?: import('./types').Options) => import('./types').Country[];
export declare const getCountryForTimezone: {
    (tzName: import('./types').TimezoneName, options?: import('./types').Options): import('./types').Country;
    (tzName: string, options?: import('./types').Options): import('./types').Country | null;
};
export declare const getMetadata: () => import('./types').DatasetMetadata | null;
declare const defaultExport: {
    getCountry: {
        (id: import('./types').CountryCode, options?: import('./types').Options): import('./types').Country;
        (id: string, options?: import('./types').Options): import('./types').Country | null;
    };
    getTimezone: {
        (name: import('./types').TimezoneName): import('./types').Timezone;
        (name: string): import('./types').Timezone | null;
    };
    getAllCountries: (options?: import('./types').Options) => Record<import('./types').CountryCode, import('./types').Country>;
    getAllTimezones: (options?: import('./types').Options) => Record<import('./types').TimezoneName, import('./types').Timezone>;
    getTimezonesForCountry: {
        (countryId: import('./types').CountryCode, options?: import('./types').Options): import('./types').Timezone[];
        (countryId: string, options?: import('./types').Options): import('./types').Timezone[] | null;
    };
    getCountriesForTimezone: (tzName: import('./types').TimezoneName | string, options?: import('./types').Options) => import('./types').Country[];
    getCountryForTimezone: {
        (tzName: import('./types').TimezoneName, options?: import('./types').Options): import('./types').Country;
        (tzName: string, options?: import('./types').Options): import('./types').Country | null;
    };
    getMetadata: () => import('./types').DatasetMetadata | null;
};
export { type CountriesAndTimezonesDataset, createCountriesAndTimezones, type CountriesAndTimezonesInstance, } from './create-countries-and-timezones';
export default defaultExport;
