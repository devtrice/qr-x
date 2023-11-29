import type { StorybookConfig } from '@storybook/react-vite'
import { dirname, join } from 'path'

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */

const platform = process.env.PLATFORM as string

const modules = { react: '@storybook/react-vite' }

function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, 'package.json')))
}

const config: StorybookConfig = {
  stories: [`../packages/${platform}/*.stories.tsx`],
  addons: [getAbsolutePath('@storybook/addon-essentials'), getAbsolutePath('@storybook/addon-interactions')],
  framework: {
    name: getAbsolutePath(modules[platform]),
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
}
export default config
