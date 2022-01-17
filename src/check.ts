import * as core from '@actions/core'
import * as github from '@actions/github'
import {RequestError} from '@octokit/types'

interface CheckOptions {
  token: string
  tag: string
  owner?: string
  repo?: string
}

export async function check(options: CheckOptions): Promise<string> {
  const {token, tag, owner, repo} = options

  if (!token) {
    throw new Error('Token is required')
  }

  if (!tag) {
    throw new Error('Tag is required')
  }

  const octokit = github.getOctokit(token)

  const ref = `tags/${tag}`

  try {
    const {status, data} = await octokit.rest.git.getRef({
      owner: owner || github.context.repo.owner,
      repo: repo || github.context.repo.repo,
      ref
    })
    core.debug(`status: ${status}, ref: ${data?.ref}`)

    if (data.ref === `refs/${ref}`) {
      return tag
    }
  } catch (error: unknown) {
    const octokitError = error as RequestError
    if (octokitError) {
      core.debug(`status: ${octokitError.status}, name: ${octokitError.name}`)
      if (octokitError.status === 404) {
        return ''
      }
    } else {
      core.debug(`Unknown error`)
      throw error
    }
  }

  return ''
}
