import {
  CentralImage,
  CentralImageCustom,
  Default,
  FillImage,
  FillVideo,
  LinearGradient,
  RadialGradient,
  defaultMeta,
  renderMultiple,
} from '@common/stories'
import type { Meta } from '@storybook/react'
import QRX from './index'

const Multiple = () => <div className='grid'>{renderMultiple(QRX)}</div>

const CentralComponent = () => (
  <QRX
    data={Default.args?.data as string}
    central={
      <video
        src='https://videos.pexels.com/video-files/8333185/8333185-hd_1080_1080_30fps.mp4'
        style={{ width: '2.5rem', height: '2.5rem', border: '2px solid white', borderRadius: '50%' }}
        muted
        autoPlay
      ></video>
    }
  />
)

export default {
  title: 'QR-X',
  component: QRX,
  ...defaultMeta,
} satisfies Meta<typeof QRX>

export {
  Default,
  FillImage,
  FillVideo,
  LinearGradient,
  Multiple,
  RadialGradient,
  CentralImage,
  CentralImageCustom,
  CentralComponent,
}
