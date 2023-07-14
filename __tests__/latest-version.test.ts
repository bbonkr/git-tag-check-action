import {expect, test} from '@jest/globals'
import {getLatestVersionFromGitTags} from '../src/latest-version'

test('It should be not undefined', async () => {
  const token = process.env.GH_TOKEN ?? ''
  const owner = process.env.OWNER ?? ''
  const repo = process.env.REPO ?? ''

  const result = await getLatestVersionFromGitTags({token, owner, repo})

  expect(result).not.toBe(undefined)
})

test('It should be undefined if tag is not existed', async () => {
  // https://github.com/bbonkr/html-print-style
  const token = process.env.GH_TOKEN ?? ''
  const owner = 'bbonkr'
  const repo = 'html-print-style'

  const result = await getLatestVersionFromGitTags({token, owner, repo})

  expect(result).toBe(undefined)
})
