const { build } = require('esbuild')
const { solidPlugin } = require('esbuild-plugin-solid')

const formats = ['esm', 'cjs']

formats.forEach(format =>
  build({
    format,
    entryPoints: ['index.tsx'],
    plugins: [solidPlugin()],
    outfile: `dist/index.${format}.js`,
  }),
)
