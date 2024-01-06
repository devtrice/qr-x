import { Default, FillImage, LinearGradient, RadialGradient, defaultMeta, renderMultiple } from '@common/stories'
import type { Meta } from '@storybook/vue3'
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
