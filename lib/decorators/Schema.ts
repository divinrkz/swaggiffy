import { TClassDef, TSwaggerSchema } from '../typings';
import { Utility } from '../utils/Utility';
import { getSchemaMetadataStorage } from '../globals';
import { SchemaMetadata } from '../storage/types/SchemaMetadata';
import { SchemaExtractor } from '../extractors/schema.extractor';

/**
 * Constructs a standard swagger definition from decorated class
 * @param name Optional swagger schema name
 */
export function Schema(name?: string): ClassDecorator {
    return (target) => {
        const extractor: TClassDef = SchemaExtractor.getClassProps(target, name);

        const swaggerDefinition: TSwaggerSchema = Utility.genSchemaDef(extractor);

        getSchemaMetadataStorage().schemas.push({
            target: target,
            name: extractor.name,
            swaggerDefinition: swaggerDefinition,
        } as SchemaMetadata);
    };
}
