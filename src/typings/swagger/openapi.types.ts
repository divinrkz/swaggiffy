export interface OSA2 {
    swaggerDefinition: {
            swagger: string,
            info: {
                title: string,
                description: string,
                termsOfService?: string
                contact?: Contact
                license?: License,
                version: string;
            },
            host: string,
            basePath: string,
            schemes: HttpSchemes[],
            paths: Path
        },
        apis: any[],
};

export type Contact = {
    name: string
    url: string
    email: string
}

export type License = {
    name: string
    url: string
}

export type Path = {
    [x: string]: {
        [m in HttpMethods]: {
            summary?: string,
            description?: string,
            produces?: MimeTypes[],
            responses?: {
                [x: number]: {
                    description: string,
                },
            },
        }
    },
}

export type HttpSchemes = 'http' | 'https';
export type HttpMethods = 'get' | 'post' | 'put' | 'delete';
export type MimeTypes = 'text/plain; charset=utf-8' | 'application/json' | 'application/vnd.github+json' |
                        'application/vnd.github.v3+json' | 'application/vnd.github.v3.raw+json' | 'application/vnd.github.v3.text+json' |
                        'application/vnd.github.v3.html+json' | 'application/vnd.github.v3.full+json' | 'application/vnd.github.v3.diff' |
                        'application/vnd.github.v3.patch';







