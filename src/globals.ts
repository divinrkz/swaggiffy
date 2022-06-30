import { PlatformTools } from './platform/PlatformTools';
import { SchemaMetadataStorage } from './storage/SchemaMetadataStorage';
import { APIDefinitionMetadataStorage } from './storage/APIDefinitionMetadataStorage';
import { ConfigMetadataStorage } from './storage/ConfigMetadataStorage';
import { ConfigurationProps } from './typings';

/**
 * Global string method reversed for paths
 */
// String.prototype.getAbsolutePath = function() {
// 		return process.cwd() + '/' + this;
// }

declare global {
    namespace Express {
        interface Request {}
        interface Response {}
        interface Application {
            use: any;
        }
    }
}

/**
 * Returns globals schemametadata storage
 */
export function getSchemaMetadataStorage(): SchemaMetadataStorage {
    const globalScope = PlatformTools.getGlobalVariable();
    if (!globalScope.schemaMetadataStorage) globalScope.schemaMetadataStorage = new SchemaMetadataStorage();

    return globalScope.schemaMetadataStorage;
}

/**
 * Returns globals schemametadata storage
 */
export function getAPIDefinitionMetadataStorage(): APIDefinitionMetadataStorage {
    const globalScope = PlatformTools.getGlobalVariable();
    if (!globalScope.apiDefinitionStorage) globalScope.apiDefinitionStorage = new APIDefinitionMetadataStorage();

    return globalScope.apiDefinitionStorage;
}

/**
 * Returns Config Metadata Storage
 */
export function getConfigMetadataStorage(): ConfigMetadataStorage {
    const globalScope = PlatformTools.getGlobalVariable();
    if (!globalScope.configMetadataStorage) globalScope.configMetadataStorage = new ConfigMetadataStorage();

    return globalScope.configMetadataStorage;
}

export function setConfigMetadataStorage(config: ConfigurationProps): void {
    const storage: ConfigMetadataStorage = getConfigMetadataStorage();
    storage.appName = config.projectName;
    storage.format = config.format;
    storage.openApiVersion = config.openApiVersion;
    storage.swaggerDefinitionFilePath = config.outFile;
    storage.swaggerEndPointUrl = config.apiRoute;
}
