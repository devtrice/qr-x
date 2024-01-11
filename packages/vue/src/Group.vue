<script setup lang="ts">
import { getSVGData } from '@qr-x/core'

type Return = ReturnType<typeof getSVGData>

interface Props {
  ids: Return['ids']
  paths: Return['paths']
  eyeItems: Return['eyeItems']
  fills: Return['fills']
  markers: Return['markers']
}

const { ids, paths, eyeItems, fills, markers } = defineProps<Props>()

const flatten = markers.flatMap((marker, index) =>
  eyeItems.map(item => ({
    ...marker,
    item,
    index,
  })),
)
</script>

<template>
  <g :fill="fills.path">
    <path :d="paths.body" />
    <use
      v-for="{ item, index, transform, ...rest } in flatten"
      :key="`${item}-${index}`"
      :href="`#${ids[item]}`"
      :xlinkHref="`#${ids[item]}`"
      :transform="transform"
      v-bind="rest"
    />
  </g>
</template>
