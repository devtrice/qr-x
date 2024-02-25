<script setup lang="ts">
import G from './G.vue'
import { SVGAttributes } from 'vue'
import { Options, getSVGData } from '@qr-x/core'

interface Props extends Options {}

interface Props extends SVGAttributes {}

const { data, level, image, shapes, fillImage, gradient: $gradient, ...rest } = defineProps<Props>()

const { ids, fills, paths, length, markers, gradient, eyeItems, isMasked } = getSVGData({
  data: data,
  level: level,
  shapes: shapes,
  gradient: $gradient,
  fillImage: fillImage,
})
</script>

<template>
  <svg v-bind="rest" width="100%" :viewBox="`0 0 ${length} ${length}`">
    <g v-if="isMasked">
      <mask id="mask">
        <G :ids="ids" :paths="paths" :fills="fills" :markers="markers" :eyeItems="eyeItems" />
      </mask>
      <rect x="0" y="0" width="100%" height="100%" :fill="fills.rect" mask="url('#mask')" />
    </g>
    <G v-else :ids="ids" :paths="paths" :fills="fills" :markers="markers" :eyeItems="eyeItems" />

    <defs>
      <path v-for="item in eyeItems" :key="item" :id="ids[item]" :d="paths[item]" />

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
