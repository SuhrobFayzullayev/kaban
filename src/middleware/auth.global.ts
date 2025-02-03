import { useCookieStore } from '~/stores/cookie'

export default defineNuxtRouteMiddleware((to, _from) => {
  const { getAccessToken } = useCookieStore()

  const isUserLoggedIn = !!getAccessToken()
  const toPath: string = to.path
  const loginPath: string = '/login'

  if (isUserLoggedIn && toPath !== '/columns') {
    return navigateTo('/columns')
  }
  if (!isUserLoggedIn && toPath === '/columns') {
    return navigateTo(loginPath)
  }
})
