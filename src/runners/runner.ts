import { getSchemaMetadataStorage } from '../globals';
import { Utility } from '../utils/Utility';
import { TSwaggerSchemaDef } from '../typings';

/**
 * Runner Class
 */
export class Runner {
    /**
     * Generating schemas from global SchemaMetadataStorage
     * @param schemas
     */
    static generateSchemas(): void {
        const definition: TSwaggerSchemaDef = Utility.compressArrToObj(getSchemaMetadataStorage().schemas);
        console.log(definition);
        Utility.swaggify(definition);
    }

    static execute(): void {
        this.generateSchemas();
    }
}
