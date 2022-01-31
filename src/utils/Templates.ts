import { TemplateOptions } from "../typings";

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
                "projectName": options?.projectName || "new project",
                "openApiVersion": options?.openApiVersion || "0.0.1",
                "outFile": options?.outFile || "src/swagger.json",
                "apiRoute": options?.apiRouteUrl || "/api-docs",
                "format": options?.format || 'json'
            }, undefined, 3,
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
                "swagger": "2.0",
                "info": {
                    "title": "Sample API",
                    "description": "API description in Markdown.",
                    "version": "1.0.0"
                },
                "host": "api.example.com",
                "basePath": "/v1",
                "schemes": [
                    "https"
                ],
                "paths": {
                    "/users": {
                    "get": {
                        "summary": "Returns a list of users.",
                        "description": "Optional extended description in Markdown.",
                        "produces": [
                        "application/json"
                        ],
                        "responses": {
                        "200": {
                            "description": "OK"
                        }
                        }
                    }
                    }
                }
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
            projectName: projectName || "new project",
            swaggerVersion: "0.0.1",
            outFile: "src/swagger.json",
            apiRoute: "/api-docs",
        },
        undefined,
        3,
    );
    }



}