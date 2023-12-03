import QR from 'qr.js'
import { dotShapes, eyeBallShapes, eyeFrameShapes } from './shapes'

export type Options = {
  data: string
  image?: {
    src: string
    size: number
  }
  level?: 'L' | 'M' | 'Q' | 'H'
  shape?: keyof typeof dotShapes
  smooth?: boolean
  eyeBall?: keyof typeof eyeBallShapes
  eyeFrame?: keyof typeof eyeFrameShapes
  gradient?: Gradient
}

type Gradient = ({ type?: 'linear'; rotate?: number } | { type: 'radial' }) & {
  colors: string[]
}

export function getSVGData({ data, shape = 'square', eyeBall = 'square', eyeFrame = 'square', gradient, ...options }: Options) {
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
              return dotShapes[shape](i, j)
            default:
              return ''
          }
        })
        .join(''),
    )
    .join('')
    .replace(/([\n]|[ ]{2})/g, '')

  return {
    id: Math.random().toString(36).substring(2, 9),
    paths: {
      body: bodyPath,
      eyeball: eyeBallShapes[eyeBall],
      eyeframe: eyeFrameShapes[eyeFrame],
    },
    length: modules.length,
    gradient: gradient
      ? {
          type: gradient.type || 'linear',
          rotate: gradient.type !== 'radial' ? gradient.rotate || 45 : undefined,
          colors: gradient.colors.map((color, index, colors) => ({
            color,
            offset: `${(index / colors.length + 1 / colors.length) * 100}%`,
          })),
        }
      : undefined,
  }
}
