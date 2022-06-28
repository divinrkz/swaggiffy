import { getAPIDefinitionMetadataStorage, getSchemaMetadataStorage } from '../globals';
import { Utility } from '../utils/Utility';
import { APIPathDefinition, SwaggerAPIDefinition, TSwaggerSchemaDef } from '../typings';
import * as path from 'path';
import { PlatformTools } from '../platform/PlatformTools';

/**
 * Runner Class
 */
export class Runner {
    /**
     * Generating schemas from global SchemaMetadataStorage
     * @param schemas
     */
    static generateSchemas(): void {
        const swaggerSchemaDefinition: TSwaggerSchemaDef = Utility.toSwaggerSchema(getSchemaMetadataStorage().schemas);
        Utility.swaggiffy(swaggerSchemaDefinition, 'SCHEMA');
    }

    /**
     * Generating apiDefinitions from global APIDefinitionMetadataStorage
     * @param schemas
     */
    static generateAPIDefinitions(): void {
        const pathDefinition: SwaggerAPIDefinition = Utility.toSwaggerAPIDefinition(getAPIDefinitionMetadataStorage().apiDefinitions);
        
        Utility.swaggiffy(pathDefinition, 'DEFINITION');
        PlatformTools.logSuccess('Swagger API Definitions generated successfully');
    }

    static execute(): void {
        this.generateSchemas();
        this.generateAPIDefinitions();
    }
}
