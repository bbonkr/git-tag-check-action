import * as core from '@actions/core'
import {check} from './check'
import {inputs} from './inputs'

async function run(): Promise<void> {
  try {
    const tag = core.getInput(inputs.tag)

    core.debug(`Input Tag: ${tag}`)

    const token = core.getInput(inputs.githubToken)
    const owner = core.getInput(inputs.owner)
    const repo = core.getInput(inputs.repo)

    const result = check({token, tag, owner, repo})

    core.setOutput('tag', result)
  } catch (error) {
    if (error instanceof Error) {
      core.setFailed(error.message)
    }
  }
}

run()
