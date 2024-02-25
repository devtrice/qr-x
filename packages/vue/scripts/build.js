const { build } = require('esbuild')
const vuePlugin = require('esbuild-plugin-vue-next')

const formats = ['esm', 'cjs']

formats.forEach(format =>
  build({
    format,
    entryPoints: ['index.ts'],
    plugins: [vuePlugin()],
    bundle: true,
    outfile: `dist/index.${format}.js`,
    packages: 'external',
  }),
)
