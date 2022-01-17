import {expect, test} from '@jest/globals'
import {check} from '../src/check'

test('throws does not provide required input', async () => {
  expect(check({token: '', tag: ''})).rejects.toThrow('Token is required')
})

test('throws does not provide token input', async () => {
  expect(check({token: '', tag: 'aaa'})).rejects.toThrow('Token is required')
})

test('throws does not provide tag input', async () => {
  expect(check({token: 'aaa', tag: ''})).rejects.toThrow('Tag is required')
})

test('v1.0.0 tag should be exist', async () => {
  const token = process.env.GH_TOKEN ?? ''
  const owner = process.env.OWNER ?? ''
  const repo = process.env.REPO ?? ''
  const tag = 'v1.0.0'

  const result = await check({token, tag, owner, repo})

  expect(result).toEqual(tag)
})

test('v100.0.0 tag should not be exist', async () => {
  const token = process.env.GH_TOKEN ?? ''
  const owner = process.env.OWNER ?? ''
  const repo = process.env.REPO ?? ''
  const tag = 'v100.0.0'

  const result = await check({token, tag, owner, repo})

  expect(result).toEqual('')
})
