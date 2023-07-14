import {describe, expect, test} from '@jest/globals'
import {
  Version,
  parseVersion,
  printVersion,
  sortAsc,
  sortDesc
} from '../src/version'

describe('parseVersion', () => {
  test('It should parse to the version', () => {
    const versionValue = 'v1.0.0'
    const result = parseVersion(versionValue)

    expect(printVersion(result, 'v')).toBe(versionValue)
  })

  test('It should not parse to the version', () => {
    const versionValue = 'latest'

    expect(() => parseVersion(versionValue)).toThrow(Error)
  })
})

describe('printVersion', () => {
  test('It should be same string v1.2.3', () => {
    const versionA = 'v1.2.3'
    const versionB: Version = {major: 1, minor: 2, patch: 3}
    const versionPrefix = 'v'

    expect(printVersion(versionB, versionPrefix)).toBe(versionA)
  })

  test('It should be same string v1.2.3-alpha.1', () => {
    const versionA = 'v1.2.3-alpha.1'
    const versionB: Version = {
      major: 1,
      minor: 2,
      patch: 3,
      preRelease: 'alpha.1'
    }
    const versionPrefix = 'v'

    expect(printVersion(versionB, versionPrefix)).toBe(versionA)
  })

  test('It should be same string v1.2.3-alpha.1+1234', () => {
    const versionA = 'v1.2.3-alpha.1+1234'
    const versionB: Version = {
      major: 1,
      minor: 2,
      patch: 3,
      preRelease: 'alpha.1',
      build: '1234'
    }
    const versionPrefix = 'v'

    expect(printVersion(versionB, versionPrefix)).toBe(versionA)
  })

  test('It should be same string v1.2.3+1234', () => {
    const versionA = 'v1.2.3+1234'
    const versionB: Version = {
      major: 1,
      minor: 2,
      patch: 3,
      preRelease: '',
      build: '1234'
    }
    const versionPrefix = 'v'

    expect(printVersion(versionB, versionPrefix)).toBe(versionA)
  })
})

describe('Sort', () => {
  const versions: (Version | undefined)[] = [
    {major: 1, minor: 1, patch: 0},
    {major: 0, minor: 1, patch: 0}, // min
    {major: 1, minor: 0, patch: 0},
    undefined,
    {major: 2, minor: 1, patch: 3}, // max
    {major: 1, minor: 1, patch: 1},
    {major: 2, minor: 1, patch: 1}
  ]
  test('sort asc', () => {
    const sorted = versions.slice().sort(sortAsc)

    const minVersion = sorted.find((_, index) => index === 0)
    expect(minVersion).not.toBe(undefined)
    if (minVersion) {
      expect(printVersion(minVersion)).toBe(
        printVersion({major: 0, minor: 1, patch: 0})
      )
    }
  })
  test('sort desc', () => {
    const sorted = versions.slice().sort(sortDesc)

    const maxVersion = sorted.find((_, index) => index === 0)
    expect(maxVersion).not.toBe(undefined)
    if (maxVersion) {
      expect(printVersion(maxVersion)).toBe(
        printVersion({major: 2, minor: 1, patch: 3})
      )
    }
  })
})
