import { SwaggiffyError } from '../errors/SwaggiffyError';
import { PathString, TFormat } from '../typings';

/**
 * Validation Utility Class
 */
export class ValidationUtils {
    /**
     * Cleans file path. Remove ending '/'.
     * @param filePath File Path
     */
    static cleanFilePath(filePath: string): string {
        if (filePath.startsWith('/')) filePath = filePath.substring(1, filePath.length);
        if (filePath.endsWith('/')) filePath = filePath.substring(0, filePath.lastIndexOf('/'));

        return filePath;
    }

    /**
     * Validates relative file paths
     * @param filePath File Path
     */
    static validateFilePath(filePath: string, format?: TFormat): string {
        filePath = this.cleanFilePath(filePath);

        if (format) {
            if (!filePath.endsWith(format)) throw new SwaggiffyError(`Invalid file type provided, You provided a file extension different from ${format}`);
        }

        if (!filePath.endsWith('.json') && !filePath.endsWith('.yaml') && !filePath.endsWith('.yml'))
            throw new SwaggiffyError('Invalid file type provided, file extensions other than [json, yaml, yml] are not allowed');

        return filePath;
    }

    /**
     * Validates API Route Urls
     * @param routeUrl Route Url
     */
    static validateAPIRoute(routeUrl: string): PathString {
        if (!routeUrl.startsWith('/')) throw new SwaggiffyError(`Invalid API route url format. Start with a '/'`);

        return routeUrl as PathString;
    }


        /**
     * Formats and cleans file path
     * @param pathString
     * @returns
     */
    static cleanSwaggerPathString(pathString: string): string {
        if (pathString.includes('/:')) {
            let split = pathString.split('/');
            let map = split.map(path => path.startsWith(':') ? `{${path.substring(1)}}` : path);
            pathString = map.join('/')
        }
            let cleanPath: string = pathString;
            if (pathString.startsWith('./')) cleanPath = pathString.replace('./', '');
            if (pathString.endsWith('/')) cleanPath = pathString.slice(0, pathString.length - 1);
            
            return cleanPath;
    }
}
