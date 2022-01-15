import { SwaggifyError } from "../errors/SwaggifyError";

/**
 * Validation Utility Class
 */
export class ValidationUtils {
    /**
     * Validates relative file paths
     * @param filePath File Path
     */
    static validateSwaggerFilePath(filePath: string) {
        if (filePath.startsWith('/')) 
            throw new SwaggifyError('Invalid swagger file path provided, absolute file paths are not permitted');
        if (filePath.endsWith('.json'))    
            throw new SwaggifyError('Invalid swagger file path provided, file extensions other than [json, yaml] are not allowed');
    }
}
