// https://vitejs.dev/guide/env-and-mode.html#intellisense-for-typescript

declare interface ImportMetaEnv {
  /**
    * 깃허브 레포지토리 링크
    */
  readonly VITE_GITHUB_REPOSITORY_URI: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
