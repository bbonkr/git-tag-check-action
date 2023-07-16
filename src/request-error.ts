// import {RequestError} from '@octokit/types' // Unable to resolve path to module '@octokit/types'.eslintimport/no-unresolved

export type RequestError = {
  name: string
  status: number
  documentation_url: string
  errors?: {
    resource: string
    code: string
    field: string
    message?: string
  }[]
}
