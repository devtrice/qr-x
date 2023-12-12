<script setup>
const { ids, paths, eyeItems, fills, markers } = defineProps(['ids', 'paths', 'fills', 'markers', 'eyeItems'])

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
      v-for="{ item, index, ...rest } in flatten"
      :key="`${item}-${index}`"
      :href="`#${ids[item]}`"
      :xlinkHref="`#${ids[item]}`"
      :transform="transform"
      v-bind="rest"
    />
  </g>
</template>
