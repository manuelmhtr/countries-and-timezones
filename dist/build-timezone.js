"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function buildTimezone(data, name) {
  var timezone = data.timezones[name];
  if (!timezone) return null;
  var _timezone$a = timezone.a,
      aliasOf = _timezone$a === void 0 ? null : _timezone$a;
  var aliasTz = aliasOf ? data.timezones[aliasOf] : {};

  var tz = _objectSpread({}, aliasTz, {}, data.timezones[name]);

  var country = tz.c || null;
  var utcOffset = tz.u;
  var dstOffset = Number.isInteger(tz.d) ? tz.d : utcOffset;
  return {
    name: name,
    country: country,
    utcOffset: utcOffset,
    utcOffsetStr: getOffsetStr(utcOffset),
    dstOffset: dstOffset,
    dstOffsetStr: getOffsetStr(dstOffset),
    aliasOf: aliasOf
  };
}

function getOffsetStr(offset) {
  var hours = Math.floor(offset / 60);
  var min = offset % 60;
  var sign = offset < 0 ? '-' : '+';
  return "".concat(sign).concat(getNumStr(hours), ":").concat(getNumStr(min));
}

function getNumStr(input) {
  var num = Math.abs(input);
  var prefix = num < 10 ? '0' : '';
  return "".concat(prefix).concat(num);
}

module.exports = buildTimezone;
//# sourceMappingURL=build-timezone.js.map