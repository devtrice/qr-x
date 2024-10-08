type GetNeighbor = (xOffset:number, yOffset:number) => boolean
type GetPath = (x: number, y: number, getNeighbor?: GetNeighbor) => string
type Corner = "topLeft" | "topRight" | "bottomRight" | "bottomLeft"
type Corners = Record<Corner,string>
type Side = "top" | "right" | "bottom" | "left"
type Sides = Record<Side,string>

export const bodyShapes = {
  circle,
  square,
  rounded,
  diamond: ((x, y) => `M ${x + 0.5} ${y} l 0.5 0.5 l -0.5 0.5 l -0.5 -0.5 Z`) satisfies GetPath,
  triangle: ((x, y) => `M ${x} ${y + 1} l 0.5 -1 l 0.5 1 Z`) satisfies GetPath,
  heart: ((x, y) => `M ${x + 0.5} ${y + 0.5} 
  c -0.1, -0.5
     0.6, -0.5
     0.5, 0 
  l -0.5, 0.5
  l -0.5, -0.5
  c -0.1 -0.6
     0.7, -0.4
     0.5, 0 
     Z`) satisfies GetPath,
  leaf: ((x, y) => `M${x},${y}h0.34a0.51,0.51,0,0,1,0.51,0.51v0.34h-0.34a0.51,0.51,0,0,1,-0.51,-0.51v-0.34z`) satisfies GetPath,
}

export const eyeballShapes = {
  leaf: `M ${2},${2 + 1} c0,-0.552,0.448,-1,1,-1h1c0.552,0,1,0.448,1,1v2h-2c-0.552,0,-1,-0.448,-1,-1v-1z`,
  square: `M ${2} ${2} h 3 v 3 h -3 Z`,
  circle: `M ${2 + 1.5} ${2} c2,0, 2,3, 0,3 c-2,0,-2,-3,0,-3 Z`,
  rounded: `M ${2 + 2},${2}h-1a1,1,0,0,0,-1,1v1a1,1,0,0,0,1,1h1a1,1,0,0,0,1,-1v-1a1,1,0,0,0,-1,-1z`,
}

export const eyeframeShapes = {
  leaf: `M ${0},${
    0 + 2
  }c0,-1.105,0.895,-2,2,-2h3c1.105,0,2,0.895,2,2v5h-5c-1.105,0,-2,-0.895,-2,-2v-3zm2.2,-1c-0.663,0,-1.2,0.537,-1.2,1.2v2.6c0,0.663,0.537,1.2,1.2,1.2h3.8v-3.8c0,-0.663,-0.537,-1.2,-1.2,-1.2h-2.6z`,
  square: `M ${0} ${0} h 7 v 7 h -7 Z m 1,1 v 5 h 5 v -5 Z`,
  circle: `M ${0},${0 + 3.5}a3.5,3.5,0,0,1,7,0a3.5,3.5,0,1,1,-7,0zm3.5,-2.5a2.5,2.5,0,1,0,0,5a2.5,2.5,0,0,0,0,-5z`,
  rounded: `M ${0},${
    0 + 2
  }a2,2,0,0,1,2,-2h3a2,2,0,0,1,2,2v3a2,2,0,0,1,-2,2h-3a2,2,0,0,1,-2,-2v-3zm2,-1a1,1,0,0,0,-1,1v3a1,1,0,0,0,1,1h3a1,1,0,0,0,1,-1v-3a1,1,0,0,0,-1,-1h-3z`,
}

function rounded(x:number, y:number, getNeighbor?:GetNeighbor) {
  const leftNeighbor = getNeighbor ? +getNeighbor(-1, 0) : 0;
  const rightNeighbor = getNeighbor ? +getNeighbor(1, 0) : 0;
  const topNeighbor = getNeighbor ? +getNeighbor(0, -1) : 0;
  const bottomNeighbor = getNeighbor ? +getNeighbor(0, 1) : 0;

  const neighborsCount = leftNeighbor + rightNeighbor + topNeighbor + bottomNeighbor;

  if (neighborsCount === 0) {
      return circle(x, y);
  }

  if (neighborsCount > 2 || (leftNeighbor && rightNeighbor) || (topNeighbor && bottomNeighbor)) {
      return square(x, y);
  }

  if (neighborsCount === 2) {
      let corner:Corner = "topRight";

      if (leftNeighbor && topNeighbor) {
          corner = "bottomRight";
      } else if (topNeighbor && rightNeighbor) {
          corner = "bottomLeft";
      } else if (rightNeighbor && bottomNeighbor) {
          corner = "topLeft";
      }

      return basicCornerRounded(x, y, corner);
  }

  if (neighborsCount === 1) {
      let side:Side = "right";

      if (topNeighbor) {
          side = "bottom";
      } else if (rightNeighbor) {
          side = "left";
      } else if (bottomNeighbor) {
          side = "top";
      }

      return basicSideRounded(x, y, side);
  }
  return ``
}

function circle(x:number, y:number){
  const r = 0.45
  return `M ${x + r * 2}, ${y + r} 
          a ${r},${r} 45 1,0 -${r * 2},0,
          a ${r},${r} 45 1,0 ${r * 2},0`
}

function square(x:number, y:number){
  return `M ${x} ${y} h 1 v 1 h -1 v -1`
}

function basicCornerRounded(x:number, y:number, corner:Corner) {
  const corners:Corners = {
      topLeft: `M ${x + 1} ${y} h -0.5 a 0.5 0.5 0 0 0 -0.5 0.5 v 0.5 h 1 v -1 h -0.5`,
      topRight: `M ${x} ${y} h 0 v 1 h 1 v -0.5 a 0.5 0.5 0 0 0, -0.5 -0.5 h -0.5`,
      bottomRight: `M ${x} ${y} h 1 v 0.5 a 0.5 0.5, 0, 0 1, -0.5 0.5 h -0.5`,
      bottomLeft: `M ${x} ${y} h 1 v 1 h -0.5 a 0.5 0.5 0 0 1 -0.5 -0.5`
  }
  return corners[corner]
}

function basicSideRounded(x:number, y:number, side:Side) {
  const sides:Sides = {
      left: `M ${x + 0.5} ${y} h 0.5 v 1 h -0.5 a 0.5 0.5 0 0 1 0 -1`,
      right: `M ${x} ${y}v 1h 0.5a 0.5 0.5, 0, 0, 0, 0 -1`,
      top: `M ${x} ${y + 0.5} v 0.5 h 1 v -0.5 a 0.5 0.5 0 0 0 -1 0`,
      bottom: `M ${x} ${y} h 1 v 0.5 a 0.5 0.5 0 0 1 -1 0`
  }
  return sides[side]
}