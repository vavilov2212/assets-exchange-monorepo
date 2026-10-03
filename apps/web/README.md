### Prerequisites

node: v20.9.0

Execute `nvm use` to fetch required version from projects _.nvmrv_.

### Stack

- [TypeScript](https://www.typescriptlang.org/)
- [PostCSS](https://postcss.org/) with [mantine-postcss-preset](https://mantine.dev/styles/postcss-preset)
- [Storybook](https://storybook.js.org/)
- ESLint setup with [eslint-config-mantine](https://github.com/mantinedev/eslint-config-mantine)

### Build and dev scripts

- `dev` – start dev server
- `build` – bundle application for production
- `analyze` – analyzes application bundle with [@next/bundle-analyzer](https://www.npmjs.com/package/@next/bundle-analyzer)

### Linting & checking scripts

- `typecheck` – checks TypeScript types
- `lint` – runs ESLint
- `prettier:check` – checks files with Prettier

### Other scripts

- `storybook` – starts storybook dev server
- `storybook:build` – build production storybook bundle to `storybook-static`
- `prettier:write` – formats all files with Prettier
