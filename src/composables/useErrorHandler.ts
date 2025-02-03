export default function useErrorHandler(statusCode: number, message: string) {
  const { clearAll } = useCookieStore()

  // switch (statusCode) {
  //   // case 400: {
  //   //   showError({
  //   //     statusCode: statusCode,
  //   //   })

  //   //   break
  //   // }
  //   case 403: {
  //     clearAll()
  //     showError({
  //       statusCode: statusCode,
  //     })

  //     break
  //   }
  //   case 404: {
  //     showError({
  //       statusCode: statusCode,
  //     })

  //     break
  //   }
  //   case 410: {
  //     showError({
  //       statusCode: statusCode,
  //     })

  //     break
  //   }
  //   case 429: {
  //     showError({
  //       statusCode: statusCode,
  //     })

  //     break
  //   }
  //   case 500: {
  //     showError({
  //       statusCode: statusCode,
  //     })

  //     break
  //   }
  //   case 503: {
  //     showError({
  //       statusCode: statusCode,
  //     })

  //     break
  //   }
  //   case 504: {
  //     showError({
  //       statusCode: statusCode,
  //     })

  //     break
  //   }
  // }

  ElMessage({ type: 'error', message: `${statusCode}: ${message}`, duration: 5000 })
}
