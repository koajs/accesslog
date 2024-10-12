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
 * Returns a [short](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat#month)
 * (3-letters) representation of the given month index **in English**.
 * @param {number} month
 * @returns {string}
 * @throws {TypeError} if the provided value is not a valid month number
 */
function toShortMonth(month) {
  switch (month) {
    // Note: January is month 0!
    case 0:
      return 'Jan';
    case 1:
      return 'Feb';
    case 2:
      return 'Mar';
    case 3:
      return 'Apr';
    case 4:
      return 'May';
    case 5:
      return 'Jun';
    case 6:
      return 'Jul';
    case 7:
      return 'Aug';
    case 8:
      return 'Sep';
    case 9:
      return 'Oct';
    case 10:
      return 'Nov';
    case 11:
      return 'Dec';
    default:
      throw new TypeError(`Not a valid month value: ${month}`);
  }
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
