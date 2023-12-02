/**
 * Get path data for a rounded rectangle. Allows for different radius on each corner.
 * @param  {Number} w   Width of rounded rectangle
 * @param  {Number} h   Height of rounded rectangle
 * @param  {Number} tlr Top left corner radius
 * @param  {Number} trr Top right corner radius
 * @param  {Number} brr Bottom right corner radius
 * @param  {Number} blr Bottom left corner radius
 * @return {String}     Rounded rectangle SVG path data
 */
export function roundedRect(x: number, y: number, w: number, h: number, tlr: number, trr: number, brr: number, blr: number) {
  return (
    ` M ${x} ${y}, ` +
    tlr +
    ' a ' +
    tlr +
    ' ' +
    tlr +
    ' 0 0 1 ' +
    tlr +
    ' 0' +
    ' l ' +
    (w - trr) +
    ' 0' +
    ' a ' +
    trr +
    ' ' +
    trr +
    ' 0 0 1 ' +
    w +
    ' ' +
    trr +
    ' l ' +
    w +
    ' ' +
    (h - brr) +
    ' a ' +
    brr +
    ' ' +
    brr +
    ' 0 0 1 ' +
    (w - brr) +
    ' ' +
    h +
    ' l ' +
    blr +
    ' ' +
    h +
    ' a ' +
    blr +
    ' ' +
    blr +
    ' 0 0 1 0 ' +
    (h - blr) +
    ' Z '
  )
}
