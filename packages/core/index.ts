import QR from 'qr.js'
import { SVGProps } from 'react'

type Shapes = keyof typeof shapes

type Options = {
  data: string
  level?: 'L' | 'M' | 'Q' | 'H'
}

type QRInstance = {
  modules: boolean[][]
}

type Matrix = {
  isON: boolean
}

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
  rhombus: {
    tag: 'path',
    props: (x, y) => ({ d: `M ${x + 1} ${y} l 1 1 l -1 1 l -1 -1 Z` }),
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

export default function getMatrix({ data, ...options }: Options): Matrix[][] {
  const { modules: matrix } = QR(data, options) as QRInstance
  return matrix.map((row, i) =>
    row.map((isON, j) => {
      return { isON }
    }),
  )
}

export type { Shapes, Options }
