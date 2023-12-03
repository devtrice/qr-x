import QR from 'qr.js'
import { bodyShapes, eyeballShapes, eyeframeShapes } from './shapes'

type Shapes = {
  body: keyof typeof bodyShapes
  eyeball?: keyof typeof eyeballShapes
  eyeframe?: keyof typeof eyeframeShapes
}

type Gradient = ({ type?: 'linear'; rotate?: number } | { type: 'radial'; rotate: never }) & {
  colors: string[]
}

export type Options = {
  data: string
  image?: {
    src: string
    size: number
  }
  level?: 'L' | 'M' | 'Q' | 'H'
  shapes?: Shapes
  gradient?: Gradient
  fillImage?: string
}

function parseGradient({ type = 'linear', colors, ...rest }: Gradient) {
  const isLinearGradient = type === 'linear'
  return {
    colors: colors.map((color, index, colors) => ({
      color,
      offset: `${(index / colors.length + 1 / colors.length) * 100}%`,
    })),
    attributes: {
      id: 'gradient',
      gradientTransform: isLinearGradient ? `rotate(${rest.rotate || 45})` : undefined,
    },
    isLinearGradient,
  }
}

export function getSVGData({ data, shapes, image, gradient, fillImage, ...options }: Options) {
  const id = Math.random().toString(36).substring(2, 9)
  const $shapes = { body: 'square', eyeball: 'square', eyeframe: 'square', ...shapes } as const
  const { modules } = QR(data, options) as { modules: boolean[][] }

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

  return {
    ids: { eyeball: `#eyeball-${id}`, eyeframe: `#eyeframe-${id}` },
    paths: {
      body: bodyPath,
      eyeball: eyeballShapes[$shapes.eyeball],
      eyeframe: eyeframeShapes[$shapes.eyeframe],
    },
    fills: {
      rect: "url('#gradient')",
      path: fillImage ? 'url(#fill-image)' : gradient ? 'white' : 'currentColor', // Note! don't change white to any color.
    },
    length: modules.length,
    markers: [
      { x: 0, y: 0 },
      { x: -modules.length, y: 0, transform: 'scale(-1 1)' },
      { x: 0, y: -modules.length, transform: 'scale(1 -1)' },
    ],
    eyeItems: ['eyeball', 'eyeframe'] as const,
    gradient: gradient ? parseGradient(gradient) : undefined,
  }
}
