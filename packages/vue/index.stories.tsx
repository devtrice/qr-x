import {
  CentralImage,
  CentralImageCustom,
  Default,
  FillImage,
  LinearGradient,
  RadialGradient,
  defaultMeta,
  FillVideo,
} from '@common/stories'
import QRX from './index.vue'

export default {
  title: 'QRx',
  component: QRX,
  ...defaultMeta,
}

export { Default, FillImage, FillVideo, LinearGradient, RadialGradient, CentralImage, CentralImageCustom }
