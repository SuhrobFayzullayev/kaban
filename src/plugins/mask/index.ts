import mask from './directive'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('mask', mask)
})
