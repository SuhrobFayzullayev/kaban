<script setup lang="ts">
import { useColumnsStore, schema } from '~/stores/columns'

const store = useColumnsStore()

interface Props {
  label: string
  id: string | number
  deals: {}[]
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
  <div class="w-max">
    <div class="h-[600px] w-[300px] rounded-[12px] border bg-cwhite">
      <div class="head flex justify-between gap-[30px] border-b p-4">
        <ElForm class="w-full" @submit="onSubmit">
          <FInput name="name" placeholder="Name" />
        </ElForm>

        <!-- delete btn -->
        <div class="w-max">
          <button
            type="button"
            @click="store.deleteOne(id)"
            class="flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-lg border bg-cwhite"
          >
            <IDelete filled />
          </button>
        </div>
      </div>

      <!-- body -->
      <div class="p-4">
        <!-- task list -->
        <div>
          <div class="mb-2 rounded-[12px] border p-4">sdcsdc</div>
          <div class="mb-2 rounded-[12px] border p-4">sdcsdc</div>
          <div class="mb-2 rounded-[12px] border p-4">sdcsdc</div>
        </div>
        <div
          class="mx-auto flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-lg border bg-cwhite"
        >
          <IAdd class="text-cblue" />
        </div>
      </div>
    </div>
  </div>
</template>
