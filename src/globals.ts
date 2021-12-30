import {PlatformTools} from './lib/platform/PlatformTools';

export function getSchemaMetadataStorage() {
    
    const globalScope = PlatformTools.getGlobalVariable();
    if (!globalScope.schemaMetadataStorage) 
        globalScope.schemaMetadataStorage = new SchemaMetadataStorage();

}