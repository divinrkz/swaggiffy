import * as yargs from 'yargs';
import { PlatformTools } from '../platform/PlatformTools';
import { SetupRunner } from '../runners/SetupRunner';
import { ConfigMetadataStorage } from '../storage/ConfigMetadataStorage';
import { getConfigMetadataStorage } from '../globals';

/**
 * Swaggify generator
 */
export class InitCommand implements yargs.CommandModule {
    command = "init";
    describe = "Builds and Generates necessarly config files for Swaggify inside the current directory.";
     
    builder(args: yargs.Argv) {
        return args 
            .option('oa', {
                alias: 'openapiVersion',
                choices: ['2.0', '3.0', ],
                default: '2.0',
                describe: 'Choose OpenAPI version, expected values are 2.0, 3.0'
            })
            .option('n', {
                alias: 'name',
                describe: 'Name of project'
            })
    }


    async handler(args: yargs.Arguments) {
        try {
            if (args.name) getConfigMetadataStorage().appName = args.n;
            if (args.openapiVersion) getConfigMetadataStorage().openApiVersion = args.openApiVersion;

        } catch (err) {
            PlatformTools.logCmdErr('Error when initializing swaggify.', err);
            process.exit(1);
        }
    }   


}