import {existsSync, readFileSync, writeFile, open} from "fs";
import * as path from "path";

/**
 * File Utils
 */
export class FileUtils {
    
    /**
     * Read and return all file contents
    */
    static getFileContents(path: string): Buffer {

        if (!this.fileOrDirectoryExists(path)) 
            throw new Error("File doesnot exist");

        return readFileSync(path);
    }

    /**
    * Resolves a given path
    */
   static pathResolve(pathStr: string): string {
       return path.resolve(pathStr);
   }

    /**
    * Creates a file in current working directory
    */
    static createFileInWorkspace(pathStr: string): string {
        if (!this.fileOrDirectoryExists(pathStr)) { 
           open(pathStr, 'w', function (err, file) {
                if (err) throw err;
            });
        }

        return path.resolve(pathStr);
    }

    /**
     * Write content to a file 
     */
    static writeToFile(pathStr: string, content: string): Promise<void> {
        return new Promise<void>((ok, fail) => {
            writeFile(pathStr, content, (err) => {
                if (err) fail(err);
                ok();
            });
        });
    }   

    /**
     * Return filename from path. Does path.basename()
     * @param path Path
     * @returns filename
     */
    static getFileName(pathStr: string): string {
        return path.basename(pathStr);
    }

    /**
     * Return filename from path. Does path.extname()
     * @param path Path
     * @returns filename
     */
    static getFileExtension(pathStr: string): string {
        return path.extname(pathStr);
    }

    /**
     * Check if file or directory exists
     */
    static fileOrDirectoryExists(pathStr: string): boolean {
        return existsSync(pathStr);
    }

}