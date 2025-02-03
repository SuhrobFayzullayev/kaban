<script setup lang="ts">
import { RefreshRight } from '@element-plus/icons-vue'

interface Props {
  error: {
    url: string
    statusCode: 401 | 403 | 404 | 500
    statusMessage: string
    message: string
    stack: string
  }
}

const { error } = defineProps<Props>()
const handleError = (): void => {
  clearError()
  window.location.reload()
}
</script>

<template>
  <Container class="flex h-full min-h-screen items-center justify-center">
    <div class="mx-auto h-fit w-full max-w-[800px]">
      <!-- image -->
      <Image
        :src="`/images/status-code/${error.statusCode}.png`"
        is-static
        type="person"
        :alt="error.message"
        class="w-aut mx-auto max-w-full"
      />

      <div class="flex justify-center">
        <ElButton type="danger" round size="large" :icon="RefreshRight" @click="handleError"> Try again </ElButton>
      </div>
    </div>
  </Container>
</template>
