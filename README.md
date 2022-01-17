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
      github_token: ${{ secrets.GITHUB_TOKEN }}
      tag: 'v1.0.0'
  - name: logging
    run: |
      echo "Found tag=${{ steps.git_tag_check.outputs.tag }}"
```

