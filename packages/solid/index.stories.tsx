import { Default, FillImage, LinearGradient, LogoCenter, RadialGradient, defaultMeta, renderMultiple } from 'stories'
import type { Meta } from 'storybook-solidjs'
import QRX from './index'

const Multiple = () => <div class='grid'>{renderMultiple(QRX)}</div>

export default {
  title: 'QRx',
  component: QRX,
  ...defaultMeta,
} satisfies Meta<typeof QRX>

export { Default, FillImage, LinearGradient, LogoCenter, RadialGradient, Multiple }
