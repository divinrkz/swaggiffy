import { SwaggifyModel } from "../lib/SwaggifyModel";


@SwaggifyModel()
class User {
  
     name: string = "User";
     age: number = 16;
     birthDate: Date = new Date(); 
     active: boolean = false;
    
};

export {User};
