<script setup lang="ts">
const { ids, paths, eyeItems, fills, markers } = defineProps(['ids', 'paths', 'fills', 'markers', 'eyeItems'])

const flatten = markers.flatMap((marker: [], index: number) =>
  eyeItems.map((item: unknown) => ({
    item,
    index,
    ...marker,
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
