import type { Meta } from '@storybook/svelte'
import { Default, FillImage, LinearGradient, RadialGradient, defaultMeta, renderMultiple } from 'stories'
import QRX from './dist/QRX.svelte'

// function $QRX(props: QrxProps) {
//   return new QRX({ target: document.getElementById('storybook-root') as any, props })
// }

// const Multiple = () => renderMultiple($QRX)

export default {
  title: 'QRx',
  component: QRX,
  ...defaultMeta,
} satisfies Meta<QRX>

export { Default, FillImage, LinearGradient, RadialGradient }
