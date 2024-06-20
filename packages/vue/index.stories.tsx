import { Default, FillImage, LinearGradient, RadialGradient, defaultMeta, renderMultiple, FillVideo } from '@common/stories'
import QRX from './index.vue'

const Multiple = () => renderMultiple(QRX as never)

export default {
  title: 'QRx',
  component: QRX,
  ...defaultMeta,
}

export { Default, FillImage, FillVideo, LinearGradient, Multiple, RadialGradient }
