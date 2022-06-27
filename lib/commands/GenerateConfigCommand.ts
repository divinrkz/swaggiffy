import * as yargs from 'yargs';
import { PlatformTools } from '../platform/PlatformTools';
import { SetupRunner } from '../runners/SetupRunner';
import { FileUtils } from '../utils/FileUtils';

/**
 * Generate Config Command
 */
export class GenerateConfigCommand implements yargs.CommandModule {
    command = 'generate:config';
    describe = 'Generate swaggiffy config file.';
    aliases = 'g:config';

    builder(args: yargs.Argv) {
        return args
            .option('path', {
                alias: 'configFilePath',
                type: 'string',
                describe: 'File where the config file should be created. Defaults to BASE_DIR/swaggiffy.config.json .',
            })
            .option('r', {
                alias: 'refresh',
                type: 'boolean',
                describe: 'Re-generate and overwrite existing config file.',
            });
    }

    async handler(args: yargs.Arguments) {
        try {
            const override: boolean | undefined = args.refresh ? true : false;
            const configFile: string = await SetupRunner.generateConfigFile(GenerateConfigCommand.getOSA2Template(), override as boolean);
            PlatformTools.logSuccess('Successfully generated config file');
        } catch (err) {
            PlatformTools.logCmdErr('Error when generating config file: ', err);
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
                projectName: projectName || 'swaggiffy',
                openApiVersion: '2.0',
                outFile: 'src/swagger.json',
                apiHost: 'localhost:3000',
                apiBaseUrl: '/api',
                swaggerRoute: '/api-docs'
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
                projectName: projectName || 'swaggiffy',
                openApiVersion: '3.0',
                outFile: 'src/swagger.json',
                apiHost: 'localhost:3000',
                apiBaseUrl: '/api',
                swaggerRoute: '/api-docs'
            },
            undefined,
            3,
        );
    }
}
