Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
//#region src/build-country.ts
var timezonesMap;
function buildCountry(data, id) {
	const name = data.countries[id];
	if (!name) return null;
	const tzMap = getTimezonesMap(data)[id] || {};
	return {
		id,
		name,
		timezones: tzMap.current || [],
		allTimezones: tzMap.all || []
	};
}
function getTimezonesMap(data) {
	timezonesMap ||= buildTimezonesMap(data);
	return timezonesMap;
}
function buildTimezonesMap(data) {
	return Object.keys(data.timezones).reduce((result, id) => {
		const tz = data.timezones[id];
		const { c, a } = tz;
		const aliasTz = data.timezones[a] || {};
		const countries = c || aliasTz.c;
		if (!countries) return result;
		for (const country of countries) {
			if (!result[country]) Object.assign(result, { [country]: {
				current: [],
				all: []
			} });
			if (tz.r === void 0) result[country].current.push(id);
			result[country].all.push(id);
		}
		return result;
	}, {});
}
//#endregion
//#region src/build-timezone.ts
function buildTimezone(data, name) {
	const timezone = data.timezones[name];
	if (!timezone) return null;
	const { a: aliasOf = null } = timezone;
	const tz = {
		...aliasOf ? data.timezones[aliasOf] : {},
		...data.timezones[name]
	};
	const countries = tz.c || [];
	const utcOffset = tz.u;
	const dstOffset = Number.isInteger(tz.d) ? tz.d : utcOffset;
	const result = {
		name,
		countries,
		utcOffset,
		utcOffsetStr: getOffsetString(utcOffset),
		dstOffset,
		dstOffsetStr: getOffsetString(dstOffset),
		aliasOf
	};
	if (timezone.r) result.deprecated = true;
	return result;
}
function getOffsetString(offset) {
	const hours = Math.floor(Math.abs(offset) / 60);
	const min = offset % 60;
	return `${offset < 0 ? "-" : "+"}${getNumberString(hours)}:${getNumberString(min)}`;
}
function getNumberString(input) {
	const number_ = Math.abs(input);
	return `${number_ < 10 ? "0" : ""}${number_}`;
}
//#endregion
//#region src/create-countries-and-timezones.ts
function createCountriesAndTimezones({ data, metadata }) {
	const totalTimezones = Object.keys(data.timezones).length;
	const countries = {};
	const timezones = {};
	let memoizedTimezones = 0;
	function getAllCountries(options = {}) {
		return Object.keys(data.countries).reduce((previous, id) => {
			return Object.assign(previous, { [id]: getCountry(id, options) });
		}, {});
	}
	function getAllTimezones(options = {}) {
		if (totalTimezones !== memoizedTimezones) for (const name of Object.keys(data.timezones)) getTimezone(name);
		return deliverTimezones(timezones, options);
	}
	function getCountry(id, options = {}) {
		if (!countries[id]) memoizeCountry(buildCountry(data, id));
		return deliverCountry(countries[id], options);
	}
	function memoizeCountry(country) {
		if (!country) return;
		countries[country.id] = country;
	}
	function getTimezone(name) {
		if (!timezones[name]) memoizeTimezone(buildTimezone(data, name));
		return timezones[name] ? { ...timezones[name] } : null;
	}
	function memoizeTimezone(timezone) {
		if (!timezone) return;
		timezones[timezone.name] = timezone;
		memoizedTimezones = Object.keys(timezones).length;
	}
	function getCountriesForTimezone(tzName, options = {}) {
		return ((getTimezone(tzName) || {}).countries || []).map((countryCode) => getCountry(countryCode, options));
	}
	function getCountryForTimezone(tzName, options = {}) {
		const [main] = getCountriesForTimezone(tzName, options);
		return main || null;
	}
	function getTimezonesForCountry(countryId, options = {}) {
		const country = getCountry(countryId, options);
		if (!country) return null;
		return (country.timezones || []).map((timezoneName) => getTimezone(timezoneName));
	}
	function getMetadata() {
		return metadata ? {
			...metadata,
			generator: { ...metadata.generator }
		} : null;
	}
	return {
		getCountry,
		getTimezone,
		getAllCountries,
		getAllTimezones,
		getTimezonesForCountry,
		getCountriesForTimezone,
		getCountryForTimezone,
		getMetadata
	};
}
function deliverTimezones(tzs, options) {
	const { deprecated } = options || {};
	if (deprecated === true) return tzs;
	return Object.keys(tzs).reduce((previous, key) => {
		if (!tzs[key].deprecated) Object.assign(previous, { [key]: tzs[key] });
		return previous;
	}, {});
}
function deliverCountry(country, options) {
	if (!country) return null;
	const { deprecated } = options || {};
	const { allTimezones, ...other } = country;
	const timezones = deprecated ? country.allTimezones : country.timezones;
	return {
		...other,
		timezones
	};
}
//#endregion
//#region src/dynamic.ts
function createDynamicCountriesAndTimezones(loader = loadBundledCountriesAndTimezonesData) {
	let instancePromise;
	async function load() {
		instancePromise ||= Promise.resolve(loader()).then((dataset) => createCountriesAndTimezones(dataset));
		return instancePromise;
	}
	return {
		isLoaded() {
			return instancePromise !== void 0;
		},
		load,
		async getMetadata() {
			return (await load()).getMetadata();
		},
		async getCountry(id, options) {
			return (await load()).getCountry(id, options);
		},
		async getTimezone(name) {
			return (await load()).getTimezone(name);
		},
		async getAllCountries(options) {
			return (await load()).getAllCountries(options);
		},
		async getAllTimezones(options) {
			return (await load()).getAllTimezones(options);
		},
		async getTimezonesForCountry(countryId, options) {
			return (await load()).getTimezonesForCountry(countryId, options);
		},
		async getCountriesForTimezone(tzName, options) {
			return (await load()).getCountriesForTimezone(tzName, options);
		},
		async getCountryForTimezone(tzName, options) {
			return (await load()).getCountryForTimezone(tzName, options);
		}
	};
}
async function loadCountriesAndTimezones(loader = loadBundledCountriesAndTimezonesData) {
	return createDynamicCountriesAndTimezones(loader).load();
}
async function loadBundledCountriesAndTimezonesData() {
	return (await Promise.resolve().then(() => require("./data.js"))).default;
}
//#endregion
exports.createDynamicCountriesAndTimezones = createDynamicCountriesAndTimezones;
exports.loadCountriesAndTimezones = loadCountriesAndTimezones;

//# sourceMappingURL=dynamic.js.map