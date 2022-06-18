import { existsSync, readFileSync, mkdirSync, writeFile, open } from 'fs';
import * as path from 'path';
import { SwaggiffyError } from '../errors/SwaggiffyError';
import { PlatformTools } from '../platform/PlatformTools';
import { ValidationUtils } from './ValidationUtils';

/**
 * File Utils
 */
export class FileUtils {
    /**
     * Read and return all file contents
     */
    static getFileContents(path: string, extra?: { throwable: boolean; type: string }): Buffer | boolean {
        if (!this.fileOrDirectoryExists(path)) {
            if (extra) {
                if (!extra.throwable) return false;
            }
            throw new SwaggiffyError(`${extra ? extra.type : ''} File not found.`);
        }
        return readFileSync(path);
    }

    /**
     * Resolves a given path
     */
    static pathResolve(pathStr: string): string {
        return path.resolve(pathStr);
    }

    /**
     * Extract Directory from file Path String
     * @param pathStr Path string
     */
    static extractDirectoryFromFilePath(pathStr: string): string | null {
        ValidationUtils.validateFilePath(pathStr);
        const iFirst: number = pathStr.indexOf('/');
        const iLast: number = pathStr.lastIndexOf('/');

        if (iFirst === iLast) return null;

        return pathStr.substring(0, iLast);
    }

    /**
     * Creates a file if not exists in current working directory.
     * @param pathStr: Path
     */
    static createFileInWorkspace(pathStr: string, override = false): Promise<string> {
        const dir: string | null = this.extractDirectoryFromFilePath(pathStr);
        if (dir) this.createDirectory(dir as string);

        const openFile = (ok: any, fail: any) => {
            open(pathStr, 'w', function (err, file) {
                if (err) fail(err);
                PlatformTools.logSuccess(`Generated ${pathStr}`);
                ok(pathStr);
            });
        };

        return new Promise<string>((ok, fail) => {
            if (!this.fileOrDirectoryExists(pathStr)) {
                openFile(ok, fail);
            } else {
                if (override) {
                    openFile(ok, fail);
                } else {
                    PlatformTools.logSuccess('Config file already exists.');
                }
            }
        });
    }

    /**
     * Create directory with specified path
     * @param dir Directory path
     * @returns
     */
    static createDirectory(dir: string): Promise<void> {
        return new Promise<void>((ok, fail) => {
            if (!this.fileOrDirectoryExists(dir)) {
                mkdirSync(dir, { recursive: true });
            }
            ok();
        });
    }

    /**
     * Write content to a file
     */
    static writeToFile(pathStr: string, content: string): Promise<string> {
        return new Promise<string>((ok, fail) => {
            writeFile(pathStr, content, (err) => {
                if (err) fail(err);
                ok(pathStr);
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
     * Formats and cleans file path
     * @param pathString
     * @returns
     */
    static cleanPath(pathString: string): string {
        let cleanPath: string = pathString;
        if (pathString.startsWith('./')) cleanPath = pathString.replace('./', '');
        if (pathString.endsWith('/')) cleanPath = pathString.slice(0, pathString.length - 1);

        return cleanPath;
    }

    /**
     * Check if file or directory exists
     */
    static fileOrDirectoryExists(pathStr: string): boolean {
        return existsSync(pathStr);
    }
}
