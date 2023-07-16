import {expect, test} from '@jest/globals'
import {check} from '../src/check'

test('throws does not provide required input', async () => {
  expect(check({token: '', tag: '', owner: '', repo: ''})).rejects.toThrow(
    'Token is required'
  )
})

test('throws does not provide token input', async () => {
  expect(check({token: '', tag: 'aaa', owner: '', repo: ''})).rejects.toThrow(
    'Token is required'
  )
})

test('throws does not provide tag input', async () => {
  expect(check({token: 'aaa', tag: '', owner: '', repo: ''})).rejects.toThrow(
    'Tag is required'
  )
})

test('throws invalid github token', async () => {
  expect(
    check({token: 'aaa', tag: 'aaa', owner: '', repo: ''})
  ).rejects.toThrow()
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
