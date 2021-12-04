import { PlatformTools } from './platform/PlatformTools';
import { SchemaMetadataStorage } from './storage/schema-metadata-storage';
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
        // These open interfaces may be extended in an application-specific manner via declaration merging.
        // See for example method-override.d.ts (https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/method-override/index.d.ts)
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
