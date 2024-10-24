# @sparing-software/eslint-config

## Configurations

`.eslintrc`

### Typescript

```json
{
  "extends": ["@sparing-software/eslint-config"]
}
```

### Vue 3

```json
{
  "extends": ["@sparing-software/eslint-config/vue"]
}
```

### Nuxt 3

```json
{
  "extends": ["@sparing-software/eslint-config/nuxt"]
}
```

### React

```json
{
  "extends": ["@sparing-software/eslint-config/react"]
}
```

### Next

```json
{
  "extends": ["@sparing-software/eslint-config/next"]
}
```

### React Native

```json
{
  "extends": ["@sparing-software/eslint-config/react-native"]
}
```

## Recommended Extensions

- [ESLint VSCode](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

## Testing

To test it, you have to build this package using `npm run pack-windows` or `npm run pack-macos` (depending on your OS) and install it in your project using `npm i --include=dev <path to package>`.

[Read more](https://www.notion.so/panowiepro/Open-Source-a465a9d7689b44e9b366feec8804bd92#486d88e068fc40ed80f1b6afa5669b48)

## Releasing and versioning

Use [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) to automatically bump major, minor and patch versions. Read more about semantic releasing in this [docs](https://semantic-release.gitbook.io/semantic-release/recipes/release-workflow).

## Migration guide:

1. Create a file named `eslint.config.mjs` in the root of your project.
2. Move `.eslintignore` to a eslint config like this:

> Eslint ignore

```
dist
.react-email
*.html
```

> Eslint config

```js
export default [
  {
    ignores: ['.react-email/*', 'dist/*', '**/*.html']
  }
```
