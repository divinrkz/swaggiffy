import { TClassDef } from "./typings";
import Utility from "./utils/Utility";

function SwaggifyModel(): Function {
  return (_class: Function) => {
    

      const classDef: TClassDef = Utility.getClassProps(_class);

      const format: any = Utility.formatClassProps(classDef);

      Utility.writeSwagger(format);
      
  }
}


export {SwaggifyModel};