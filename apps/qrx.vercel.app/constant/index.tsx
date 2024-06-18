import { React, Vue, Solid, Next } from 'icons/Libraries'
import { Circle, Diamond, Heart, Leaf, Rounded, Square, Triangle } from 'icons/Shapes'

export const title = ['Integrates', 'in', 'popular', 'frontend', 'libraries', 'and', 'frameworks']

export const frameworks = [
  { icon: <React />, label: 'React JS' },
  { icon: <Next />, label: 'Next JS' },
  { icon: <Vue />, label: 'Vue JS' },
  { icon: <Solid />, label: 'Solid JS' },
]

export const shapes = {
  leaf: { name: 'leaf', icon: <Leaf /> },
  square: { name: 'square', icon: <Square /> },
  circle: { name: 'circle', icon: <Circle /> },
  heart: { name: 'heart', icon: <Heart /> },
  diamond: { name: 'diamond', icon: <Diamond /> },
  triangle: { name: 'triangle', icon: <Triangle /> },
  rounded: { name: 'rounded', icon: <Rounded /> },
}

export const editorFrameworks = ['react', 'vue', 'solid', 'svelte', 'vanilla'] as const

export type Framework = (typeof editorFrameworks)[number]

export const codes: Record<Framework, (vals: any) => string> = {
  react: ({ data, color, bodyShape, eyeBallShape, eyeFrameShape }: any) => `import QRX from '@qr-x/react';

<QRX 
  data='${data}' 
  color='${color}'
  shapes={{ body:'${bodyShape}', eyeball:'${eyeBallShape}', eyeframe:'${eyeFrameShape}' }} 
/>`,
  vue: ({ data, color, bodyShape, eyeBallShape, eyeFrameShape }: any) => `<script>
import QRX from '@qr-x/vue';
</script>
<template>
  <QRX 
    data='${data}' 
    color='${color}'
    :shapes='{ body:"${bodyShape}", eyeball:"${eyeBallShape}", eyeframe:"${eyeFrameShape}" }' 
  />
</template>`,
  solid: ({ data, color, bodyShape, eyeBallShape, eyeFrameShape }: any) => `import QRX from '@qr-x/solid';

<QRX 
  data='${data}' 
  color='${color}'
  shapes={{ body:'${bodyShape}', eyeball:'${eyeBallShape}', eyeframe:'${eyeFrameShape}' }}
/>`,
  svelte: ({ data, color, bodyShape, eyeBallShape, eyeFrameShape }: any) => `<script>
import QRX from '@qr-x/svelte';
</script>
<QRX 
  data='${data}' 
  color='${color}'
  shapes={{ body:'${bodyShape}', eyeball:'${eyeBallShape}', eyeframe:'${eyeFrameShape}' }}
/>`,
  vanilla: ({ data, color, bodyShape, eyeBallShape, eyeFrameShape }: any) => `
  <body>
    <div id="qr-container"></div>
  </body>
  <script src="https://cdn.skypack.dev/@qr-x/vanilla"></script>
  <script>
    const qrx = createQRX({
      data: '${data}',
      color: '${color}',
      shapes: { body: '${bodyShape}', eyeball: '${eyeBallShape}', eyeframe: '${eyeFrameShape}' },
    })
    const qrContainer = document.getElementById('qr-container')
    qrContainer.innerHTML = qrx
  </script>
  `,
}
