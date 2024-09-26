const {
  formatCommonAccessLogDate,
  formatOffset,
  formatShortMonth,
  formatTwoDigits,
} = require('../format')

describe('formatTwoDigits', () => {
  test.each([
    { value: 0, expected: '00' },
    { value: 1, expected: '01' },
    { value: 11, expected: '11' },
    { value: 99, expected: '99' },
    { value: 123, expected: '123' },
  ])('returns $expected for $value', ({ value, expected }) => {
    expect(formatTwoDigits(value)).toBe(expected)
  })

  test('throws TypeError if provided value is Infinity', () => {
    expect(() => formatTwoDigits(Infinity)).toThrow(TypeError)
  })

  test('throws TypeError if provided value is NaN', () => {
    expect(() => formatTwoDigits(NaN)).toThrow(TypeError)
  })

  test('throws TypeError if provided value is a decimal number', () => {
    expect(() => formatTwoDigits(0.99)).toThrow(TypeError)
  })

  test('throws TypeError if provided value is a string', () => {
    expect(() => formatTwoDigits('0')).toThrow(TypeError)
  })
})

describe('formatOffset', () => {
  test.each([
    { value: 480, expected: '-0800' },
    { value: 0, expected: '+0000' },
    { value: -180, expected: '+0300' },
  ])('returns $expected for $value', ({ value, expected }) => {
    expect(formatOffset(value)).toBe(expected)
  })

  test('throws TypeError if provided value is Infinity', () => {
    expect(() => formatOffset(Infinity)).toThrow(TypeError)
  })

  test('throws TypeError if provided value is NaN', () => {
    expect(() => formatOffset(NaN)).toThrow(TypeError)
  })

  test('throws TypeError if provided value is a decimal number', () => {
    expect(() => formatOffset(60.5)).toThrow(TypeError)
  })

  test('throws TypeError if provided value is a string', () => {
    expect(() => formatOffset('60')).toThrow(TypeError)
  })
})

describe('formatShortMonth', () => {
  test.each([
    { value: 0, expected: 'Jan' },
    { value: 1, expected: 'Feb' },
    { value: 2, expected: 'Mar' },
    { value: 3, expected: 'Apr' },
    { value: 4, expected: 'May' },
    { value: 5, expected: 'Jun' },
    { value: 6, expected: 'Jul' },
    { value: 7, expected: 'Aug' },
    { value: 8, expected: 'Sep' },
    { value: 9, expected: 'Oct' },
    { value: 10, expected: 'Nov' },
    { value: 11, expected: 'Dec' },
  ])('returns $expected for $value', ({ value, expected }) => {
    expect(formatShortMonth(value)).toBe(expected)
  })

  test('throws TypeError for a non-valid month number', () => {
    expect(() => formatShortMonth(13)).toThrow(TypeError)
  })
})

describe('formatCommonAccessLogDate', () => {
  test('correctly formats a date', () => {
    const date = new Date('2020-01-01T12:34:56Z')
    const expectedValue = '01/Jan/2020:10:34:56 +0200'
    expect(formatCommonAccessLogDate(date)).toBe(expectedValue)
  })

  test('throws TypeError for non-Date value', () => {
    expect(() => formatCommonAccessLogDate({})).toThrow(TypeError)
  })
})