import Utility from "./utils/Utility";

function SwaggifyModel(): Function {
  return (_class: Function) => {
    
    const obj: any = Utility.getClassProps(_class);

      const format: any = Utility.formatClassProps(obj);

      Utility.writeSwagger(format);
      
  }
}


export {SwaggifyModel};