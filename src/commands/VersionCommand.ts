import * as yargs from "yargs";
import { exec } from "child_process";

export class VersionCommand implements yargs.CommandModule {
    command = "version";
    describe = "Prints Swaggify version this project uses";

    /**
     * Handle Command.
     */
    async handler() {
        const SWAGGIFY_PATTERN = / @divinirakiza@swaggify@(.*)\n/;

        const localNpmList: string = await VersionCommand.executeCommand("npm list --depth=0");
        const localMatches: RegExpMatchArray | null = localNpmList.match(SWAGGIFY_PATTERN);
        const localNpmVersion: string = (localMatches && localMatches[1] ? localMatches[1] : "").replace(/"invalid"/gi, "").trim();

        const globalNpmList = await VersionCommand.executeCommand("npm list -g --depth=0");
        const globalMatches = globalNpmList.match(SWAGGIFY_PATTERN);
        const globalNpmVersion = (globalMatches && globalMatches[1] ? globalMatches[1] : "").replace(/"invalid"/gi, "").trim();

        if (localNpmVersion) {
            console.log("Local installed version:", localNpmVersion);
        } else {
            console.log("No local installed Swaggify was found.");
        }
        if (globalNpmVersion) {
            console.log("Global installed Swaggify version:", globalNpmVersion);
        } else {
            console.log("No global installed was found.");
        }

        if (localNpmVersion && globalNpmVersion && localNpmVersion !== globalNpmVersion) {
            console.log(
                "To avoid issues with CLI please make sure your global and local Swaggify versions match, " +
                    "or you are using locally installed Swaggify instead of global one.",
            );
        }
    }

    protected static executeCommand(command: string) {
        return new Promise<string>((ok, fail) => {
            exec(command, (err, stdout, stderr) => {
                if (stdout) return ok(stdout);
                if (stderr) return ok(stderr);
                if (err) return fail(err);
                ok("");
            });
        });
    }
}
