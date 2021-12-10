import Utility from "../utils/Utility";

function Model() {
  return (_class: Function) => {
      console.log(Utility.getClassProps(_class));
      Utility.writeSwagger();
  }
}


export {Model};