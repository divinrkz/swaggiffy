declare global {
    namespace NodeJs {
        interface ProcessEnv {
            PORT: number;
        }
    }
}

export {};