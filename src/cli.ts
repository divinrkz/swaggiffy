import yargs from "yargs";
import { GenerateConfigCommand } from "./commands/GenerateConfigCommand";
import { InitCommand } from "./commands/InitCommand";
import { VersionCommand } from "./commands/VersionCommand";

yargs
    .usage("Usage: $0 <command> [options]")
    .command(new InitCommand())
    .command(new GenerateConfigCommand())
    .command(new VersionCommand())
    .recommendCommands()
    .demandCommand(1)
    .strict()
    .alias("v", "version")
    .help("h")
    .alias("h", "help").argv;
