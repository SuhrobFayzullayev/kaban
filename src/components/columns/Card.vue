<script setup lang="ts">
import { useColumnsStore, schema } from '~/stores/columns'

const store = useColumnsStore()

interface Props {
  label: string
  id: string | number
  deals: {
    name: string
    $id: string | number
  }[]
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
        <div v-if="props.deals?.length">
          <DealsCard v-for="item in props.deals" :label="item.name" :key="item.$id" :id="item.$id" />
        </div>
        <div v-else>no data</div>

        <DealsCreate :id="props.id" />
      </div>
    </div>
  </div>
</template>
