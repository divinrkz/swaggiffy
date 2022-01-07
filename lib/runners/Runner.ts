import { getAPIDefinitionMetadataStorage, getSchemaMetadataStorage } from '../globals';
import { Utility } from '../utils/Utility';
import { APIPathDefinition, TSwaggerSchemaDef } from '../typings';
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
        Utility.swaggify(swaggerSchemaDefinition);
    }

    /**
     * Generating apiDefinitions from global APIDefinitionMetadataStorage
     * @param schemas
     */
    static generateAPIDefinitions(): void {
        const pathDefinition: string = Utility.toSwaggerAPIDefinition(getAPIDefinitionMetadataStorage().apiDefinitions);
        console.log(pathDefinition, 'Path definition')
        Utility.swaggifyD(pathDefinition.toString());
    }

    static execute(): void {
        this.generateSchemas();
        this.generateAPIDefinitions();
    }
}
