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
    // logo: {
    //   control: 'object',
    //   src: {
    //     control: 'text',
    //   },
    // },
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

// export const LogoCenter: Story = {
//   args: {
//     data: URL,
//     color: '#34acd8',
//     logo: {
//       src: 'https://static.xx.fbcdn.net/rsrc.php/yT/r/aGT3gskzWBf.ico',
//     },
//   },
// }

export const LinearGradient: Story = {
  args: {
    data: URL,
    gradient: {
      type: 'linear',
      colors: ['#f97316', '#f59e0b', '#facc15', '#f9ff23', '#dfdc80', '#ff0000'],
    },
    shapes: {
      body: 'circle',
      eyeball: 'leaf',
      eyeframe: 'leaf',
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
    fillImage:
      'https://images.unsplash.com/photo-1682687218608-5e2522b04673?q=80&w=2875&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
}

export const FillVideo: Story = {
  args: {
    data: URL,
    fillVideo: 'https://videos.pexels.com/video-files/4620563/4620563-uhd_1440_2732_25fps.mp4',
  },
}

export const Logo: Story = {
  args: {
    data: URL,
    logo: { src: 'https://static.zpao.com/favicon.png', width: 40, height: 40 },
  },
}

export const renderMultiple = (component: (props: Props) => any) => {
  const images = [
    'https://images.unsplash.com/photo-1437413646517-e98caade5a58?q=80&w=480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1704138162406-bc43d5b9ff97?q=80&w=480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  ]
  const gradients = [
    ['#0ea5e9', '#22d3ee', '#38f9d7', '#4cfcb3', '#5ffea1'],
    ['#f97316', '#f59e0b', '#facc15', '#f9d423', '#ffdc80'],
  ]
  return [
    ...images.map(image => component({ data: URL, fillImage: image })),
    ...gradients.map(gradients => component({ data: URL, gradient: { type: 'linear', colors: gradients } })),
    ...gradients.map(gradients => component({ data: URL, gradient: { type: 'radial', colors: gradients } })),
  ]
}
