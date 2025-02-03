export const useCookieStore = defineStore('cookie', () => {
  // state
  const accessToken = useCookie('access_token', {
    maxAge: 28800,
  })

  const userName = useCookie('user_name', {
    maxAge: 28800,
  })

  // getter
  const getAccessToken = () => accessToken.value

  const getUserName = () => userName.value

  // setter
  const setAccessToken = (token: string | null) => {
    if (token) {
      accessToken.value = token
    } else {
      accessToken.value = null
    }
  }

  const setUserName = (name: string | null) => {
    if (name) {
      userName.value = name
    } else {
      userName.value = null
    }
  }

  const clearAll = () => {
    setAccessToken(null)
    setUserName(null)
  }

  return {
    getAccessToken,
    setAccessToken,
    getUserName,
    setUserName,
    clearAll,
  }
})
