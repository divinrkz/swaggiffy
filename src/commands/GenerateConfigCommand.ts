import * as yargs from "yargs";
import { PlatformTools } from "../platform/PlatformTools";
import { SetupRunner } from "../runners/SetupRunner";
import { FileUtils } from "../utils/FileUtils";

/**
 * Generate Config Command
 */
export class GenerateConfigCommand implements yargs.CommandModule {
    command = "generate:config";
    describe = "Generate swaggify config file.";
    aliases = "g:config";

    builder(args: yargs.Argv) {
        return args.option("p", {
            alias: "configFile",
            type: "string",
            describe: "File where the config file should be created. Defaults to BASE_DIR/swaggify.config.json .",
        });
    }

    async handler(args: yargs.Arguments) {
        try {
            const configFile: string = await SetupRunner.generateConfigFile(GenerateConfigCommand.getTemplate(), args.configFile as string | undefined);
            console.log(`Created: ${FileUtils.cleanPath(configFile)}`);
            PlatformTools.logSuccess("Successfully generated");
        } catch (err: any) {
            PlatformTools.logCmdErr("Error when generating config file: ", err);
        }
    }

    /**
     * Generate Config template
     * @param projectName Project Name
     * @returns template
     */
    protected static getTemplate(projectName?: string): string {
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
