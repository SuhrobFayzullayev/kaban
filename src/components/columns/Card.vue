<script setup lang="ts">
import { useColumnsStore, schema } from '~/stores/columns'
import { useDealsStore } from '~/stores/deals'

const store = useColumnsStore()
const dealsStore = useDealsStore()

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

const handleDragStart = (event: any, deal_id: string) => {
  event.dataTransfer.setData('deal_id', deal_id)
}

const handleDrop = async (event: any) => {
  const dealId = event.dataTransfer.getData('deal_id')

  dealsStore.updateOne(dealId, { columns: props.id })
}
</script>

<template>
  <div @dragover.prevent @drop="handleDrop($event)" class="w-max">
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
          <div
            role="button"
            draggable="true"
            @dragstart="handleDragStart($event, item.$id as string)"
            v-for="item in props.deals"
            :key="item.$id"
          >
            <DealsCard :label="item.name" :id="item.$id" />
          </div>
        </div>
        <div v-else>no data</div>

        <DealsCreate :id="props.id" />
      </div>
    </div>
  </div>
</template>
