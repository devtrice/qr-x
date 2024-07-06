import {
  meta,
  data,
  video,
  BrandImage,
  BrandImageCustom,
  Default,
  FillImage,
  LinearGradient,
  RadialGradient,
  renderMultiple,
} from '@common/stories'
import type { Meta } from '@storybook/svelte'
import QRX from './dist/index.svelte'

// function $QRX(props: QrxProps) {
//   return new QRX({ target: document.getElementById('storybook-root') as any, props })
// }

export default {
  ...meta,
  title: 'QR-X',
  component: QRX,
} satisfies Meta<QRX>

export { Default, FillImage, LinearGradient, RadialGradient, BrandImage, BrandImageCustom }
