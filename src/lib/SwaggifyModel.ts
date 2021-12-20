import { TClassDef, TSwaggerSchema } from "../typings";
import {Utility} from "../utils/Utility";

export const SwaggifyModel = (): Function => {
  return (_class: Function) => {

      const classDef: TClassDef = Utility.getClassProps(_class);    
      const swaggerDef: TSwaggerSchema = Utility.genDef(classDef);

      Utility.swaggify(swaggerDef);
      
  }
}

