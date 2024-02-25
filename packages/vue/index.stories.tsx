import { Default, FillImage, LinearGradient, RadialGradient, defaultMeta, renderMultiple } from '@common/stories'
import QRX from './src/QRX.vue'

const Multiple = () => renderMultiple(QRX as never)

export default {
  title: 'QRx',
  component: QRX,
  ...defaultMeta,
}

export { Default, FillImage, LinearGradient, Multiple, RadialGradient }
