import * as zod from 'zod'
import { useCookieStore } from '~/stores/cookie'
import { objectGetAllValue, obfuscate } from '~/helpers/functions'
import { ACCOUNT, UNIQUE_ID } from '~/libs/appwrite'

export const registerSchema = zod.object({
  name: zod.string().trim().nonempty('Required'),
  email: zod.string().trim().nonempty('Required').email('Must be email address'),
  password: zod.string().trim().nonempty('Required').min(6, 'Password min 6'),
})
export const loginSchema = zod.object({
  email: zod.string().trim().nonempty('Required').email('Must be email address'),
  password: zod.string().trim().nonempty('Required').min(6, 'Password min 6'),
})

export const useAuthStore = defineStore('auth', () => {
  const router = useRouter()
  const cookieStore = useCookieStore()
  const loading = ref<boolean>(false)

  const register = async (payload: zod.infer<typeof registerSchema>) => {
    loading.value = true

    try {
      await ACCOUNT.create(UNIQUE_ID.unique(), payload.email, payload.password, payload.name)
      await login(payload)
    } catch (error: unknown) {
      const { data, statusCode } = error as { statusCode: number; data?: any }

      if (typeof data === 'string' && !data.includes('<!DOCTYPE html>')) useErrorHandler(statusCode, data)
      else if (typeof data === 'object') useErrorHandler(statusCode, objectGetAllValue(data))
      else useErrorHandler(statusCode || 500, 'Failed')
    } finally {
      loading.value = false
    }
  }

  const login = async (payload: zod.infer<typeof registerSchema>) => {
    loading.value = true

    try {
      await ACCOUNT.createEmailPasswordSession(payload.email, payload.password)
      await me()
    } catch (error: unknown) {
      const { data, statusCode } = error as { statusCode: number; data?: any }

      if (typeof data === 'string' && !data.includes('<!DOCTYPE html>')) useErrorHandler(statusCode, data)
      else if (typeof data === 'object') useErrorHandler(statusCode, objectGetAllValue(data))
      else useErrorHandler(statusCode || 500, 'Failed')
    } finally {
      loading.value = false
    }
  }

  const me = async () => {
    loading.value = true

    try {
      const { name, $id } = await ACCOUNT.get()

      if (name && $id) {
        cookieStore.setAccessToken($id)
        cookieStore.setUserName(obfuscate(name))

        ElMessage.success('Success')
        router.push(`/columns`)
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

  const logout = async () => {
    loading.value = true

    try {
      await ACCOUNT.deleteSession('current')

      cookieStore.clearAll()
      router.push({ name: 'login' })

      ElMessage.success('Success')
    } catch (error: unknown) {
      const { data, statusCode } = error as { statusCode: number; data?: any }

      if (typeof data === 'string' && !data.includes('<!DOCTYPE html>')) useErrorHandler(statusCode, data)
      else if (typeof data === 'object') useErrorHandler(statusCode, objectGetAllValue(data))
      else useErrorHandler(statusCode || 500, 'Failed')
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    register,
    login,
    logout,
  }
})
