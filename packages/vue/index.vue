<script setup lang="ts">
import { SVGAttributes, computed } from 'vue'
import { Options, getSVGData } from '@qr-x/core'

interface Props extends Options {}
interface Props extends SVGAttributes {}

const props = defineProps<Props>()

const svgState = computed(() =>
  getSVGData({
    data: props.data,
    level: props.level,
    shapes: props.shapes,
    gradient: props.gradient,
  }),
)
</script>

<template>
  <svg v-bind="props" width="100%" :viewBox="`0 0 ${svgState.length} ${svgState.length}`">
    <g :clip-path="`url(#${svgState.id})`">
      <rect v-bind="svgState.cords" :fill="svgState.$gradient ? `url(#${svgState.$gradient.attributes.id})` : 'currentColor'" />
      <image
        v-if="fillImage"
        v-bind="svgState.cords"
        :href="fillImage"
        :xlinkHref="fillImage"
        preserveAspectRatio="xMidYMid slice"
      />
      <!-- <foreignObject v-if="fillVideo" v-bind="svgState.cords">
        <div :style="{ position: 'relative' }">
          <video :src="fillVideo" width="100%" height="100%" muted autoPlay :style="{ objectFit: 'cover' }" />
        </div>
      </foreignObject> -->
    </g>

    <defs>
      <clipPath :id="svgState.id">
        <path :d="svgState.path" />
      </clipPath>
      <component
        v-if="svgState.$gradient"
        :is="svgState.$gradient.isLinearGradient ? 'linearGradient' : 'radialGradient'"
        v-bind="svgState.$gradient.attributes"
      >
        <stop v-for="({ color, offset }, index) in svgState.$gradient.colors" :key="index" :offset="offset" :stop-color="color" />
      </component>
    </defs>
  </svg>
</template>
