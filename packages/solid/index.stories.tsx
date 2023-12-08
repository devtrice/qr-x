import { Default, FillImage, LinearGradient, RadialGradient, defaultMeta, renderMultiple } from 'stories'
import type { Meta } from 'storybook-solidjs'
import QRX from '.'

const meta: Meta<typeof QRX> = { title: 'QRx', component: QRX, ...defaultMeta }

const Multiple = () => <div class='grid'>{renderMultiple(QRX)}</div>

export default meta

export { Default, FillImage, LinearGradient, Multiple, RadialGradient }
