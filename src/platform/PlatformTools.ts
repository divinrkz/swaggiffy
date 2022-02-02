import { existsSync, readFileSync, writeFile } from "fs";
import chalk from "chalk";
import { FileUtils } from "../utils/FileUtils";

/**
 * Platform specific tools
 */
export class PlatformTools {
    /**
     * Type of current running platform
     */
    static platform: "browser" | "cli" = "cli";

    /**
     * Get global variable where global scope stuff can be stored
     * @returns global
     */
    static getGlobalVariable(): any {
        return global;
    }

    /**
     * Read and return all file contents
     */
    static getFileContents(path: string): Buffer {
        if (!this.fileOrDirectoryExists(path)) throw new Error("File doesnot exist");

        return readFileSync(path);
    }

    /**
     * Write content to a file
     */
    static writeToFile(path: string, content: string): Promise<void> {
        return new Promise<void>((ok, fail) => {
            writeFile(path, content, (err) => {
                if (err) fail(err);
                ok();
            });
        });
    }


    /**
     * Read the name property from package.json
     * @returns Project Name
     */
    static getProjectName(): string {
        const path: string = process.cwd() + '/package.json';
        const npmConfig: any = JSON.parse(FileUtils.getFileContents(path).toString());

        return npmConfig['displayName'] || npmConfig['name'];
    }

    /**
     * Check if file or directory exists
     */
    static fileOrDirectoryExists(path: string): boolean {
        return existsSync(path);
    }

    static logInfo(message: string, info: any) {
        console.log(chalk.blue("Testing info"), info);
    }

    static logSuccess(message: string) {
        console.log(chalk.green(message));
    }

    static logCmdErr(message: string, err?: any) {
        console.log(chalk.black.bgRed(message));
        if (err) console.error(err);
    }
}
