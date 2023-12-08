import type { Meta } from '@storybook/react'
import { Default, FillImage, LinearGradient, RadialGradient, defaultMeta, renderMultiple } from 'stories'
import QRX from '.'

const meta: Meta<typeof QRX> = { title: 'QRx', component: QRX, ...defaultMeta }

const Multiple = () => <div className='grid'>{renderMultiple(QRX)}</div>

export default meta

export { Default, FillImage, LinearGradient, Multiple, RadialGradient }
