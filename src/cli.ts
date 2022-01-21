import yargs from 'yargs';
import { InitCommand } from './commands/InitCommand';



yargs
    .usage('Usage: $0 <command> [options]')
    .command(new InitCommand());
    .recommendCommands()
    .demandCommand(1)
    .strict()
    .alias('v', 'version')
    .help('h')
    .alias('h', 'help')
    .argv;