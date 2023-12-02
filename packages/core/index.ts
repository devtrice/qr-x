import QR from 'qr.js'
import { dotShapes, eyeBallShapes, eyeFrameShapes } from './shapes'

export type Options = {
  data: string
  level?: 'L' | 'M' | 'Q' | 'H'
  shape?: keyof typeof dotShapes
  smooth?: boolean
  eyeBall?: keyof typeof eyeBallShapes
  eyeFrame?: keyof typeof eyeFrameShapes
}

export function getSVGData({ data, shape = 'square', eyeBall = 'square', eyeFrame = 'square', ...options }: Options) {
  const { modules } = QR(data, options) as { modules: boolean[][] }

  const dot = dotShapes[shape]
  const eyeball = eyeBallShapes[eyeBall]
  const eyeframe = eyeFrameShapes[eyeFrame]

  const path = modules
    .map((row, i) =>
      row
        .map((isON, j) => {
          const isEyeArea = (i < 7 && j < 7) || (i > row.length - 8 && j < 7) || (i < 7 && j > row.length - 8)
          // const isTopLeftEyeFrame = i === 0 && j === 0
          // const isTopLeftEyeBall = i === 2 && j === 2
          // const isBottomLeftEyeFrame = i === 0 && j === row.length - 7
          // const isBottomLeftEyeBall = i === 2 && j === row.length - 5
          // const isTopRightEyeFrame = i === row.length - 7 && j === 0
          // const isTopRightEyeBall = i === row.length - 5 && j === 2

          switch (true) {
            // case isTopLeftEyeFrame:
            // case isTopRightEyeFrame:
            // case isBottomLeftEyeFrame:
            // return eyeframe(i, j)
            // case isTopLeftEyeBall:
            // case isTopRightEyeBall:
            // case isBottomLeftEyeBall:
            // return eyeball(i, j)
            case isEyeArea:
              return ''
            case isON:
              return dot(i, j)
            default:
              return ''
          }
        })
        .join(''),
    )
    .join('')
    .replace(/([\n]|[ ]{2})/g, '')

  return {
    path,
    getEyeBallPath: eyeball,
    getEyeFramePath: eyeframe,
    length: modules.length,
    id: Math.random().toString(36).substring(2, 9),
  }
}
