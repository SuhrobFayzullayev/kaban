<script setup lang="ts">
import { useColumnsStore, schema } from '~/stores/columns'

definePageMeta({
  layout: 'default',
})

const store = useColumnsStore()

// fetch all columns
store.fetchAll()
</script>

<template>
  <div>
    <ColumnsCreate />

    <div class="mt-4 flex gap-[20px] overflow-x-auto">
      <!-- cardlist -->
      <template v-if="store.items?.length">
        <ColumnsCard
          v-for="item in store.items"
          :key="item.$id"
          :label="item.name"
          :id="item.$id"
          :deals="item.deals"
        />
      </template>
    </div>
  </div>
</template>
