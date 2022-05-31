import { getAPIDefinitionMetadataStorage, getSchemaMetadataStorage } from '../globals';
import { Utility } from '../utils/Utility';
import { APIPathDefinition, TSwaggerSchemaDef } from '../typings';

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
        console.log('generate')
        const pathDefinition: APIPathDefinition = Utility.toSwaggerAPIDefinition(getAPIDefinitionMetadataStorage().apiDefinitions);
        Utility.swaggifyD(pathDefinition);
    }

    static execute(): void {
        this.generateSchemas();
        this.generateAPIDefinitions();
    }
}
