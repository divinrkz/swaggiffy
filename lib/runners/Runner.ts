import { getAPIDefinitionMetadataStorage, getSchemaMetadataStorage } from '../globals';
import { Utility } from '../utils/Utility';
import { APIPathDefinition, SwaggerAPIDefinition, TSwaggerSchemaDef } from '../typings';
import * as path from 'path';

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
        Utility.swaggify(swaggerSchemaDefinition, 'SCHEMA');
    }

    /**
     * Generating apiDefinitions from global APIDefinitionMetadataStorage
     * @param schemas
     */
    static generateAPIDefinitions(): void {
        const pathDefinition: SwaggerAPIDefinition = Utility.toSwaggerAPIDefinition(getAPIDefinitionMetadataStorage().apiDefinitions);
        console.log(pathDefinition)
        Utility.swaggify(pathDefinition, 'DEFINITION');
    }

    static execute(): void {
        this.generateSchemas();
        this.generateAPIDefinitions();
    }
}
