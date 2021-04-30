# Publishing to NPM

This repo has a **Github** action in place which publish `@valencyhq/valency` package to **NPM** once the new package version is greater than the previous.

In other to release run the command below:

```bash
# For a patch release i.e 0.0.1 -> 0.0.2
$ yarn release:patch

# For a minor release i.e 0.0.1 -> 0.1.0
$ yarn release:minor

# For a major release i.e 0.0.1 -> 1.0.0
$ yarn release:minor
```
