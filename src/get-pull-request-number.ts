/**
 * Get PR
 *
 * @param gitHubRef
 * @returns
 */
export const getPullRequestNumber = (gitHubRef: string): number => {
  if (gitHubRef) {
    if (gitHubRef.startsWith('refs/pull/')) {
      // github.ref: refs/pull/<pr_number>/merge
      const prNumberStringValue = gitHubRef
        .split('/')
        .filter((_, index) => index === 2)
        .find((_, index) => index === 0)
      if (prNumberStringValue) {
        const prNumber = parseInt(prNumberStringValue, 10)

        if (typeof prNumber === 'number' && !isNaN(prNumber)) {
          return prNumber
        }
      }
    }
  }

  return -1
}
