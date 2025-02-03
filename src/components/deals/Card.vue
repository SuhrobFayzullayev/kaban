<script setup lang="ts">
import { useDealsStore, schema } from '~/stores/deals'

const store = useDealsStore()

interface Props {
  label: string
  id: string | number
}

const props = defineProps<Props>()

const { handleSubmit, setFieldValue } = useForm({
  validationSchema: toTypedSchema(schema),
})

const onSubmit = handleSubmit((values) => {
  store.updateOne(props.id, values)
})

// set initial value
setFieldValue('name', props.label)
</script>

<template>
  <div class="flex justify-between gap-[10px]">
    <ElForm class="w-full" @submit="onSubmit">
      <FInput name="name" />
    </ElForm>

    <!-- delete btn -->
    <div class="w-max">
      <button
        type="button"
        @click="store.deleteOne(props.id)"
        class="flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-lg border bg-cwhite"
      >
        <IDelete filled />
      </button>
    </div>
  </div>
</template>
