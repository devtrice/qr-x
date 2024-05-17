<script setup lang="ts">
import { SVGAttributes, reactive, watch } from 'vue'
import { Options, getSVGData } from '@qr-x/core'

interface Props extends Options {}
interface Props extends SVGAttributes {}

const props = defineProps<Props>()

const { ids, path, length, gradient } = getSVGData({
  data: props.data,
  level: props.level,
  shapes: props.shapes,
  gradient: props.gradient,
  fillImage: props.fillImage,
})

const svgState = reactive({
  ids,
  path,
  length,
  gradient,
})

const updateSVGData = () => {
  const { ids, path, length, gradient } = getSVGData({
    data: props.data,
    level: props.level,
    shapes: props.shapes,
    gradient: props.gradient,
    fillImage: props.fillImage,
  })

  svgState.ids = ids
  svgState.path = path
  svgState.length = length
  svgState.gradient = gradient
}

watch(() => props.data, updateSVGData, { immediate: true })
</script>

<template>
  <svg v-bind="props" width="100%" :viewBox="`0 0 ${svgState.length} ${svgState.length}`">
    <path
      :d="svgState.path"
      :fill="
        svgState.gradient || fillImage
          ? `url(#${svgState.gradient ? `${svgState.gradient?.attributes.id}` : svgState.ids})`
          : 'currentColor'
      "
    />

    <defs>
      <component
        v-if="svgState.gradient"
        :is="svgState.gradient.isLinearGradient ? 'linearGradient' : 'radialGradient'"
        v-bind="svgState.gradient.attributes"
      >
        <stop v-for="({ color, offset }, index) in svgState.gradient.colors" :key="index" :offset="offset" :stop-color="color" />
      </component>

      <pattern v-if="fillImage" :id="svgState.ids.image" patternUnits="userSpaceOnUse" width="100%" height="100%">
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
