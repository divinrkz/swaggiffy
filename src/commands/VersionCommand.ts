import * as yargs from 'yargs';
import exec from 'child_process';

export class VersionCommand implements yargs.CommandModule {
    command = "version"
    describe = "Prints Swaggify version this project uses"

    async handler() {
        const localNpmList = await VersionCommand.ex
    }


    protected static executeCommand(command: string) {
        return new Promise<void>((ok, fail) => {
            exec(command, (err: any, stdout: any, stderr: any) => {
                if (stdout) return ok(stdout);
                if (stderr) return ok(stderr);
                if (err) return fail(err);
                ok();
            })
        })
    }
}