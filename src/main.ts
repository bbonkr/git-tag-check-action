import * as core from '@actions/core'
import {check} from './check'

async function run(): Promise<void> {
  try {
    const tag = core.getInput('tag')
    core.debug(`Tag: ${tag}`)
    const token = core.getInput('GITHUB_TOKEN')
    const owner = core.getInput('OWNER')
    const repo = core.getInput('REPO')

    const result = check({token, tag, owner, repo})

    core.setOutput('hasTag', result)
  } catch (error) {
    if (error instanceof Error) {
      core.setFailed(error.message)
    }
  }
}

run()
