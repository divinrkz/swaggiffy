import {PlatformTools} from './lib/platform/PlatformTools';
import { SchemaMetadataStorage } from './storage';

/**
 * 
 */
export function getSchemaMetadataStorage(): SchemaMetadataStorage {
    
    const globalScope = PlatformTools.getGlobalVariable();
    if (!globalScope.schemaMetadataStorage) 
        globalScope.schemaMetadataStorage = new SchemaMetadataStorage();

}