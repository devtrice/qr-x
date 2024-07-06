import type { Options } from '@qr-x/core'
import type { StoryObj } from '@storybook/react'

type Story = StoryObj<Props>
type Props = Options & { [k: string]: unknown }

export const data = 'https://qr-x.devtrice.dev'
export const image = 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=40'
export const video = 'https://videos.pexels.com/video-files/8333185/8333185-hd_1080_1080_30fps.mp4'
export const colors = ['#f97316', '#f59e0b', '#facc15']

export const meta = {
  argTypes: {
    data: { control: 'text' },
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
} as const

export const Default: Story = {
  args: {
    data,
    color: '#6366f1',
  },
}

export const FillImage: Story = {
  args: {
    data,
    fillImage: image,
  },
}

export const LinearGradient: Story = {
  args: {
    data,
    gradient: { type: 'linear', colors },
  },
}

export const RadialGradient: Story = {
  args: {
    data,
    gradient: { type: 'radial', colors },
  },
}

export const BrandImage: Story = {
  args: {
    data,
    brand: image,
  },
}

export const BrandImageCustom: Story = {
  args: {
    data,
    brand: { src: image, width: 80, height: 80 },
  },
}

export const renderMultiple = (component: (props: Props) => any) => {
  const images = [
    'https://images.unsplash.com/photo-1437413646517-e98caade5a58?q=80&w=480',
    'https://images.unsplash.com/photo-1704138162406-bc43d5b9ff97?q=80&w=480',
  ]
  const gradients = [
    ['#0ea5e9', '#22d3ee', '#38f9d7', '#4cfcb3', '#5ffea1'],
    ['#f97316', '#f59e0b', '#facc15', '#f9d423', '#ffdc80'],
  ]
  return [
    ...images.map(image => component({ data, fillImage: image })),
    ...gradients.map(gradients => component({ data, gradient: { type: 'linear', colors: gradients } })),
    ...gradients.map(gradients => component({ data, gradient: { type: 'radial', colors: gradients } })),
  ]
}
