import * as yargs from "yargs";
import { PlatformTools } from '../platform/PlatformTools';
import { getConfigMetadataStorage } from "../globals";
import { TemplateOptions, TFormat, TOpenApiVersion } from "../typings";
import { SetupRunner } from "../runners/SetupRunner";
import { Templates } from "../utils/Templates";
import { ValidationUtils } from "../utils/ValidationUtils";



/**
 * Swaggify generator
 */
export class InitCommand implements yargs.CommandModule {
    command = "init";
    describe = "Builds and Generates necessarly config files for Swaggify inside the current directory.";

    builder(args: yargs.Argv) {
        return args
            .option("n", {
                alias: "name",
                describe: "Name of project",
            })
            .option("OSA", {
                alias: "openApiVersion",
                choices: ["2.0", "3.0"],
                describe: "Choose OpenAPI version, expected values are 2.0, 3.0",
            })
            .option('f', {
                alias: 'format',
                choices: ['json', 'yaml'],
                describe: 'Swagger Specification Format, expected values are JSON, YAML'
            })
            .option('out', {
                alias: 'outputFile',
                describe: 'Swagger Specification output file path'
            });
    }

    async handler(args: yargs.Arguments) {
        try {
            getConfigMetadataStorage().appName = (args.name as string) || (PlatformTools.getProjectName());
            getConfigMetadataStorage().openApiVersion = (args.openApiVersion as TOpenApiVersion) || '3.0';
            getConfigMetadataStorage().format = (args.format as TFormat) || 'json';

            if (args.outputFile) {
                ValidationUtils.validateFilePath((args.outputFile as string), args.format);
            }

            getConfigMetadataStorage().format = (args.format as TFormat) || 'json';
            
            SetupRunner.generateConfigFile(
                Templates.getConfigTemplate({
                    projectName: getConfigMetadataStorage().appName,
                    outFile: '',
                    apiRouteUrl: '',
                    configFile: '',
                    openApiVersion: getConfigMetadataStorage().openApiVersion,
                    format: getConfigMetadataStorage().format
            } as TemplateOptions));
            
        } catch (err) {
            PlatformTools.logCmdErr("Error when initializing swaggify.", err);
            process.exit(1);
        }
    }
}
