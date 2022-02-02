import * as yargs from "yargs";
import { PlatformTools } from '../platform/PlatformTools';
import { getConfigMetadataStorage, getSchemaMetadataStorage } from "../globals";
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
            .option("osa", {
                alias: "openApiVersion",
                choices: ["2.0", "3.0"],
                describe: "Choose OpenAPI version, expected values are 2.0, 3.0",
            })
            .option('f', {
                alias: 'format',
                choices: ['json', 'yaml'],
                describe: 'Swagger Specification Format, expected values are JSON, YAML'
            })
            .option('d', {
                alias: 'defFile',
                describe: 'Swagger Definition output file path'
            })
            .option('c', {
                alias: 'configFile',
                describe: 'Swagger Config output file path'
            });
    }

    async handler(args: yargs.Arguments) {
        try {
            getConfigMetadataStorage().appName = (args.name as string) || (PlatformTools.getProjectName());
            getConfigMetadataStorage().openApiVersion = (args.openApiVersion as TOpenApiVersion) || '3.0';
            getConfigMetadataStorage().format = (args.format as TFormat) || 'json';
            getConfigMetadataStorage().format = (args.format as TFormat) || 'json';

            if (args.defFile)
               getConfigMetadataStorage().swaggerDefinitionFilePath = ValidationUtils.validateFilePath((args.defFile as string), args.format);
            
            SetupRunner.generateConfigFile(
                Templates.getConfigTemplate({
                    projectName: getConfigMetadataStorage().appName,
                    outFile: getConfigMetadataStorage().swaggerDefinitionFilePath,
                    apiRouteUrl: getConfigMetadataStorage().swaggerEndPointUrl,
                    configFile: getConfigMetadataStorage().swaggerConfigFilePath,
                    openApiVersion: getConfigMetadataStorage().openApiVersion,
                    format: getConfigMetadataStorage().format
            } as TemplateOptions));
            
        } catch (err) {
            PlatformTools.logCmdErr("Error when initializing swaggify.", err);
            process.exit(1);
        }
    }
}
