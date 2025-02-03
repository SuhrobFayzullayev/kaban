<script setup lang="ts">
definePageMeta({
  layout: false,
})
</script>

<template>
  <div class="flex h-full min-h-screen w-full items-center justify-center bg-clight p-6">
    <div>
      <h1>KABAN DASHBOARD</h1>
      <div class="mx-auto flex w-fit justify-between gap-[20px]">
        <NuxtLink to="/login" class="underline">Login</NuxtLink>
        <NuxtLink to="/register" class="underline">Sign up</NuxtLink>
      </div>
    </div>
  </div>
</template>
