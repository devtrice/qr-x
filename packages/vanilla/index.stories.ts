import {
  meta,
  data,
  video,
  BrandImage,
  Default,
  FillImage,
  LinearGradient,
  RadialGradient,
  renderMultiple,
} from '@common/stories'
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
  ...meta,
  title: 'QR-X',
  render: args => createQRX(args),
} satisfies Meta<Props>

export { Default, FillImage, LinearGradient, Multiple, RadialGradient, BrandImage }
