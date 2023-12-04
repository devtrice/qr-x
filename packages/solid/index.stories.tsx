import type { Meta, StoryObj } from 'storybook-solidjs'
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
    color: '#6366f1',
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

export const MultipleQR = () => {
  return (
    <div class='grid'>
      {/* Linear Gradients */}
      <QRX
        data='https://qr-x.dev'
        gradient={{
          type: 'linear',
          colors: ['#f97316', '#f59e0b', '#facc15'],
          rotate: 30,
        }}
      />
      <QRX
        data='https://qr-x.dev'
        gradient={{
          colors: ['#00ffff', '#ff0000', '#f0f0ff'],
          rotate: 20,
        }}
      />
      <QRX
        data='https://qr-x.dev'
        gradient={{
          colors: ['#0ea5e9', '#22d3ee'],
          rotate: 75,
        }}
      />

      {/* Radial Gradients */}
      <QRX
        data='https://qr-x.dev'
        gradient={{
          colors: ['#f97316', '#f59e0b', '#facc15'],
          type: 'radial',
        }}
      />
      <QRX
        data='https://qr-x.dev'
        gradient={{
          colors: ['#00ffff', '#ff0000', '#f0f0ff'],
          type: 'radial',
        }}
      />
      <QRX
        data='https://qr-x.dev'
        gradient={{
          colors: ['#0ea5e9', '#22d3ee'],
          type: 'radial',
        }}
      />

      {/* Fill Images */}
      <QRX
        data='https://qr-x.dev'
        fillImage='https://images.unsplash.com/photo-1698824241422-57942267c0cf?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
      />
      <QRX
        data='https://qr-x.dev'
        fillImage='https://images.unsplash.com/photo-1700125675544-98bd16b9c627?q=80&w=2535&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
      />
      <QRX
        data='https://qr-x.dev'
        fillImage='https://images.unsplash.com/photo-1700200670842-c13ed4d790b3?q=80&w=2430&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
      />
    </div>
  )
}
export default meta
