import QR from 'qr.js'
import { bodyShapes, eyeballShapes, eyeframeShapes } from './src/shapes'
import svgpath from 'svgpath'

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
  fillVideo?: string
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
  const ids = { video: `video-${id}`, image: `image-${id}`, gradient: `gradient-${id}` }
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
    ids,
    path:
      bodyPath +
      `
    ${eyeballShapes[$shapes.eyeball]} 
    ${eyeframeShapes[$shapes.eyeframe]}

    
    ${svgpath(eyeballShapes[$shapes.eyeball]).matrix([1, 0, 0, -1, 0, modules.length]).toString()}
    ${svgpath(eyeframeShapes[$shapes.eyeframe]).matrix([1, 0, 0, -1, 0, modules.length]).toString()}

    ${svgpath(eyeballShapes[$shapes.eyeball]).matrix([-1, 0, 0, 1, modules.length, 0]).toString()}
    ${svgpath(eyeframeShapes[$shapes.eyeframe]).matrix([-1, 0, 0, 1, modules.length, 0]).toString()} 
   
  `,
    length: modules.length,
    gradient: gradient ? parseGradient({ id: ids.gradient, ...gradient }) : undefined,
  }
}
