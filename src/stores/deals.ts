import * as zod from 'zod'
import { Query } from 'appwrite'
import { objectGetAllValue } from '~/helpers/functions'
import { DATABASE, UNIQUE_ID } from '~/libs/appwrite'
import { DATABASE_ID, COLUMNS, DEALS } from '~/constants'

export const schema = zod.object({
  name: zod.string().trim().nonempty('Required'),
})

export interface Response extends zod.infer<typeof schema> {
  $id: number
}

export const useDealsStore = defineStore('deals', () => {
  const loading = ref<boolean>(false)
  const items = ref<Response[]>([])
  const columnsStore = useColumnsStore()

  const createOne = async (column_id: string | number, payload: zod.infer<typeof schema>, onSuccess: () => void) => {
    loading.value = true

    try {
      const response = await DATABASE.createDocument(DATABASE_ID, DEALS, UNIQUE_ID.unique(), {
        ...payload,
        columns: column_id,
      })

      if (response) {
        ElMessage.success('Success')
        onSuccess()
        await columnsStore.fetchAll()
      }
    } catch (error: unknown) {
      const { data, statusCode } = error as { statusCode: number; data?: any }

      if (typeof data === 'string' && !data.includes('<!DOCTYPE html>')) useErrorHandler(statusCode, data)
      else if (typeof data === 'object') useErrorHandler(statusCode, objectGetAllValue(data))
      else useErrorHandler(statusCode || 500, 'Failed')
    } finally {
      loading.value = false
    }
  }

  const updateOne = async (id: number, payload: zod.infer<typeof schema>) => {
    loading.value = true

    console.log(payload)

    try {
      const response = await DATABASE.updateDocument(DATABASE_ID, DEALS, id as any, payload)
      if (response) {
        ElMessage.success('Success')

        await columnsStore.fetchAll()
      }
    } catch (error: unknown) {
      const { data, statusCode } = error as { statusCode: number; data?: any }

      if (typeof data === 'string' && !data.includes('<!DOCTYPE html>')) useErrorHandler(statusCode, data)
      else if (typeof data === 'object') useErrorHandler(statusCode, objectGetAllValue(data))
      else useErrorHandler(statusCode || 500, 'Failed')
    } finally {
      loading.value = false
    }
  }

  const deleteOne = async (id: number | string) => {
    loading.value = true

    try {
      const response = await DATABASE.deleteDocument(DATABASE_ID, DEALS, id as any)

      if (response) {
        ElMessage.success('Success')

        await columnsStore.fetchAll()
      }
    } catch (error: unknown) {
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    items,
    createOne,
    updateOne,
    deleteOne,
  }
})
