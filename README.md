# countries-and-timezones
![](https://img.shields.io/github/workflow/status/manuelmhtr/countries-and-timezones/tests?style=flat)
![](https://img.shields.io/npm/dm/countries-and-timezones)
![](https://img.shields.io/badge/license-MIT-blue?style=flat)

> Minimalistic library to work with countries and timezones data. Updated with the [IANA timezones database](https://www.iana.org/time-zones).

## Usage

### NodeJS

Install with npm or yarn:

```bash
npm install --save countries-and-timezones
```

### Browser

Add the following script to your project (only ~9kb):

```html
<!-- Latest version -->
<script src="https://cdn.jsdelivr.net/gh/manuelmhtr/countries-and-timezones@latest/dist/index.min.js" type="text/javascript"></script>

<!-- Or specify a version -->
<script src="https://cdn.jsdelivr.net/gh/manuelmhtr/countries-and-timezones@v3.2.1/dist/index.min.js" type="text/javascript"></script>

<!-- This will export a variable named "ct": -->
<script type="text/javascript">
  var data = ct.getCountry('MX');
  console.log(data);
</script>
```


## API

### `.getCountry(id)`

Returns a country referenced by its `id`.

**Example**

```javascript
const ct = require('countries-and-timezones');

const country = ct.getCountry('DE');
console.log(country);

/*
Prints:

{
  id: 'DE',
  name: 'Germany',
  timezones: [ 'Europe/Busingen', 'Europe/Berlin' ]
}

*/
```

### `.getTimezone(name)`

Returns a timezone referenced by its `name`.

**Example**

```javascript
const ct = require('countries-and-timezones');

const timezone = ct.getTimezone('America/Los_Angeles');
console.log(timezone);

/*
Prints:

{
  name: 'America/Los_Angeles',
  countries: [ 'US' ],
  utcOffset: -480,
  utcOffsetStr: '-08:00',
  dstOffset: -420,
  dstOffsetStr: '-07:00',
  aliasOf: null
}

*/
```

### `.getAllCountries()`

Returns an object with the data of all countries.

**Example**

```javascript
const ct = require('countries-and-timezones');

const countries = ct.getAllCountries();
console.log(countries);

/*
Prints:

{
  AD: {
    id: 'AD',
    name: 'Andorra',
    timezones: [ 'Europe/Andorra' ]
  },
  AE: {
    id: 'AE',
    name: 'United Arab Emirates',
    timezones: [ 'Asia/Dubai' ]
  },
  AF: {
    id: 'AF',
    name: 'Afghanistan',
    timezones: [ 'Asia/Kabul' ]
  },
  AG: {
    id: 'AG',
    name: 'Antigua and Barbuda',
    timezones: [ 'America/Antigua' ]
  },
  ...
}

*/
```

### `.getAllTimezones()`

Returns an object with the data of all timezones.

**Example**

```javascript
const ct = require('countries-and-timezones');

const timezones = ct.getAllTimezones();
console.log(timezones);

/*
Prints:

{
  'Africa/Bamako': {
    name: 'Africa/Bamako',
    countries: [ 'ML' ],
    utcOffset: 0,
    utcOffsetStr: '+00:00',
    dstOffset: 0,
    dstOffsetStr: '+00:00',
    aliasOf: 'Africa/Abidjan'
  },
  'Africa/Banjul': {
    name: 'Africa/Banjul',
    countries: [ 'GM' ],
    utcOffset: 0,
    utcOffsetStr: '+00:00',
    dstOffset: 0,
    dstOffsetStr: '+00:00',
    aliasOf: 'Africa/Abidjan'
  },
  'Africa/Conakry': {
    name: 'Africa/Conakry',
    countries: [ 'GN' ],
    utcOffset: 0,
    utcOffsetStr: '+00:00',
    dstOffset: 0,
    dstOffsetStr: '+00:00',
    aliasOf: 'Africa/Abidjan'
  },
  ...
}

*/
```

### `.getTimezonesForCountry(id)`

Returns an array with all the timezones of a country given its `id`.

**Example**

```javascript
const ct = require('countries-and-timezones');

const timezones = ct.getTimezonesForCountry('MX');
console.log(timezones);

/*
Prints:

[
  {
    name: 'Mexico/BajaSur',
    countries: [ 'MX' ],
    utcOffset: -420,
    utcOffsetStr: '-07:00',
    dstOffset: -360,
    dstOffsetStr: '-06:00',
    aliasOf: 'America/Mazatlan'
  },
  {
    name: 'Mexico/General',
    countries: [ 'MX' ],
    utcOffset: -360,
    utcOffsetStr: '-06:00',
    dstOffset: -300,
    dstOffsetStr: '-05:00',
    aliasOf: 'America/Mexico_City'
  },
  {
    name: 'America/Ensenada',
    countries: [ 'MX' ],
    utcOffset: -480,
    utcOffsetStr: '-08:00',
    dstOffset: -420,
    dstOffsetStr: '-07:00',
    aliasOf: 'America/Tijuana'
  },
  ...
}

*/
```

### `.getCountriesForTimezone(name)`

Returns a list of the countries that uses a timezone given its `name`. When a timezone has multiple countries **the first element is more relevant** due to its geographical location.

**Example**

```javascript
const ct = require('countries-and-timezones');

const timezone = ct.getCountriesForTimezone('Europe/Zurich');
console.log(timezone);

/*
Prints:

[
  {
    "id": "CH",
    "name": "Switzerland",
    "timezones": [
      "Europe/Zurich"
    ]
  },
  {
    "id": "DE",
    "name": "Germany",
    "timezones": [
      "Europe/Busingen",
      "Europe/Berlin",
      "Europe/Zurich"
    ]
  },
  {
    "id": "LI",
    "name": "Liechtenstein",
    "timezones": [
      "Europe/Vaduz",
      "Europe/Zurich"
    ]
  }
]

*/

```

### `.getCountryForTimezone(name)`

Returns a the most relevant country (due to its geographical location) that uses a timezone given its `name`.

**Example**

```javascript
const ct = require('countries-and-timezones');

const timezone = ct.getCountryForTimezone('Europe/Zurich');
console.log(timezone);

/*
Prints:

{
  "id": "CH",
  "name": "Switzerland",
  "timezones": [
    "Europe/Zurich"
  ]
}

*/

```


## Data models

### Country

A country is defined by the following parameters:

| Parameter | Type | Description |
| --------- | ---- | ----------- |
|`id`|String|The country [ISO 3166-1 code](https://es.wikipedia.org/wiki/ISO_3166-1).|
|`name`|String|Preferred name of the country.|
|`timezones`|Array[String]|The list of timezones used in the country.|

```javascript
{
  id: 'MX',
  name: 'Mexico',
  timezones: [
    'Mexico/BajaSur',
    'Mexico/General',
    'America/Ensenada',
    'America/Santa_Isabel',
    'Mexico/BajaNorte',
    'America/Bahia_Banderas',
    'America/Cancun',
    'America/Chihuahua',
    'America/Tijuana',
    'America/Hermosillo',
    'America/Matamoros',
    'America/Mazatlan',
    'America/Merida',
    'America/Mexico_City',
    'America/Monterrey',
    'America/Ojinaga'
  ]
}
```

### Timezone

A timezone is defined by the following parameters:

| Parameter | Type | Description |
| --------- | ---- | ----------- |
|`name`|String|The name of the timezone, from [tz database](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones).|
|`countries`|[String]|A list of [ISO 3166-1 codes](https://es.wikipedia.org/wiki/ISO_3166-1) of the countries where it's used. `Etc/*`, `GMT` and `UTC` timezones don't have associated countries.|
|`utcOffset`|Number|The difference in **minutes** between the timezone and [UTC](https://en.wikipedia.org/wiki/Coordinated_Universal_Time).|
|`utcOffsetStr`|String|The difference in hours and minutes between the timezone and [UTC](https://en.wikipedia.org/wiki/Coordinated_Universal_Time), expressed as string with format: `±[hh]:[mm]`.|
|`dstOffset`|Number|The difference in **minutes** between the timezone and [UTC](https://en.wikipedia.org/wiki/Coordinated_Universal_Time) during daylight saving time ([DST](https://en.wikipedia.org/wiki/Daylight_saving_time)). When `utcOffset` and `dstOffset` are the same, means that the timezone does not observe a daylight saving time.|
|`dstOffsetStr`|String|The difference in hours and minutes between the timezone and [UTC](https://en.wikipedia.org/wiki/Coordinated_Universal_Time) during daylight saving time ([DST](https://en.wikipedia.org/wiki/Daylight_saving_time), expressed as string with format: `±[hh]:[mm]`.|
|`aliasOf`|String|The `name` of a primary timezone in case this is an alias. `null` means this is a primary timezone.|

```javascript
{
  name: 'Asia/Tel_Aviv',
  countries: [ 'IL' ],
  utcOffset: 120,
  utcOffsetStr: '+02:00',
  dstOffset: 180,
  dstOffsetStr: '+03:00',
  aliasOf: 'Asia/Jerusalem'
}
```


## Related projects

* [countries-db](https://www.npmjs.com/package/countries-db): Minimalistic lib with countries data.
* [location-by-ip](https://www.npmjs.com/package/location-by-ip): Get the location of any IP address.


## Support

Consider supporting this project by [buying me a beer](https://github.com/sponsors/manuelmhtr) 🍺


## Working on something more complex?

Meet [Spott](https://spott.dev):
- **Search any city, country or administrative division** in the world. By full strings or autocompletion.
- Find a place by an IP address.
- Access to more than 240,000 geographical places. In more than 20 languages.

[![Spott API for cities, countries and administrative divisions](https://spott-assets.s3.amazonaws.com/marketing/banner-720px.png)](https://spott.dev)


## License

MIT
