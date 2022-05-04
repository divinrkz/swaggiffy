import { PlatformTools } from '../platform/PlatformTools';
import { TemplateOptions } from '../typings';
import { OSA2 } from '../typings/swagger/openapi.types';
import { Defaults } from './Defaults';

/**
 * Swaggify Templates class
 */
export class Templates {
    /**
     * Returns swaggify config file template
     * @param options
     * @returns
     */
    static getConfigTemplate(options?: TemplateOptions): string {
        return JSON.stringify(
            {
                projectName: options?.projectName || PlatformTools.getProjectName(),
                openApiVersion: options?.openApiVersion || Defaults.OPENAPI_VERSION,
                outFile: options?.outFile || Defaults.SWAGGER_DEFINITION_FILE,
                apiRoute: options?.apiRouteUrl || Defaults.SWAGGER_ENDPOINT_URL,
                format: options?.format || Defaults.SWAGGER_DEFINITION_FORMAT,
            },
            undefined,
            3,
        );
    }

    /**
     * Generate Config 0SA2 template
     * @param projectName Project Name
     * @returns template
     */
    static getOSA2Template(projectName?: string): string {
        const name: string = projectName ? projectName : PlatformTools.getProjectName();
        return JSON.stringify(
            {
                swaggerDefinition: {
                    swagger: '2.0',
                    info: {
                        title: name,
                        description: `${name} API Documentation`,
                        termsOfService: 'http://swagger.io/terms/',
                        contact: {
                            name: 'API Support',
                            url: 'http://www.swagger.io/support',
                            email: 'support@swagger.io',
                        },
                        license: {
                            name: 'Apache 2.0',
                            url: 'http://www.apache.org/licenses/LICENSE-2.0.html',
                        },
                        version: '1.0.0',
                    },
                    host: 'api.example.com',
                    basePath: '/v1',
                    schemes: ['https'],
                    paths: {
                        '/users': {
                            get: {
                                summary: 'Returns a list of users.',
                                description: 'Optional extended description in Markdown.',
                                produces: ['application/json'],
                                responses: {
                                    200: {
                                        description: 'OK',
                                    },
                                },
                            },
                        },
                    },
                },
                apis: [],
            },
            undefined,
            3,
        );
    }

    /**
     * Generate Config 0SA3 template
     * @param projectName Project Name
     * @returns template
     */
    static getOSA3Template(projectName?: string): string {
        const name: string = projectName ? projectName : PlatformTools.getProjectName();
        return JSON.stringify(
            {
                swaggerDefinition: {
                    openapi: '3.0.0',
                    info: {
                        title: name,
                        description: `${name} API Documentation`,
                        version: '1.0.0',
                    },
                    host: 'api.example.com',
                    basePath: '/v1',
                    schemes: ['https'],
                    paths: {
                        '/users': {
                            get: {
                                summary: 'Returns a list of users.',
                                description: 'Optional extended description in Markdown.',
                                produces: ['application/json'],
                                responses: {
                                    200: {
                                        description: 'OK',
                                    },
                                },
                            },
                        },
                    },
                },
                apis: [],
            },
            undefined,
            3,
        );
    }
}
