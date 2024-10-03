(function (factory) {
    typeof define === 'function' && define.amd ? define(factory) :
    factory();
})((function () { 'use strict';

    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getTimezonesForCountry = exports.getCountryForTimezone = exports.getCountriesForTimezone = exports.getTimezone = exports.getCountry = exports.getAllTimezones = exports.getAllCountries = void 0;
    const tslib_1 = require("tslib");
    const data_json_1 = tslib_1.__importDefault(require("./data.json"));
    const build_country_1 = tslib_1.__importDefault(require("./build-country"));
    const build_timezone_1 = tslib_1.__importDefault(require("./build-timezone"));
    const totalTimezones = Object.keys(data_json_1.default.timezones).length;
    const countries = {}; /* TODO: refine */
    const timezones = {}; /* TODO: refine */
    let memoizedTimezones = 0;
    function getAllCountries(options) {
        return Object.keys(data_json_1.default.countries).reduce((prev, id) => {
            return Object.assign(prev, { [id]: getCountry(id, options) });
        }, {});
    }
    exports.getAllCountries = getAllCountries;
    function getAllTimezones(options) {
        if (totalTimezones !== memoizedTimezones)
            Object.keys(data_json_1.default.timezones).forEach(getTimezone);
        return deliverTimezones(timezones, options);
    }
    exports.getAllTimezones = getAllTimezones;
    function getCountry(id, options) {
        if (!countries[id])
            memoizeCountry((0, build_country_1.default)(data_json_1.default, id));
        return deliverCountry(countries[id], options);
    }
    exports.getCountry = getCountry;
    function memoizeCountry(country) {
        if (!country)
            return;
        countries[country.id] = country;
    }
    function getTimezone(name) {
        if (!timezones[name])
            memoizeTimezone((0, build_timezone_1.default)(data_json_1.default, name));
        return timezones[name] ? Object.assign({}, timezones[name]) : null;
    }
    exports.getTimezone = getTimezone;
    function memoizeTimezone(timezone) {
        if (!timezone)
            return;
        timezones[timezone.name] = timezone;
        memoizedTimezones = Object.keys(timezone).length;
    }
    function getCountriesForTimezone(name, options) {
        const timezone = getTimezone(name) || {};
        const values = timezone.countries || [];
        return values.map((c) => getCountry(c, options));
    }
    exports.getCountriesForTimezone = getCountriesForTimezone;
    function getCountryForTimezone(name, options) {
        const [main] = getCountriesForTimezone(name, options) /* TODO: refine */;
        return main || null;
    }
    exports.getCountryForTimezone = getCountryForTimezone;
    function getTimezonesForCountry(id, options) {
        const country = getCountry(id, options);
        if (!country)
            return null;
        const values = country.timezones || [];
        return values.map(getTimezone) /* TODO: refine */;
    }
    exports.getTimezonesForCountry = getTimezonesForCountry;
    function deliverTimezones(tzs, options) {
        const { deprecated } = options || {};
        if (deprecated === true)
            return tzs;
        return Object.keys(tzs).reduce((prev, key) => {
            if (!tzs[key].deprecated)
                Object.assign(prev, { [key]: tzs[key] });
            return prev;
        }, {});
    }
    function deliverCountry(country, options) {
        if (!country)
            return null;
        const { deprecated } = options || {};
        const other = tslib_1.__rest(country, ["allTimezones"]);
        const tz = deprecated ? country.allTimezones : country.timezones;
        return Object.assign(Object.assign({}, other), { timezones: tz });
    }
    exports.default = {
        getCountry,
        getTimezone,
        getAllCountries,
        getAllTimezones,
        getTimezonesForCountry,
        getCountriesForTimezone,
        getCountryForTimezone,
    };

}));
//# sourceMappingURL=index.js.map
