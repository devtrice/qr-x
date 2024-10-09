import QR from 'qr.js'
import { bodyShapes, eyeballShapes, eyeframeShapes } from './src/shapes'
import svgpath from 'svgpath'

type Shapes = {
  body: keyof typeof bodyShapes
  eyeball?: keyof typeof eyeballShapes
  eyeframe?: keyof typeof eyeframeShapes
}

type Gradient = ({ type?: 'linear'; rotate?: number } | { type: 'radial'; rotate?: never }) & {
  colors: string[] | { value: string; stop: number }[]
}

export type Excavate = {
  width:number
  height:number
}

export type Options = {
  data: string
  level?: 'L' | 'M' | 'Q' | 'H'
  shapes?: Shapes
  gradient?: Gradient
  fillImage?: string
  // fillVideo?: string
  excavate?:Excavate
}

function parseGradient({ id, type = 'linear', colors, ...rest }: Gradient & { id: string }) {
  const isLinearGradient = type === 'linear'
  return {
    colors: colors.map((color, index, colors) => {
      const { value, stop } =
        typeof color === 'string' ? { value: color, stop: (index / colors.length + 1 / colors.length) * 100 } : color
      return {
        color: value,
        offset: `${stop}%`,
      }
    }),
    attributes: {
      id,
      gradientTransform: isLinearGradient ? `rotate(${rest.rotate || 45})` : undefined,
    },
    isLinearGradient,
  }
}

export function getSVGData({ 
  data, shapes, gradient, excavate,size, ...options 
}: (Omit<Options, 'fillImage' | 'fillVideo'>) & { size?:number }) {
  const id = `id-${Math.random().toString(36).substring(2, 9)}`
  const $shapes = { body: 'square', eyeball: 'square', eyeframe: 'square', ...shapes } as const
  const { modules } = QR(data, options) as { modules: boolean[][] }
  const newModules = excavate && size ? excavateModules(modules,size,excavate): modules;
  const bodyPath = newModules
    .map((row, i) =>
      row
        .map((isON, j) => {
          const isEyeArea = (i < 7 && j < 7) || (i > row.length - 8 && j < 7) || (i < 7 && j > row.length - 8)

          switch (true) {
            case isEyeArea:
              return ''
            case isON:{
              const getNeighbor = getNeighborHOF(i, j, modules);
              return bodyShapes[$shapes.body](i,j,getNeighbor);
            }
            default:
              return ''
          }
        })
        .join(''),
    )
    .join('')
    .replace(/([\n]|[ ]{2})/g, '')

  return {
    id,
    path:
      bodyPath +
      `
    ${eyeballShapes[$shapes.eyeball]} 
    ${eyeframeShapes[$shapes.eyeframe]}

    
    ${svgpath(eyeballShapes[$shapes.eyeball]).matrix([1, 0, 0, -1, 0, modules.length]).toString()}
    ${svgpath(eyeframeShapes[$shapes.eyeframe]).matrix([1, 0, 0, -1, 0, modules.length]).toString()}

    ${svgpath(eyeballShapes[$shapes.eyeball]).matrix([-1, 0, 0, 1, modules.length, 0]).toString()}
    ${svgpath(eyeframeShapes[$shapes.eyeframe]).matrix([-1, 0, 0, 1, modules.length, 0]).toString()} 
   
  `,
    cords: { x: 0, y: 0, width: '100%', height: '100%' },
    length: modules.length,
    $gradient: gradient ? parseGradient({ id: `gradient-${id}`, ...gradient }) : undefined,
  }
}

function getNeighborHOF(x:number, y:number, modules:boolean[][]) {
  return function (
      xOffset:number, yOffset:number
  ) {
      const count = modules.length;
      const isOn = (r:number, c:number) => modules[r] && modules[r][c];
      // if outside qr
      if (x + xOffset < 0 || y + yOffset < 0 || x + xOffset >= count || y + yOffset >= count) return false;
  
      return isOn(x+xOffset, y+yOffset);
  }
}

function excavateModules(modules:boolean[][], size:number, excavate:Excavate) {
  const { length } = modules;
  const scale = length / size;

  const { width, height } = excavate; // brand area
  const w = width * scale;
  const h = height * scale;
  const x = length / 2 - w / 2;
  const y = length / 2 - h / 2;

  const floorX = Math.floor(x);
  const floorY = Math.floor(y);
  const ceilW = Math.ceil(w + x - floorX);
  const ceilH = Math.ceil(h + y - floorY);

  const excavation = { x: floorX, y: floorY, w: ceilW, h: ceilH };

  return modules.slice().map((row, _y) => {
    if (_y < excavation.y || _y >= excavation.y + excavation.h) {
        return row;
    }
    return row.map((cell, _x) => {
        if (_x < excavation.x || _x >= excavation.x + excavation.w) {
            return cell;
        }
        return false;
    });
  });
}