import {PlatformTools} from './lib/platform/PlatformTools';
import { SchemaMetadataStorage } from './storage';

/**
 * Returns globacl schemametadata storage
 */
export function getSchemaMetadataStorage(): SchemaMetadataStorage {
    
    const globalScope = PlatformTools.getGlobalVariable();
    if (!globalScope.schemaMetadataStorage) 
        globalScope.schemaMetadataStorage = new SchemaMetadataStorage();

    return globalScope.schemaMetadataStorage;
}