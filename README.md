# countries-and-timezones
![](https://img.shields.io/badge/build-passing-green?style=flat)
![](https://img.shields.io/npm/dm/countries-and-timezones)
![](https://img.shields.io/dub/l/vibe-d?color=blue?style=flat)

This is a minimalistic library to work with countries and timezones data.

## Install

```
npm install --save countries-and-timezones
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
    'America/Bahia_Banderas',
    'America/Cancun',
    'America/Chihuahua',
    'America/Ensenada',
    'America/Hermosillo',
    'America/Matamoros',
    'America/Mazatlan',
    'America/Merida',
    'America/Mexico_City',
    'America/Monterrey',
    'America/Ojinaga',
    'America/Santa_Isabel',
    'America/Tijuana'
  ] 
}
```

### Timezone

A timezone is defined by the following parameters:

| Parameter | Type | Description |
| --------- | ---- | ----------- |
|`name`|String|The name of the timezone, from [tz database](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones).|
|`country`|String|The [ISO 3166-1 code](https://es.wikipedia.org/wiki/ISO_3166-1) of the country where it's used. `Etc/*`, `GMT` and `UTC` timezones don't have and associated country.|
|`utcOffset`|Number|The difference in **minutes** between the timezone and [UTC](https://en.wikipedia.org/wiki/Coordinated_Universal_Time).|
|`utcOffsetStr`|String|The difference in hours and minutes between the timezone and [UTC](https://en.wikipedia.org/wiki/Coordinated_Universal_Time), expressed as string with format: `±[hh]:[mm]`.|
|`dstOffset`|Number|The difference in **minutes** between the timezone and [UTC](https://en.wikipedia.org/wiki/Coordinated_Universal_Time) during daylight saving time ([DST](https://en.wikipedia.org/wiki/Daylight_saving_time)). When `utcOffset` and `dstOffset` are the same, means that the timezone does not observe a daylight saving time.|
|`dstOffsetStr`|String|The difference in hours and minutes between the timezone and [UTC](https://en.wikipedia.org/wiki/Coordinated_Universal_Time) during daylight saving time ([DST](https://en.wikipedia.org/wiki/Daylight_saving_time), expressed as string with format: `±[hh]:[mm]`.|
|`aliasOf`|String|The `name` of a primary timezone in case this is an alias. `null` means this is a primary timezone.|

```javascript
{
  name: 'Asia/Tel_Aviv',
  country: 'IL',
  utcOffset: 120,
  utcOffsetStr: '+02:00',
  dstOffset: 180,
  dstOffsetStr: '+03:00',
  aliasOf: 'Asia/Jerusalem'
}
```

## API

### .getCountry(id)

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
  timezones: [
    'Europe/Berlin',
    'Europe/Busingen'
  ]
}

*/
```

### .getTimezone(name)

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
  country: 'US',
  utcOffset: -480,
  utcOffsetStr: '-08:00',
  dstOffset: -420,
  dstOffsetStr: '-07:00',
  aliasOf: null
}

*/
```

### .getAllCountries()

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

### .getAllTimezones()

Returns an object with the data of all timezones.

**Example**

```javascript
const ct = require('countries-and-timezones');

const timezones = ct.getAllTimezones();
console.log(timezones);

/*
Prints:

{
  'America/Los_Angeles': {
    name: 'America/Los_Angeles',
    country: 'US',
    utcOffset: -480,
    utcOffsetStr: '-08:00',
    dstOffset: -420,
    dstOffsetStr: '-07:00',
    aliasOf: null
  },
  'Africa/Abidjan': {
    name: 'Africa/Abidjan',
    country: 'CI',
    utcOffset: 0,
    utcOffsetStr: '+00:00',
    dstOffset: 0,
    dstOffsetStr: '+00:00',
    aliasOf: null
  },
  'Africa/Accra': {
    name: 'Africa/Accra',
    country: 'GH',
    utcOffset: 0,
    utcOffsetStr: '+00:00',
    dstOffset: 0,
    dstOffsetStr: '+00:00',
    aliasOf: null
  },
  ...
}

*/
```

### .getTimezonesForCountry(id)

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
    name: 'America/Bahia_Banderas',
    country: 'MX',
    utcOffset: -360,
    utcOffsetStr: '-06:00',
    dstOffset: -300,
    dstOffsetStr: '-05:00',
    aliasOf: null
  },
  {
    name: 'America/Cancun',
    country: 'MX',
    utcOffset: -300,
    utcOffsetStr: '-05:00',
    dstOffset: -300,
    dstOffsetStr: '-05:00',
    aliasOf: null
  },
  {
    name: 'America/Chihuahua',
    country: 'MX',
    utcOffset: -420,
    utcOffsetStr: '-07:00',
    dstOffset: -360,
    dstOffsetStr: '-06:00',
    aliasOf: null
  },
  ...
}

*/
```

### .getCountryForTimezone(name)

Returns the country that uses a timezone given its `name`.

**Example**

```javascript
const ct = require('countries-and-timezones');

const timezone = ct.getCountryForTimezone('Asia/Tokyo');
console.log(timezone);

/*
Prints:

{
  id: 'JP',
  name: 'Japan',
  timezones: [ 'Asia/Tokyo' ]
}

*/

```

## Working on something more complex?

Meet [Spott](https://spott.dev):
- **Search any city, country or administrative division** in the world. By full strings or autocompletion. 
- Find a place by an IP address.
- Access to more than 240,000 geographical places. In more than 20 languages.

[![Spott API for cities, countries and administrative divisions](https://spott-assets.s3.amazonaws.com/marketing/banner-720px.png)](https://spott.dev)


## License

MIT
