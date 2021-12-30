import { PlatformTools } from "../platform/PlatformTools";
import { TClassDef, TSwaggerSchema } from "../../typings";
import {Utility} from "../../utils/Utility";
import {getSchemaMetadataStorage} from '../../globals';
import {ISchemaMetaData} from '../../storage/types/ISchemaMetaData';

/**
 * Constructs a standard swagger definition from decorated class
 * @param name Optional swagger schema name
 */
export const SwaggifyModel = (name?: string): ClassDecorator => {
  return (target: Function) => {

      const classDef: TClassDef = Utility.getClassProps(target);    
      const swaggerDefinition: TSwaggerSchema = Utility.genSchemaDef(classDef);

      getSchemaMetadataStorage().schemas.push({
          target: target,
          name: name || target.name,
          swaggerDefinition: swaggerDefinition
      } as ISchemaMetaData);
  }
}

