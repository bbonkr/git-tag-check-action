import * as core from '@actions/core'
import * as github from '@actions/github'
import {RequestError} from '@octokit/types'
import {Version, parseVersion, sortDesc} from './version'

interface NextVersionOptions {
  token: string
  owner: string
  repo: string
}

/**
 * Get latest version from git tags
 *
 * @param options
 * @returns
 */
export async function getLatestVersionFromGitTags(
  options: NextVersionOptions
): Promise<Version | undefined> {
  const {token, owner, repo} = options
  let errorMessage = ''

  if (!token) {
    errorMessage = 'Token is required'
    core.warning(errorMessage)
    throw new Error(errorMessage)
  }

  try {
    const octokit = github.getOctokit(token)

    const {status, data} = await octokit.rest.git.listMatchingRefs({
      owner,
      repo,
      ref: 'tags'
    })

    core.debug(
      `getLatestVersionFromGitTags::status: ${status}, count: ${data.length}`
    )

    const tags = data.map(x => {
      if (x.ref.startsWith('refs/tags/')) {
        // ref:= refs/tags/v1.0.0
        const tagName = x.ref.split('/').find((_, index) => index === 2)
        if (tagName) {
          try {
            return parseVersion(tagName)
          } catch {
            return undefined
          }
        } else {
          return undefined
        }
      }
      return undefined
    })

    const latestVersion = tags
      .filter(tag => typeof tag !== 'undefined')
      .slice()
      .sort(sortDesc)
      .find((_, index) => index === 0)

    if (typeof latestVersion !== 'undefined') {
      return latestVersion
    }
    // next version
  } catch (error: unknown) {
    const octokitError = error as RequestError
    if (octokitError) {
      core.debug(`status: ${octokitError.status}, name: ${octokitError.name}`)
      if (octokitError.status === 404) {
        core.notice(`Tags not found.`)
        return undefined
      }
    }

    core.startGroup('Unknown error occurred')
    core.error((error as Error) ?? new Error('error does not Error type'))
    core.endGroup()

    throw error
  }

  core.notice(`Tags not found.`)

  return undefined
}
