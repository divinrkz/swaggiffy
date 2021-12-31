import { SchemaMetadata } from '../../storage/types/SchemaMetadata';
import { getSchemaMetadataStorage } from '../../globals';
import { Utility } from '../utils/Utility';


/**
 * Runner Class
 */
export class Runner {

    /**
     * Generating schemas from global SchemaMetadataStorage
     * @param schemas 
     */
    static generateSchemas(): void {
        Utility.compressArrToObj(getSchemaMetadataStorage().schemas);
    }
}