import { PlatformTools } from './platform/PlatformTools'
import { SchemaMetadataStorage } from './storage'
import { ConfigMetadataStorage } from './storage/ConfigMetadataStorage'

/**
 * Returns globals schemametadata storage
 */
export function getSchemaMetadataStorage(): SchemaMetadataStorage {
  const globalScope = PlatformTools.getGlobalVariable()
  if (!globalScope.schemaMetadataStorage)
    globalScope.schemaMetadataStorage = new SchemaMetadataStorage()

  return globalScope.schemaMetadataStorage
}

/**
 * Returns Config Metadata Storage
 */
export function getConfigMetadataStorage(): ConfigMetadataStorage {
  const globalScope = PlatformTools.getGlobalVariable()
  if (!globalScope.configMetadataStorage)
    globalScope.configMetadataStorage = new ConfigMetadataStorage()

  return globalScope.configMetadataStorage
}
