import type { Options } from '@qr-x/core'
import type { StoryObj } from '@storybook/react'

type Props = Options & { [k: string]: unknown }

type Story = StoryObj<Props>

const URL = 'https://qr-x.dev'

export const defaultMeta = {
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
    data: URL,
    color: '#6366f1',
  },
}

export const LinearGradient: Story = {
  args: {
    data: URL,
    gradient: {
      type: 'linear',
      colors: ['#f97316', '#f59e0b', '#facc15'],
    },
  },
}

export const RadialGradient: Story = {
  args: {
    data: URL,
    gradient: {
      type: 'radial',
      colors: ['#f97316', '#f59e0b', '#facc15'],
    },
  },
}

export const FillImage: Story = {
  args: {
    data: URL,
    fillImage: 'https://images.unsplash.com/photo-1594905666013-8f11171b8d6d',
  },
}

export const renderMultiple = (component: (props: Props) => any) => {
  const images = [
    'https://images.unsplash.com/photo-1698824241422-57942267c0cf',
    'https://images.unsplash.com/photo-1700125675544-98bd16b9c627',
  ]
  const gradients = [
    ['#0ea5e9', '#22d3ee'],
    ['#f97316', '#f59e0b', '#facc15'],
  ]
  return [
    ...images.map(image => component({ data: URL, fillImage: image })),
    ...gradients.map(gradients => component({ data: URL, gradient: { type: 'linear', colors: gradients } })),
    ...gradients.map(gradients => component({ data: URL, gradient: { type: 'radial', colors: gradients } })),
  ]
}
