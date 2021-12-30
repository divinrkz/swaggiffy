import { PlatformTools } from "../platform/PlatformTools";
import { TClassDef, TSwaggerSchema } from "../../typings";
import {Utility} from "../../utils/Utility";

export const SwaggifyModel = (): Function => {
  return (target: Function) => {




      const classDef: TClassDef = Utility.getClassProps(target);    
      const swaggerDef: TSwaggerSchema = Utility.genSchemaDef(classDef);

      PlatformTools.getGlobalVariable();
      // Utility.swaggify(swaggerDef);
  }
}

