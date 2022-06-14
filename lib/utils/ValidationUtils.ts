import { SwaggifyError } from '../errors/SwaggifyError';
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
            if (!filePath.endsWith(format)) throw new SwaggifyError(`Invalid file type provided, You provided a file extension different from ${format}`);
        }

        if (!filePath.endsWith('.json') && !filePath.endsWith('.yaml') && !filePath.endsWith('.yml'))
            throw new SwaggifyError('Invalid file type provided, file extensions other than [json, yaml, yml] are not allowed');

        return filePath;
    }

    /**
     * Validates API Route Urls
     * @param routeUrl Route Url
     */
    static validateAPIRoute(routeUrl: string): PathString {
        if (!routeUrl.startsWith('/')) throw new SwaggifyError(`Invalid API route url format. Start with a '/'`);

        return routeUrl as PathString;
    }
}
