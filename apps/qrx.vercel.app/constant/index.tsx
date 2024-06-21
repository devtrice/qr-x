import { React, Vue, Solid, Next } from 'icons/Libraries'
import { Circle, Diamond, Heart, Leaf, Rounded, Square, Triangle } from 'icons/Shapes'
import { FormValues } from 'types'
import useParseColor from 'hooks/useParseColor'

export const frameworks = [
  { icon: <React />, label: 'React JS' },
  { icon: <Next />, label: 'Next JS' },
  { icon: <Vue />, label: 'Vue JS' },
  { icon: <Solid />, label: 'Solid JS' },
]

export const shapes = {
  leaf: { name: 'leaf', icon: <Leaf /> },
  heart: { name: 'heart', icon: <Heart /> },
  square: { name: 'square', icon: <Square /> },
  circle: { name: 'circle', icon: <Circle /> },
  diamond: { name: 'diamond', icon: <Diamond /> },
  rounded: { name: 'rounded', icon: <Rounded /> },
  triangle: { name: 'triangle', icon: <Triangle /> },
}

export const portals = ['react', 'vue', 'solid', 'vanilla'] as const

type $FormValues = Omit<FormValues, 'color'> & { color: ReturnType<typeof useParseColor> }

// Apologies from ABBT. I don't have any other way
export const codes = {
  vue: ({ data, color, bodyShape, eyeBallShape, eyeFrameShape }: $FormValues) => `<script>
import QRX from '@qr-x/vue';
</script>
<template>
  <QRX 
    data='${data}' 
    color='${color}'
    :shapes='{ body:"${bodyShape}", eyeball:"${eyeBallShape}", eyeframe:"${eyeFrameShape}" }' 
  />
</template>`,

  react: ({ data, color, bodyShape, eyeBallShape, eyeFrameShape }: $FormValues) => {
    return `import QRX from '@qr-x/react';

<QRX 
  data='${data}'
  ${
    !color.gradient
      ? `color='${color.color}'`
      : `type='${color.gradient.type}'
  colors={${JSON.stringify(color.gradient.colors, null, 4).replaceAll('":', ':').replaceAll('  "', '').replace(']', '  ]')}}
  rotate={${color.gradient.rotate}}`
  }
  shapes={{ 
    body: '${bodyShape}', 
    eyeball: '${eyeBallShape}', 
    eyeframe: '${eyeFrameShape}' 
  }} 
/>`
  },

  solid: ({ data, color, bodyShape, eyeBallShape, eyeFrameShape }: $FormValues) => {
    return `import QRX from '@qr-x/solid';

<QRX 
  data='${data}'
  ${
    !color.gradient
      ? `color='${color.color}'`
      : `type='${color.gradient.type}'
  colors={${JSON.stringify(color.gradient.colors, null, 4).replaceAll('":', ':').replaceAll('  "', '').replace(']', '  ]')}}
  rotate={${color.gradient.rotate}}`
  }
  shapes={{ 
    body: '${bodyShape}', 
    eyeball: '${eyeBallShape}', 
    eyeframe: '${eyeFrameShape}' 
  }} 
/>`
  },
  vanilla: ({ data, color, bodyShape, eyeBallShape, eyeFrameShape }: $FormValues) => {
    const object = { data, ...color, shapes: { body: bodyShape, eyeball: eyeBallShape, eyeframe: eyeFrameShape } }
    return `import createQRX from '@qr-x/vanilla';

const qrx = createQRX(${JSON.stringify(object, null, 4)
      .replaceAll('      ', '    ')
      .replaceAll('        ', '      ')
      .replaceAll(
        `      ]
    },`,
        `    ]
  },`,
      )});

const qrContainer = document.getElementById('qr-container');
qrContainer.innerHTML = qrx;`
  },
  //   svelte: ({ data, color, bodyShape, eyeBallShape, eyeFrameShape }: any) => `<script>
  // import QRX from '@qr-x/svelte';
  // </script>
  // <QRX
  //   data='${data}'
  //   color='${color}'
  //   shapes={{ body:'${bodyShape}', eyeball:'${eyeBallShape}', eyeframe:'${eyeFrameShape}' }}
  // />`,
}
