import * as yargs from 'yargs';
import { PlatformTools } from '../platform/PlatformTools';
import { getConfigMetadataStorage } from '../globals';
import { PathString, TemplateOptions, TFormat, TOpenApiVersion } from '../typings';
import { SetupRunner } from '../runners/SetupRunner';
import { Templates } from '../utils/Templates';
import { ValidationUtils } from '../utils/ValidationUtils';
import { Defaults } from '../utils/Defaults';

/**
 * Swaggiffy generator
 */
export class InitCommand implements yargs.CommandModule {
    command = 'init';
    describe = 'Builds and Generates necessarly config files for Swaggiffy inside the current directory.';

    builder(args: yargs.Argv) {
        return args
            .option('n', {
                alias: 'name',
                describe: 'Name of project',
            })
            .option('o', {
                alias: 'openApiVersion',
                choices: ['2.0', '3.0'],
                describe: 'Choose OpenAPI version, expected values are 2.0, 3.0',
            })
            .option('f', {
                alias: 'format',
                choices: ['json', 'yaml'],
                describe: 'Swagger Specification Format, expected values are JSON, YAML',
            })
            .option('d', {
                alias: 'defFile',
                describe: 'Swagger Definition output file path',
            })
            .option('a', {
                alias: 'apiRoute',
                describe: 'Swagger Documentation API Route',
            })
            .option('r', {
                alias: 'refresh',
                type: 'boolean',
                describe: 'Regenerates new Swagger Config file',
            });
    }

    async handler(args: yargs.Arguments) {
        try {
            getConfigMetadataStorage().appName = (args.name as string) || PlatformTools.getProjectName();
            getConfigMetadataStorage().openApiVersion = (args.openApiVersion as TOpenApiVersion) || Defaults.OPENAPI_VERSION;
            getConfigMetadataStorage().format = (args.format as TFormat) || Defaults.SWAGGER_DEFINITION_FORMAT;
            getConfigMetadataStorage().swaggerDefinitionFilePath = (args.defFile as string)
                ? ValidationUtils.validateFilePath(args.defFile as string, args.format as TFormat)
                : Defaults.SWAGGER_DEFINITION_FILE;
            getConfigMetadataStorage().swaggerEndPointUrl = (args.apiRoute as PathString)
                ? ValidationUtils.validateAPIRoute(args.apiRoute as string)
                : Defaults.SWAGGER_ENDPOINT_URL;

            SetupRunner.generateConfigFile(
                Templates.getConfigTemplate({
                    projectName: getConfigMetadataStorage().appName,
                    outFile: getConfigMetadataStorage().swaggerDefinitionFilePath,
                    apiRouteUrl: getConfigMetadataStorage().swaggerEndPointUrl,
                    openApiVersion: getConfigMetadataStorage().openApiVersion,
                    format: getConfigMetadataStorage().format,
                } as TemplateOptions),
                args.refresh ? true : false,
            );

            const template: string =
                args.openApiVersion != undefined
                    ? args.openApiVersion == '2.0'
                        ? Templates.getOSA2Template()
                        : args.openApiVersion == '3.0'
                        ? Templates.getOSA3Template()
                        : ''
                    : '';

            await SetupRunner.generateSpecFile(template, args.specFilePath as string | undefined);
        } catch (err) {
            PlatformTools.logCmdErr('Error when initializing swaggiffy.', err);
            process.exit(1);
        }
    }
}
