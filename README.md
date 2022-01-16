# Git tag check action

This is an action to check if the tag you want to write exists in the remote repository.

## Usages

Check if the provided git tag exists.

```yaml
steps:
  - uses: actions/checkout@v2

  - uses: bbonkr/git-tag-check-action@v1
    id: git_tag_check
    with:
      GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
      TAG: 'v1.0.0'
  - name: logging
    run: |
      echo "hasTag=${{ steps.git_tag_check.outputs.hasTag }}"
```

