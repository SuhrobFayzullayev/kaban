export default function useCustomFetch() {
  const { apiURL } = useRuntimeConfig().public
  const { getAccessToken } = useCookieStore()

  const baseFetch = $fetch.create({
    baseURL: `${apiURL}/api/v1`,
  })

  const authFetch = $fetch.create({
    baseURL: `${apiURL}/api/v1`,
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
  })

  return {
    baseFetch,
    authFetch,
  }
}
