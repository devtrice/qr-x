import type { Meta, StoryObj } from '@storybook/react'
import QRX from './index'

const meta: Meta<typeof QRX> = {
  title: 'QRx',
  component: QRX,
  argTypes: {
    data: {
      control: 'text',
    },
    shapes: {
      body: {
        control: 'select',
        options: ['square', 'circle', 'leaf', 'diamond', 'heart', 'triangle'],
      },
      eyeball: {
        control: 'select',
        options: ['square', 'leaf', 'circle', 'rounded'],
      },
      eyeframe: {
        control: 'select',
        options: ['square', 'leaf', 'circle', 'rounded'],
      },
    },
  },
}

export const Default: StoryObj<typeof QRX> = {
  args: {
    data: 'https://qr-x.dev',
  },
}

export const Gradient: StoryObj<typeof QRX> = {
  args: {
    data: 'https://qr-x.dev',
    gradient: {
      type: 'linear',
      colors: ['#f97316', '#f59e0b', '#facc15'],
    },
  },
}

export const FillImage: StoryObj<typeof QRX> = {
  args: {
    data: 'https://qr-x.dev',
    fillImage:
      'https://images.unsplash.com/photo-1594905666013-8f11171b8d6d?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
}

export const FillImageWithGradient: StoryObj<typeof QRX> = {
  args: {
    data: 'https://qr-x.dev',
    fillImage:
      'https://images.unsplash.com/photo-1594905666013-8f11171b8d6d?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    gradient: {
      type: 'linear',
      colors: ['#f97316', '#f59e0b', '#facc15'],
    },
  },
}

export default meta
