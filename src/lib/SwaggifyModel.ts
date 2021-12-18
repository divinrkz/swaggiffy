import { TClassDef } from "../typings";
import Utility from "../utils/Utility";

function SwaggifyModel(): Function {
  return (_class: Function) => {

      const classDef: TClassDef = Utility.getClassProps(_class);    
      console.log(classDef);  
      const format: any = Utility.formatClassProps(classDef);
      console.log(format);
      Utility.writeSwagger(format);
      
  }
}


export {SwaggifyModel};