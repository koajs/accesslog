const {
  toCommonAccessLogDateFormat,
  toOffset,
  toShortMonth,
  toTwoDigits,
} = require('../format')

describe('toTwoDigits', () => {
  test.each([
    { value: 0, expected: '00' },
    { value: 1, expected: '01' },
    { value: 11, expected: '11' },
    { value: 99, expected: '99' },
    { value: 123, expected: '123' },
  ])('returns $expected for $value', ({ value, expected }) => {
    expect(toTwoDigits(value)).toBe(expected)
  })

  it('throws TypeError if provided value is Infinity', () => {
    expect(() => toTwoDigits(Infinity)).toThrow(TypeError)
  })

  it('throws TypeError if provided value is NaN', () => {
    expect(() => toTwoDigits(NaN)).toThrow(TypeError)
  })

  it('throws TypeError if provided value is a decimal number', () => {
    expect(() => toTwoDigits(0.99)).toThrow(TypeError)
  })

  it('throws TypeError if provided value is a string', () => {
    expect(() => toTwoDigits('0')).toThrow(TypeError)
  })
})

describe('toOffset', () => {
  it.each([
    { value: 480, expected: '-0800' },
    { value: 0, expected: '+0000' },
    { value: -180, expected: '+0300' },
  ])('returns $expected for $value', ({ value, expected }) => {
    expect(toOffset(value)).toBe(expected)
  })

  it('throws TypeError if provided value is Infinity', () => {
    expect(() => toOffset(Infinity)).toThrow(TypeError)
  })

  it('throws TypeError if provided value is NaN', () => {
    expect(() => toOffset(NaN)).toThrow(TypeError)
  })

  it('throws TypeError if provided value is a decimal number', () => {
    expect(() => toOffset(60.5)).toThrow(TypeError)
  })

  it('throws TypeError if provided value is a string', () => {
    expect(() => toOffset('60')).toThrow(TypeError)
  })
})

describe('toShortMonth', () => {
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
    expect(toShortMonth(value)).toBe(expected)
  })

  it('throws TypeError for a non-valid month number', () => {
    expect(() => toShortMonth(13)).toThrow(TypeError)
  })
})

describe('toCommonAccessLogDateFormat', () => {
  it('correctly formats a date', () => {
    const date = new Date('2020-01-01T12:34:56Z')
    const expectedValue = '01/Jan/2020:12:34:56 +0000'
    expect(toCommonAccessLogDateFormat(date)).toBe(expectedValue)
  })

  it('throws TypeError for non-Date value', () => {
    expect(() => toCommonAccessLogDateFormat({})).toThrow(TypeError)
  })
})