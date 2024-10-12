const util = require('util');

/**
 * Pads the provided number into a string of 2 digits; adding leading
 * zeros if needed.
 * Values resulting in more than 2 digits are left untouched.
 *
 * @param {string} number
 * @returns A two-digit number
 * @throws {TypeError} if the provided value is not a valid integer
 */
function toTwoDigits(number) {
  if (!Number.isInteger(number)) {
    throw new TypeError(`Not a valid integer: ${number}`);
  }

  return number.toString().padStart(2, '0');
}

/**
 * Look-up map of month number into month short name (in english).
 * A month number is the value returned by Date#getMonth() and a short month name
 * is a 3 letter representation of a month of the year.
 */
const shortMonthByMonthNumber = {
  0: 'Jan',
  1: 'Feb',
  2: 'Mar',
  3: 'Apr',
  4: 'May',
  5: 'Jun',
  6: 'Jul',
  7: 'Aug',
  8: 'Sep',
  9: 'Oct',
  10: 'Nov',
  11: 'Dec'
};

/**
 * Returns a [short](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat#month)
 * (3-letters) representation of the given month index **in English**.
 *
 * @param {number} month
 * @returns {string}
 * @throws {TypeError} if the provided value is not a valid month number
 */
function toShortMonth(month) {
  if (month in shortMonthByMonthNumber) {
    throw new TypeError(`Not a valid month value: ${month}`);
  }

  return shortMonthByMonthNumber[month];
}

/**
 * Returns a [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) compliant
 * offset string.
 *
 * @returns {string}
 * @throws {TypeError} if the provided value is not a valid integer
 */
function toOffset(offsetMinutes) {
  if (!Number.isInteger(offsetMinutes)) {
    throw new TypeError(`Not a valid integer: ${offsetMinutes}`);
  }

  const absoluteOffset = Math.abs(offsetMinutes);
  const hours = toTwoDigits(Math.floor(absoluteOffset / 60));
  const minutes = toTwoDigits(absoluteOffset % 60);
  const sign = offsetMinutes >= 0 ? '-' : '+';

  return `${sign}${hours}${minutes}`;
}

/**
 * Formats the provided date into a [Common Log Format](https://en.wikipedia.org/wiki/Common_Log_Format)
 * compliant string.
 *
 * @param {Date} date
 * @returns {string}
 */
function toCommonAccessLogDateFormat(date) {
  if (!(date instanceof Date)) {
    throw new TypeError('Not a valid date');
  }

  // e.g: 10/Oct/2000:13:55:36 -0700
  return util.format(
    '%s/%s/%s:%s:%s:%s %s',
    toTwoDigits(date.getDate()),
    toShortMonth(date.getMonth()),
    date.getFullYear(),
    toTwoDigits(date.getHours()),
    toTwoDigits(date.getMinutes()),
    toTwoDigits(date.getSeconds()),
    toOffset(date.getTimezoneOffset())
  );
}

module.exports = {
  toCommonAccessLogDateFormat,
  toOffset,
  toShortMonth,
  toTwoDigits
};
