import React from 'react'
import getMatrix, { shapes, Shapes, Options, eyeBalls, eyeFrames, EyeBalls, EyeFrames } from '@qr-x/core'

type RGB = `rgb(${number}, ${number}, ${number})`
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`
type HEX = `#${string}`

type Color = RGB | RGBA | HEX

type Props = Options & {
  shape?: Shapes
  eyeBall?: EyeBalls
  eyeFrame?: EyeFrames
  foregroundColor?: Color
}

export default function QRX({
  shape = 'square',
  eyeBall = 'square',
  eyeFrame = 'square',
  foregroundColor = '#000',
  ...options
}: Props) {
  const matrix = getMatrix(options)
  const dot = shapes[shape]
  const eyeball = eyeBalls[eyeBall]
  const eyeframe = eyeFrames[eyeFrame]

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox={`0 0 ${matrix.length} ${matrix.length}`}
      width='100%'
      height='100%'
      style={{
        padding: 10,
      }}
    >
      {/* Safari won't render SVGs without width and height */}
      <path
        fill={foregroundColor}
        d={`
          ${matrix
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
            .replace(/([\n]|[ ]{2})/g, '')}
        `}
      />
    </svg>
  )
}
