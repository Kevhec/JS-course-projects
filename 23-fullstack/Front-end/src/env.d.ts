// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  // more env variables...
  VITE_API_BASEURL_LOCAL: string
  VITE_API_BASEURL_NETWORK: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
