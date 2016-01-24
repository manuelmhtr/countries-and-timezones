var countriesAndTimezones = require('./src/index.js');

// Print all Countries
var countries = countriesAndTimezones.getAllCountries();
console.log(countries);

// Print all Timezones
var timezones = countriesAndTimezones.getAllTimezones();
console.log(timezones);

// Print Timezones for Mexico
var mxTimezones = countriesAndTimezones.getTimezonesForCountry('MX');
console.log(mxTimezones);

// Print Countries for America/New_York Timezone
var nyTimezone = countriesAndTimezones.getCountriesForTimezone('America/New_York');
console.log(nyTimezone);