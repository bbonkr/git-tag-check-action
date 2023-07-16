import * as core from '@actions/core'
import * as github from '@actions/github'
import {check} from './check'
import {inputs} from './inputs'

async function run(): Promise<void> {
  try {
    const tag = core.getInput(inputs.tag)

    core.notice(`Let me try to find the tag by '${tag}'`)

    const token = core.getInput(inputs.githubToken)
    let owner = core.getInput(inputs.owner)
    let repo = core.getInput(inputs.repo)
    const prefix = core.getInput(inputs.prefix)

    if (!owner) {
      owner = github.context.repo.owner
    }

    if (!repo) {
      repo = github.context.repo.repo
    }

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
