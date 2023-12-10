import type { StorybookConfig } from '@storybook/react-vite'
import { dirname, join } from 'path'

const platform = process.env.PLATFORM as string

const modules = {
  react: '@storybook/react-vite',
  solid: 'storybook-solidjs-vite',
  svelte: '@storybook/svelte-vite',
  vanilla: '@storybook/html-vite',
  vue: '@storybook/vue3-vite',
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
}

export default config
