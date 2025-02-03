import * as zod from 'zod'
import { Query } from 'appwrite'
import { objectGetAllValue } from '~/helpers/functions'
import { DATABASE, UNIQUE_ID } from '~/libs/appwrite'
import { DATABASE_ID, COLUMNS } from '~/constants'

export const schema = zod.object({
  name: zod.string().trim().nonempty('Required'),
})

export interface Response extends zod.infer<typeof schema> {
  $id: number
  deals: any[]
}

export const useColumnsStore = defineStore('columns', () => {
  const { getAccessToken } = useCookieStore()

  const loading = ref<boolean>(false)
  const items = ref<Response[]>([])

  const createOne = async (payload: zod.infer<typeof schema>, onSuccess: () => void) => {
    loading.value = true

    const formData = new FormData()
    let key: keyof typeof payload
    for (key in payload) {
      const value = payload[key]
      if (value !== null && value !== undefined) {
        if (Array.isArray(value)) formData.append(key, JSON.stringify(value))
        else formData.append(key, value as string)
      }
    }

    try {
      const response = await DATABASE.createDocument(DATABASE_ID, COLUMNS, UNIQUE_ID, {
        ...payload,
        user_id: getAccessToken(),
        deals: [],
      })

      if (response) {
        ElMessage.success('Success')
        onSuccess()

        await fetchAll()
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

  const fetchAll = async () => {
    loading.value = true

    try {
      const { documents } = await DATABASE.listDocuments(DATABASE_ID, COLUMNS, [
        Query.equal('user_id', getAccessToken() as string),
      ])

      if (documents) items.value = documents as unknown as Response[]
    } catch (error: unknown) {
    } finally {
      loading.value = false
    }
  }

  const updateOne = async (id: number, payload: zod.infer<typeof schema>) => {
    loading.value = true

    const formData = new FormData()
    let key: keyof typeof payload
    for (key in payload) {
      const value = payload[key]
      if (value !== null && value !== undefined) {
        if (Array.isArray(value)) formData.append(key, JSON.stringify(value))
        else formData.append(key, value as string)
      }
    }
    formData.append('_method', 'PUT')

    try {
    } catch (error: unknown) {
      const { data, statusCode } = error as { statusCode: number; data?: any }

      if (typeof data === 'string' && !data.includes('<!DOCTYPE html>')) useErrorHandler(statusCode, data)
      else if (typeof data === 'object') useErrorHandler(statusCode, objectGetAllValue(data))
      else useErrorHandler(statusCode || 500, 'Failed')
    } finally {
      loading.value = false
    }
  }

  const deleteOne = async (id: number) => {
    loading.value = true

    try {
      const response = await DATABASE.deleteDocument(DATABASE_ID, COLUMNS, id as any)

      if (response) {
        ElMessage.success('Success')

        await fetchAll()
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
    fetchAll,
    updateOne,
    deleteOne,
  }
})
