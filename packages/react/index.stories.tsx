import {
  meta,
  data,
  video,
  BrandImage,
  Default,
  FillImage,
  LinearGradient,
  RadialGradient,
  renderMultiple,
} from '@common/stories'
import type { Meta } from '@storybook/react'
import QRX from './index'

const Multiple = () => <div className='grid'>{renderMultiple(QRX)}</div>

const BrandComponent = () => (
  <QRX
    data={data}
    brand={
      <video
        src={video}
        style={{ width: '2.5rem', height: '2.5rem', border: '2px solid white', borderRadius: '50%' }}
        muted
        autoPlay
      />
    }
    excavate={{ width: 40, height: 40 }}
  />
)

export default {
  ...meta,
  title: 'QR-X',
  component: QRX,
} satisfies Meta<typeof QRX>

export { Default, FillImage, LinearGradient, Multiple, RadialGradient, BrandImage, BrandComponent }
