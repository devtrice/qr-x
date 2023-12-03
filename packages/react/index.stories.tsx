import type { Meta, StoryObj } from '@storybook/react'
import QRX from './index'

const meta: Meta<typeof QRX> = {
  title: 'QRx',
  component: QRX,
  argTypes: {
    data: {
      control: 'text',
    },
    shape: {
      control: 'select',
      options: ['square', 'circle', 'leaf', 'diamond', 'heart', 'triangle'],
    },
    eyeBall: {
      control: 'select',
      options: ['square', 'leaf', 'circle', 'rounded'],
    },
    eyeFrame: {
      control: 'select',
      options: ['square', 'leaf', 'circle', 'rounded'],
    },
  },
}

export const Default: StoryObj<typeof QRX> = {
  args: {
    data: 'https://example.com/',
    color: 'pink',
    image: {
      src: 'https://images.unsplash.com/photo-1683009427037-c5afc2b8134d?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      size: 5,
    },
    gradient: {
      type: 'linear',
      colors: ['#f97316', '#f59e0b', '#facc15'],
    },
  },
}

export default meta
