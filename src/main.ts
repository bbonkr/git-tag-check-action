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
    const prefix = core.getInput(inputs.prefix)

    const tagValue = prefix ? `${prefix}${tag}` : tag

    const result = await check({token, tag: tagValue, owner, repo})

    core.setOutput('tag', result)
  } catch (error) {
    if (error instanceof Error) {
      core.setFailed(error.message)
    }
  }
}

run()
