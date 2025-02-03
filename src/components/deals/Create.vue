<script setup lang="ts">
import { useDealsStore, schema } from '~/stores/deals'

const store = useDealsStore()

interface Props {
  id: string | number
}

const props = defineProps<Props>()

const { handleSubmit, resetForm } = useForm({
  validationSchema: toTypedSchema(schema),
})

const onSubmit = handleSubmit((values) => {
  store.createOne(props.id, values, onSuccess)
})

function onSuccess() {
  resetForm()
}
</script>

<template>
  <div>
    <ElDivider>Add new deal</ElDivider>

    <ElForm class="w-full" @submit="onSubmit">
      <FInput name="name" placeholder="Type new deal name" />
    </ElForm>
  </div>
</template>
