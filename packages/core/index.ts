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
  const matrix = modules.map((row, i) =>
    row.map((isON, j) => {
      return {
        isON,
        isEyeArea: (i < 7 && j < 7) || (i > row.length - 8 && j < 7) || (i < 7 && j > row.length - 8),
        isTopLeftEyeFrame: i === 0 && j === 0,
        isTopLeftEyeBall: i === 2 && j === 2,
        isBottomLeftEyeFrame: i === 0 && j === row.length - 7,
        isBottomLeftEyeBall: i === 2 && j === row.length - 5,
        isTopRightEyeFrame: i === row.length - 7 && j === 0,
        isTopRightEyeBall: i === row.length - 5 && j === 2,
      }
    }),
  )
  const dot = dotShapes[shape]
  const eyeball = eyeBallShapes[eyeBall]
  const eyeframe = eyeFrameShapes[eyeFrame]

  const path = matrix
    .map((row, i) =>
      row
        .map(
          (
            {
              isON,
              isEyeArea,
              isTopLeftEyeFrame,
              isTopRightEyeFrame,
              isBottomLeftEyeFrame,
              isTopLeftEyeBall,
              isTopRightEyeBall,
              isBottomLeftEyeBall,
            },
            j,
          ) => {
            switch (true) {
              case isTopLeftEyeFrame:
              case isTopRightEyeFrame:
              case isBottomLeftEyeFrame:
                return eyeframe(i, j)
              case isTopLeftEyeBall:
              case isTopRightEyeBall:
              case isBottomLeftEyeBall:
                return eyeball(i, j)
              case isEyeArea:
                return ''
              case isON:
                return dot(i, j)
              default:
                return ''
            }
          },
        )
        .join(''),
    )
    .join('')
    .replace(/([\n]|[ ]{2})/g, '')

  return { path, length: matrix.length }
}
