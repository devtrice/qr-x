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
import type { Meta } from 'storybook-solidjs'
import QRX from './index'

const Multiple = () => <div class='grid'>{renderMultiple(QRX)}</div>

const BrandComponent = () => (
  <QRX
    data={data}
    central={
      <video
        src={video}
        style={{ width: '2.5rem', height: '2.5rem', border: '2px solid white', 'border-radius': '50%' }}
        muted
        autoplay
      />
    }
  />
)

export default {
  ...meta,
  title: 'QR-X',
  component: QRX,
} satisfies Meta<typeof QRX>

export { Default, FillImage, LinearGradient, Multiple, RadialGradient, BrandImage, BrandImageCustom, BrandComponent }
