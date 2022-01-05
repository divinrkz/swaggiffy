import {existsSync, readFileSync, writeFile} from "fs";


/**
 * Platform specific
 */
export class PlatformTools {

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

        if (!this.fileExists(path)) 
            throw new Error("File doesnot exist");

        return readFileSync(path);
    }


    /**
     * Write content to a file 
     */
    static writeToFile(path: string, content: string): Promise<void> {
        return new Promise<void>((ok: Function, fail: Function) => {
            writeFile(path, content, (err) => {
                if (err) fail(err);
                ok();
                console.log("alright");
            });
        });
    }   

    /**
     * Check if file exists
     */
    static fileExists(path: string): boolean {
        return existsSync(path);
    }


}