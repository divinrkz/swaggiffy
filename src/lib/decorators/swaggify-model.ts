import { PlatformTools } from "../platform/PlatformTools";
import { TClassDef, TSwaggerSchema } from "../../typings";
import {Utility} from "../../utils/Utility";
import {getSchemaMetadataStorage} from '../../globals';

export const SwaggifyModel = (): Function => {
  return (target: Function) => {




      const classDef: TClassDef = Utility.getClassProps(target);    
      const swaggerDef: TSwaggerSchema = Utility.genSchemaDef(classDef);

      // console.log('swagger Definiction', swaggerDef);

      // PlatformTools.getGlobalVariable();
      const data = getSchemaMetadataStorage().schemas.push(swaggerDef);
  
      console.log(getSchemaMetadataStorage());
      // Utility.swaggify(swaggerDef);
  }
}

