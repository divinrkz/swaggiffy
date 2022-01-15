import { SwaggifyError } from "../errors/SwaggifyError";

/**
 * Validation Utility Class
 */
export class ValidationUtils {


    /**
     * Cleans file path. Remove ending '/'.
     * @param filePath File Path
     */
    static cleanFilePath(filePath: string): string {
        if (filePath.endsWith('/'))
            return filePath.substring(0, filePath.lastIndexOf('/'));

         return filePath;   
    }


    /**
     * Validates relative file paths
     * @param filePath File Path
     */
    static validateFilePath(filePath: string) {
        this.cleanFilePath(filePath);
        
        if (filePath.startsWith('/')) 
            throw new SwaggifyError('Invalid swagger file path provided, absolute file paths are not permitted');
        if (!filePath.endsWith('.json'))    
            throw new SwaggifyError('Invalid swagger file path provided, file extensions other than [json, yaml] are not allowed');
    }
}
