import type { Meta } from '@storybook/react'
import { Default, FillImage, LinearGradient, RadialGradient, defaultMeta, renderMultiple } from 'stories'
import QRX from './index'

const Multiple = () => <div className='grid'>{renderMultiple(QRX)}</div>

export default {
  title: 'QRx',
  component: QRX,
  ...defaultMeta,
} satisfies Meta<typeof QRX>

export { Default, FillImage, LinearGradient, RadialGradient, Multiple }
