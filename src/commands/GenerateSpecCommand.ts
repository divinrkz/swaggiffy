import * as yargs from 'yargs';
import { PlatformTools } from '../platform/PlatformTools';
import { SetupRunner } from '../runners/SetupRunner';
import { FileUtils } from '../utils/FileUtils';
import { Templates } from '../utils/Templates';

/**
 * Generate Spec Command
 */
export class GenerateSpecCommand implements yargs.CommandModule {
    command = 'generate:spec';
    describe = 'Generate swaggify specifications file.';
    aliases = 'g:spec';

    builder(args: yargs.Argv) {
        return args
            .option('path', {
                alias: 'specFilePath',
                type: 'string',
                describe: 'File where the swagger specifications will be be created. Defaults to BASE_DIR/swagger/swagger.json .',
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
            const specFile: string = await SetupRunner.generateSpecFile(
                Templates.getOSA2Template(),
                args.specFilePath as string | undefined,
                override as boolean,
            );
            console.log(`Created: ${FileUtils.cleanPath(specFile)}`);
            PlatformTools.logSuccess('Successfully generated');
        } catch (err) {
            PlatformTools.logCmdErr('Error when generating config file: ', err);
        }
    }
}
