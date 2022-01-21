import * as yargs from 'yargs';

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


}