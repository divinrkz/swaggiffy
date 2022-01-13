import { TClassDef, TSwaggerSchema } from '../typings'
import { Utility } from '../utils/Utility'
import { getSchemaMetadataStorage } from '../globals'
import { SchemaMetadata } from '../storage/types/SchemaMetadata'

/**
 * Constructs a standard swagger definition from decorated class
 * @param name Optional swagger schema name
 */
export function SwaggifySchema(name?: string): ClassDecorator {
  return target => {
    const classDef: TClassDef = Utility.getClassProps(target, name)
    const swaggerDefinition: TSwaggerSchema = Utility.genSchemaDef(classDef)

    getSchemaMetadataStorage().schemas.push({
      target: target,
      name: classDef.name,
      swaggerDefinition: swaggerDefinition
    } as SchemaMetadata)
  }
}
