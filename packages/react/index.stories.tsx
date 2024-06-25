import { Default, FillImage, FillVideo, Logo, LinearGradient, RadialGradient, defaultMeta, renderMultiple } from '@common/stories'
import type { Meta } from '@storybook/react'
import QRX from './index'

const Multiple = () => <div className='grid'>{renderMultiple(QRX)}</div>

export default {
  title: 'QRx',
  component: QRX,
  ...defaultMeta,
} satisfies Meta<typeof QRX>

export { Default, FillImage, FillVideo, Logo, LinearGradient, Multiple, RadialGradient }
