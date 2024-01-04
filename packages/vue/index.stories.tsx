import type { Meta } from '@storybook/vue3'
import { Default, FillImage, LinearGradient, RadialGradient, defaultMeta, renderMultiple } from 'stories'
import QRX from './src/QRX.vue'

const Multiple = () => {
  return <div>{renderMultiple(QRX)}</div>
}

export default {
  title: 'QRx',
  component: QRX,
  ...defaultMeta,
} satisfies Meta<typeof QRX>

export { Default, FillImage, LinearGradient, Multiple, RadialGradient }
