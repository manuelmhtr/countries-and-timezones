# Changelog
All notable changes to this project will be documented in this file.


## [2.4.0] - 2021-04-24
### Changed
- Updated with 2021a INANA Timezones database.

### Removed
- `US/Pacific-New` timezone.


## [2.3.0] - 2020-08-25
### Added
- Support for `<script/>` tag.

### Changed
- Added 1 new timezone ("America/Nuuk").
- Updated with 2020a INANA Timezones database.


## [2.2.0] - 2020-04-18
### Added
- Updated 18 existing timezones.
- Added 89 new timezones.
- Complying with 2019c INANA Timezones database.


## [2.1.0] - 2020-03-31
### Added
- [#15](https://github.com/manuelmhtr/countries-and-timezones/pull/15) Babel and ES5 support (Steven Vachon)
- [#16](https://github.com/manuelmhtr/countries-and-timezones/pull/16) CI Action (Steven Vachon)


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
