// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  // more env variables...
  readonly VITE_API_BASEURL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}