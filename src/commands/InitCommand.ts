import * as yargs from "yargs";
import { PlatformTools } from '../platform/PlatformTools';
import { getConfigMetadataStorage } from "../globals";
import { TemplateOptions, TOpenApiVersion } from "../typings";
import { SetupRunner } from "../runners/SetupRunner";
import { Templates } from "../utils/Templates";



/**
 * Swaggify generator
 */
export class InitCommand implements yargs.CommandModule {
    command = "init";
    describe = "Builds and Generates necessarly config files for Swaggify inside the current directory.";

    builder(args: yargs.Argv) {
        return args
            .option("oa", {
                alias: "openApiVersion",
                choices: ["2.0", "3.0"],
                default: "2.0",
                describe: "Choose OpenAPI version, expected values are 2.0, 3.0",
            })
            .option("oa", {
                alias: "openApiVersion",
                choices: ["2.0", "3.0"],
                default: "2.0",
                describe: "Choose OpenAPI version, expected values are 2.0, 3.0",
            })
            .option("n", {
                alias: "name",
                default: '',
                describe: "Name of project",
            }).option('fmt', {
                alias: 'format',
                choices: ['json', 'yaml'],
                default: 'json',
                describe: 'Swagger Specification Format, expected values are 2.0, 3.0'
            });
    }

    async handler(args: yargs.Arguments) {
        try {
            PlatformTools.getProjectName();
            if (args.name) getConfigMetadataStorage().appName = args.n as string;
            if (args.openApiVersion) getConfigMetadataStorage().openApiVersion = args.openApiVersion as TOpenApiVersion;
            if (args.format) getConfigMetadataStorage().format = args.format as 'json' | 'yaml';
            if (args.f) getConfigMetadataStorage().format = args.format as 'json' | 'yaml';

            SetupRunner.generateConfigFile(Templates.getConfigTemplate());
        } catch (err) {
            PlatformTools.logCmdErr("Error when initializing swaggify.", err);
            process.exit(1);
        }
    }
}
