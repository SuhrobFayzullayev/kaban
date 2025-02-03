<script setup lang="ts">
withDefaults(
  defineProps<{
    is?: 'div' | 'main' | 'section' | 'header' | 'footer' | 'aside'
  }>(),
  {
    is: 'div',
  },
)
</script>

<template>
  <div class="w-full px-6">
    <component
      :is="is"
      class="mx-auto h-auto w-full xxs:max-w-screen-xxs xs:max-w-screen-xs sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-screen-2xl 3xl:max-w-screen-3xl"
    >
      <slot />
    </component>
  </div>
</template>
