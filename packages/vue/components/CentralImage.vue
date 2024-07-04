<script setup lang="ts">
import { ImgHTMLAttributes, defineProps } from 'vue'

const props = withDefaults(defineProps<ImgHTMLAttributes>(), {
  width: 28,
  height: 28,
})
</script>

<template>
  <img v-bind="props" />
</template>
