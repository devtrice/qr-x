import type { StorybookConfig } from '@storybook/react-vite'
import { dirname, join } from 'path'
import { mergeConfig } from 'vite'

const platform = process.env.PLATFORM as string

const modules = {
  vue: '@storybook/vue3-vite',
  react: '@storybook/react-vite',
  solid: 'storybook-solidjs-vite',
  svelte: '@storybook/svelte-vite',
  vanilla: '@storybook/html-vite',
}

function getAbsolutePath(value: string): any {
  /**
   * This function is used to resolve the absolute path of a package.
   * It is needed in projects that use Yarn PnP or are set up within a monorepo.
   */
  return dirname(require.resolve(join(value, 'package.json')))
}

const config: StorybookConfig = {
  addons: [
    getAbsolutePath('@storybook/addon-links'),
    getAbsolutePath('@storybook/addon-essentials'),
    getAbsolutePath('@storybook/addon-interactions'),
  ],
  stories: [`../packages/${platform}/index.stories.@(ts|tsx)`],
  framework: {
    name: getAbsolutePath(modules[platform]),
    options: {},
  },
  viteFinal: config => {
    const { dependencies, devDependencies } = require(`../packages/${platform}/package.json`)
    const $dependencies = Object.entries({ ...dependencies, ...devDependencies })
      .filter(([name, value]) => !(value as string).includes('workspace:*'))
      .map(([name]) => name)

    const alias = $dependencies.reduce((resolves, module) => ({ ...resolves, [module]: getAbsolutePath(module) }), {})

    return mergeConfig(config, { resolve: { alias } })
  },
}

export default config
