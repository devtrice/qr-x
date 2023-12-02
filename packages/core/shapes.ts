import { roundedRect } from './utils'

type GetPath = (x: number, y: number) => string

export const dotShapes = {
  circle: ((x, y) => {
    const r = 0.45
    return `M ${x + r * 2}, ${y + r} 
            a ${r},${r} 45 1,0 -${r * 2},0,
            a ${r},${r} 45 1,0 ${r * 2},0`
    // rotation 45deg is to smooth the edges of the circle (bug in chromium)
  }) satisfies GetPath,
  square: ((x, y) => `M ${x} ${y} h 1 v 1 h -1 v -1`) satisfies GetPath,
  diamond: ((x, y) => `M ${x + 0.5} ${y} l 0.5 0.5 l -0.5 0.5 l -0.5 -0.5 Z`) satisfies GetPath,
  triangle: ((x, y) => `M ${x} ${y + 1} l 0.5 -1 l 0.5 1 Z`) satisfies GetPath,
  heart: ((x, y) => {
    /*
        c {bezier point 1}
          {bezier point 2}
          {end point}
        */
    return `M ${x + 0.5} ${y + 0.5} 
            c -0.1, -0.5
               0.6, -0.5
               0.5, 0 
            l -0.5, 0.5
            l -0.5, -0.5
            c -0.1 -0.6
               0.7, -0.4
               0.5, 0 
               Z`
  }) satisfies GetPath,
  leaf: ((x, y) => `M${x},${y}h0.34a0.51,0.51,0,0,1,0.51,0.51v0.34h-0.34a0.51,0.51,0,0,1,-0.51,-0.51v-0.34z`) satisfies GetPath,
  // leaf: ((x, y) => `M${x},${y}h0.4a0.6,0.6,0,0,1,0.6,0.6v0.4h-0.4a0.6,0.6,0,0,1,-0.6,-0.6v-0.4z`) satisfies GetPath,
}

export const eyeBallShapes = {
  square: ((x, y) => `M ${x} ${y} h 3 v 3 h -3 Z`) satisfies GetPath,
  circle: ((x, y) => `
          M ${x + 1.5} ${y} 
          c 2, 0,
            2, 3,
            0, 3,
          c -2, 0,
            -2, -3,
            0, -3, Z`) satisfies GetPath,
  leaf: ((x, y) =>
    `M${x},${y + 1} c0,-0.552,0.448,-1,1,-1h1c0.552,0,1,0.448,1,1v2h-2c-0.552,0,-1,-0.448,-1,-1v-1z`) satisfies GetPath,
  rounded: ((x, y) => `M${x + 2},${y}h-1a1,1,0,0,0,-1,1v1a1,1,0,0,0,1,1h1a1,1,0,0,0,1,-1v-1a1,1,0,0,0,-1,-1z`) satisfies GetPath,
}

export const eyeFrameShapes = {
  square: ((x, y) => `M ${x} ${y} h 7 v 7 h -7 Z m 1,1 v 5 h 5 v -5 Z`) satisfies GetPath,
  circle: ((x, y) =>
    `M${x},${y + 3.5}a3.5,3.5,0,0,1,7,0a3.5,3.5,0,1,1,-7,0zm3.5,-2.5a2.5,2.5,0,1,0,0,5a2.5,2.5,0,0,0,0,-5z`) satisfies GetPath,
  leaf: ((x, y) =>
    `M${x},${
      y + 2
    }c0,-1.105,0.895,-2,2,-2h3c1.105,0,2,0.895,2,2v5h-5c-1.105,0,-2,-0.895,-2,-2v-3zm2.2,-1c-0.663,0,-1.2,0.537,-1.2,1.2v2.6c0,0.663,0.537,1.2,1.2,1.2h3.8v-3.8c0,-0.663,-0.537,-1.2,-1.2,-1.2h-2.6z`) satisfies GetPath,
  rounded: ((x, y) =>
    `m${x},${
      y + 2
    }a2,2,0,0,1,2,-2h3a2,2,0,0,1,2,2v3a2,2,0,0,1,-2,2h-3a2,2,0,0,1,-2,-2v-3zm2,-1a1,1,0,0,0,-1,1v3a1,1,0,0,0,1,1h3a1,1,0,0,0,1,-1v-3a1,1,0,0,0,-1,-1h-3z`) satisfies GetPath,
}
