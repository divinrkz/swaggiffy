import * as yargs from 'yargs';
import { PlatformTools } from '../platform/PlatformTools';

/**
 * Swaggify generator
 */
export class InitCommand implements yargs.CommandModule {
    command = "init";
    describe = "Builds and Generates necessarly config files for Swaggify inside the current directory.";
     
    builder(args: yargs.Argv) {
        return args 
            .option('pm', {
                alias: 'manager',
                choices: ['npm', 'yarn', 'pnpm'],
                default: 'npm',
                describe: 'Install packages, expected values are npm, yarn, pnpm'
            })
    }


    async handler(args: yargs.Arguments) {
        try {
            const swaggerVersion = args.swaggerVersion; 
        } catch(e) {
            PlatformTools.logInfo();
            console.error(err);
            process.exit(1);
        }
    }


}