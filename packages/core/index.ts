import QR from 'qr.js'
import { bodyShapes, eyeballShapes, eyeframeShapes } from './src/shapes'

type Shapes = {
  body: keyof typeof bodyShapes
  eyeball?: keyof typeof eyeballShapes
  eyeframe?: keyof typeof eyeframeShapes
}

type Gradient = ({ type?: 'linear'; rotate?: number } | { type: 'radial'; rotate?: never }) & {
  colors: string[]
}

export type Options = {
  data: string
  level?: 'L' | 'M' | 'Q' | 'H'
  shapes?: Shapes
  gradient?: Gradient
  fillImage?: string
}

function parseGradient({ id, type = 'linear', colors, ...rest }: Gradient & { id: string }) {
  const isLinearGradient = type === 'linear'
  return {
    colors: colors.map((color, index, colors) => ({
      color,
      offset: `${(index / colors.length + 1 / colors.length) * 100}%`,
    })),
    attributes: {
      id,
      gradientTransform: isLinearGradient ? `rotate(${rest.rotate || 45})` : undefined,
    },
    isLinearGradient,
  }
}

export function getSVGData({ data, shapes, gradient, fillImage, ...options }: Options) {
  const id = Math.random().toString(36).substring(2, 9)
  const $shapes = { body: 'square', eyeball: 'square', eyeframe: 'square', ...shapes } as const
  const { modules } = QR(data, options) as { modules: boolean[][] }

  const ids = { image: `image-${id}`, eyeball: `eyeball-${id}`, eyeframe: `eyeframe-${id}`, gradient: `gradient-${id}` }

  const bodyPath = modules
    .map((row, i) =>
      row
        .map((isON, j) => {
          const isEyeArea = (i < 7 && j < 7) || (i > row.length - 8 && j < 7) || (i < 7 && j > row.length - 8)

          switch (true) {
            case isEyeArea:
              return ''
            case isON:
              return bodyShapes[$shapes.body](i, j)
            default:
              return ''
          }
        })
        .join(''),
    )
    .join('')
    .replace(/([\n]|[ ]{2})/g, '')

  const isMasked = gradient || fillImage

  return {
    ids,
    paths: {
      body: bodyPath,
      eyeball: eyeballShapes[$shapes.eyeball],
      eyeframe: eyeframeShapes[$shapes.eyeframe],
    },
    fills: {
      rect: `url('#${gradient ? ids.gradient : ids.image}')`, // Note the only check gradient. Don't swap the condition with fillImage exist.
      path: isMasked ? 'white' : 'currentColor', // Note! don't change white to any color.
    },
    length: modules.length,
    markers: [
      { x: 0, y: 0 },
      { x: -modules.length, y: 0, transform: 'scale(-1 1)' },
      { x: 0, y: -modules.length, transform: 'scale(1 -1)' },
    ],
    isMasked,
    eyeItems: ['eyeball', 'eyeframe'] as const,
    gradient: gradient ? parseGradient({ id: ids.gradient, ...gradient }) : undefined,
  }
}
