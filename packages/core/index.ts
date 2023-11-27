import QR from 'qr.js'
import { SVGProps } from 'react'

export type Shapes = keyof typeof shapes
export type EyeBalls = keyof typeof eyeBalls
export type EyeFrames = keyof typeof eyeFrames

export type Options = {
  data: string
  level?: 'L' | 'M' | 'Q' | 'H'
}

type QRInstance = {
  modules: boolean[][]
}

// type Matrix = ReturnType<typeof getMatrix>
// {
//   isON: boolean
//   isEyeArea?: boolean
//   isTopLeftEyeFrame?: boolean
//   isTopLeftEyeBall?: boolean
//   isTopRightEyeFrame?: boolean
//   isTopRightEyeBall?: boolean
//   isBottomLeftEyeFrame?: boolean
//   isBottomLeftEyeBall?: boolean
// }

type ShapeElement = {
  tag: keyof JSX.IntrinsicElements
  props: (x: number, y: number) => SVGProps<SVGSVGElement>
}

export const shapes = {
  circle: {
    tag: 'path',
    props: (x, y) => {
      const r = 0.5
      return {
        d: `M ${x + r * 2}, ${y + r} 
          a ${r},${r} 45 1,0 -${r * 2},0,
          a ${r},${r} 45 1,0 ${r * 2},0`,
        // rotation 45deg is to smooth the edges of the circle (bug in chromium)
      }
    },
  } satisfies ShapeElement,
  square: {
    tag: 'path',
    props: (x, y) => ({ d: `M ${x} ${y} h 1 v 1 h -1 v -1`, shapeRendering: 'crispEdges' }),
  } satisfies ShapeElement,
  diamond: {
    tag: 'path',
    props: (x, y) => ({ d: `M ${x + 0.5} ${y} l 0.5 0.5 l -0.5 0.5 l -0.5 -0.5 Z` }),
  } satisfies ShapeElement,
  triangle: {
    tag: 'path',
    props: (x, y) => ({ d: `M ${x} ${y + 1} l 0.5 -1 l 0.5 1 Z` }),
  } satisfies ShapeElement,
  heart: {
    tag: 'path',
    props: (x, y) => ({
      /*
      c {bezier point 1}
        {bezier point 2}
        {end point}
      */
      d: `M ${x + 0.5} ${y + 0.5} 
          c -0.1, -0.5
             0.6, -0.5
             0.5, 0 
          l -0.5, 0.5
          l -0.5, -0.5
          c -0.1 -0.6
             0.7, -0.4
             0.5, 0 
             Z`,
    }),
  } satisfies ShapeElement,
}

export const eyeBalls = {
  square: {
    tag: 'path',
    props: (x, y) => ({ d: `M ${x} ${y} h 3 v 3 h -3 Z` }),
  } satisfies ShapeElement,
  circle: {
    tag: 'path',
    props: (x, y) => ({
      d: `
        M ${x + 1.5} ${y} 
        c 2, 0,
          2, 3,
          0, 3,
        c -2, 0,
          -2, -3,
          0, -3, Z`,
    }),
  } satisfies ShapeElement,
}

export const eyeFrames = {
  square: {
    tag: 'path',
    props: (x, y) => ({ d: `M ${x} ${y} h 7 v 7 h -7 v -7 h 1 v 6 h 5 v -5 h -5` }),
  } satisfies ShapeElement,
  circle: {
    tag: 'path',
    props: (x, y) => ({ d: `M ${x + 0.5} ${y + 0.5} a 3.5,3.5 45 1,0 -7,0 a 3.5,3.5 45 1,0 7,0` }),
  } satisfies ShapeElement,
}

export default function getMatrix({ data, ...options }: Options) {
  const { modules: matrix } = QR(data, options) as QRInstance
  return matrix.map((row, i) =>
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
}
