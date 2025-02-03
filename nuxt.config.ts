import { defaultLocale, locales } from './src/constants'

export default defineNuxtConfig({
  devtools: {
    enabled: true,
  },
  compatibilityDate: '2024-04-03',
  css: ['~/assets/styles/nunito.css', '~/assets/styles/tailwind.css'],
  modules: ['@element-plus/nuxt', '@pinia/nuxt', '@vee-validate/nuxt', '@vueuse/nuxt', 'nuxt-svgo'],
  components: [
    {
      path: '~/components',
      extensions: ['.vue'],
    },
    { path: '~/components/form', prefix: 'f', extensions: ['.vue'] },
  ],
  svgo: {
    autoImportPath: 'public/icons/',
    componentPrefix: 'i',
  },
  elementPlus: {
    icon: false,
    importStyle: 'scss',
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  srcDir: 'src/',
  routeRules: {
    '/**': { ssr: false },
  },
  runtimeConfig: {
    public: {
      apiURL:
        process.env.NODE_ENV === 'production'
          ? process.env.NUXT_BASE_URL_PRODUCTION
          : process.env.NUXT_BASE_URL_DEVELOPMENT,
      APPWRITE_CLOUD_URL: process.env.NUXT_APPWRITE_CLOUD_URL,
      APPWRITE_PROJECT_ID: process.env.NUXT_APPWRITE_PROJECT_ID,
    },
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "assets/styles/index.scss" as *;',
        },
      },
    },
  },
})
