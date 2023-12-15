"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var vanilla_exports = {};
__export(vanilla_exports, {
  default: () => createQRX
});
module.exports = __toCommonJS(vanilla_exports);
var import_core = require("@qr-x/core");
function createQRX({ data, level, shapes, image, gradient: $gradient, fillImage, ...rest }) {
  const { ids, fills, paths, length, markers, gradient, eyeItems, isMasked } = (0, import_core.getSVGData)({
    data,
    level,
    image,
    shapes,
    gradient: $gradient,
    fillImage
  });
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  return svg;
}
