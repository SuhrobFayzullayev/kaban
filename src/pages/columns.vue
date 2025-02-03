<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'
import { useColumnsStore, schema } from '~/stores/columns'

definePageMeta({
  layout: 'default',
})

const store = useAuthStore()
const columnsStore = useColumnsStore()
const openDialog = ref<boolean>(false)

columnsStore.fetchAll()

const { handleSubmit, resetForm, setFieldValue } = useForm({
  validationSchema: toTypedSchema(schema),
})

const onSubmit = handleSubmit((values) => {
  // store.updateOne( values, onSuccess)
})

function onSuccess() {
  resetForm()
  openDialog.value = false
}
</script>

<template>
  <div>
    <ColumnsCreate />

    <div class="mt-4 flex gap-[20px] overflow-x-auto">
      <!-- cardlist -->
      <template v-if="columnsStore.items?.length">
        <div class="w-max" v-for="item in columnsStore.items" :id="item.$id">
          <div class="h-[600px] w-[300px] rounded-[12px] border bg-cwhite">
            <div class="head flex justify-between gap-[30px] border-b p-4">
              <p class="mt-1">{{ item.name }} ({{ item.deals?.length }})</p>

              <div class="flex w-fit items-center justify-between gap-x-[10px]">
                <div
                  @click="
                    () => {
                      openDialog = true
                      setFieldValue('name', item.name)
                    }
                  "
                  class="flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-lg border bg-cwhite"
                >
                  <IEdit filled />
                </div>

                <div
                  @click="columnsStore.deleteOne(item.$id)"
                  class="flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-lg border bg-cwhite"
                >
                  <IDelete filled />
                </div>
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
    </div>

    <ElDialog v-model="openDialog" title="Create column" width="500">
      <ElForm class="mt-6 w-full" @submit="onSubmit">
        <FInput name="name" placeholder="Name" />
      </ElForm>
    </ElDialog>
  </div>
</template>
