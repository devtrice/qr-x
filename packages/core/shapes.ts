type GetPath = (x: number, y: number) => string

export const dotShapes = {
  circle: ((x, y) => {
    const r = 0.5
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
}

export const eyeFrameShapes = {
  square: ((x, y) => `M ${x} ${y} h 7 v 7 h -7 v -7 h 1 v 6 h 5 v -5 h -5`) satisfies GetPath,
  circle: ((x, y) => `M ${x + 0.5} ${y + 0.5} a 3.5,3.5 45 1,0 -7,0 a 3.5,3.5 45 1,0 7,0`) satisfies GetPath,
}