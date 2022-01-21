import yargs from 'yargs';
import { InitCommand } from './commands/InitCommand';
import { VersionCommand } from './commands/VersionCommand';



yargs
    .usage('Usage: $0 <command> [options]')
    .command(new InitCommand())
    .command(new VersionCommand())
    .recommendCommands()
    .demandCommand(1)
    .strict()
    .alias('v', 'version')
    .help('h')
    .alias('h', 'help')
    .argv;