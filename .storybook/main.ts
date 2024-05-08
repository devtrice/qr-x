import type { StorybookConfig } from '@storybook/react-vite'
import path from 'path'
import { mergeConfig } from 'vite'

const platform = process.env.PLATFORM as string

const $path = path.resolve('packages', platform)
const modules = {
  vue: '@storybook/vue3-vite',
  react: '@storybook/react-vite',
  solid: 'storybook-solidjs-vite',
  svelte: '@storybook/svelte-vite',
  vanilla: '@storybook/html-vite',
}

const config: StorybookConfig = {
  addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-interactions'],
  stories: [`${$path}/index.stories.@(ts|tsx)`],
  framework: {
    name: modules[platform],
    options: {},
  },
  viteFinal: config => {
    const { devDependencies } = require(`${$path}/package.json`)
    const alias = Object.entries(devDependencies)
      .filter(([name, value]) => !(value as string).includes('workspace:*'))
      .map(([name]) => name)
      .reduce(
        (resolves, module) => ({
          ...resolves,
          [module]: path.join($path, 'node_modules', module),
          'svelte/internal': path.join($path, 'node_modules', 'svelte/src/runtime/internal'),
        }),
        {},
      )

    return mergeConfig(config, { resolve: { alias } })
  },
}

export default config
