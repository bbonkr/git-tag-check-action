# Git tag check action

[![](https://img.shields.io/github/v/release/bbonkr/git-tag-check-action?display_name=tag&style=flat-square&include_prereleases)](https://github.com/bbonkr/git-tag-check-action/releases)

This is an action to check if the tag you want to write exists in the remote repository.

## Usages

Check if the provided git tag exists.

```yaml
steps:
  - uses: actions/checkout@v2

  - uses: bbonkr/git-tag-check-action@v1
    id: git_tag_check
    with:
      github_token: ${{ secrets.GITHUB_TOKEN }}
      tag: 'v1.0.0'
  - name: logging
    run: |
      echo "Found tag=${{ steps.git_tag_check.outputs.tag }}"
```

### Inputs

| Name                | Required | Description                                                              |
| :------------------ | :------: | :----------------------------------------------------------------------- |
| tag                 |    ✅    | Tag you want to check                                                    |
| github_token        |    ✅    | GitHub Personal Access Token. It requires REPO scope.                    |
| prefix              |          | Prefix of tag name. default value is `''` (empty string).                |
| major_labels        |          | A comma-separated list of label names to increment the major version by. |
| minor_labels        |          | A comma-separated list of label names to increment the minor version by. |
| patch_labels        |          | A comma-separated list of label names to increment the patch version by. |
| next_version_prefix |          | Next version prefix                                                      |

### Outputs

| Name               | Description                                                      |
| :----------------- | :--------------------------------------------------------------- |
| tag                | If tag is exists, returns tag. Does not exist then empty string. |
| latest_version     | Latest version of git tag                                        |
| next_version       | Recommended next version name                                    |
| next_version_major | Major version of Recommended next version                        |
| next_version_minor | Minor version of Recommended next version                        |
| next_version_patch | Patch version of Recommended next version                        |

- next_version is `1.0.0` if latest version could not find.
- latest_version is latest git tag name of git tags SEMVER[^semver] formatted.

[^semver]: https://semver.org/
