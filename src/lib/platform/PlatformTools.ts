import {existsSync, readFileSync, writeFile} from "fs";
import chalk from 'chalk';

/**
 * Platform specific tools
 */
export class PlatformTools {

    /**
     * Type of current running platform 
     */
    static platform: 'browser'|'cli' = 'cli';


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

        if (!this.fileOrDirectoryExists(path)) 
            throw new Error("File doesnot exist");

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
     * Check if file or directory exists
     */
    static fileOrDirectoryExists(path: string): boolean {
        return existsSync(path);
    }


    static logInfo(message: string, info: any) {
        console.log(chalk.blue('Testing info'), info);
    }



}