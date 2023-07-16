import * as core from '@actions/core'
import * as github from '@actions/github'
import {RequestError} from './request-error'

interface CheckOptions {
  token: string
  tag: string
  owner: string
  repo: string
}

export async function check(options: CheckOptions): Promise<string> {
  const {token, tag, owner, repo} = options
  let errorMessage = ''

  if (!token) {
    errorMessage = 'Token is required'
    core.warning(errorMessage)
    throw new Error(errorMessage)
  }

  if (!tag) {
    errorMessage = 'Tag is required'
    core.warning(errorMessage)
    throw new Error(errorMessage)
  }

  try {
    const octokit = github.getOctokit(token)

    const ref = `tags/${tag}`

    core.startGroup('octokit.rest.git.getRef() with')
    core.notice(`owner: ${owner}`)
    core.notice(`repo: ${repo}`)
    core.notice(`ref: ${ref}`)
    core.endGroup()

    const {status, data} = await octokit.rest.git.getRef({
      owner,
      repo,
      ref
    })

    core.debug(`status: ${status}, ref: ${data?.ref}`)

    if (data.ref === `refs/${ref}`) {
      core.notice(`Found tag: ${data.ref}`)
      return tag
    }
  } catch (error: unknown) {
    const octokitError = error as RequestError
    if (octokitError) {
      core.debug(`status: ${octokitError.status}, name: ${octokitError.name}`)
      if (octokitError.status === 404) {
        core.notice(`Tag ${tag} does not exist.`)
        return ''
      }
    }

    core.startGroup('Unknown error occurred')
    core.error((error as Error) ?? new Error('error does not Error type'))
    core.endGroup()

    throw error
  }

  return ''
}
