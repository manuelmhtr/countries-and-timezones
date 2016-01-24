var rawData = require('./data.json');

var countriesAndTimezones = {
  raw: rawData,

  getAllCountries: function() {
    return rawData.countries;
  },

  getAllTimezones: function() {
    return rawData.timezones;
  },

  getTimezonesForCountry: function(countryId) {
    var countries = this.getAllCountries();
    var timezones = this.getAllTimezones();
    var timezoneIds = (countries[countryId] || {}).timezones || [];
    return timezoneIds.map(function(timezoneId) {
      return timezones[timezoneId];
    });
  },

  getCountriesForTimezone: function(timezoneId) {
    var countries = this.getAllCountries();
    var timezones = this.getAllTimezones();
    var countryIds = (timezones[timezoneId] || {}).countries || [];
    return countryIds.map(function(countryId) {
      return countries[countryId];
    });
  }
};

module.exports = countriesAndTimezones;