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
var react_exports = {};
__export(react_exports, {
  default: () => QRX
});
module.exports = __toCommonJS(react_exports);
var import_core = require("@qr-x/core");
var import_react = __toESM(require("react"));
var import_tags = require("./tags/");
function QRX({ data, level, shapes, image, gradient: $gradient, fillImage, ...rest }) {
  const { ids, fills, paths, length, markers, gradient, eyeItems, isMasked } = (0, import_core.getSVGData)({
    data,
    level,
    image,
    shapes,
    gradient: $gradient,
    fillImage
  });
  const group = /* @__PURE__ */ import_react.default.createElement(import_tags.G, { fill: fills.path }, /* @__PURE__ */ import_react.default.createElement(import_tags.Path, { d: paths.body }), eyeItems.map(
    (item) => markers.map((marker, index) => /* @__PURE__ */ import_react.default.createElement(import_tags.Use, { key: `${item}-${index}`, href: `#${ids[item]}`, xlinkHref: `#${ids[item]}`, ...marker }))
  ));
  return /* @__PURE__ */ import_react.default.createElement(import_tags.Svg, { ...rest, viewBox: `0 0 ${length} ${length}` }, isMasked ? /* @__PURE__ */ import_react.default.createElement(import_tags.G, null, /* @__PURE__ */ import_react.default.createElement(import_tags.Mask, { id: "mask" }, group), /* @__PURE__ */ import_react.default.createElement(import_tags.Rect, { x: "0", y: "0", width: "100%", height: "100%", fill: fills.rect, mask: "url('#mask')" })) : group, /* @__PURE__ */ import_react.default.createElement(import_tags.Defs, null, eyeItems.map((item) => /* @__PURE__ */ import_react.default.createElement(import_tags.Path, { key: item, id: ids[item], d: paths[item] })), gradient ? (
    // Warning: Keep as React.createElement bec React must be imported in the output bundle. Just using import React from 'react' is risky coz the editor will remove unused deps.
    import_react.default.createElement(
      gradient.isLinearGradient ? import_tags.LinearGradient : import_tags.RadialGradient,
      gradient.attributes,
      gradient.colors.map(({ color, offset }) => /* @__PURE__ */ import_react.default.createElement(import_tags.Stop, { key: offset, offset, stopColor: color }))
    )
  ) : fillImage && /* @__PURE__ */ import_react.default.createElement(import_tags.Pattern, { id: ids.image, patternUnits: "userSpaceOnUse", width: "100%", height: "100%" }, /* @__PURE__ */ import_react.default.createElement(
    import_tags.Image,
    {
      x: "0",
      y: "0",
      width: "100%",
      height: "100%",
      href: fillImage,
      xlinkHref: fillImage,
      preserveAspectRatio: "xMidYMid slice"
    }
  ))));
}
