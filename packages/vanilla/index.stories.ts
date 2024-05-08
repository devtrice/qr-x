import { Default, FillImage, LinearGradient, RadialGradient, defaultMeta, renderMultiple } from '@common/stories'
import type { Meta } from '@storybook/html'
import createQRX, { Props } from './index'

const Multiple = () => {
  const elements = renderMultiple(createQRX)
  const grid = document.createElement('div')
  grid.className = 'grid'
  grid.innerHTML = elements.join('')
  return grid
}

export default {
  title: 'QRx',
  render: args => createQRX(args),
  ...defaultMeta,
} satisfies Meta<Props>

export { Default, FillImage, LinearGradient, Multiple, RadialGradient }
