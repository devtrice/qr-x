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
import createQRX from './index'
import { $ } from './src/utils'

const Multiple = () => {
  const grid = $('div', { className: 'grid' }, true)
  const elements = renderMultiple(createQRX)
  elements.forEach(element => grid.appendChild(element))
  return grid
}

const BrandComponent = () => {
  const qrx = createQRX({
    data,
    brand: $(
      'video',
      {
        src: video,
        style: { width: '2.5rem', height: '2.5rem', border: '2px solid white', 'border-radius': '50%' },
        autoplay: true,
      },
      true,
    ),
  })
  return qrx
}

export default {
  ...meta,
  title: 'QR-X',
  render: args => createQRX(args),
} satisfies Meta<Parameters<typeof createQRX>[0]>

export { Default, FillImage, LinearGradient, Multiple, RadialGradient, BrandImage, BrandComponent }
