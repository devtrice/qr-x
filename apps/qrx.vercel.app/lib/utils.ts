type Setting = {
  svg: string | Node
  mimetype?: string
  quality?: number
  width?: number | 'auto'
  height?: number | 'auto'
  outputFormat?: 'base64' | 'blob'
}
/**
 * Simple function that converts a plain SVG string or SVG DOM Node into an image with custom dimensions.
 */
export function SVGToImage(settings: Setting): Promise<string | Blob> {
  let _settings: Setting = {
    svg: '',
    // Usually all SVG have transparency, so PNG is the way to go by default
    mimetype: 'image/png',
    quality: 0.92,
    width: 'auto',
    height: 'auto',
    outputFormat: 'base64',
  }

  // Override default settings
  for (let key in settings) {
    // @ts-ignore
    _settings[key] = settings[key]
  }

  return new Promise(function (resolve, reject) {
    let svgNode: Node, svgXml: string

    if (typeof _settings.svg == 'string') {
      svgXml = _settings.svg
    } else {
      svgNode = _settings.svg as unknown as Node
      svgXml = new XMLSerializer().serializeToString(svgNode)
    }

    let canvas = document.createElement('canvas')
    let context = canvas.getContext('2d')!

    // const s1 = unescape(encodeURIComponent(svgXml)) // This can escape emojis
    // const s2 = decodeURIComponent(encodeURIComponent(svgXml)) // This cannot escape emojis but the first one is deprecated

    let svgBase64 = 'data:image/svg+xml;base64,' + btoa(decodeURIComponent(encodeURIComponent(svgXml)))

    const image = new Image()

    image.onload = function () {
      // type `this` is the image
      const t = this as HTMLImageElement

      let finalWidth: number, finalHeight: number

      // Calculate width if set to auto and the height is specified (to preserve aspect ratio)
      if (_settings.width === 'auto' && _settings.height !== 'auto') {
        finalWidth = (t.width / t.height) * (_settings.height ?? 1000)
        // Use image original width
      } else if (_settings.width === 'auto') {
        finalWidth = t.naturalWidth
        // Use custom width
      } else {
        finalWidth = _settings.width ?? 1000
      }

      // Calculate height if set to auto and the width is specified (to preserve aspect ratio)
      if (_settings.height === 'auto' && _settings.width !== 'auto') {
        finalHeight = (t.height / t.width) * (_settings.width ?? 1000)
        // Use image original height
      } else if (_settings.height === 'auto') {
        finalHeight = t.naturalHeight
        // Use custom height
      } else {
        finalHeight = _settings.height ?? 1000
      }

      // Define the canvas intrinsic size
      canvas.width = finalWidth
      canvas.height = finalHeight

      // Render image in the canvas
      context.drawImage(t, 0, 0, finalWidth, finalHeight)

      if (_settings.outputFormat == 'blob') {
        // Fullfil and Return the Blob image
        canvas.toBlob(
          function (blob) {
            if (!blob) {
              reject('Error creating the Blob')
              return
            }
            resolve(blob)
          },
          _settings.mimetype,
          _settings.quality,
        )
      } else {
        // Fullfil and Return the Base64 image
        resolve(canvas.toDataURL(_settings.mimetype, _settings.quality))
      }
    }

    // Load the SVG in Base64 to the image
    image.src = svgBase64
  })
}
