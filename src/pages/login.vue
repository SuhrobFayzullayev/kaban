<script setup lang="ts">
import { loginSchema, useAuthStore } from '~/stores/auth'

definePageMeta({
  layout: false,
})

const store = useAuthStore()
const { handleSubmit } = useForm({
  validationSchema: toTypedSchema(loginSchema),
})

const onSubmit = handleSubmit((values) => {
  store.login(values)
})
</script>

<template>
  <div class="flex h-full min-h-screen w-full items-center justify-center bg-clight p-6">
    <main
      class="mx-auto w-full max-w-[700px] overflow-hidden rounded-md bg-cwhite p-[50px] max-lg:p-[40px] max-md:p-[30px]"
    >
      <!-- head -->
      <div class="head-block flex w-full items-end justify-between gap-[30px]">
        <h1
          class="text-[30px] font-bold leading-[1] text-cblack max-lg:text-[28px] max-md:text-[26px] max-sm:text-[24px]"
        >
          Login
        </h1>
      </div>

      <!-- form -->
      <ElForm class="mt-6 w-full" @submit="onSubmit">
        <FInput name="email" placeholder="Email" />
        <FInput name="password" type="password" placeholder="Password" show-password />

        <p>Not registered yet? <NuxtLink to="/register" class="underline">Sign up</NuxtLink></p>

        <Button
          native-type="submit"
          label="Login"
          class="mt-8 w-full"
          :loading="store.loading"
          :disabled="store.loading"
        />
      </ElForm>
    </main>
  </div>
</template>
