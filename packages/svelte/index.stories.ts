import type { Meta } from '@storybook/svelte'
import { Default, FillImage, LinearGradient, RadialGradient, defaultMeta, renderMultiple } from 'stories'
import QRX, { type QrxProps } from './dist/QRX.svelte'

const meta: Meta<QrxProps> = { title: 'QRx', component: QRX, ...defaultMeta }

// function $QRX(props: QrxProps) {
//   return new QRX({ target: document.getElementById('storybook-root') as any, props })
// }

// const Multiple = () => renderMultiple($QRX)

export default meta

export { Default, FillImage, LinearGradient, RadialGradient }
