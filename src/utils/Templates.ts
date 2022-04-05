import { PlatformTools } from "../platform/PlatformTools";
import { TemplateOptions } from "../typings";
import { Defaults } from "./Defaults";

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
        return JSON.stringify(
            {
                swagger: "2.0",
                info: {
                    title: "Sample API",
                    description: "API description in Markdown.",
                    version: "1.0.0",
                },
                host: "api.example.com",
                basePath: "/v1",
                schemes: ["https"],
                paths: {
                    "/users": {
                        get: {
                            summary: "Returns a list of users.",
                            description: "Optional extended description in Markdown.",
                            produces: ["application/json"],
                            responses: {
                                "200": {
                                    description: "OK",
                                },
                            },
                        },
                    },
                },
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
        return JSON.stringify(
            {
                swagger: "3.0",
                info: {
                    title: "Sample API",
                    description: "API description in Markdown.",
                    version: "1.0.0",
                },
                host: "api.example.com",
                basePath: "/v1",
                schemes: ["https"],
                paths: {
                    "/users": {
                        get: {
                            summary: "Returns a list of users.",
                            description: "Optional extended description in Markdown.",
                            produces: ["application/json"],
                            responses: {
                                "200": {
                                    description: "OK",
                                },
                            },
                        },
                    },
                },
            },
            undefined,
            3,
        );
    }
}
