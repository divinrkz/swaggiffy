import * as yargs from "yargs";
import { PlatformTools } from "../platform/PlatformTools";
import { SetupRunner } from "../runners/SetupRunner";
import { FileUtils } from "../utils/FileUtils";

/**
 * Generate Spec Command
 */
export class GenerateSpecCommand implements yargs.CommandModule {
    command = "generate:spec";
    describe = "Generate swaggify specifications file.";
    aliases = "g:spec";

    builder(args: yargs.Argv) {
        return args.option("path", {
            alias: "specFilePath",
            type: "string",
            describe: "File where the swagger specifications will be be created. Defaults to BASE_DIR/swagger/swagger.json .",
        }).option("r", {
            alias: "refresh",
            type: "boolean",
            describe: "Re-generate and overwrite existing config file.",
        });
    }

    async handler(args: yargs.Arguments) {
        try {
            const override: boolean | undefined = (args.refresh) ? true : false;
            const specFile: string = await SetupRunner.generateSpecFile(GenerateSpecCommand.getOSA2Template(), args.specFilePath as string | undefined, override as boolean);
            console.log(`Created: ${FileUtils.cleanPath(specFile)}`);
            PlatformTools.logSuccess("Successfully generated");

        } catch (err: any) {
            PlatformTools.logCmdErr("Error when generating config file: ", err);
        }
    }

    /**
     * Generate Config 0SA2 template
     * @param projectName Project Name
     * @returns template
     */
    protected static getOSA2Template(projectName?: string): string {
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
     protected static getOSA3Template(projectName?: string): string {
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
