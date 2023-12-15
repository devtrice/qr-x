import { getSVGData } from "@qr-x/core";
import React from "react";
import { Defs, G, Image, LinearGradient, Mask, Path, Pattern, RadialGradient, Rect, Stop, Svg, Use } from "./tags/";
function QRX({ data, level, shapes, image, gradient: $gradient, fillImage, ...rest }) {
  const { ids, fills, paths, length, markers, gradient, eyeItems, isMasked } = getSVGData({
    data,
    level,
    image,
    shapes,
    gradient: $gradient,
    fillImage
  });
  const group = /* @__PURE__ */ React.createElement(G, { fill: fills.path }, /* @__PURE__ */ React.createElement(Path, { d: paths.body }), eyeItems.map(
    (item) => markers.map((marker, index) => /* @__PURE__ */ React.createElement(Use, { key: `${item}-${index}`, href: `#${ids[item]}`, xlinkHref: `#${ids[item]}`, ...marker }))
  ));
  return /* @__PURE__ */ React.createElement(Svg, { ...rest, viewBox: `0 0 ${length} ${length}` }, isMasked ? /* @__PURE__ */ React.createElement(G, null, /* @__PURE__ */ React.createElement(Mask, { id: "mask" }, group), /* @__PURE__ */ React.createElement(Rect, { x: "0", y: "0", width: "100%", height: "100%", fill: fills.rect, mask: "url('#mask')" })) : group, /* @__PURE__ */ React.createElement(Defs, null, eyeItems.map((item) => /* @__PURE__ */ React.createElement(Path, { key: item, id: ids[item], d: paths[item] })), gradient ? (
    // Warning: Keep as React.createElement bec React must be imported in the output bundle. Just using import React from 'react' is risky coz the editor will remove unused deps.
    React.createElement(
      gradient.isLinearGradient ? LinearGradient : RadialGradient,
      gradient.attributes,
      gradient.colors.map(({ color, offset }) => /* @__PURE__ */ React.createElement(Stop, { key: offset, offset, stopColor: color }))
    )
  ) : fillImage && /* @__PURE__ */ React.createElement(Pattern, { id: ids.image, patternUnits: "userSpaceOnUse", width: "100%", height: "100%" }, /* @__PURE__ */ React.createElement(
    Image,
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
export {
  QRX as default
};
