"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// index.ts
var core_exports = {};
__export(core_exports, {
  getSVGData: () => getSVGData
});
module.exports = __toCommonJS(core_exports);
var import_qr = __toESM(require("qr.js"));

// src/shapes.ts
var bodyShapes = {
  circle: (x, y) => {
    const r = 0.45;
    return `M ${x + r * 2}, ${y + r} 
            a ${r},${r} 45 1,0 -${r * 2},0,
            a ${r},${r} 45 1,0 ${r * 2},0`;
  },
  square: (x, y) => `M ${x} ${y} h 1 v 1 h -1 v -1`,
  diamond: (x, y) => `M ${x + 0.5} ${y} l 0.5 0.5 l -0.5 0.5 l -0.5 -0.5 Z`,
  triangle: (x, y) => `M ${x} ${y + 1} l 0.5 -1 l 0.5 1 Z`,
  heart: (x, y) => `M ${x + 0.5} ${y + 0.5} 
  c -0.1, -0.5
     0.6, -0.5
     0.5, 0 
  l -0.5, 0.5
  l -0.5, -0.5
  c -0.1 -0.6
     0.7, -0.4
     0.5, 0 
     Z`,
  leaf: (x, y) => `M${x},${y}h0.34a0.51,0.51,0,0,1,0.51,0.51v0.34h-0.34a0.51,0.51,0,0,1,-0.51,-0.51v-0.34z`
};
var eyeballShapes = {
  leaf: `M ${2},${2 + 1} c0,-0.552,0.448,-1,1,-1h1c0.552,0,1,0.448,1,1v2h-2c-0.552,0,-1,-0.448,-1,-1v-1z`,
  square: `M ${2} ${2} h 3 v 3 h -3 Z`,
  circle: `M ${2 + 1.5} ${2} c 2,0,2,3,0,3, c -2,0,-2, -3,0, -3, Z`,
  rounded: `M ${2 + 2},${2}h-1a1,1,0,0,0,-1,1v1a1,1,0,0,0,1,1h1a1,1,0,0,0,1,-1v-1a1,1,0,0,0,-1,-1z`
};
var eyeframeShapes = {
  leaf: `M ${0},${0 + 2}c0,-1.105,0.895,-2,2,-2h3c1.105,0,2,0.895,2,2v5h-5c-1.105,0,-2,-0.895,-2,-2v-3zm2.2,-1c-0.663,0,-1.2,0.537,-1.2,1.2v2.6c0,0.663,0.537,1.2,1.2,1.2h3.8v-3.8c0,-0.663,-0.537,-1.2,-1.2,-1.2h-2.6z`,
  square: `M ${0} ${0} h 7 v 7 h -7 Z m 1,1 v 5 h 5 v -5 Z`,
  circle: `M ${0},${0 + 3.5}a3.5,3.5,0,0,1,7,0a3.5,3.5,0,1,1,-7,0zm3.5,-2.5a2.5,2.5,0,1,0,0,5a2.5,2.5,0,0,0,0,-5z`,
  rounded: `M ${0},${0 + 2}a2,2,0,0,1,2,-2h3a2,2,0,0,1,2,2v3a2,2,0,0,1,-2,2h-3a2,2,0,0,1,-2,-2v-3zm2,-1a1,1,0,0,0,-1,1v3a1,1,0,0,0,1,1h3a1,1,0,0,0,1,-1v-3a1,1,0,0,0,-1,-1h-3z`
};

// index.ts
function parseGradient({ id, type = "linear", colors, ...rest }) {
  const isLinearGradient = type === "linear";
  return {
    colors: colors.map((color, index, colors2) => ({
      color,
      offset: `${(index / colors2.length + 1 / colors2.length) * 100}%`
    })),
    attributes: {
      id,
      gradientTransform: isLinearGradient ? `rotate(${rest.rotate || 45})` : void 0
    },
    isLinearGradient
  };
}
function getSVGData({ data, shapes, image, gradient, fillImage, ...options }) {
  const id = Math.random().toString(36).substring(2, 9);
  const $shapes = { body: "square", eyeball: "square", eyeframe: "square", ...shapes };
  const { modules } = (0, import_qr.default)(data, options);
  const ids = { image: `image-${id}`, eyeball: `eyeball-${id}`, eyeframe: `eyeframe-${id}`, gradient: `gradient-${id}` };
  const bodyPath = modules.map(
    (row, i) => row.map((isON, j) => {
      const isEyeArea = i < 7 && j < 7 || i > row.length - 8 && j < 7 || i < 7 && j > row.length - 8;
      switch (true) {
        case isEyeArea:
          return "";
        case isON:
          return bodyShapes[$shapes.body](i, j);
        default:
          return "";
      }
    }).join("")
  ).join("").replace(/([\n]|[ ]{2})/g, "");
  const isMasked = gradient || fillImage;
  return {
    ids,
    paths: {
      body: bodyPath,
      eyeball: eyeballShapes[$shapes.eyeball],
      eyeframe: eyeframeShapes[$shapes.eyeframe]
    },
    fills: {
      rect: `url('#${gradient ? ids.gradient : ids.image}')`,
      // Note the only check gradient. Don't swap the condition with fillImage exist.
      path: isMasked ? "white" : "currentColor"
      // Note! don't change white to any color.
    },
    length: modules.length,
    markers: [
      { x: 0, y: 0 },
      { x: -modules.length, y: 0, transform: "scale(-1 1)" },
      { x: 0, y: -modules.length, transform: "scale(1 -1)" }
    ],
    isMasked,
    eyeItems: ["eyeball", "eyeframe"],
    gradient: gradient ? parseGradient({ id: ids.gradient, ...gradient }) : void 0
  };
}
