<script setup lang="ts">
import { Options, getSVGData } from '@qr-x/core'
import { ImgHTMLAttributes, SVGAttributes, computed, onMounted, reactive, ref, useSlots } from 'vue'

interface Props extends Options {}
interface Props extends SVGAttributes {
  brand?: ImgHTMLAttributes
}

const svgRef = ref(null)
const slots = useSlots()
const props = defineProps<Props>()
const dimensions = reactive({ width: 0, height: 0 })

const svgState = computed(() =>
  getSVGData({
    data: props.data,
    level: props.level,
    shapes: props.shapes,
    gradient: props.gradient,
  }),
)

onMounted(() => {
  const element = svgRef.value
  if (element) {
    const { clientWidth, clientHeight } = element
    dimensions.width = clientWidth
    dimensions.height = clientHeight
  }
})
</script>

<template>
  <svg ref="svgRef" v-bind="props" width="100%" :viewBox="`0 0 ${svgState.length} ${svgState.length}`">
    <g :clip-path="`url(#${svgState.id})`">
      <rect v-bind="svgState.cords" :fill="svgState.$gradient ? `url(#${svgState.$gradient.attributes.id})` : 'currentColor'" />
      <image
        v-if="fillImage"
        v-bind="svgState.cords"
        :href="fillImage"
        :xlinkHref="fillImage"
        preserveAspectRatio="xMidYMid slice"
      />
    </g>

    <foreignObject v-if="props.brand || slots.brand" v-bind="svgState.cords">
      <svg :viewBox="`0 0 ${dimensions.width} ${dimensions.height}`">
        <foreignObject v-bind="svgState.cords" :style="{ overflow: 'visible' }">
          <div :style="{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }">
            <img v-if="brand" v-bind="brand" />
            <slot v-else name="brand"></slot>
          </div>
        </foreignObject>
      </svg>
    </foreignObject>

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
