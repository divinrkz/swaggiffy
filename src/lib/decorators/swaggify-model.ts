import { PlatformTools } from "../platform/PlatformTools";
import { TClassDef, TSwaggerSchema } from "../../typings";
import {Utility} from "../../utils/Utility";
import {getSchemaMetadataStorage} from '../../globals';
import {ISchemaMetaData} from '../../storage/types/ISchemaMetaData';

export const SwaggifyModel = (): ClassDecorator => {
  return (target: Function) => {

      const classDef: TClassDef = Utility.getClassProps(target);    
      const swaggerDefinition: TSwaggerSchema = Utility.genSchemaDef(classDef);

      getSchemaMetadataStorage().schemas.push({
        target,
        name: classDef.class,
        swaggerDefinition
      } as ISchemaMetaData);
  }
}

