declare global {
    namespace NodeJS {
        export interface ProcessEnv {
            PORT: number;
            SQL_HOST: string;
            SQL_PORT: number;
            SQL_USER: string;
            SQL_PASSWORD: string;
            SQL_DATABASE: string;
        }
    }
}

export {}
