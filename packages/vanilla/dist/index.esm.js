import { getSVGData } from "@qr-x/core";
function createQRX({ data, level, shapes, image, gradient: $gradient, fillImage, ...rest }) {
  const { ids, fills, paths, length, markers, gradient, eyeItems, isMasked } = getSVGData({
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
export {
  createQRX as default
};
