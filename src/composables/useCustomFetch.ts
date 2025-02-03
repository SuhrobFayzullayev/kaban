export default function useCustomFetch() {
  const { apiURL } = useRuntimeConfig().public
  const { getAccessToken } = useCookieStore()

  const baseFetch = $fetch.create({
    baseURL: `${apiURL}/api/`,
  })

  const authFetch = $fetch.create({
    baseURL: `${apiURL}/api/`,
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
  })

  return {
    baseFetch,
    authFetch,
  }
}
