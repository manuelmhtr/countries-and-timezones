# countries-and-timezones
![](https://img.shields.io/wercker/ci/wercker/docs.svg?style=flat)
![](https://img.shields.io/dub/l/vibe-d.svg?style=flat)

This is a minimalistic library to work with countries and timezones data.

## Install

```
npm install --save countries-and-timezones
```

## Data models

### Country

A country is defined by the following parameters:

* **id:** The country [ISO code](https://es.wikipedia.org/wiki/ISO_3166-1).
* **name:** Name in english.
* **timezones:** An array of ids of the timezones available in the country.

```javascript
{
  id: 'MX',
  name: 'Mexico',
  timezones: [
    'America/Mexico_City',
    'America/Cancun',
    'America/Merida',
    'America/Monterrey',
    'America/Matamoros',
    'America/Mazatlan',
    'America/Chihuahua',
    'America/Ojinaga',
    'America/Hermosillo',
    'America/Tijuana',
    'America/Santa_Isabel',
    'America/Bahia_Banderas'
  ] 
}
```

### Timezone

A timezone is defined by the following parameters:

* **name:** The name of the timezone.
* **utcOffset:** UTC offset in minutes.
* **offsetStr:** UTC offset in hours (human readable string).
* **countries:** An array of ids of the countries that use this timezone.


```javascript
{
  name: 'Asia/Dubai',
  utcOffset: 240,
  offsetStr: '+04:00',
  countries: [ 'AE', 'OM' ]
}
```

## API

### .raw

Contains and object with the raw data used in this library.

**Example**

```javascript
const ct = require('countries-and-timezones');

const rawData = ct.raw;
console.log(rawData);

/*
Prints:

{
  countries: [...],
  timezones: [...]
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

{ AD: { id: 'AD', name: 'Andorra', timezones: [ 'Europe/Andorra' ] },
  AE: 
   { id: 'AE',
     name: 'United Arab Emirates',
     timezones: [ 'Asia/Dubai' ] },
  AF: { id: 'AF', name: 'Afghanistan', timezones: [ 'Asia/Kabul' ] },
  AG: 
   { id: 'AG',
     name: 'Antigua & Barbuda',
     timezones: [ 'America/Port_of_Spain' ] },
  AI: 
   { id: 'AI',
     name: 'Anguilla',
     timezones: [ 'America/Port_of_Spain' ] },

...

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

{ 'Europe/Andorra': 
   { name: 'Europe/Andorra',
     utcOffset: 60,
     offsetStr: '+01:00',
     countries: [ 'AD' ] },
  'Asia/Dubai': 
   { name: 'Asia/Dubai',
     utcOffset: 240,
     offsetStr: '+04:00',
     countries: [ 'AE', 'OM' ] },
  'Asia/Kabul': 
   { name: 'Asia/Kabul',
     utcOffset: 270,
     offsetStr: '+04:30',
     countries: [ 'AF' ] },

...

*/

```

### .getTimezonesForCountry()

Returns an array with the timezones of a country given its id.

**Example**

```javascript
const ct = require('countries-and-timezones');

const mxTimezones = ct.getTimezonesForCountry('MX');
console.log(mxTimezones);

/*
Prints:

[ { name: 'America/Mexico_City',
    utcOffset: -360,
    offsetStr: '-06:00',
    countries: [ 'MX' ] },
  { name: 'America/Cancun',
    utcOffset: -300,
    offsetStr: '-05:00',
    countries: [ 'MX' ] },
  { name: 'America/Merida',
    utcOffset: -360,
    offsetStr: '-06:00',
    countries: [ 'MX' ] },
  { name: 'America/Monterrey',

...

*/

```

### .getCountriesForTimezone()

Returns an array with the country that use a timezone given its id.

**Example**

```javascript
const ct = require('countries-and-timezones');

const nyTimezone = ct.getCountriesForTimezone('America/New_York');
console.log(nyTimezone);

/*
Prints:

[ { id: 'US',
    name: 'United States',
    timezones: 
     [ 'America/New_York',
       'America/Detroit',
       'America/Kentucky/Louisville',
       'America/Kentucky/Monticello',
       'America/Indiana/Indianapolis',
       'America/Indiana/Vincennes',
       'America/Indiana/Winamac',
       'America/Indiana/Marengo',
       'America/Indiana/Petersburg',

...

*/

```

## License

MIT
