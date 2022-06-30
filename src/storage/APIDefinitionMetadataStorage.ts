import { APIDefinitionMetadata } from './types/APIDefinitionMetadata';

/**
 * Global storage for registered schemas
 */
export class APIDefinitionMetadataStorage {
    /**
     * Swagger API Definitions
     */
    readonly apiDefinitions: APIDefinitionMetadata[] = [];
}
