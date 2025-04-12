# Changelog

All notable changes to this project will be documented in this file.

## [3.8.0] - 2025-04-12

### Changed

- Updated with 2025b IANA Time Zone Database.

## [3.7.2] - 2024-10-14

### Fixed

- Add script to add missing ESM package.json

## [3.7.1] - 2024-10-13

### Changed

- Set up linting (by [JC Franco](https://github.com/jcfranco))
- Remove build output from source control (by [JC Franco](https://github.com/jcfranco))
- Add releasing script (by [JC Franco](https://github.com/jcfranco))
- Update test action to run on node versions 8 - 20 (by [JC Franco](https://github.com/jcfranco))
- Set up conventional commits PR check (by [JC Franco](https://github.com/jcfranco))
- Fix dependabot config (by [JC Franco](https://github.com/jcfranco))

## [3.7.0] - 2024-09-30

### Changed

- Updated with 2024b IANA Timezones database.

## [3.6.0] - 2023-12-10

### Changed

- Updated with 2023c IANA Timezones database.

## [3.5.2] - 2023-11-05

### Fixed

- [#58](https://github.com/manuelmhtr/countries-and-timezones/issues/58) Missing export for CommonJS.
- [#60](https://github.com/manuelmhtr/countries-and-timezones/issues/60) Fixed `utcOffsetStr` calculation for negative offsets non-multiple of 60.

## [3.5.1] - 2023-07-02

### Changed

- Updated with 2023a IANA Timezones database.

### Added

- TS Types export ([#57](https://github.com/manuelmhtr/countries-and-timezones/pull/57) by [Haz](https://github.com/diegohaz)).

### Removed

- Countries: `BV` (Bouvet Island) and `HM` (Heard Island and McDonald Islands) since their are dependent territories, nobody lives there and they don't have official timezones.

## [3.4.1] - 2023-01-29

### Fixed

- Broken shield on Readme.

## [3.4.0] - 2022-12-04

### Changed

- Updated with 2022c IANA Timezones database.
- Increased type safety on `Timezone.name` ([#49](https://github.com/manuelmhtr/countries-and-timezones/pull/49) by [Vicary A.](https://github.com/vicary)).
- Added `Europe/Kyiv` timezone ([#50](https://github.com/manuelmhtr/countries-and-timezones/pull/50) by [S. M. Ibrahim lavlu](https://github.com/lavluda)).

### Fixed

- Wrong `utcOffset` for some timezones [#51](https://github.com/manuelmhtr/countries-and-timezones/issues/51).

## [3.3.0] - 2021-10-18

### Added

- Added new parameter `options` to most functions.
- Added `deprecated` option to return both current and deprecated timezones.

### Changed

- Updated with 2021c IANA Timezones database.
- Deprecated timezones are not returned by default (`deprecated` option is required).

## [3.2.3] - 2021-09-28

### Fixed

- Constant declarations on Types ([#41](https://github.com/manuelmhtr/countries-and-timezones/issues/41))

## [3.2.1] - 2021-08-17

### Fixed

- Correct ESM build config ([#36](https://github.com/manuelmhtr/countries-and-timezones/pull/36) by [Kyle Herock](https://github.com/kherock))

### Added

- Eslint config

## [3.2.0] - 2021-08-10

### Added

- Add TypeScript definitions ([#37](https://github.com/manuelmhtr/countries-and-timezones/pull/37) by [benj-dobs](https://github.com/benj-dobs))

## [3.1.0] - 2021-08-04

### Added

- Restores `getCountryForTimezone` method to keep compatibility with version 2.
- Adds `esm` path to package.json `files` (by [Simon VDB](https://github.com/Jarrku))

## [3.0.0] - 2021-07-28

### Added

- [#32](https://github.com/manuelmhtr/countries-and-timezones/pull/32) Added support for ESM named exports

### Changed

- Timezones might now be related with multiple countries.

### Removed

- Removed deprecated timezones: `America/Fort_Wayne`, `America/Godthab`, `America/Indianapolis`, `Asia/Rangoon`, `Singapore`, `US/East-Indiana`, `W-SU`.

### Breaking changes

- `getCountryForTimezone` method was renamed to `getCountriesForTimezone` since now timezones might be related with multiple countries. The first country in the list is more relevant due to its geographical location.
- The timezone property `country` was renamed to `countries` and is a list of strings rather than a single string.

## [2.5.0] - 2021-07-18

### Added

- [#27](https://github.com/manuelmhtr/countries-and-timezones/pull/27) Added ESM Build (by [Sachin Singh](https://github.com/scssyworks))

## [2.4.0] - 2021-04-24

### Changed

- Updated with 2021a IANA Timezones database.

### Removed

- `US/Pacific-New` timezone.

## [2.3.0] - 2020-08-25

### Added

- Support for `<script/>` tag.

### Changed

- Added 1 new timezone ("America/Nuuk").
- Updated with 2020a IANA Timezones database.

## [2.2.0] - 2020-04-18

### Added

- Updated 18 existing timezones.
- Added 89 new timezones.
- Complying with 2019c IANA Timezones database.

## [2.1.0] - 2020-03-31

### Added

- [#15](https://github.com/manuelmhtr/countries-and-timezones/pull/15) Babel and ES5 support (by [Steven Vachon](https://github.com/stevenvachon))
- [#16](https://github.com/manuelmhtr/countries-and-timezones/pull/16) CI Action (by [Steven Vachon](https://github.com/stevenvachon))

## [2.0.0] - 2019-10-10

### Added

- `getTimezone` method.
- `getCountry` method.
- 167 new alias timezones.
- Property `dstOffset` in timezones.
- Property `dstOffsetStr` in timezones.

### Changed

- Added all timezone aliases (before only primary timezones where supported). This increasead the support from 338 timezones to 505.
- Minified `data.json` as possible. Reduced size 72%, from 88.1 KB to 24.9 KB.
- Replaced `countries` (array) timezones property for `country` (string). Now all alias timezones are included, then each timezone has only one country assigned.
- Renamed `offsetStr` to `utcOffsetStr`, to be more specific whether the offset is for UTC or DST.
- `getCountriesForTimezone` method was renamed to `getCountryForTimezone` since now timezones have only 1 country. Only return a country object, instead of a countries array.

### Removed

- `.raw` property. Instead use `getAllCountries` and `getAllTimezones` methods.
