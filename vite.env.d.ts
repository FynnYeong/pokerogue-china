/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_BYPASS_LOGIN: string;
    readonly VITE_BYPASS_TUTORIAL: string;
    readonly VITE_API_BASE_URL: string;
    readonly VITE_SERVERURL: string;
    readonly VITE_VESTION_F: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}