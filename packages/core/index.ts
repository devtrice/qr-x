import QR from 'qr.js'

type Paths = keyof typeof paths

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

export const paths = {
  rect: { tag: 'rect', props: (x: number, y: number) => ({ x, y }) },
  circle: { tag: 'rect', props: (x: number, y: number) => ({ x, y, rx: 0.5, ry: 0.5 }) },
  polygon: { tag: 'polygon', props: (x: number, y: number) => ({ x, y }) },
  path: { tag: 'path', props: (x: number, y: number) => ({ d: `M ${x} ${y} h 1 v 1 h -1 v -1` }) },
}

export default function getMatrix({ data, ...options }: Options): Matrix[][] {
  const { modules: matrix } = QR(data, options) as QRInstance
  return matrix.map((row, i) =>
    row.map((isON, j) => {
      return { isON }
    }),
  )
}

export type { Paths, Options }
