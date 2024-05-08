<script setup lang="ts">
import { SVGAttributes } from 'vue'
import { Options, getSVGData } from '@qr-x/core'

interface Props extends Options {}

interface Props extends SVGAttributes {}

const { data, level, shapes, fillImage, gradient: $gradient, ...rest } = defineProps<Props>()

const { ids, path, length, gradient } = getSVGData({
  data: data,
  level: level,
  shapes: shapes,
  gradient: $gradient,
  fillImage: fillImage,
})
</script>

<template>
  <svg v-bind="rest" width="100%" :viewBox="`0 0 ${length} ${length}`">
    <path
      :d="path"
      :fill="gradient || fillImage ? `url(#${gradient ? `${gradient?.attributes.id}` : ids.image})` : 'currentColor'"
    />

    <defs>
      <component
        v-if="gradient"
        :is="gradient.isLinearGradient ? 'linearGradient' : 'radialGradient'"
        v-bind="gradient.attributes"
      >
        <stop v-for="({ color, offset }, index) in gradient.colors" :key="index" :offset="offset" :stop-color="color" />
      </component>

      <pattern v-if="fillImage" :id="ids.image" patternUnits="userSpaceOnUse" width="100%" height="100%">
        <image
          x="0"
          y="0"
          width="100%"
          height="100%"
          :href="fillImage"
          :xlinkHref="fillImage"
          preserveAspectRatio="xMidYMid slice"
        />
      </pattern>
    </defs>
  </svg>
</template>
