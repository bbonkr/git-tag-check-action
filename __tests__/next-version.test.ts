import {expect, test} from '@jest/globals'
import {getNextVersion} from '../src/next-version'
import {Version} from '../src/version'

test('It should not be undefined', async () => {
  const token = process.env.GH_TOKEN ?? ''
  const owner = process.env.OWNER ?? ''
  const repo = process.env.REPO ?? ''

  const result = await getNextVersion({
    token,
    owner,
    repo,
    latestVersion: undefined,
    ref: 'refs/pull/198/merge', // labels: [dependencies, npm]
    majorLabels: ['major'],
    minorLabels: ['feature'],
    patchLabels: ['dependencies']
  })

  // result is v1.0.0 because latest version is undefined
  expect(result).not.toBe(undefined)
  expect(result?.major).toBe(1)
  expect(result?.minor).toBe(0)
  expect(result?.patch).toBe(0)
})

test('It should increase major version', async () => {
  const token = process.env.GH_TOKEN ?? ''
  const owner = process.env.OWNER ?? ''
  const repo = process.env.REPO ?? ''

  const result = await getNextVersion({
    token,
    owner,
    repo,
    latestVersion: {major: 1, minor: 0, patch: 0},
    ref: 'refs/pull/198/merge', // labels: [dependencies, npm]
    majorLabels: ['dependencies'],
    minorLabels: ['feature'],
    patchLabels: ['none']
  })

  // result is v1.0.0 because latest version is undefined
  expect(result).not.toBe(undefined)
  expect(result?.major).toBe(2)
  expect(result?.minor).toBe(0)
  expect(result?.patch).toBe(0)
})

test('It should increase minor version', async () => {
  const token = process.env.GH_TOKEN ?? ''
  const owner = process.env.OWNER ?? ''
  const repo = process.env.REPO ?? ''

  const latestVersion: Version = {major: 1, minor: 0, patch: 0}

  const result = await getNextVersion({
    token,
    owner,
    repo,
    latestVersion,
    ref: 'refs/pull/198/merge', // labels: [dependencies, npm]
    majorLabels: ['none1'],
    minorLabels: ['feature', 'dependencies'],
    patchLabels: ['none2']
  })

  // result is v1.0.0 because latest version is undefined
  expect(result).not.toBe(undefined)
  expect(result?.major).toBe(latestVersion.major)
  expect(result?.minor).toBe(latestVersion.minor + 1)
  expect(result?.patch).toBe(0)
})

test('It should increase patch version', async () => {
  const token = process.env.GH_TOKEN ?? ''
  const owner = process.env.OWNER ?? ''
  const repo = process.env.REPO ?? ''

  const latestVersion: Version = {major: 1, minor: 0, patch: 0}

  const result = await getNextVersion({
    token,
    owner,
    repo,
    latestVersion,
    ref: 'refs/pull/198/merge', // labels: [dependencies, npm]
    majorLabels: ['none1'],
    minorLabels: ['none2'],
    patchLabels: ['feature', 'dependencies']
  })

  // result is v1.0.0 because latest version is undefined
  expect(result).not.toBe(undefined)
  expect(result?.major).toBe(latestVersion.major)
  expect(result?.minor).toBe(latestVersion.minor)
  expect(result?.patch).toBe(latestVersion.patch + 1)
})
