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

export const shapes = {
  circle: {
    tag: 'path',
    props: (x: number, y: number): SVGProps<SVGSVGElement> => {
      const r = 0.5
      return {
        d: `M ${x + r * 2}, ${y + r} 
          a ${r},${r} 45 1,0 -${r * 2},0,
          a ${r},${r} 45 1,0 ${r * 2},0`,
        // rotation 45deg is to smooth the edges of the circle (bug in chromium)
      }
    },
  },
  rect: { tag: 'path', props: (x: number, y: number) => ({ d: `M ${x} ${y} h 1 v 1 h -1 v -1`, shapeRendering: 'crispEdges' }) },
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
