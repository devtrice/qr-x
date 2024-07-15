import QR from 'qr.js'
import { bodyShapes, eyeballShapes, eyeframeShapes } from './src/shapes'
import svgpath from 'svgpath'

type Shapes = {
  body: keyof typeof bodyShapes
  eyeball?: keyof typeof eyeballShapes
  eyeframe?: keyof typeof eyeframeShapes
}

type Gradient = ({ type?: 'linear'; rotate?: number } | { type: 'radial'; rotate?: never }) & {
  colors: string[] | { value: string; stop: number }[]
}

export type Options = {
  data: string
  level?: 'L' | 'M' | 'Q' | 'H'
  shapes?: Shapes
  gradient?: Gradient
  fillImage?: string
  excavate?: {
    width: number
    height: number
  }
  size?: number
}

function parseGradient({ id, type = 'linear', colors, ...rest }: Gradient & { id: string }) {
  const isLinearGradient = type === 'linear'
  return {
    colors: colors.map((color, index, colors) => {
      const { value, stop } =
        typeof color === 'string' ? { value: color, stop: (index / colors.length + 1 / colors.length) * 100 } : color
      return {
        color: value,
        offset: `${stop}%`,
      }
    }),
    attributes: {
      id,
      gradientTransform: isLinearGradient ? `rotate(${rest.rotate || 45})` : undefined,
    },
    isLinearGradient,
  }
}

/**
 * @param {boolean[][]} modules - cells to render
 * @param {number} size  - size of QR
 * @param {object} excavate - width and height of image
 */
function excavateModules(modules: boolean[][], size: number, excavate: { width: number; height: number }) {
  const { length } = modules

  const { width, height } = excavate // brand area

  const scale = length / size

  const h = width * scale
  const w = height * scale
  const x = length / 2 - w / 2
  const y = length / 2 - h / 2

  const isXUnderThreshold = x % 1 < 0.5
  const isYUnderThreshold = y % 1 < 0.5

  let floorX = isXUnderThreshold ? Math.floor(x - 1) : Math.floor(x)
  let floorY = isYUnderThreshold ? Math.floor(x - 1) : Math.floor(y)
  let ceilW = Math.ceil(w + x - (isXUnderThreshold ? floorX - 1 : floorX))
  let ceilH = Math.ceil(h + y - (isYUnderThreshold ? floorY - 1 : floorY))

  const excavation = {
    x: floorX,
    y: floorY,
    w: ceilW,
    h: ceilH,
  }

  return modules.slice().map((row, _y) => {
    if (_y < excavation.y || _y >= excavation.y + excavation.h) {
      return row
    }
    return row.map((cell, _x) => {
      if (_x < excavation.x || _x >= excavation.x + excavation.w) {
        return cell
      }
      return false
    })
  })
}

export function getSVGData({ data, shapes, gradient, excavate, size, ...options }: Omit<Options, 'fillImage' | 'fillVideo'>) {
  const id = `id-${Math.random().toString(36).substring(2, 9)}`
  const $shapes = { body: 'square', eyeball: 'square', eyeframe: 'square', ...shapes } as const
  let { modules } = QR(data, options) as { modules: boolean[][] }
  const length = modules.length

  if (excavate && size) {
    console.log('len', length, size, excavate.width)
    modules = excavateModules(modules, size, excavate)
  }
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
    id,
    path:
      bodyPath +
      `
    ${eyeballShapes[$shapes.eyeball]} 
    ${eyeframeShapes[$shapes.eyeframe]}

    ${svgpath(eyeballShapes[$shapes.eyeball]).matrix([1, 0, 0, -1, 0, length]).toString()}
    ${svgpath(eyeframeShapes[$shapes.eyeframe]).matrix([1, 0, 0, -1, 0, length]).toString()}

    ${svgpath(eyeballShapes[$shapes.eyeball]).matrix([-1, 0, 0, 1, length, 0]).toString()}
    ${svgpath(eyeframeShapes[$shapes.eyeframe]).matrix([-1, 0, 0, 1, length, 0]).toString()} 
     `,
    cords: { x: 0, y: 0, width: '100%', height: '100%' },
    length: length,
    $gradient: gradient ? parseGradient({ id: `gradient-${id}`, ...gradient }) : undefined,
  }
}
