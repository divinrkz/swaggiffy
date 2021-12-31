import { SchemaMetadata } from '../../storage/types/SchemaMetadata';
import { getSchemaMetadataStorage } from '../../globals';


/**
 * Runner Class
 */
export class Runner {
    
    /**
     * Generating schemas from global SchemaMetadataStorage
     * @param schemas 
     */
    generateSchemas(): void {
        console.log(getSchemaMetadataStorage().schemas);
    }
}