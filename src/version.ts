export type Version = {
  major: number
  minor: number
  patch: number
  preRelease?: string
  build?: string
}

export const parseVersion = (v: string): Version => {
  // https://semver.org/
  // https://en.wikipedia.org/wiki/Software_versioning
  const rexVersion =
    /^v?(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/gi

  if (!rexVersion.test(v)) {
    throw new Error('Invalid string as version')
  }

  const tokens = v.split(rexVersion)

  if (tokens.length > 3) {
    return {
      major: parseInt(tokens[1], 10),
      minor: parseInt(tokens[2], 10),
      patch: parseInt(tokens[3], 10),
      preRelease: tokens.length > 3 ? tokens[4] : undefined,
      build: tokens.length > 4 ? tokens[5] : undefined
    }
  } else {
    throw new Error('Invalid string as version')
  }
}

export const sortDesc = (a?: Version, b?: Version): number => {
  if (!a || !b) {
    return 1
  } else {
    if (a.major > b.major) {
      return -1
    } else {
      if (a.minor > b.minor) {
        return -1
      } else {
        if (a.patch > b.patch) {
          return -1
        } else {
          return 1
        }
      }
    }
  }
}

export const sortAsc = (a?: Version, b?: Version): number => {
  if (!a || !b) {
    return 1
  } else {
    if (a.major > b.major) {
      return 1
    } else {
      if (a.minor > b.minor) {
        return 1
      } else {
        if (a.patch > b.patch) {
          return 1
        } else {
          return -1
        }
      }
    }
  }
}

export const printVersion = (version: Version, prefix?: string): string => {
  const versionTokens: (string | undefined)[] = [
    `${version.major}`,
    `${version.minor}`,
    `${version.patch}`
  ]

  return `${prefix?.trim() ?? ''}${versionTokens.filter(Boolean).join('.')}${
    version.preRelease ? `-${version.preRelease.trim()}` : ''
  }${version.build ? `+${version.build.trim()}` : ''}`
}
