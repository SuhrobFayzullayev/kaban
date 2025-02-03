<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    src: string
    alt?: string
    type?: 'image' | 'person'
    isStatic?: boolean
  }>(),
  {
    type: 'image',
    isStatic: false,
  },
)
const { apiURL, storageURL } = useRuntimeConfig().public

const imgUrl = computed(() => {
  if (props.src) return props.isStatic ? props.src : `${apiURL}${storageURL}${props.src}`
  return `/${props.type}-not-found.jpg`
})
</script>

<template>
  <img :src="imgUrl" :alt="props.alt" loading="lazy" :onerror="`this.src='/images/${props.type}-not-found.jpg'`" />
</template>
