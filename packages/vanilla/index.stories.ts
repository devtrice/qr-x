import type { Meta } from '@storybook/html'
import { Default, FillImage, LinearGradient, RadialGradient, defaultMeta, renderMultiple } from 'stories'
import createQRX, { Props } from './index'

const meta: Meta<Props> = {
  title: 'QRx',
  render: args => createQRX(args),
  ...defaultMeta,
}

const Multiple = () => {
  const elements = renderMultiple(createQRX)
  const grid = document.createElement('div')
  grid.className = 'grid'
  elements.forEach(element => grid.appendChild(element))
  return grid
}

export default meta

export { Default, FillImage, LinearGradient, Multiple, RadialGradient }
