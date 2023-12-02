import type { Meta, StoryObj } from '@storybook/react'
import QRX from './'

const meta: Meta<typeof QRX> = {
  component: QRX,
  title: 'QRx',
  argTypes: {
    data: {
      control: {
        type: 'text',
      },
    },
    eyeFrame: {
      options: ['square', 'leaf', 'circle', 'rounded'],
      control: {
        type: 'select',
      },
    },
    eyeBall: {
      options: ['square', 'leaf', 'circle', 'rounded'],
      control: {
        type: 'select',
      },
    },
    shape: {
      options: ['square', 'circle', 'leaf', 'diamond', 'heart', 'triangle'],
      control: {
        type: 'select',
      },
    },
  },
}
type Story = StoryObj<typeof QRX>

export const Default: Story = {
  args: {
    eyeBall: 'leaf',
    eyeFrame: 'leaf',
    shape: 'square',
    data: 'https://example.com/',
    color: '#000000',
  },
}

export default meta
