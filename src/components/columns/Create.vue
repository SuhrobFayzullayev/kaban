<script lang="ts" setup>
import { useColumnsStore, schema } from '~/stores/columns'

const store = useColumnsStore()
const openDialog = ref<boolean>(false)

const { handleSubmit, resetForm } = useForm({
  validationSchema: toTypedSchema(schema),
})

const onSubmit = handleSubmit((values) => {
  store.createOne(values, onSuccess)
})

function onSuccess() {
  resetForm()
  openDialog.value = false
}
</script>

<template>
  <Button
    @click="openDialog = true"
    class="!mt-0"
    label="Create column"
    variant="success"
    :disabled="store.loading"
    :loading="store.loading"
  >
    <div
      class="create-icon ml-2 flex size-[24px] items-center justify-center overflow-hidden rounded-full bg-cwhite/20 p-1.5"
    >
      <IAdd class="w-full text-cwhite" :font-controlled="false" />
    </div>
  </Button>

  <ElDialog v-model="openDialog" title="Create column" width="500">
    <ElForm class="mt-6 w-full" @submit="onSubmit">
      <FInput name="name" placeholder="Name" />
    </ElForm>
  </ElDialog>
</template>
