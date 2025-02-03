<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'
import { useCookieStore } from '~/stores/cookie'
import { deobfuscate } from '~/helpers/functions'

const store = useAuthStore()
const cookieStore = useCookieStore()
</script>

<template>
  <div class="layout h-full min-h-full">
    <header class="border-b px-6 py-4">
      <div class="flex items-center justify-between">
        <h1>KABAN DASHBOARD</h1>

        <div class="profile flex w-fit items-center gap-x-[20px]">
          <h2>{{ deobfuscate(cookieStore.getUserName() as string) }}</h2>
          <Button
            :loading="store.loading"
            :disabled="store.loading"
            @click="store.logout"
            label="logout"
            variant="danger"
            class="!m-0"
          />
        </div>
      </div>
    </header>
    <!-- main -->
    <div class="h-screen w-auto flex-grow overflow-y-auto bg-clight p-[40px] pr-0 max-xl:p-[30px] max-xl:pr-0">
      <ElScrollbar max-height="100%" class="pr-[40px]">
        <slot />
      </ElScrollbar>
    </div>
  </div>
</template>
