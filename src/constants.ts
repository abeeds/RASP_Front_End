declare global {
    namespace NodeJS {
        interface ProcessEnv {
            REACT_APP_URL_PRE: string;
        }
    }
}

export const BACKEND_URL = process.env.REACT_APP_URL_PRE;
