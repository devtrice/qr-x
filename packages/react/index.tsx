import React, { createElement } from 'react'
import getMatrix, { shapes, Shapes, Options, eyeBalls, eyeFrames } from '@qr-x/core'

type Props = Options & { shape?: Shapes; multiplePahts?: boolean }

export default function QRX({ shape = 'square', multiplePahts, ...options }: Props) {
  const matrix = getMatrix(options)
  const { tag, props } = shapes[shape]
  return (
    <svg xmlns='http://www.w3.org/2000/svg' viewBox={`0 0 ${matrix.length} ${matrix.length}`} width='100%' height='100%'>
      {/* Safari won't render SVGs without width and height */}
      {multiplePahts ? (
        matrix.map((row, i) => row.map(({ isON }, j) => createElement(tag, { ...props(i, j), fill: isON ? '#000' : '#fff' })))
      ) : (
        <path
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
                    const { d } = props(i, j)
                    const { d: eyeframe } = eyeFrames.square.props(i, j)
                    const { d: eyeball } = eyeBalls.square.props(i, j)

                    switch (true) {
                      case isTopLeftEyeFrame:
                      case isTopRightEyeFrame:
                      case isBottomLeftEyeFrame:
                        return eyeframe
                      case isTopLeftEyeBall:
                      case isTopRightEyeBall:
                      case isBottomLeftEyeBall:
                        return eyeball
                      case isEyeArea:
                        return ''
                      case isON:
                        return d
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
      )}
    </svg>
  )
}
