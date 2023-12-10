import type { Meta } from '@storybook/vue3'
import { Default, FillImage, LinearGradient, RadialGradient, defaultMeta, renderMultiple } from 'stories'
import QRX from './src/QRX.vue'

const Multiple = () => {
  //@ts-ignore ! Can remove this ignore after the component is complete
  return <div>{renderMultiple(QRX)}</div>
}

export default {
  title: 'QRx',
  //@ts-ignore ! Can remove this ignore after the component is complete
  component: QRX,
  ...defaultMeta,
} satisfies Meta<typeof QRX>

export { Default, FillImage, LinearGradient, RadialGradient, Multiple }
