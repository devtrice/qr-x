<script setup lang="ts">
import { ImgHTMLAttributes, defineProps } from 'vue'

interface Props extends /* @vue-ignore */ ImgHTMLAttributes {}

const props = withDefaults(defineProps<Props>(), { width: 28, height: 28 })
</script>

<template>
  <img v-bind="props" />
</template>
