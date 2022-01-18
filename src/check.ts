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
  let errorMessage = ''
  if (!token) {
    errorMessage = 'Token is required'
    console.warn(errorMessage)
    throw new Error(errorMessage)
  }

  if (!tag) {
    errorMessage = 'Tag is required'
    console.warn(errorMessage)
    throw new Error(errorMessage)
  }

  try {
    const octokit = github.getOctokit(token)

    const ref = `tags/${tag}`

    core.debug(
      `payload: ${JSON.stringify(
        {
          owner: owner || github.context.repo.owner,
          repo: repo || github.context.repo.repo,
          ref
        },
        null,
        2
      )}`
    )

    const {status, data} = await octokit.rest.git.getRef({
      owner: owner || github.context.repo.owner,
      repo: repo || github.context.repo.repo,
      ref
    })

    core.debug(`status: ${status}, ref: ${data?.ref}`)

    if (data.ref === `refs/${ref}`) {
      console.info(`Found tag: ${data.ref}`)
      return tag
    }
  } catch (error: unknown) {
    const octokitError = error as RequestError
    if (octokitError) {
      core.debug(`status: ${octokitError.status}, name: ${octokitError.name}`)
      if (octokitError.status === 404) {
        console.info(`Tag ${tag} does not exist.`)
        return ''
      }
    }

    core.debug(`Unknown error ${JSON.stringify(error, null, 2)}`)

    throw error
  }

  return ''
}
