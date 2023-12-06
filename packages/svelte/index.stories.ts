import type { Meta, StoryObj } from '@storybook/svelte'
import QRX, { type QrxProps } from './dist/QRX.svelte'

type Story = StoryObj<QrxProps>

const meta: Meta<QrxProps> = {
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

export const Default: Story = {
  args: {
    data: 'https://qr-x.dev',
    color: '#6366f1',
  },
}

export const Gradient: Story = {
  args: {
    data: 'https://qr-x.dev',
    gradient: {
      type: 'linear',
      colors: ['#f97316', '#f59e0b', '#facc15'],
    },
  },
}

export const FillImage: Story = {
  args: {
    data: 'https://qr-x.dev',
    fillImage:
      'https://images.unsplash.com/photo-1594905666013-8f11171b8d6d?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
}

export default meta
